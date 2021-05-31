import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { BASE_API_URL } from "../../hooks/API";
import { ReactComponent as ChartLine } from "../../assets/chartLine.svg";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";

const TotalStockpile = () => {
  const [totalStockpile, setTotalStockpile] = useState({});
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
    let totalStockpileSchema;
    const response = async () => {
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
          let totalStockpileResponse = res.data;
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            const max_stockpiled_capacity = 10000;
            const max_stockpiled_percentage = 100 / 100;
            const stockpiled_value = Math.round(
              totalStockpileResponse.stockpiled.total_stockpiled
            );
            const current_stockpiled_percentage =
              ((stockpiled_value * max_stockpiled_percentage) /
                max_stockpiled_capacity) *
              100;
            totalStockpileSchema = {
              info: {
                value: `${functionUtils.addCommaToNumbers(
                  stockpiled_value
                )}cm³`,
                duration: "this week",
              },
              progressPercentage: `${current_stockpiled_percentage.toFixed(2)}`,
            };

            setTotalStockpile(totalStockpileSchema);
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
  // STOCK PILE DATA
  const { info, progressPercentage } = totalStockpile;
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-card-four">
        <div className="widget-content">
          <WidgetHeader
            title="Total Stock"
            links={userProductPermission}
            dropdown
            change
          />
          {/* BEGINNING OF STOCK PILE INFORMATION */}
          {!info ? (
            <Skeleton height={120} />
          ) : (
            <StockPileInformation content={info} />
          )}
          {/* END OF STOCK PILE INFORMATION */}

          {/* BEGINNING OF PROGRESS BAR FOR STOCK PILE CAPACITY */}
          {progressPercentage === undefined ? (
            <Skeleton height={27} />
          ) : (
            <StockPileProgressBar content={progressPercentage} />
          )}
          {/* ENDING OF PROGRESS BAR FOR STOCK PILE CAPACITY */}
        </div>
      </div>
    </div>
  );
};

// DYNAMIC STOCK PROGRESS BAR
export const StockPileProgressBar = ({ content }) => (
  <div className="w-progress-stats">
    <div className="progress">
      <div
        className="progress-bar bg-gradient-secondary"
        role="progressbar"
        style={{ width: `${content}%` }}
        aria-valuenow={content}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <div className="">
      <div className="w-icon">
        <p>{`${content}%`}</p>
      </div>
    </div>
  </div>
);

// DYNAMIC STOCK INFORMATION COMPONENT
export const StockPileInformation = ({ content }) => (
  <div className="w-content">
    <div
      className="w-info"
      style={{ display: "flex", gap: "0.2rem", alignItems: "flex-end" }}
    >
      <p className="value">
        {content?.value && content?.value}{" "}
        <span>{content?.duration && content?.duration}</span>{" "}
      </p>
      {/* Beginning of Duration Chartline SVG */}
      <ChartLine />
      {/* End of Duration Chartline SVG  */}
    </div>
  </div>
);

export default TotalStockpile;
