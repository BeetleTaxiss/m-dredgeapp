import React from "react";
import { FormDetails } from "../orders/order-form/order-form-details";

const ShiftCalculator = ({
  calculateShift,
  handleChange,
  shiftDuration,
  selectProductData,
  formInput,
  handleCapacityChange,
}) => {
  // SHIFT CALCULATOR TAKES THE INPUTS OF A USER AND FINDS A DIFFERENCE OF THE GIVEN INPUTS TO ASCERTAIN THE DURATION OF A SINGLE SHIFT. ON SUBMIT, THE COUNTDOWN TIMER IS DISPLAYED AND SHIFT CALCULATOR IS REMOVED FROM THE USER INTERFACE

  // onLoad event listener is enabled to clear the local storage from any values stored (previous time especially) to avoid bugs
  window.addEventListener("load", () => {
    sessionStorage.clear();
  });
  console.log("Products Array: ", selectProductData);
  return (
    <div className="shift-calculator">
      {/* SHIFT COMPONENT TITLE */}
      <h2 id="title">Select your working Hours</h2>
      <form className="form-group mb-0">
        {/* BEGINNING OF SHIFT INPUT GROUP */}
        <div className="input-group" style={{ alignItems: "center" }}>
          {selectProductData.map((item, i) => (
            <FormDetails
              noMargin
              key={i}
              item={item}
              handleChange={handleChange}
            />
          ))}
          {/* BEGINNING OF SHIFT "FROM" INPUT */}
          <label className="input-label" htmlFor="from">
            From:
            <input
              id="dateTimeFlatpickr"
              className="form-control flatpickr flatpickr-input active"
              type="datetime-local"
              name="from"
              onChange={handleChange}
              value={shiftDuration.from}
            />
          </label>
          {/* END OF SHIFT "FROM" INPUT */}
          {/* BEGINNING OF SHIFT "TO" INPUT */}
          <label className="input-label" htmlFor="to">
            To:
            <input
              id="dateTimeFlatpickr"
              className="form-control flatpickr flatpickr-input active"
              type="datetime-local"
              name="to"
              onChange={handleChange}
              value={shiftDuration.to}
            />
          </label>
          {/* END OF SHIFT "TO" INPUT */}
        </div>
        {/* END OF SHIFT INPUT GROUP */}
        <div
          className="shift-calculator-production-capacity-setter"
          style={{ margin: "2rem 0" }}
        >
          <h4 style={{ margin: "4rem 0" }}>Set Production Capacity</h4>
          <div className="range-count">
            <span className="range-count-number">
              {formInput[""] ? formInput[""] : (formInput[""] = 0)}
            </span>
            <span className="range-count-unit">%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            // name="capacity"
            className="custom-range progress-range-counter"
            value={formInput[""]}
            onChange={handleCapacityChange}
          />
        </div>
        {/* BEGINNING OF SUBMIT BUTTON */}
        <button
          onClick={() => calculateShift()}
          type="button"
          name="txt"
          className="mt-4 btn btn-primary"
        >
          Start Shift
        </button>
        {/* END OF SUBMIT BUTTON */}
      </form>
    </div>
  );
};

export default ShiftCalculator;
