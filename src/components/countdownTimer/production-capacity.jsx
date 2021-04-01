import React, { useState } from "react";
import moment from "moment";
import axios from "axios";

const ProductionCapacity = ({ setTimeLine, setTimelineItem }) => {
  // STATE FOR PRODUCTION CAPACITY FORM INPUT
  const [progress, setProgress] = useState({});

  // HANDLE CHANGE FUNCTION TO TRACK CHANGES IN FORM INPUTS
  const handleChange = ({ currentTarget: { name, value } }) =>
    setProgress((state) => ({
      ...state,
      [name]: value,
    }));

  // FUNCTION TO POST THE PRODUCTION CAPACITY AND TIME STAMP FOR A GIVEN INPUT BY THE PRODUCTION MANAGER/USER
  const getTimeAndProductionStamp = async (e) => {
    e.preventDefault();
    const loggedProductionTime = moment().format("hh:mm");
    const LogTime = moment();
    // SET SESSION VARIABLES AND ADD PREV TIME

    const LoggedTimeNew = sessionStorage.setItem("New Time", LogTime);
    const getNewLoggedTime = sessionStorage.getItem("New Time");
    const getPrevLoggedTime = sessionStorage.getItem("prevTime");

    console.log("New logged time: ", getNewLoggedTime);
    console.log("Prev Logged Time: ", getPrevLoggedTime);

    let prevLoggedTime = new Date(getPrevLoggedTime);
    let newLoggedTime = new Date(getNewLoggedTime);
    // DIFFERENCE BETWEEN SHIFT VALUES TO GET SHIFT DURATION IN MILLISECONDS
    let durationInMilliseconds =
      newLoggedTime.getTime() - prevLoggedTime.getTime();
    console.log("Difference: ", durationInMilliseconds);
    // PROCESS TO CONVERT SHIFT DURATION ABOVE TO HOURS, MINUTES AND SECONDS
    let logObject = new Date(durationInMilliseconds);
    let hours = logObject.getUTCHours(),
      minutes = logObject.getUTCMinutes(),
      seconds = logObject.getSeconds();

    // BEGINNING OF PRODUCTION CAPACITY CALCULATION
    const MAX_PRODUCTION_OUTPUT_PER_HOUR = 10000;
    const MAX_PRODUCTION_CAPACITY_PER_HOUR = 100 / 100;
    const PRODUCTION_CAPACITY = progress[""] / 100;

    const calcProductionOutput = Math.floor(
      (PRODUCTION_CAPACITY * MAX_PRODUCTION_OUTPUT_PER_HOUR) /
        MAX_PRODUCTION_CAPACITY_PER_HOUR
    );
    console.log("Output: ", calcProductionOutput);

    // END OF PRODUCTION CAPACITY CALCULATION

    // POST URL
    const PRODUCTION_CAPACITY_URL = "/production";
    // PRODUCTION AND TIME STAMP VALUES USING MOMENT.JS TO GET ACCURATE TIME
    const productionStamp = {
      time: moment(),
      capacity: progress[""],
    };
    // FORM POST METHOD TO WEB SERVER
    axios
      .post(PRODUCTION_CAPACITY_URL, productionStamp)
      .then((res) => console.log(res));

    setTimelineItem((state) => [
      ...state,
      {
        time: loggedProductionTime,
        dotColor: `${
          progress[""] < 35
            ? "danger"
            : progress[""] < 50
            ? "warning"
            : progress[""] < 70
            ? "secondary"
            : progress[""] > 70
            ? "success"
            : "secondary"
        }`,
        text: `Production running at ${progress[""]}%`,
        timeSpent: `${hours ? hours : "0"} hrs : ${
          minutes ? minutes : "0"
        } mins :  ${seconds ? seconds : "0"} secs `,
        productionOutput: `Production output per hour: ${calcProductionOutput}cm³ `,
      },
    ]);

    const LoggedTimePrev = sessionStorage.setItem("prevTime", getNewLoggedTime);
  };

  return (
    <div className="custom-progress progress-up" style={{ width: "100%" }}>
      <div className="range-count">
        <span className="range-count-number">
          {progress[""] ? progress[""] : 0}
        </span>
        <span className="range-count-unit">%</span>
      </div>
      <form onSubmit={getTimeAndProductionStamp}>
        <input
          type="range"
          min="0"
          max="100"
          className="custom-range progress-range-counter"
          value={progress[""]}
          onChange={handleChange}
        />
        <input type="submit" name="txt" className="mt-4 btn btn-primary" />
      </form>
    </div>
  );
};

export default ProductionCapacity;
