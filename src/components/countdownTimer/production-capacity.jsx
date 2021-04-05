import React from "react";

import { functionUtils } from "../../hooks/function-utils.js";

const ProductionCapacity = ({ setTimeLine, setTimelineItem }) => {
  /**
   * Form state to be made avaliable to handle Input Change function
   *  */
  const formState = {};
  /**
   *  Handle Input Change function for handling input changes across multiple forms if required, in this case we are concerned about the range count input field
   *  */
  const { formInput, handleChange } = functionUtils.HandleInputChange(
    formState
  );

  return (
    <div className="custom-progress progress-up" style={{ width: "100%" }}>
      <div className="range-count">
        <span className="range-count-number">
          {formInput[""] ? formInput[""] : (formInput[""] = 0)}
        </span>
        <span className="range-count-unit">%</span>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="range"
          min="0"
          max="100"
          className="custom-range progress-range-counter"
          value={formInput[""]}
          onChange={handleChange}
        />
        <button
          onClick={() =>
            functionUtils.getTimeAndProductionStamp(formInput, setTimelineItem)
          }
          name="txt"
          className="mt-4 btn btn-primary"
        >
          Add Production Capacity
        </button>
      </form>
    </div>
  );
};

export default ProductionCapacity;
