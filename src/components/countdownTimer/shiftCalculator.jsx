import React from "react";

const ShiftCalculator = ({ calculateShift, handleChange, shiftDuration }) => {
  // SHIFT CALCULATOR TAKES THE INPUTS OF A USER AND FINDS A DIFFERENCE OF THE GIVEN INPUTS TO ASCERTAIN THE DURATION OF A SINGLE SHIFT. ON SUBMIT, THE COUNTDOWN TIMER IS DISPLAYED AND SHIFT CALCULATOR IS REMOVED FROM THE USER INTERFACE
  window.addEventListener("load", () => {
    sessionStorage.clear();
  });
  return (
    <div className="shift-calculator">
      {/* SHIFT COMPONENT TITLE */}
      <h2 id="title">Select your working Hours</h2>
      <form className="form-group mb-0" onSubmit={calculateShift}>
        {/* BEGINNING OF SHIFT INPUT GROUP */}
        <div className="input-group">
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
        {/* BEGINNING OF SUBMIT BUTTON */}
        <input type="submit" name="txt" className="mt-4 btn btn-primary" />
        {/* END OF SUBMIT BUTTON */}
      </form>
    </div>
  );
};

export default ShiftCalculator;
