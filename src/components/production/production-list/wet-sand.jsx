import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import moment from "moment";
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

const WetSand = () => {
  const [wetsandList, setWetSandList] = useState(["loading"]);

  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
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
  const optionalParams = ["d", "7", "s", "w"];

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(
    setUserName,
    setUserId,
    ...optionalParams,
    setUserPermissions
  );

  /**
   * use this state value to check when we have addeed or updated data and need to refresh
   * it work by concatenating  `true` to the array when we need to refresh
   * */
  const [refreshData, setRefreshData] = useState([]);

  /**
   *  an helper function to always refresh the page
   * */
  const reloadServerData = () => {
    /** refresh the page so we can newly added users */
    setRefreshData(refreshData.concat(true));
  };

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
        /** Wet sand list to be appended to */
        /** Fuel list variable to be to be used to update the table UI */
        let newTransformedPageData;

        await axios
          .get(`${BASE_API_URL}/api/v1/production/list.php`, {
            params: {
              completed: "1",
              stockpiled: "0",
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
                const duration_pumped_in_seconds =
                  subItem?.duration_pumped_in_seconds;
                /** Logic to get pumped quantity which is ready tobe stockpiled */
                const date_in = subItem?.date_in;
                const new_date = moment().format("DD/MM/YYYY");
                let stockpileReady = new_date > date_in ? true : false;

                /** to stockpile API data */
                const toStockpileData = {
                  "user-id": parseInt(userId),
                  user: userName,
                  "production-id": production_id,
                  "batch-no": batch,
                };

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
                      itemClass: `text-center ${
                        stockpileReady === true &&
                        "shadow-none badge badge-success"
                      }`,
                      item: total_qty_pumped,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
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
                      itemClass: "btn btn-primary",
                      stockpileReady: stockpileReady,
                      toStockpile: toStockpileData,
                      warningAlert: () =>
                        warningAlert(
                          "Are you sure you want to Stockpile this wet sand ?",
                          toStockpileData
                        ),
                      warningAlertFalse: () =>
                        warningAlertFalse("Not yet ready for stockpile"),

                      link: true,
                      linkText: "Stockpile",
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
                setWetSandList,
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
  }, [userName, userId, userProductPermission, lastItemId, refreshData]);

  // Update state values dynamically
  useEffect(() => {}, [
    wetsandList,
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
  const successAlert = (title, text, link) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      footer: link,
      showConfirmButton: false,
    });
  };
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  const warningAlert = (title, toStockpile) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        handleStockpile(toStockpile);
      }
    });
  };
  const warningAlertFalse = (title) => {
    Swal.fire({
      icon: "warning",
      title: title,
    });
  };
  /** Handle stockpile function which moves the wet sand over to the stockpile list after drying has taken place */
  const handleStockpile = (toStockpile) => {
    axios
      .post(`${BASE_API_URL}/api/v1/production/stockpile.php`, toStockpile)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "Stockpiled Successfully",
            text = res.data.message,
            link = `<a href="/wetsand"> View Wet sand list</a>`;
          successAlert(title, text, link);
          reloadServerData();
        }
      })
      .catch((error) => {
        let title = "Network Error",
          text = error;
        errorAlert(title, text);
      });
  };
  /** Wet sand List Table Data */
  const wetsandListTableData = {
    tableTitle: "Wet Sand List",
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
      { class: "", title: "" },
    ],

    body: currentPage,
  };

  //Properties for handling pagination processes such as next and previous functions
  const footerProp = {
    currentPageNumber: currentPage?.id + 1,
    totalPageNumbers: wetsandList?.length,
    handleNextPagination: () =>
      handleNextPagination(
        wetsandList,
        currentPage,
        lastItemStore,
        setCurrentPage,
        setPersistentCurrentPage,
        setLastItemId
      ),
    handlePrevPagination: () =>
      handlePrevPagination(
        wetsandList,
        currentPage,
        setCurrentPage,
        setPersistentCurrentPage
      ),
  };

  /** Wet sand list component display */
  const WetSandListComponent = () => (
    <CustomTableList
      content={wetsandListTableData}
      filler="No production sessions"
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
  return <WetSandListComponent />;
};

export default WetSand;
