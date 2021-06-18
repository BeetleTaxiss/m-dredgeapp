import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../hooks/API";
import ViewordersTablehead from "./vieworders-tablehead";
import ViewordersTableBody from "./vieworders-body";
import ViewordersTablefooter from "./vieworders-tablefooter";
import ViewordersSearchbar from "./vieworders-searchbar";
import ViewordersTablepaiginaition from "../../general/custom-table-paiginaition";
import "./vieworders.scss";
import {
  errorAlert,
  functionUtils,
  productDropdownForTable,
  validateProductLocationPermission,
} from "../../../hooks/function-utils";
import { useGetUserDetails } from "../../../hooks/function-utils";
import WidgetHeader from "../../general/widget-header";
/**
 * Orders List Data object which is divided into table header, body and footer properties
 */
const viewOrdersData = {
  tableHeader: [
    {
      text: "Date",
      className: "sorting",
      ariaLabel: "Start date: activate to sort column ascending",
      // ariaSort: "descending",
      width: "81px",
    },
    {
      text: "Truck No",
      className: "sorting",
      ariaLabel: "Name: activate to sort column ascending",
      // ariaSort: "descending",
      width: "110px",
    },
    {
      text: "Order size",
      className: "sorting",
      ariaLabel: "Position: activate to sort column ascending",
      // ariaSort: "descending",
      width: "87px",
    },
    {
      text: "Order cost",
      className: "sorting",
      ariaLabel: "Office: activate to sort column ascending",
      // ariaSort: "descending",
      width: "78px",
    },
    {
      text: "Order Volume",
      className: "sorting_desc",
      ariaLabel: "Age: activate to sort column ascending",
      ariaSort: "descending",
      width: "31px",
    },

    {
      text: "Order Ref",
      className: "sorting",
      ariaLabel: "Salary: activate to sort column ascending",
      // ariaSort: "descending",
      width: "52px",
    },
    {
      text: "Action",
      className: "text-center dt-no-sorting sorting",
      ariaLabel: "Action: activate to sort column ascending",
      // ariaSort: "descending",
      width: "68px",
    },
  ],
  tableFooter: [
    "Date",
    "Truck No",
    "Order size",
    "Order cost",
    "Order Volume",
    "Order Ref",
  ],
};
const ViewOrders = () => {
  const [ordersList, setOrdersList] = useState();
  const [rawData, setRawData] = useState();
  const [currentPageArray, setCurrentPageArray] = useState();
  const [persistentCurrentPage, setPersistentCurrentPage] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [listCount, setListCount] = useState("10");
  const [lastItemStore, setLastItemStore] = useState("0");
  const [lastItemId, setLastItemId] = useState("0");
  // const [products, setProducts] = useState();
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["d", "7", "s", "w"];

  /*
   * Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure   * delayed async fetch is accounted for
   */
  useGetUserDetails(
    setUserName,
    setUserId,
    ...optionalParams,
    setUserPermissions
  );

  // console.log("Product Id: ", productId);
  /**
   * use this state value to check when we have added or updated data and need to refresh
   * it work by concatenating  `true` to the array when we need to refresh
   * */
  const [refreshData, setRefreshData] = useState([]);
  let newDataFetch = useRef(false);

  const resetFetchStatus = () => {
    newDataFetch.current = false;
  };
  // console.log("fetch status: ", newDataFetch.current);

  /**
   *  an helper function to always refresh the page
   * */
  const reloadServerData = () => {
    newDataFetch.current = true;

    /** refresh the page so we can newly added users */
    setRefreshData(refreshData.concat(true));

    // alert("Reloaded");
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
              setProductId,
              setLastItemId
            );

            // console.log(
            //   "Table dropdown: ",
            //   tableDropdown,
            //   validatedProductData
            // );
            setUserProductPermission(tableDropdown);

            /**
             * "Select Product" option is added to product list to set it as the initial option a user views
             */
            validatedProductData?.unshift({
              id: "0",
              product: "Select Product",
              price: 0,
              validation: "Can't select this option",
            });

            /**
             * Set the data to state for the product dropdown
             */
            // setProducts(validatedProductData);
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, [userPermissions, productId]);

  /**
   * Fetch orders from DB
   */
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      await axios
        .get(`${BASE_API_URL}/api/v1/order/list.php`, {
          params: {
            count: "50",
            "last-item-id": lastItemId,
            // "select-all": 1,
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          if (res.data.error === true) {
            errorAlert("Server Error", res.data.message);
          } else {
            /**
             * Fetch New data from DB to be used for pagination, add username and userId properties to enable use when handling deleting, updating and dispatch functions.
             *
             * Also set old data to raw data, to ensure we can add new data to old data for extending paginated pages if last item id and new data is available
             *
             * Inititate a parentArray variable which will take the returned value of the converted parent pagination array
             */
            let data = res.data.data;
            // console.log("New data: ", data);

            let oldData = rawData;
            // data["userName"] = userName;
            // data["userId"] = userId;
            let parentArray;

            /**
             * The code block below is divided into three parts/functionalities depending on usecase
             *
             * 1) The first block checks if there is old data and axios fetch returns new data to be added to the old data.
             *
             * 2) The second block checks if there is no new data returned from the axios call and the last item id is null. If is, Next button is disabled for users.
             *
             * 3) The third block runs on initial page load, sets the current page, the current data to old data/raw data and last item id to state.
             */
            if (
              res.data.message !== "No order found" &&
              (data !== null || data !== undefined) &&
              Array.isArray(rawData) &&
              lastItemId !== "0" &&
              newDataFetch.current === false
            ) {
              newDataFetch.current = false;
              /**
               * New data fetch is added to old data and cloned back to the data object to be passed to the handle parent pagination utility function
               */
              // console.log("New data");
              oldData = oldData.concat(data);
              data = [...oldData];
              /**
               * Utility - creates paginated pages for transversing
               */
              // console.log("Check: ", newDataFetch.current);
              parentArray = handleParentPaginationArray(data);

              // console.log("Last id before page no: ", lastItemId);
              // console.log("Check after: ", newDataFetch.current);
              /**
               * Sets currrent page by retriving new paginated parent array, adding an extra integer to the page id/number and setting new page data to state
               */
              let newPageNumber = currentPageArray?.id + 1;
              setCurrentPageArray({
                id: newPageNumber,
                page: parentArray[newPageNumber],
              });
              setPersistentCurrentPage({
                id: newPageNumber,
                page: parentArray[newPageNumber],
              });
              /**
               *  Side effects to ensure data is returned in a loop for next use
               */
              setOrdersList(parentArray);
              setLastItemStore(res.data["last-item-id"]);
              setRawData(data);
              /**
               * Enables the disabled Next Button incase new data is required to be fetched
               */
              if (document.getElementById("default-ordering_next") !== null) {
                document.getElementById("default-ordering_next").className =
                  "paginate_button page-item next";
              }
              // console.log("Last id before alert: ", lastItemId);
              // alert("Fired 1");
            } else if (newDataFetch.current === true) {
              /**
               * Sets currrent page by retriving new paginated parent array, adding an extra integer to the page id/number and setting new page data to state
               */
              // console.log("Order dataL: ", data);
              let orderData = functionUtils.fetchStatus();

              let persistentPage = [...currentPageArray?.page];

              persistentPage = persistentPage.filter(
                (item) =>
                  item.id !== orderData.orderId ||
                  item.order_ref !== orderData.orderRef
              );

              // console.log(
              //   "New Ui: ",
              //   persistentPage,
              //   orderData.orderId,
              //   orderData.orderRef
              // );
              setCurrentPageArray({
                id: currentPageArray?.id,
                page: persistentPage,
              });
              setPersistentCurrentPage({
                id: currentPageArray?.id,
                page: persistentPage,
              });

              setOrdersList((state) => [
                ...state,
                (state[currentPageArray?.id] = persistentPage),
              ]);

              // setOrdersList((state) => {
              //   const stateClone = [...state];
              //   console.log("State clone before delete: ", stateClone);
              //   stateClone[currentPageArray?.id] = persistentPage;
              //   console.log("State clone: ", stateClone);
              //   return stateClone;
              // });

              // alert("Fired 2");
            } else if (res.data.message === "No order found") {
              /**
               * Disables the enabled Next Button as new data is not available for fetching.
               */
              if (document.getElementById("default-ordering_next") !== null) {
                document.getElementById("default-ordering_next").className +=
                  " disabled";
              }
              // alert("Fired 3");
            } else {
              /**
               * Utility - creates paginated pages for transversing
               */
              // console.log("BeginningL: ", data);
              parentArray = handleParentPaginationArray(data);
              // console.log("BeginningL: ", parentArray);
              /**
               * Enables the disabled Next Button incase new data is required to be fetched
               */
              if (
                data?.length < 11 &&
                document.getElementById("default-ordering_next") !== null
              ) {
                document.getElementById("default-ordering_next").className +=
                  " disabled";
              } else {
                if (document.getElementById("default-ordering_next") !== null) {
                  document.getElementById("default-ordering_next").className =
                    "paginate_button page-item next";
                }
              }

              /**
               *  Side effects to ensure data is returned in a loop for next use
               */
              setOrdersList(parentArray);
              setCurrentPageArray({ id: 0, page: parentArray[0] });
              setPersistentCurrentPage({ id: 0, page: parentArray[0] });
              setLastItemStore(res.data["last-item-id"]);
              setRawData(data);

              // console.log("Last id initial run: ", lastItemId);
              // alert("Fired 4");
            }
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
  }, [listCount, lastItemId, userProductPermission, refreshData]);

  useEffect(() => {}, [
    userName,
    userId,
    currentPageArray,
    persistentCurrentPage,
    rawData,
    lastItemStore,
    newDataFetch,
  ]);

  // console.log("Last id outside: ", lastItemId);
  /**
   * Handle parent pagination array and children array creation
   */
  const handleParentPaginationArray = (data) => {
    /**
     * When data items exceed ten in number, divide the total number by list count value/state and arrange results in a parent array
     */
    // let dataItemsReminder = data.length % listCount;
    let listCountValue = data.length / listCount;
    let subListCount = parseInt(listCount);
    let parentPaginationArray = [];

    /**
     * Check if data items fetched is less than Ten in number, then take no further action
     */
    if (data?.length < 7 || data?.length < 10) {
      parentPaginationArray[0] = data;
      // alert("Less than 10");
    } else {
      /**
       * Utility functions to check for integers and floats
       * @param {num} num
       * @returns num
       */
      const isInteger = (num) => {
        if (isNaN(num) === false && num % 1 === 0) {
          return num;
        } else {
          return "Not an Integer";
        }
      };
      const isFloat = (num) => {
        if (isNaN(num) === false && num % 1 !== 0) {
          return num;
        } else {
          return "Not a Float";
        }
      };
      /**
       * Call utility functions
       */
      const arrayLengthInt = isInteger(listCountValue);
      const arrayLengthFloat = isFloat(listCountValue);

      /**
       * Check if the length of the data array can be divided without a reminder then populate the parent pagination array with the data values in children arrays
       */
      if (typeof arrayLengthInt === "number") {
        for (let i = 0; i < data.length; i += subListCount) {
          parentPaginationArray.push(data.slice(i, i + subListCount));
          // alert("Integer");
        }
      }
      /**
       * Check if the length of the data array will be divided with a reminder then populate the parent pagination array with the data values in children arrays
       */
      if (typeof arrayLengthFloat === "number") {
        for (let i = 0; i < data.length; i += subListCount) {
          parentPaginationArray.push(data.slice(i, i + subListCount));
          // alert("Float");
        }
      }
    }
    return parentPaginationArray;
  };

  /**
   * Next functionality that takes the parent data array, current page and last item id.
   * Parent data array is looped over and a new current page is created from the index of the parent data array by adding one (1) to its bracket notation
   * @param {data} data
   * @param {currentPage} currentPage
   * @param {lastItemStore} lastItemStore
   */
  const handleNextPagination = (data, currentPage, lastItemStore) => {
    /**
     * Set changing page number to a variable. Ensure not to use a constant here!!.
     */
    let pageNumber = currentPage?.id;
    /**
     * Loop over parent data array and add one (1) to the index number in the bracket notation to access a new sub/child array, also increment page number value by one (1)
     */
    for (let i = 0; i < data.length - 1; i++) {
      /**
       * Checks to match the index of the parent data array to the page number for incrementation
       */
      if (pageNumber === i) {
        /**
         * Set new current page to state
         */

        setCurrentPageArray({
          id: pageNumber + 1,
          page: data[pageNumber + 1],
        });
        setPersistentCurrentPage({
          id: pageNumber + 1,
          page: data[pageNumber + 1],
        });
      } else if (data.length === pageNumber + 1) {
        /**
         * Reset newDataFetch to false to enable adding of new data if any
         */
        resetFetchStatus();
        /**
         * At Last paginated page - check if pageNumber is greater than parent data array and fetch new data if any by setting a new last item id (The id set in lastItemStore when first axios call was made)
         */
        if (lastItemStore !== undefined || lastItemStore !== null) {
          setLastItemId(lastItemStore);
        }
      }
    }
  };

  /**
   * Previous functionality- Decrement paginated page already set to state by decreasing index value in bracket notion of parent data array
   * @param {data} data
   * @param {currentPage} currentPage
   */
  const handlePrevPagination = (data, currentPage) => {
    /**
     * When the next button has been disabled on the last page, the block ensures that if on a previous page after immediately after visiting the last page with no new data values, the next button will still be functional for moving to and from previous paginated pages.
     */
    if (document.getElementById("default-ordering_next") !== null) {
      document.getElementById("default-ordering_next").className ===
      "paginate_button page-item next disabled"
        ? (document.getElementById("default-ordering_next").className =
            "paginate_button page-item next")
        : (document.getElementById("default-ordering_next").className =
            "paginate_button page-item next");
    }
    /**
     * Retrive the current page number by getting the page id in state
     */
    let pageNumber = currentPage?.id;
    /**
     * Loop over parent data array and decrement the page number and index value of the parent array when not on the first page
     */
    for (let i = 0; i < data.length; i++) {
      if (pageNumber === i && i !== 0) {
        setCurrentPageArray({
          id: pageNumber - 1,
          page: data[pageNumber - 1],
        });
        setPersistentCurrentPage({
          id: pageNumber - 1,
          page: data[pageNumber - 1],
        });
      } else {
        /**
         * When the page is on the first page, remove previous functionality and disable previous button.
         */
        console.log("Previous Page limit reached");
      }
    }
  };

  /**
   * handles current page filtering and searching of data using a persistent page state
   * @param {persistentCurrentPageArray} persistentCurrentPageArray
   */
  const handleSearchList = (persistentCurrentPage) => {
    /**
     * Set the current page data from the persistent state to a variable
     */
    const currentPage = persistentCurrentPage?.page;

    /**
     * Get value of search value and add it to a dynamic regex function which looks for similar case insensitive values globally when tested
     */
    let searchValue;
    if (document.getElementById("page-filter") !== null) {
      searchValue = document.getElementById("page-filter").value;
    }
    const searchRegex = new RegExp(searchValue, "ig");

    /**
     * filter current page data by testing for similar values in the date, qty, reference, total price, total volume and truck number
     */
    const filteredPage = currentPage.filter(
      (item) =>
        item.order_ref == searchValue ||
        searchRegex.test(item.order_ref) ||
        item.qty == searchValue ||
        searchRegex.test(item.qty) ||
        item.total_price == searchValue ||
        searchRegex.test(item.total_price) ||
        item.date_in == searchValue ||
        searchRegex.test(item.date_in) ||
        item.total_volume == searchValue ||
        searchRegex.test(item.truck_no) ||
        item.truck_no == searchValue
    );

    /**
     * Set current page view based on the values gotten from the filtered page
     */
    if (filteredPage.length <= 0) {
      setCurrentPageArray((state) => ({ ...state, page: currentPage }));
    } else {
      setCurrentPageArray((state) => ({ ...state, page: filteredPage }));
    }
  };

  /**
   *  Widget Header for table dropdown to be passed as a property to the Search bar component
   */
  const TableDropdown = () => (
    <WidgetHeader links={userProductPermission} dropdown change />
  );
  return (
    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
      <div className="widget-content widget-content-area br-6">
        <div
          id="default-ordering_wrapper"
          className="dataTables_wrapper container-fluid dt-bootstrap4"
        >
          {/* BEGINNING OF VIEW ORDERS SEARCH BAR */}
          <ViewordersSearchbar
            handleSearchList={() => handleSearchList(persistentCurrentPage)}
            TableDropdown={TableDropdown}
          />
          {/* END OF VIEW ORDERS SEARCH BAR */}

          <div className="table-responsive">
            <table
              id="default-ordering"
              className="table table-hover dataTable"
              style={{ width: "100%" }}
              role="grid"
              aria-describedby="default-ordering_info"
            >
              {/* BEGINNING OF VIEW ORDERS TABLE HEADER */}
              <ViewordersTablehead content={viewOrdersData.tableHeader} />
              {/* END OF VIEW ORDERS TABLE HEADER */}
              {/* BEGINNING OF VIEW ORDERS TABLE BODY */}
              <ViewordersTableBody
                content={currentPageArray?.page}
                reloadData={() => reloadServerData()}
                userName={userName}
                userId={userId}
              />
              {/* END OF VIEW ORDERS TABLE BODY */}
              {/* BEGINNING OF VIEW ORDERS TABLE FOOTER*/}
              <ViewordersTablefooter content={viewOrdersData.tableFooter} />
              {/* END OF VIEW ORDERS TABLE FOOTER*/}
            </table>
          </div>
          {/* BEGINNING OF VIEW ORDERS TABLE PAGINAITION*/}
          <ViewordersTablepaiginaition
            currentPageNumber={currentPageArray?.id + 1}
            totalPageNumbers={ordersList?.length}
            handleNextPagination={() =>
              handleNextPagination(ordersList, currentPageArray, lastItemStore)
            }
            handlePrevPagination={() =>
              handlePrevPagination(ordersList, currentPageArray)
            }
          />
          {/* END OF VIEW ORDERS TABLE PAGINAITION*/}
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
