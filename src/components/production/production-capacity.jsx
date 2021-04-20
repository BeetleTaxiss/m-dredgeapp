import React from "react";

const ProductionCapacity = ({
  timelineItems,
  handleSubmit,
  formInput,
  handleChange,
}) => {
  console.log("Rnage Count: ", document.getElementById("range-count-number"));
  // if (document.getElementById("range-count-number") === "undefined%") {
  //   document.getElementById("range-count-number").innerHTML = 0;
  // }
  return (
    <div className="custom-progress progress-up" style={{ width: "100%" }}>
      <div className="range-count">
        <span id="range-count-number" className="range-count-number">
          0
        </span>
        <span className="range-count-unit">%</span>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="range"
          min="0"
          max="100"
          id="current-production-capacity"
          className="custom-range progress-range-counter"
          onChange={handleChange}
        />
        <button
          onClick={() => handleSubmit()}
          name="txt"
          id="stop-start-marker"
          className="mt-4 btn btn-primary"
        >
          Add Production Capacity
        </button>
      </form>
    </div>
  );
};

export default ProductionCapacity;
