import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import {
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

const Stock = () => {
  const [stockList, setStockList] = useState(["loading"]);
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  // Table item count and last item id from db (State)
  const [listCount, setListCount] = useState("5");
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

  // Optional paramaters not needed in the useGetUserDetails hook
  const optionalParams = ["4", "8", "d", "7", "s", "w"];

  //Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** stock list variable to be to be used to update the table UI */
        let newTransformedPageData;

        await axios
          .get(`${BASE_API_URL}/api/v1/production/list-stock-entry.php`, {
            params: {
              count: "10",
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

                const user_name = subItem.user;
                const product = subItem.product;
                const production_id = subItem.id;
                const batch = subItem.batch;
                const total_qty_stocked = subItem.total_qty_stocked;
                const stocked_date = subItem.date_in;
                const stocked_time = subItem.time_in;
                const product_unit = subItem.unit;

                const currentRow = {
                  id: production_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: stocked_date,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: batch,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: stocked_time,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: user_name,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: product,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: total_qty_stocked,
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: product_unit,
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
                setStockList,
                setLastItemStore,
                Paginator,
                newTransformedPageData,
                currentRowData
              );
            }
          })
          .catch((error) => {
            let title = "Network Error",
              text = error;
            errorAlert(title, text);
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
  }, [userProductPermission, lastItemId]);

  // Update state values dynamically
  useEffect(() => {}, [
    stockList,
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

  /** Multipurpose success, error and warning pop-ups for handling and displaying errors, success and warning alerts */
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  /** stock List Table Data */
  const stockListTableData = {
    tableTitle: "Stock List",
    links: userProductPermission,
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Batch No" },
      { class: "", title: "Start Time" },
      { class: "", title: "User Name" },
      { class: "", title: "Product" },
      { class: "", title: "Qty pumped(cm³)" },
      { class: "", title: "Product Unit" },
    ],

    body: currentPage,
  };

  //Properties for handling pagination processes such as next and previous functions
  const footerProp = {
    currentPageNumber: currentPage?.id + 1,
    totalPageNumbers: stockList?.length,
    handleNextPagination: () =>
      handleNextPagination(
        stockList,
        currentPage,
        lastItemStore,
        setCurrentPage,
        setPersistentCurrentPage,
        setLastItemId
      ),
    handlePrevPagination: () =>
      handlePrevPagination(
        stockList,
        currentPage,
        setCurrentPage,
        setPersistentCurrentPage
      ),
  };

  /** stock list component display */
  const StockListComponent = () => (
    <CustomTableList
      content={stockListTableData}
      filler="No product stocked"
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
  );
  return <StockListComponent />;
};

export default Stock;
