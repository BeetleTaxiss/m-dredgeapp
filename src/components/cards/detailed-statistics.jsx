import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";

import CustomDetailedStats from "./CustomDetailedStats";
import {
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
const DetailedStatistics = () => {
  const [detailedStats, setDetailedStats] = useState([
    "load",
    "loading",
    "loading",
  ]);
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["4", "9", "d", "7", "s", "w"];
  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */

  useGetUserDetails(...optionalParams, setUserPermissions);

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/product/list.php`)
      .then((res) => {
        if (res.data.error) {
          errorAlert("Server Error Response", res.data.message);
        } else {
          let data = res.data.data;
          /**
           * Validated product data that is derived from a user's product permisssion
           */
          let validatedProductData;

          /**
           * This block ensures the validateProductLocationPermission utility is run when the user permission state hasn't be updated with actual data
           */
          if (userPermissions !== undefined || userPermissions !== null) {
            /**
             * utility function takes in a users permission and the product list from the database and validates what product permission the user has
             */
            validatedProductData = validateProductLocationPermission(
              userPermissions?.productPermissions,
              data
            );

            /**
             * Set the validated product to state to make it globally accessiable
             */
            const tableDropdown = productDropdownForTable(
              validatedProductData,
              setProductId
            );

            setUserProductPermission(tableDropdown);
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, [userPermissions, productId]);

  /**
   * Fetch production summary from DB and single out total stockpile product
   */
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let detailedStatsList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/production/summary.php`, {
          params: {
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let detailedStatsResponseList;
          let detailedStatsResponse = res.data;
          console.log("response: ", detailedStatsResponse);
          const stock = detailedStatsResponse?.stock.stock;
          detailedStatsResponseList = [
            // detailedStatsResponse.completed,
            detailedStatsResponse.stockpiled,
            detailedStatsResponse.wet_sand,
            { stock },
          ];

          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            detailedStatsResponseList.map((item, id) => {
              const total_wet_sand = Math.round(item.total_wet_sand);
              console.log("Wet sand: ", total_wet_sand);
              const total_stockpiled = Math.round(item.total_stockpiled);
              const total_stock = Math.round(item.stock);

              const detailedStatsSchema = {
                followers:
                  total_stockpiled || total_stockpiled == "0" ? true : false,
                linkk: total_wet_sand || total_wet_sand == "0" ? true : false,
                chat: total_stock || total_stock == "0" ? true : false,
                stats: total_stockpiled
                  ? total_stockpiled
                  : total_wet_sand
                  ? total_wet_sand
                  : total_stock
                  ? total_stock
                  : null,
                legend: total_stockpiled
                  ? "Stockpile"
                  : total_wet_sand
                  ? "Wet sand"
                  : total_stock
                  ? "Total stock"
                  : null,
                img: true,
                links: userProductPermission,
                paddingTopBottom: "0px",
              };

              return (detailedStatsList =
                detailedStatsList.concat(detailedStatsSchema));
            });
            setDetailedStats(detailedStatsList);
          }
        })
        .catch((error) => {
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
        });
    };

    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [userProductPermission]);

  /** Multipurpose success, error and warning pop-ups for handling and displaying errors, success and warning alerts */
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  return <CustomDetailedStats data={detailedStats} />;
};

export default DetailedStatistics;
