import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import { showLogItem } from "../cards/custom-activities-summary";
import {
  handleNextPagination,
  handlePrevPagination,
  handleSearchList,
  PaginationManager,
  Paginator,
} from "../../hooks/paginator";
import { useGetUserDetails } from "../../hooks/function-utils";

const UserActivitiesLog = () => {
  const [userActivitiesLog, setUserActivitiesLog] = useState(["loading"]);

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

  // Fetch User activity logs from db
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      /** Fuel list variable to be to be used to update the table UI */
      let newTransformedPageData;

      await axios
        .get(`${BASE_API_URL}/api/v1/system/system-logs.php`, {
          params: {
            count: "10",
            "last-item-id": lastItemId,
          },
        })
        .then((res) => {
          if (res.data.error) {
            let title = "Server Error",
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
              const action_instigator = subItem?.user;
              const action_taken = subItem?.action;
              const action_received = subItem?.action_table;
              const action_data = JSON.parse(subItem?.data);
              const action_old_data = JSON.parse(subItem?.data_old);
              const start_time = subItem?.time_in;
              const date_in = subItem?.date_in;
              // const updatedItems = handleUpdatedItem(
              //   action_data,
              //   action_old_data
              // );
              // items(updatedItems);

              const currentRow = {
                id: date_in,
                fields: [
                  {
                    class: "text-left",
                    itemClass: "text-center",
                    item: date_in,
                  },
                  {
                    class: "text-left",
                    itemClass: "text-center",
                    item: action_taken,
                  },
                  {
                    class: "text-left",
                    itemClass: "text-center",
                    item: action_instigator,
                  },
                  {
                    class: "text-left",
                    itemClass: "text-center",
                    item: action_received,
                  },
                  {
                    class: "text-left",
                    link: () => showLogItem(subItem),
                    userLog: true,
                    linkText: "View Detailed Action",
                    itemClass: "btn btn-primary",
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
              setUserActivitiesLog,
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
    };

    response();

    return () => {
      source.cancel();
    };
  }, [lastItemId]);

  // Update state values dynamically
  useEffect(() => {}, [
    userActivitiesLog,
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
  /** Detailed Log List Table Data */
  const detailedOldLogListTableData = {
    tableTitle: "Users Action Log",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Action Taken" },
      { class: "", title: "User" },
      { class: "", title: "Action Location" },
      { class: "", title: "" },
    ],

    body: currentPage,
  };

  //Properties for handling pagination processes such as next and previous functions
  const footerProp = {
    currentPageNumber: currentPage?.id + 1,
    totalPageNumbers: userActivitiesLog?.length,
    handleNextPagination: () =>
      handleNextPagination(
        userActivitiesLog,
        currentPage,
        lastItemStore,
        setCurrentPage,
        setPersistentCurrentPage,
        setLastItemId
      ),
    handlePrevPagination: () =>
      handlePrevPagination(
        userActivitiesLog,
        currentPage,
        setCurrentPage,
        setPersistentCurrentPage
      ),
  };

  return (
    <CustomTableList
      content={detailedOldLogListTableData}
      filler="No User Activity to report"
      searchBoxValue={searchBoxValue}
      handleSearchList={() => {
        handleSearchList(
          persistentCurrentPage,
          setCurrentPage,
          setSearchBoxValue
        );
      }}
      search
      footer
      {...footerProp}
    />
  );
};

export default UserActivitiesLog;
