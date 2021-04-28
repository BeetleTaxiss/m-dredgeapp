import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CustomActivitiesSummary } from "./custom-activities-summary";
import moment from "moment";
import { BASE_API_URL } from "../../hooks/API";
import { functionUtils } from "../../hooks/function-utils";

const UsersActivitiesSummary = () => {
  const [activitiesSummary, setActivitiesSummary] = useState(["loading"]);

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
  const handleActionUIUpdate = (
    action_taken,
    action_data,
    action_old_data,
    action_instigator,
    action_received
  ) => {
    let description;
    const updatedItems = handleUpdatedItem(action_data, action_old_data);
    const items = (updatedItems) => {
      return updatedItems.map((item) => {
        return ` updated ${item.itemUpdated} from "${item.old}" to "${item.new}"`;
      });
    };
    description =
      /** Deleted Items description */
      action_taken === "delete" && action_received === "account_chart"
        ? `${action_instigator} deleted ${action_data.description} from charts`
        : action_taken === "delete" && action_received === "account_accounts"
        ? `${action_instigator} deleted ${action_data.description} from accounts`
        : action_taken === "delete" && action_received === "users"
        ? `${action_instigator} deleted ${action_data.user} from users data`
        : action_taken === "delete" && action_received === "product"
        ? `${action_instigator} deleted ${action_data.description} from products list`
        : action_taken === "delete" && action_received === "operation_machinery"
        ? `${action_instigator} deleted ${action_data.machinery_name} from machinery list`
        : /**Updated items description */
        action_taken === "update" && action_received === "product"
        ? `${action_instigator} ${items(updatedItems)} from products list`
        : action_taken === "update" && action_received === "account_accounts"
        ? `${action_instigator} updated ${action_data.data[0].account} from accounts list`
        : "Hello";
    /** Truncate description over 100 characters */
    return functionUtils.truncate(description, 100);
  };
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let activitiesSummaryList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/system/system-logs.php`, {
          params: {
            count: "15",
          },
        })
        .then((res) => {
          let activitiesSummaryResponse = res.data.data;
          console.log("Users Activities: ", activitiesSummaryResponse);
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            activitiesSummaryResponse.reverse().map((item, id) => {
              const action_instigator = item.user;
              const action_taken = item.action;
              const action_received = item.action_table;
              const action_data = JSON.parse(item.data);
              const action_old_data = JSON.parse(item.data_old);
              const start_time = item.time_in;
              const date_in = item.date_in;
              const new_time = moment();
              const extended_new_time = moment().add(5, "minutes");
              const start_time_moment = moment(
                `${date_in} ${start_time}`,
                "DD/MM/YYYY hh:mm:ss"
              );
              const duration_hours = new_time.diff(start_time_moment, "hours");
              // const duration_days = new_time.diff(start_time_moment, "days");
              const duration_minutes = new_time.diff(
                start_time_moment,
                "minute"
              );
              const pumping_started =
                start_time_moment.format("hh:mm:ss") <
                extended_new_time.format("hh:mm:ss");

              const pumping_started_ago = start_time_moment.from(
                extended_new_time
              );

              console.log(
                "Detailed Item: ",
                item,
                "Action data: ",
                action_data,
                "Action old data: ",
                action_old_data
              );

              const activitiesSummarySchema = {
                status: {
                  color: null,
                  comment: null,
                },
                activity: handleActionUIUpdate(
                  action_taken,
                  action_data,
                  action_old_data,
                  action_instigator,
                  action_received
                ),
                logActionData: item,
                time:
                  pumping_started && duration_minutes <= 5
                    ? start_time
                    : duration_minutes <= 59
                    ? `${duration_minutes} mins ago`
                    : duration_hours === 1
                    ? `${duration_hours} hour ago`
                    : duration_hours <= 24
                    ? `${duration_hours} hours ago`
                    : pumping_started_ago,
                noTimeline: true,
                action: action_taken,
              };

              return (activitiesSummaryList = activitiesSummaryList.concat(
                activitiesSummarySchema
              ));
            });
            setActivitiesSummary(activitiesSummaryList);
            console.log("Recent Pumping list: ", activitiesSummary);
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

  const recentPumpingActivitiesData = {
    widgetHeader: {
      title: "Recent User Activities",
      link: "/productionlist",
    },
    taskAction: "/productionlist",
    activities: activitiesSummary,
  };

  return <CustomActivitiesSummary data={recentPumpingActivitiesData} popup />;
};

export default UsersActivitiesSummary;
