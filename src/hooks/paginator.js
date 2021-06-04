import WidgetHeader from "../components/general/widget-header";
import { functionUtils } from "./function-utils";

/**
 *
 * Utility functions
 */
const resetFetchStatus = (newDataFetch) => {
  if (typeof newDataFetch !== "undefined") {
    newDataFetch.current = newDataFetch && false;
  }
};

/**
 *  an helper function to always refresh the page
 * */
const reloadServerData = (newDataFetch, refreshData, setRefreshData) => {
  newDataFetch.current = true;

  /** refresh the page so we can newly added users */
  setRefreshData(refreshData.concat(true));

  // alert("Reloaded");
};

/**
 *  Widget Header for table dropdown to be passed as a property to the Search bar component
 */
export const TableDropdown = (userProductPermission) => (
  <WidgetHeader links={userProductPermission} dropdown change />
);

/**-------------------------------------------------------------------
 *
 * @param {*} res
 * @param {*} rawData
 * @param {*} newDataFetch
 * @param {*} lastItemId
 * @param {*} currentPageArray
 * @param {*} setRawData
 * @param {*} setCurrentPageArray
 * @param {*} setPersistentCurrentPage
 * @param {*} setOrdersList
 * @param {*} setLastItemStore
 * @param {*} handleParentPaginationArray
 * ---------------------------------------------------------------------
 */

export const handleUpdatePaginatedUI = (
  res,
  rawData,
  newDataFetch,
  listCount,
  lastItemId,
  currentPageArray,
  setRawData,
  setCurrentPageArray,
  setPersistentCurrentPage,
  setOrdersList,
  setLastItemStore,
  handleParentPaginationArray,
  fuelIssueListBody,
  paginatedDataForUpdatingUI
) => {
  /**
   * Fetch New data from DB to be used for pagination, add username and userId properties to enable use when handling deleting, updating and dispatch functions.
   *
   * Also set old data to raw data, to ensure we can add new data to old data for extending paginated pages if last item id and new data is available
   *
   * Inititate a parentArray variable which will take the returned value of the converted parent pagination array
   */
  let data = res?.data.data;
  console.log("New data from main component: ", data);

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
    console.log("New data");
    oldData = oldData.concat(data);
    data = [...oldData];
    /**
     * Utility - creates paginated pages for transversing
     */
    console.log("Check: ", newDataFetch.current);
    parentArray = handleParentPaginationArray(data);

    let pageData;
    typeof paginatedDataForUpdatingUI === "function" &&
      (pageData = paginatedDataForUpdatingUI(parentArray, fuelIssueListBody));

    console.log("Beginning Paginated: ", parentArray);
    console.log("Paginated pages: ", pageData);

    console.log("Last id before page no: ", lastItemId);
    console.log("Check after: ", newDataFetch.current);
    /**
     * Sets currrent page by retriving new paginated parent array, adding an extra integer to the page id/number and setting new page data to state
     */
    let newPageNumber = currentPageArray?.id + 1;
    setCurrentPageArray({
      id: newPageNumber,
      page: pageData[newPageNumber],
    });
    setPersistentCurrentPage({
      id: newPageNumber,
      page: pageData[newPageNumber],
    });
    /**
     *  Side effects to ensure data is returned in a loop for next use
     */
    setOrdersList(pageData);
    setLastItemStore(res.data["last-item-id"]);
    setRawData(data);
    /**
     * Enables the disabled Next Button incase new data is required to be fetched
     */
    if (document.getElementById("default-ordering_next") !== null) {
      document.getElementById("default-ordering_next").className =
        "paginate_button page-item next";
    }
    console.log("Last id before alert: ", lastItemId);
    // alert("Fired 1");
  } else if (newDataFetch.current === true) {
    /**
     * Sets currrent page by retriving new paginated parent array, adding an extra integer to the page id/number and setting new page data to state
     */
    console.log("Order dataL: ", data);
    let orderData = functionUtils.fetchStatus();

    let persistentPage = [...currentPageArray?.page];

    persistentPage = persistentPage.filter(
      (item) =>
        item.id !== orderData.orderId || item.order_ref !== orderData.orderRef
    );

    console.log(
      "New Ui: ",
      persistentPage,
      orderData.orderId,
      orderData.orderRef
    );
    setCurrentPageArray({
      id: currentPageArray?.id,
      page: persistentPage,
    });
    setPersistentCurrentPage({
      id: currentPageArray?.id,
      page: persistentPage,
    });

    // alert("Fired 2");
  } else if (res.data.message === "No order found") {
    /**
     * Disables the enabled Next Button as new data is not available for fetching.
     */
    if (document.getElementById("default-ordering_next") !== null) {
      document.getElementById("default-ordering_next").className += " disabled";
    }
    // alert("Fired 3");
  } else {
    /**
     * Utility - creates paginated pages for transversing
     */
    console.log("BeginningL: ", data);
    parentArray = handleParentPaginationArray(data, listCount);
    let pageData;
    typeof paginatedDataForUpdatingUI === "function" &&
      (pageData = paginatedDataForUpdatingUI(parentArray, fuelIssueListBody));

    console.log("Beginning Paginated: ", parentArray);
    console.log("Paginated pages: ", pageData);
    /**
     * Enables the disabled Next Button incase new data is required to be fetched
     */
    if (
      data?.length < 11 &&
      document.getElementById("default-ordering_next") !== null
    ) {
      document.getElementById("default-ordering_next").className += " disabled";
    } else {
      if (document.getElementById("default-ordering_next") !== null) {
        document.getElementById("default-ordering_next").className =
          "paginate_button page-item next";
      }
    }

    /**
     *  Side effects to ensure data is returned in a loop for next use
     */
    setOrdersList(pageData);
    setCurrentPageArray({ id: 0, page: pageData[0] });
    setPersistentCurrentPage({ id: 0, page: pageData[0] });
    setLastItemStore(res.data["last-item-id"]);
    setRawData(data);

    console.log("Last id initial run: ", lastItemId);
    // alert("Fired 4");
  }
};

/**-------------------------------------------------------------------
 * Handle parent pagination array and children array creation
 * -------------------------------------------------------------------
 */
export const handleParentPaginationArray = (data, listCount) => {
  /**
   * When data items exceed ten in number, divide the total number by list count value/state and arrange results in a parent array
   */
  let listCountValue = data.length / listCount;
  let subListCount = parseInt(listCount);
  let parentPaginationArray = [];

  /**
   * Check if data items fetched is less than Ten in number, then take no further action
   */
  if (data?.length < 7 || data?.length < 10) {
    parentPaginationArray[0] = data;
    // alert("Less than 10");
    return parentPaginationArray;
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
      return parentPaginationArray;
    }
    /**
     * Check if the length of the data array will be divided with a reminder then populate the parent pagination array with the data values in children arrays
     */
    if (typeof arrayLengthFloat === "number") {
      for (let i = 0; i < data.length; i += subListCount) {
        parentPaginationArray.push(data.slice(i, i + subListCount));
        // alert("Float");
      }
      return parentPaginationArray;
    }
  }
  // return parentPaginationArray;
};

/**--------------------------------------------------------------------------
 * Next functionality that takes the parent data array, current page and last item id.
 * Parent data array is looped over and a new current page is created from the index of the parent data array by adding one (1) to its bracket notation
 * @param {data} data
 * @param {currentPage} currentPage
 * @param {lastItemStore} lastItemStore
 * ---------------------------------------------------------------------------
 */
export const handleNextPagination = (
  data,
  currentPage,
  lastItemStore,
  setCurrentPageArray,
  setPersistentCurrentPage,
  setLastItemId
) => {
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

/**-------------------------------------------------------------------------------------
 * Previous functionality- Decrement paginated page already set to state by decreasing index value in bracket notion of parent data array
 * @param {data} data
 * @param {currentPage} currentPage
 * @param {setCurrentPageArray} setCurrentPageArray
 * @param {setPersistentCurrentPage} setPersistentCurrentPage
 * -------------------------------------------------------------------------------------
 */
export const handlePrevPagination = (
  data,
  currentPage,
  setCurrentPageArray,
  setPersistentCurrentPage
) => {
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

/**-----------------------------------------------------------------------------
 * handles current page filtering and searching of data using a persistent page state
 * @param {persistentCurrentPage} persistentCurrentPage
 * @param {setCurrentPageArray} setCurrentPageArray
 * ------------------------------------------------------------------------------
 */
export const handleSearchList = (
  persistentCurrentPage,
  setCurrentPageArray,
  setSearchBoxValue,
  searchFields
) => {
  console.log("search functionalities: ", persistentCurrentPage);
  console.log("search functionalities: ", setCurrentPageArray);
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
    setSearchBoxValue(searchValue);
    document.getElementById("page-filter").focus();
    console.log("value: ", searchValue);
  }
  const searchRegex = new RegExp(searchValue, "ig");

  /**
   * filter current page data by testing for similar values in the date, qty, reference, total price, total volume and truck number
   */

  // let filteredPage;
  const customFilter = () => {
    let rows = [];
    currentPage?.map((item) => {
      item.fields.map((field) => {
        if (searchValue == "" || searchValue.length == 0) {
          rows = [];
        } else if (searchRegex.test(field.item) || field.item == searchValue) {
          // let check = item.id == rows[0]?.id;
          // console.log("check item: ", item.id);
          // console.log("check array: ", rows[0]?.id);
          // console.log("check: ", check);
          rows = rows.map((row) => {
            let check = item.id == row.id;
            if (check) {
              console.log("row check: ", row);
              return (rows = []);
            } else {
              return (rows = rows.concat(item));
            }
          });
          console.log("Main Rows: ");
        }
      });
    });
    return rows;
  };

  const filteredPage = customFilter();
  /**
   * Set current page view based on the values gotten from the filtered page
   */
  // if (filteredPage.length <= 0) {
  //   setCurrentPageArray((state) => ({
  //     ...state,
  //     page: currentPage,
  //   }));
  //   // alert("Fired 1");
  // } else {
  //   setCurrentPageArray((state) => ({
  //     ...state,
  //     page: filteredPage,
  //   }));
  // }
  if (filteredPage.length <= 0) {
    setCurrentPageArray({
      id: persistentCurrentPage?.id,
      page: currentPage,
    });
    // alert("Fired 1");
  } else {
    setCurrentPageArray({
      id: persistentCurrentPage?.id,
      page: filteredPage,
    });
    console.log("pagessss filtered: ", filteredPage, persistentCurrentPage?.id);
    // alert("Fired 2");
  }
};
