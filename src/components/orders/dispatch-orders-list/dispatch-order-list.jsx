import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import {
  errorAlert,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../../hooks/function-utils";

const DispatchOrderList = () => {
  const [bodyData, setBodyData] = useState(["loading"]);
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["d", "7", "d", "7", "s", "w"];

  /*
   * Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure   * delayed async fetch is accounted for
   */
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
   *  Get orders from DB
   */
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () =>
      await axios
        .get(`${BASE_API_URL}/api/v1/order/dispatch-list.php`, {
          params: {
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let body = [];

          res.data.data.map((item) => {
            const dispatchId = item.id;
            const orderId = item.order_id;
            const orderRef = item.order_ref;
            const date = item.date_in;
            const time = item.time_in;
            const product = item.product;
            const loaded = item.loaded;
            const inspected = item.inspected;
            const cleared = item.security;
            const processing = item.processing;

            const currentDispatch = {
              id: dispatchId,
              fields: [
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: date,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: time,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: product,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: orderRef,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass:
                    processing === "1"
                      ? "shadow-none badge badge-secondary"
                      : loaded === "0"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-primary",
                  item:
                    processing === "1"
                      ? "processing"
                      : loaded === "0"
                      ? "pending"
                      : "Loaded",
                  loaded: loaded,
                  processing: processing,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass:
                    inspected === "0"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-primary",
                  item: inspected === "0" ? "pending" : "Inspected",
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass:
                    cleared === "0"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-primary",
                  item: cleared === "0" ? "pending" : "Cleared",
                },
                {
                  orderId: orderId,
                  class: "text-center",
                  itemClass:
                    loaded && inspected && cleared === "0"
                      ? "shadow-none badge badge-warning"
                      : loaded && inspected === "0" && cleared === "1"
                      ? "shadow-none badge badge-warning"
                      : inspected && cleared === "0" && loaded === "1"
                      ? "shadow-none badge badge-warning"
                      : loaded && cleared === "0" && inspected === "1"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-success",
                  item:
                    loaded && inspected && cleared === "0"
                      ? "Not Completed"
                      : loaded && inspected === "0" && cleared === "1"
                      ? "Not Completed"
                      : inspected && cleared === "0" && loaded === "1"
                      ? "Not Completed"
                      : loaded && cleared === "0" && inspected === "1"
                      ? "Not Completed"
                      : "Completed",
                },
              ],
            };

            return (body = body.concat(currentDispatch));
          });
          setBodyData(body);
        })
        .catch((error) => {
          errorAlert("Network Error", error);
        });
    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [bodyData, userProductPermission]);

  const dispatchListData = {
    tableTitle: "Clearance List",
    links: userProductPermission,
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Time" },
      { class: "", title: "Product" },
      { class: "", title: "Order Ref" },
      { class: "", title: "Loaded" },
      { class: "", title: "Inspected" },
      { class: "", title: "Cleared" },
      { class: "text-center", title: "Status" },
    ],

    body: bodyData,
  };
  return (
    <>
      <CustomTableList
        content={dispatchListData}
        filler="No dispatched orders"
        dropdown
        change
      />
    </>
  );
};

export default DispatchOrderList;
