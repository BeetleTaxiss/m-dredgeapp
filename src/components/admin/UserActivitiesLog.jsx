import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import { showDetailedLogItem } from "../cards/ShowDetailedLogItem";

const UserActivitiesLog = () => {
  const [userActivitiesLog, setUserActivitiesLog] = useState(["loading"]);

  const handleUpdatedItem = (action_data, action_old_data) => {
    let updatedItems = [];
    Object.keys(action_data).forEach((key) => {
      if (
        action_old_data !== null &&
        action_data[key] !== action_old_data[key]
      ) {
        updatedItems = updatedItems.concat({
          old: action_old_data[key],
          new: action_data[key],
          itemUpdated: key,
        });
      }
    });
    console.log("Updated Items Array: ", updatedItems);
    return updatedItems;
  };

  const items = (updatedItems) => {
    return updatedItems.map((item) => {
      return ` updated ${item.itemUpdated} from "${item.old}" to "${item.new}"`;
    });
  };
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let userActivitiesLogList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/system/system-logs.php`)
        .then((res) => {
          let userActivitiesLogResponse = res.data.data;
          console.log("Users Activities: ", userActivitiesLogResponse);
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            userActivitiesLogResponse.reverse().map((item, id) => {
              const action_instigator = item.user;
              const action_taken = item.action;
              const action_received = item.action_table;
              const action_data = JSON.parse(item.data);
              const action_old_data = JSON.parse(item.data_old);
              const start_time = item.time_in;
              const date_in = item.date_in;
              // const updatedItems = handleUpdatedItem(
              //   action_data,
              //   action_old_data
              // );
              // items(updatedItems);

              console.log(
                "Detailed Item: ",
                item,
                "Action data: ",
                action_data,
                "Action old data: ",
                action_old_data
              );

              const userActivitiesLogSchema = {
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
                    itemClass: "text-center",
                    link: () => showDetailedLogItem(item),
                    linkText: "View Detailed Action",
                  },
                ],
              };

              return (userActivitiesLogList = userActivitiesLogList.concat(
                userActivitiesLogSchema
              ));
            });
            setUserActivitiesLog(userActivitiesLogList);
            console.log("Recent Pumping list: ", userActivitiesLog);
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
  }, []);

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
    body: userActivitiesLog,
  };
  return <CustomTableList content={detailedOldLogListTableData} />;
};

export default UserActivitiesLog;
