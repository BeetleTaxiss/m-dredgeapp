import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import moment from "moment";
import {
  functionUtils,
  useGetUserDetails,
} from "../../../hooks/function-utils";

const WetSand = () => {
  const [wetsandList, setWetSandList] = useState(["loading"]);

  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

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
    const response = async () => {
      try {
        /** Wet sand list to be appended to */
        let wetSandListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/production/list.php`, {
            params: {
              completed: "1",
              stockpiled: "0",
            },
          })
          .then((res) => {
            console.log("Wet sand response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const wetSandItems = res.data.data;
              wetSandItems.map((item) => {
                /** Get required response data values */
                const production_id = item.id;
                const batch = item.batch;
                const total_qty_pumped = item.total_qty_pumped;
                const production_date = item.production_date;
                const production_start_time = item.start_time;
                const production_end_time = item.end_time;
                const production_capacity = item.production_capacity;
                const pumping_distance_in_meters =
                  item.pumping_distance_in_meters;
                const duration_pumped_in_seconds =
                  item.duration_pumped_in_seconds;
                /** Logic to get pumped quantity which is ready tobe stockpiled */
                const date_in = item.date_in;
                const new_date = moment().format("DD/MM/YYYY");
                let stockpileReady = new_date > date_in ? true : false;
                console.log("difference in days: ", stockpileReady);
                console.log("Date in: ", date_in);
                console.log("New Date: ", new_date);
                /** to stockpile API data */
                const toStockpileData = {
                  "user-id": parseInt(userId),
                  user: userName,
                  "production-id": production_id,
                  "batch-no": batch,
                };
                console.log("data: ", toStockpileData);
                const currentWetSandItem = {
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

                return (wetSandListBody = wetSandListBody.concat(
                  currentWetSandItem
                ));
              });
              setWetSandList(wetSandListBody);
              console.log("Wet Sand List Body: ", wetsandList);
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

    response();
    return () => {
      source.cancel();
    };
  }, [userName, userId, refreshData]);
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
      .put(`${BASE_API_URL}/api/v1/production/stockpile.php`, toStockpile)
      .then((res) => {
        console.log("Stockpile response Data: ", res.data.data);
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

    body: wetsandList,
  };
  console.log(wetsandListTableData);
  /** Wet sand list component display */
  const WetSandListComponent = () => (
    <CustomTableList content={wetsandListTableData} />
  );
  return <WetSandListComponent />;
};

export default WetSand;
