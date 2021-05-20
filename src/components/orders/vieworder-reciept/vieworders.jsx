import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../hooks/API";
import ViewordersTablehead from "./vieworders-tablehead";
import ViewordersTableBody from "./vieworders-body";
import ViewordersTablefooter from "./vieworders-tablefooter";
import ViewordersSearchbar from "./vieworders-searchbar";
import ViewordersTablepaiginaition from "./vieworders-tablepaiginaition";
import "./vieworders.scss";
import { errorAlert } from "../../../hooks/function-utils";
import { useGetUserDetails } from "../../../hooks/function-utils";
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
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [listCount, setListCount] = useState("2");
  const [lastItemStore, setLastItemStore] = useState();
  const [lastItemId, setLastItemId] = useState("0");

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

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

  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () =>
      await axios
        .get(`${BASE_API_URL}/api/v1/order/list.php`, {
          params: {
            count: "20",
            "last-item-id": lastItemId,
          },
        })
        .then((res) => {
          if (res.data.error === true) {
            errorAlert("Server Error", res.data.message);
          } else {
            console.log("Server data: ", res.data);

            let data = res.data.data;
            let newData = rawData;
            data["userName"] = userName;
            data["userId"] = userId;
            let parentArray;

            if (
              res.data.message !== "No order found" &&
              (data !== null || data !== undefined) &&
              Array.isArray(rawData)
            ) {
              newData = newData.concat(data);
              data = newData;
              console.log("Mutated raw data: ", data, newData);

              parentArray = handleParentPaginationArray(data);

              console.log("Mutated new array: ", parentArray);

              let newPageNumber = currentPageArray?.id + 1;
              setCurrentPageArray({
                id: newPageNumber,
                page: parentArray[currentPageArray.id],
              });
              console.log("Mutated current array: ", currentPageArray);

              setOrdersList(parentArray);

              setLastItemStore(res.data["last-item-id"]);
              setRawData(data);
              if (document.getElementById("default-ordering_next") !== null) {
                document.getElementById("default-ordering_next").className =
                  "paginate_button page-item next";
              }
              // alert("fired 1");
            } else if (
              res.data.message === "No order found"
              // ||
              // res.data.data === null ||
              // res.data.data === undefined
            ) {
              if (document.getElementById("default-ordering_next") !== null) {
                document.getElementById("default-ordering_next").className +=
                  " disabled";
              }
              alert("fired 2");
            } else {
              parentArray = handleParentPaginationArray(data);
              if (document.getElementById("default-ordering_next") !== null) {
                document.getElementById("default-ordering_next").className =
                  "paginate_button page-item next";
              }
              setOrdersList(parentArray);
              setCurrentPageArray({ id: 0, page: parentArray[0] });
              setLastItemStore(res.data["last-item-id"]);
              setRawData(data);
              // alert("fired 3");
            }

            console.log("Parent Page: ", parentArray);

            console.log("Raw Data: ", rawData);
          }
        })
        .catch((error) => {
          errorAlert("Network Error", error);
        });

    response();
    return () => {
      source.cancel();
    };
  }, [userName, userId, listCount, lastItemId, lastItemStore, refreshData]);

  useEffect(() => {}, [currentPageArray, rawData]);

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
     * Check if data items fetched is up to seven in number and take no further action
     */
    if (data?.length < 7 || data?.length < 10) {
      parentPaginationArray[0] = data;
    }

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
    const arrayLengthInt = isInteger(listCountValue);
    const arrayLengthFloat = isFloat(listCountValue);

    /**
     * Check if the length of the data array can be divided without a reminder nd populate the parent pagination array with the data values in children arrays
     */
    if (typeof arrayLengthInt === "number") {
      for (let i = 0; i < data.length; i += subListCount) {
        parentPaginationArray.push(data.slice(i, i + subListCount));
      }
      console.log("Parent array: ", parentPaginationArray);
    }
    /**
     * Check if the length of the data array will be divided with a reminder and populate the parent pagination array with the data values in children arrays
     */
    if (typeof arrayLengthFloat === "number") {
      for (let i = 0; i < data.length; i += subListCount) {
        parentPaginationArray.push(data.slice(i, i + subListCount));
      }
      console.log("Parent array: ", parentPaginationArray);
    }
    return parentPaginationArray;
  };

  /** Refetch order list when list count state changes */
  const handleCountChange = () => {
    let countValue;
    if (document.getElementById("order-list-count") !== null) {
      countValue = document.getElementById("order-list-count").value;
    }
    setListCount(countValue);
  };

  const handleNextPagination = (data, currentPage, lastItemStore) => {
    let pageNumber = currentPage?.id;
    console.log("Page number: ", pageNumber);
    console.log("Parent array ", data);
    console.log("Current page: ", currentPage);

    for (let i = 0; i < data.length - 1; i++) {
      if (pageNumber === i) {
        setCurrentPageArray({
          id: pageNumber + 1,
          page: data[pageNumber + 1],
        });
        console.log("Check 1: ", data.length === pageNumber + 1);
      } else if (data.length === pageNumber + 1) {
        if (lastItemStore !== undefined || lastItemStore !== null) {
          setLastItemId(lastItemStore);
          console.log("Page limit reached: ", lastItemStore);
        }
        console.log("Page limit reached: ", lastItemStore);
      }
      console.log("Check 2: ", data.length === pageNumber + 1);
    }
  };

  console.log("Current page after outside: ", currentPageArray);
  const handlePrevPagination = (data, currentPage) => {
    if (document.getElementById("default-ordering_next") !== null) {
      document.getElementById("default-ordering_next").className ===
      "paginate_button page-item next disabled"
        ? (document.getElementById("default-ordering_next").className =
            "paginate_button page-item next")
        : (document.getElementById("default-ordering_next").className =
            "paginate_button page-item next");
    }

    let pageNumber = currentPage?.id;

    for (let i = 0; i < data.length; i++) {
      if (pageNumber === i && i !== 0) {
        setCurrentPageArray({
          id: pageNumber - 1,
          page: data[pageNumber - 1],
        });
      } else {
        console.log("Previous Page limit reached");
      }
    }
  };

  const handleSearchList = () => {};
  return (
    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
      <div className="widget-content widget-content-area br-6">
        <div
          id="default-ordering_wrapper"
          className="dataTables_wrapper container-fluid dt-bootstrap4"
        >
          {/* BEGINNING OF VIEW ORDERS SEARCH BAR */}
          <ViewordersSearchbar
            currentPageNumber={currentPageArray?.id + 1}
            handleCountChange={handleCountChange}
            handleSearchList={handleSearchList}
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
