import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import Swal from "sweetalert2";
import { TaskActionButton } from "../general/task-action";
import { BASE_API_URL } from "../../hooks/API";
import moment from "moment";
import { functionUtils } from "../../hooks/function-utils";
const CurrentActivity = () => {
  const [currentActivity, setCurrentActivity] = useState(["loading"]);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      await axios
        .get(`${BASE_API_URL}/api/v1/production/list.php`, {
          params: {
            count: 2,
          },
        })
        .then((res) => {
          let activitiesSummaryResponse = res.data.data;
          let reversedCurrentActivityResponse = [...activitiesSummaryResponse];
          console.log(
            "Current Activity: ",
            activitiesSummaryResponse,
            reversedCurrentActivityResponse[1]
          );
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            const user = reversedCurrentActivityResponse[1].user,
              date = moment(
                `${reversedCurrentActivityResponse[1].date_in} ${reversedCurrentActivityResponse[0].start_time}`,
                "DD/MM/YYYY hh:mm:ss"
              ).format("dddd, mm yyyy"),
              wet_sand_pumped = Math.round(
                reversedCurrentActivityResponse[1].total_qty_pumped
              ),
              duration =
                reversedCurrentActivityResponse[1].duration_pumped_in_seconds <
                3600
                  ? reversedCurrentActivityResponse[1]
                      .duration_pumped_in_seconds
                  : reversedCurrentActivityResponse[1]
                      .duration_pumped_in_seconds >= 3600
                  ? reversedCurrentActivityResponse[1]
                      .duration_pumped_in_seconds / 3600
                  : reversedCurrentActivityResponse[1]
                      .duration_pumped_in_seconds,
              distance_pumped = Math.round(
                reversedCurrentActivityResponse[1].pumping_distance_in_meters
              ),
              completed = reversedCurrentActivityResponse[1].completed;
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
            console.log("Current Acyivity list: ", currentActivity);
            console.log(
              "Current Acyivity list: ",
              moment(
                `${reversedCurrentActivityResponse[0].date_in} ${reversedCurrentActivityResponse[0].start_time}`,
                "DD/MM/YYYY hh:mm:ss"
              ).format("dddd, mm yyyy"),
              moment()
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
            <div className="media">
              <div className="w-img"></div>
              <div className="media-body">
                <span
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h6>{currentActivity.user}</h6>
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
