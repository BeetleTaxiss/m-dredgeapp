import React, { useState } from "react";
import moment from "moment";
import axios from "axios";

const ProductionCapacity = (setTimeLine, setTimelineItems) => {
  // STATE FOR PRODUCTION CAPACITY FORM INPUT
  const [progress, setProgress] = useState(0);

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

    setTimelineItems((state) => [
      ...state,
      {
        time: loggedProductionTime,
        dotColor: "primary",
        text: "Shift ended",
      },
    ]);
  };

  return (
    <div className="custom-progress progress-up" style={{ width: "100%" }}>
      <div className="range-count">
        <span className="range-count-number">{progress[""]}</span>
        <span className="range-count-unit">%</span>
      </div>
      <form onSubmit={getTimeAndProductionStamp}>
        <input
          type="range"
          min="0"
          max="100"
          className="custom-range progress-range-counter"
          value={progress}
          onChange={handleChange}
        />
        <input type="submit" name="txt" className="mt-4 btn btn-primary" />
      </form>
    </div>
  );
};

export default ProductionCapacity;
