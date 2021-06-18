import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import Swal from "sweetalert2";
import TaskAction, { TaskActionButton } from "../general/task-action";
import { BASE_API_URL } from "../../hooks/API";
import moment from "moment";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
const CurrentActivity = () => {
  const [currentActivity, setCurrentActivity] = useState(["loading"]);
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
      await axios
        .get(`${BASE_API_URL}/api/v1/production/list.php`, {
          params: {
            count: 2,
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let activitiesSummaryResponse = res.data.data;
          let reversedCurrentActivityResponse = [...activitiesSummaryResponse];

          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            const user = reversedCurrentActivityResponse[1]?.user,
              date = moment(
                `${reversedCurrentActivityResponse[1]?.date_in} ${reversedCurrentActivityResponse[0]?.start_time}`,
                "DD/MM/YYYY hh:mm:ss"
              ).format("dddd, mm yyyy"),
              wet_sand_pumped = Math.round(
                reversedCurrentActivityResponse[1]?.total_qty_pumped
              ),
              duration =
                reversedCurrentActivityResponse[1]?.duration_pumped_in_seconds <
                3600
                  ? reversedCurrentActivityResponse[1]
                      ?.duration_pumped_in_seconds
                  : reversedCurrentActivityResponse[1]
                      ?.duration_pumped_in_seconds >= 3600
                  ? reversedCurrentActivityResponse[1]
                      ?.duration_pumped_in_seconds / 3600
                  : reversedCurrentActivityResponse[1]
                      ?.duration_pumped_in_seconds,
              distance_pumped = Math.round(
                reversedCurrentActivityResponse[1]?.pumping_distance_in_meters
              ),
              completed = reversedCurrentActivityResponse[1]?.completed;
            const currentActivitySchema = {
              link: "/productionlist",
              user: user,
              date: date,
              completed: completed,
              productionInfo: [
                { text: "Current Production Information: " },
                {
                  text: `Wet sand: ${functionUtils.addCommaToNumbers(
                    wet_sand_pumped
                  )} cm³`,
                },
                {
                  text: `Pumping duration: ${duration} ${
                    duration > 3600
                      ? "hours"
                      : duration < 60
                      ? "Seconds"
                      : duration < 3600
                      ? "Minutes"
                      : null
                  }`,
                },
                {
                  text: `Pumping distance: ${functionUtils.addCommaToNumbers(
                    distance_pumped
                  )} meters`,
                },
              ],
            };
            setCurrentActivity(currentActivitySchema);
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
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-card-one">
        {currentActivity[0] === "loading" ? (
          <>
            <Skeleton height={60} />
            <Skeleton height={200} />
          </>
        ) : (
          <div className="widget-content current-activity">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <TaskAction links={userProductPermission} change />
            </div>
            <div className="media">
              <div className="w-img"></div>
              <div className="media-body">
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h6>{currentActivity?.user}</h6>
                  <div className="usr-name">
                    <span
                      id="span-pending"
                      style={{
                        background:
                          currentActivity.completed === "1"
                            ? "#1abc9c"
                            : "#2196f3",
                      }}
                    >
                      {currentActivity.completed === "0"
                        ? "processing"
                        : currentActivity.completed === "1"
                        ? "completed"
                        : "processing"}
                    </span>
                  </div>
                </span>
                <p className="meta-date-time">{currentActivity.date}</p>
              </div>
            </div>

            {currentActivity.productionInfo.map((item, i) => (
              <p key={i} style={{ marginBottom: "1.5rem" }}>
                {item.text}
              </p>
            ))}

            <TaskActionButton link={currentActivity.link} mt />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentActivity;
