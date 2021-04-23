import React, { useState } from "react";
import moment from "moment";
import { FormDetails } from "../orders/order-form/order-form-details";
import TimeKeeper from "react-timekeeper";

const ShiftCalculator = ({
  calculateShift,
  handleChange,
  shiftDuration,
  selectProductData,
  distanceFormData,
  formInput,
  handleCapacityChange,
  selectedDate,
  handleDateChange,
  selectedEndDate,
  handleEndDateChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showEndPicker, setEndShowPicker] = useState(false);
  // SHIFT CALCULATOR TAKES THE INPUTS OF A USER AND FINDS A DIFFERENCE OF THE GIVEN INPUTS TO ASCERTAIN THE DURATION OF A SINGLE SHIFT. ON SUBMIT, THE COUNTDOWN TIMER IS DISPLAYED AND SHIFT CALCULATOR IS REMOVED FROM THE USER INTERFACE

  // onLoad event listener is enabled to clear the local storage from any values stored (previous time especially) to avoid bugs
  window.addEventListener("load", () => {
    sessionStorage.clear();
  });
  console.log("Products Array: ", selectProductData);
  let date = moment().format("YYYY-MM-DD");
  console.log("Date: ", date);
  return (
    <div className="shift-calculator">
      {/* SHIFT COMPONENT TITLE */}
      <h2 id="title">Select your working Hours</h2>
      <form className="form-group mb-0">
        {/* BEGINNING OF SHIFT INPUT GROUP */}
        <div
          className="input-group"
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              width: "100%",
            }}
          >
            <span
              style={{
                padding: "1rem 1rem",
                borderRadius: "10px",
                width: "50%",
                backgroundColor: "rgba(235, 237, 242, 0.5)",
              }}
            >
              {selectProductData.map((item, i) => (
                <FormDetails
                  displayHalf
                  key={i}
                  item={item}
                  handleChange={handleChange}
                />
              ))}
            </span>
            <span
              style={{
                padding: "1rem 1rem",
                borderRadius: "10px",
                width: "50%",
                backgroundColor: "rgba(235, 237, 242, 0.5)",
              }}
            >
              {distanceFormData.distance.map((item, i) => (
                <FormDetails
                  displayHalf
                  key={i}
                  item={item}
                  handleChange={handleChange}
                />
              ))}
            </span>
          </div>
          {/* BEGINNING OF SHIFT "FROM" INPUT */}
          <div
            style={{
              display: "grid",
              alignItems: "center",
              padding: "1.5rem 0",
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "rgba(235, 237, 242, 0.5)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                width: "100%",
              }}
            >
              <label
                className="input-label"
                htmlFor="from"
                style={{
                  width: "45%",
                  fontWeight: "bold",
                }}
              >
                Start Date and time:
                <input
                  style={{
                    marginTop: "0.5rem",
                  }}
                  id="startdateFlatpickr"
                  className="form-control flatpickr flatpickr-input active"
                  type="date"
                  name="from"
                  min={date}
                  value={date}
                />
              </label>
              <label
                className="input-label"
                htmlFor="to"
                style={{
                  width: "45%",
                  fontWeight: "bold",
                }}
              >
                End Date and time:
                <input
                  style={{
                    marginTop: "0.5rem",
                  }}
                  id="enddateFlatpickr"
                  className="form-control flatpickr flatpickr-input active"
                  type="date"
                  // type="datetime-local"
                  name="to"
                  min={date}
                  value={date}
                />
              </label>
            </span>
            {/* Second Span */}
            <span
              className="timepicker-btn"
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                justifyContent: "center",
                gap: "2rem",
                width: "100%",
              }}
            >
              <span className={showPicker ? "timepicker-modal" : "timepicker"}>
                <TimeKeeper
                  time={selectedDate}
                  onChange={(newTime) => handleDateChange(newTime.formatted24)}
                  onDoneClick={(finalTime, e) => {
                    setShowPicker((prev) => !prev);
                    handleDateChange(finalTime.formatted24);
                    if (selectedDate.length >= 5) {
                      console.log("String not altered");
                    } else {
                      selectedDate = "0" + selectedDate;
                    }
                    document.getElementById(
                      "startdateTimeFlatpickr"
                    ).value = selectedDate;
                    console.log("Logged start time: ", selectedDate);
                  }}
                  switchToMinuteOnHourSelect
                  hour24Mode
                />
              </span>
              <label
                className="input-label"
                htmlFor="from"
                style={{
                  width: "45%",
                }}
              >
                {/* Start Time: */}

                <input
                  id="startdateTimeFlatpickr"
                  className="form-control flatpickr flatpickr-input active"
                  type="time"
                  name="from"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPicker(true);
                  }}
                />
              </label>
              <label
                className="input-label"
                htmlFor="to"
                style={{
                  width: "45%",
                }}
              >
                <span
                  className={
                    showEndPicker ? "end-timepicker-modal" : "end-timepicker"
                  }
                >
                  <TimeKeeper
                    time={selectedEndDate}
                    onChange={(newTime) =>
                      handleEndDateChange(newTime.formatted24)
                    }
                    onDoneClick={(finalTime, e) => {
                      handleEndDateChange(finalTime.formatted24);
                      if (selectedEndDate.length >= 5) {
                        console.log("String not altered");
                      } else {
                        selectedEndDate = "0" + selectedEndDate;
                      }
                      document.getElementById(
                        "enddateTimeFlatpickr"
                      ).value = selectedEndDate;
                      setEndShowPicker((prev) => !prev);
                    }}
                    switchToMinuteOnHourSelect
                    hour24Mode
                  />
                </span>
                {/* End Time: */}
                <input
                  id="enddateTimeFlatpickr"
                  className="form-control flatpickr flatpickr-input active"
                  type="time"
                  name="to"
                  onClick={(e) => {
                    e.preventDefault();
                    setEndShowPicker(true);
                  }}
                />
              </label>
            </span>

            {/* END OF SHIFT "TO" INPUT */}
          </div>
        </div>
        {/* END OF SHIFT INPUT GROUP */}
        <div
          className="shift-calculator-production-capacity-setter"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "3rem 0 2rem",
            gap: "0.5rem",
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            // name="capacity"
            className="custom-range progress-range-counter slider"
            value={formInput[""]}
            onChange={handleCapacityChange}
          />
          <div className="range-count">
            <span className="range-count-number">
              {formInput[""] ? formInput[""] : (formInput[""] = 0)}
            </span>
            <span className="range-count-unit">%</span>
          </div>
        </div>
        {/* BEGINNING OF SUBMIT BUTTON */}
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <button
            onClick={() => calculateShift()}
            type="button"
            name="txt"
            className="mt-4 btn btn-primary"
            style={{ width: "15rem", height: "3rem", fontSize: "1.5rem" }}
          >
            Start Shift
          </button>
        </div>
        {/* END OF SUBMIT BUTTON */}
      </form>
    </div>
  );
};

export default ShiftCalculator;
