import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import {
  errorAlert,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../../hooks/function-utils";
import {
  handleNextPagination,
  handlePrevPagination,
  handleSearchList,
  PaginationManager,
  Paginator,
} from "../../../hooks/paginator";

const DispatchOrderList = () => {
  const [dispatchList, setDispatchList] = useState(["loading"]);
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  // Table item count and last item id from db (State)
  const [listCount, setListCount] = useState("10");
  const [lastItemStore, setLastItemStore] = useState("0");
  const [lastItemId, setLastItemId] = useState("0");

  // Table data in State
  const [rawData, setRawData] = useState();
  const [currentPage, setCurrentPage] = useState(["loading"]);
  const [persistentCurrentPage, setPersistentCurrentPage] = useState();

  // Search input value (State)
  const [searchBoxValue, setSearchBoxValue] = useState();

  // Tracks if an item has been deleted from the table and sets it to true
  let newDataFetch = useRef(false);

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

    const response = async () => {
      /** Dispatch order list variable to be to be used to update the table UI */
      let newTransformedPageData;

      await axios
        .get(`${BASE_API_URL}/api/v1/order/dispatch-list.php`, {
          params: {
            count: "50",
            "last-item-id": lastItemId,
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
            /**
             * Sets paginated data to custom table fields and values for table list rows
             * @param {object} subItem
             * @returns object
             */
            const currentRowData = (subItem) => {
              /** Get required response data values */

              const dispatchId = subItem.id;
              const orderId = subItem.order_id;
              const orderRef = subItem.order_ref;
              const date = subItem.date_in;
              const time = subItem.time_in;
              const product = subItem.product;
              const loaded = subItem.loaded;
              const inspected = subItem.inspected;
              const cleared = subItem.security;
              const processing = subItem.processing;

              const currentRow = {
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

              return currentRow;
            };

            /**
             * -----------------------------------------------------------
             * Handles pagination processes such as
             * - Updating table UI with pages
             * - Add new paginated data from DB request
             * - Update table UI when a list item is deleted
             * - Disables next and previous buttons when no data is fetched from DB
             * ------------------------------------------------------------
             */
            PaginationManager(
              res,
              rawData,
              newDataFetch,
              listCount,
              lastItemId,
              currentPage,
              setRawData,
              setCurrentPage,
              setPersistentCurrentPage,
              setDispatchList,
              setLastItemStore,
              Paginator,
              newTransformedPageData,
              currentRowData
            );
          }
        })
        .catch((error) => {
          errorAlert("Network Error", error);
        });
    };

    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [userProductPermission, lastItemId]);

  // Update state values dynamically
  useEffect(() => {}, [
    dispatchList,
    currentPage,
    persistentCurrentPage,
    rawData,
    lastItemStore,
    newDataFetch,
  ]);

  //This ensures the search input field is focused when it has a value
  useEffect(() => {
    if (document.getElementById("page-filter") !== null) {
      document.getElementById("page-filter").focus();
    }
  }, [searchBoxValue]);

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

    body: currentPage,
  };

  //Properties for handling pagination processes such as next and previous functions
  const footerProp = {
    currentPageNumber: currentPage?.id + 1,
    totalPageNumbers: dispatchList?.length,
    handleNextPagination: () =>
      handleNextPagination(
        dispatchList,
        currentPage,
        lastItemStore,
        setCurrentPage,
        setPersistentCurrentPage,
        setLastItemId
      ),
    handlePrevPagination: () =>
      handlePrevPagination(
        dispatchList,
        currentPage,
        setCurrentPage,
        setPersistentCurrentPage
      ),
  };

  return (
    <>
      <CustomTableList
        content={dispatchListData}
        filler="No dispatched orders"
        searchBoxValue={searchBoxValue}
        handleSearchList={() => {
          handleSearchList(
            persistentCurrentPage,
            setCurrentPage,
            setSearchBoxValue
          );
        }}
        dropdown
        change
        search
        footer
        {...footerProp}
      />
    </>
  );
};

export default DispatchOrderList;
