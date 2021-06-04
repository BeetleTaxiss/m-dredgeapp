import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";

const FuelUpdateList = () => {
  const [fuelUpdateList, setFuelUpdateList] = useState(["loading"]);
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["4", "8", "d", "7", "s", "w"];

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(...optionalParams, setUserPermissions);

  /**
   * Fetch Product list from database and validate per user
   */
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
   * Fetch Issued Fuel sessions from DB
   */
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** Fuel list to be appended to */
        let fuelUpdateListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/operations/fuel-update-list.php`, {
            params: {
              "product-id":
                productId === undefined && userProductPermission !== undefined
                  ? userProductPermission[0]?.id
                  : productId,
            },
          })
          .then((res) => {
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const fuelUpdateItems = res.data.data;
              fuelUpdateItems.reverse().map((item) => {
                /** Get required response data values */
                const fuel_update_user = item?.user;
                const fuel_update_user_id = item?.user_id;
                const fuel_update_id = item?.id;
                const supplier = item?.supplier;
                const supplier_id = item?.supplier_id;
                const amount = item?.amount;
                const fuel_update_date = item?.date_in;
                const fuel_update_time = item?.time_in;
                const qty_stocked = item?.qty_stocked;

                const currentFuelUpdateItem = {
                  id: fuel_update_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_update_date,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_update_time,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: functionUtils.addCommaToNumbers(amount),
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_update_user,
                    },

                    // {
                    //   class: "text-left",
                    //   itemClass: "text-center",
                    //   item: supplier,
                    // },
                    {
                      class: "text-left",
                      itemClass: `text-center ${
                        amount === "down"
                          ? "shadow-none badge badge-warning"
                          : "shadow-none badge badge-success"
                      }`,
                      item: functionUtils.addCommaToNumbers(qty_stocked),
                    },
                  ],
                };

                return (fuelUpdateListBody = fuelUpdateListBody.concat(
                  currentFuelUpdateItem
                ));
              });
              setFuelUpdateList(fuelUpdateListBody);
            }
          })
          .catch((error) => {
            errorAlert("Network Error", error);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Axios error: ", error);
        } else {
          throw error;
        }
      }
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

  /** Fuel List Table Data */
  const fuelUpdateListTableData = {
    tableTitle: "Fuel Update List",
    links: userProductPermission,
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Time" },
      { class: "", title: "Amount" },
      { class: "", title: "Stocker" },
      // { class: "", title: "Supplier" },
      { class: "", title: "Qty Added" },
    ],

    body: fuelUpdateList,
  };

  /** Fuel list component display */
  const FuelListComponent = () => (
    <CustomTableList
      content={fuelUpdateListTableData}
      filler="Your Updated Fuel list is empty"
      dropdown
      change
    />
  );
  return <FuelListComponent />;
};

export default FuelUpdateList;
