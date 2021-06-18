import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CustomActivitiesSummary } from "./custom-activities-summary";
import moment from "moment";
import { BASE_API_URL } from "../../hooks/API";
import {
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";

const ActivitiesSummary = () => {
  const [activitiesSummary, setActivitiesSummary] = useState(["loading"]);
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

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
      let activitiesSummaryList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/production/list.php`, {
          params: {
            count: "15",
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let activitiesSummaryResponse = res.data.data;
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            activitiesSummaryResponse.map((item, id) => {
              const completed = item?.completed;
              const start_time = item?.time_in;
              const date_in = item?.date_in;
              const stockpiled = item?.stockpiled;
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

              const pumping_started_ago =
                start_time_moment.from(extended_new_time);

              const activitiesSummarySchema = {
                status: {
                  color:
                    completed === "1"
                      ? "success"
                      : completed === "0"
                      ? "info"
                      : pumping_started && duration_minutes <= 5
                      ? "warning"
                      : null,
                  comment:
                    pumping_started && duration_minutes <= 5
                      ? "Started"
                      : completed === "1"
                      ? "Completed"
                      : completed === "0"
                      ? "Pending"
                      : stockpiled === "1"
                      ? "Stockpiled"
                      : null,
                },
                activity:
                  pumping_started && duration_minutes <= 5
                    ? "Pumping started"
                    : completed === "1"
                    ? "Pumping finished"
                    : completed === "0"
                    ? "Pumping in progress"
                    : null,
                time:
                  pumping_started && duration_minutes <= 5
                    ? start_time
                    : duration_minutes <= 59
                    ? `${duration_minutes} mins ago`
                    : duration_hours <= 24
                    ? `${duration_hours} hours ago`
                    : pumping_started_ago,
                noTimeline: false,
              };

              return (activitiesSummaryList = activitiesSummaryList.concat(
                activitiesSummarySchema
              ));
            });
            setActivitiesSummary(activitiesSummaryList);
          }
        })
        .catch((error) => {
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
        });
    };

    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [userProductPermission]);

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
      title: "Recent Pumping",
      link: "/productionlist",
      links: userProductPermission,
    },
    taskAction: "/productionlist",
    activities: activitiesSummary,
    body: activitiesSummary,
  };

  return (
    <CustomActivitiesSummary
      data={recentPumpingActivitiesData}
      dropdown
      change
    />
  );
};

export default ActivitiesSummary;
