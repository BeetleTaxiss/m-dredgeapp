import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import {
  functionUtils,
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
const ProductionList = () => {
  const [productionList, setProductionList] = useState(["loading"]);
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

  // Optional paramaters not needed in the useGetUserDetails hook
  const optionalParams = ["4", "8", "d", "7", "s", "w"];

  //Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for
  useGetUserDetails(...optionalParams, setUserPermissions);

  // Tracks if an item has been deleted from the table and sets it to true
  let newDataFetch = useRef(false);

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

  /** Axios call to fetch Production list and assign to productionList variable */
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      try {
        /** Fuel list variable to be to be used to update the table UI */
        let newTransformedPageData;
        await axios
          .get(`${BASE_API_URL}/api/v1/production/list.php`, {
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
              alert("Error from Axios block");
              let title = "Network Error",
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
                /** Get required response data values */
                const production_id = subItem?.id;
                const batch = subItem?.batch;
                const total_qty_pumped = subItem?.total_qty_pumped;
                const production_date = subItem?.production_date;
                const production_start_time = subItem?.start_time;
                const production_end_time = subItem?.end_time;
                const production_capacity = subItem?.production_capacity;
                const pumping_distance_in_meters =
                  subItem?.pumping_distance_in_meters;
                const production_completed = subItem?.completed;
                const duration_pumped_in_seconds =
                  subItem?.duration_pumped_in_seconds;

                const currentRow = {
                  id: production_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: production_date,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: batch,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: production_start_time,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: production_end_time,
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: total_qty_pumped,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center ",
                      item: production_capacity,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: functionUtils.addCommaToNumbers(
                        pumping_distance_in_meters
                      ),
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: duration_pumped_in_seconds,
                    },

                    {
                      class: "text-center",
                      itemClass:
                        production_completed === "0"
                          ? "shadow-none badge badge-warning"
                          : "shadow-none badge badge-success",
                      item:
                        production_completed === "0"
                          ? "In Progress"
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
                setProductionList,
                setLastItemStore,
                Paginator,
                newTransformedPageData,
                currentRowData
              );
              /** Required single response object to be concatenated to the production list array */
            }
          })
          .catch((error) => {
            let title = "Network Error",
              text = error;
            errorAlert(title, text);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          alert("Error from catch block");
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
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
    productionList,
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

  /** Multipurpose error pop-up for handling and displaying errors */
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };
  /** Production List Table Data */
  const productionListTableData = {
    tableTitle: "Production List",
    links: userProductPermission,
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Batch No" },
      { class: "", title: "Start Time" },
      { class: "", title: "End Time" },
      { class: "", title: "Qty pumped(cm³)" },
      { class: "", title: "Capacity(%)" },
      { class: "", title: "Distance(m)" },
      { class: "", title: "Duration(secs)" },
      { class: "text-center", title: "Status" },
    ],

    body: currentPage,
  };

  //Properties for handling pagination processes such as next and previous functions
  const footerProp = {
    currentPageNumber: currentPage?.id + 1,
    totalPageNumbers: productionList?.length,
    handleNextPagination: () =>
      handleNextPagination(
        productionList,
        currentPage,
        lastItemStore,
        setCurrentPage,
        setPersistentCurrentPage,
        setLastItemId
      ),
    handlePrevPagination: () =>
      handlePrevPagination(
        productionList,
        currentPage,
        setCurrentPage,
        setPersistentCurrentPage
      ),
  };

  /** Production list component display */
  const ProductionListComponent = () => (
    <CustomTableList
      content={productionListTableData}
      filler="No production sessions to report"
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

  return <ProductionListComponent />;
};

export default ProductionList;
