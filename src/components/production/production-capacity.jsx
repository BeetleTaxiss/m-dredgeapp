import React from "react";
import { FormDetails } from "../orders/order-form/order-form-details";

const ProductionCapacity = ({
  timelineItems,
  handleSubmit,
  formInput,
  handleChange,
  distanceFormData,
}) => {
  console.log("Range Count: ", document.getElementById("range-count-number"));
  // if (document.getElementById("range-count-number") === "undefined%") {
  //   document.getElementById("range-count-number").innerHTML = 0;
  // }
  return (
    <div className="custom-progress progress-up" style={{ width: "100%" }}>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "flex", flexDirection: "column" }}
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
            {distanceFormData.distance.map((item, i) => (
              <FormDetails
                color="#4361ee"
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
            {distanceFormData.elevation.map((item, i) => (
              <FormDetails
                color="#4361ee"
                displayHalf
                key={i}
                item={item}
                handleChange={handleChange}
              />
            ))}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "2rem 0 2rem",
            gap: "0.5rem",
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            id="current-production-capacity"
            className="custom-range progress-range-counter slider"
            onChange={handleChange}
          />
          <div className="range-count">
            <span id="range-count-number" className="range-count-number">
              0
            </span>
            <span className="range-count-unit">%</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <button
            onClick={() => handleSubmit()}
            name="txt"
            id="stop-start-marker"
            className="mt-4 btn btn-primary"
            style={{ width: "16rem", height: "3rem", fontSize: "1rem" }}
          >
            Update Production Capacity
          </button>
          <button
            onClick={() => handleSubmit()}
            name="txt"
            id="pause-marker"
            className="mt-4 btn btn-primary"
            style={{ width: "16rem", height: "3rem", fontSize: "1rem" }}
          >
            {document.getElementById("pause-marker")
              ? "Pause Shift"
              : "Resume Shift"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductionCapacity;
