import moment from "moment";
import React from "react";
import { getShiftPausedStatus } from "../../hooks/function-utils";
import { FormDetails } from "../orders/order-form/order-form-details";

export const toggleBtnText = () => {
  const toggleBtnId =
    document.getElementById("pause-marker") ||
    document.getElementById("resume-marker");

  const toggleText = toggleBtnId.innerText;

  if (toggleText === "Pause Shift") {
    toggleBtnId.innerText = "Resume Shift";
  } else if (toggleText === "Resume Shift") {
    toggleBtnId.innerText = "Pause Shift";
  }
};
const ProductionCapacity = ({
  timelineItems,
  handleSubmit,
  formInput,
  handleChange,
  distanceFormData,
}) => {
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
            data-run-stop-start-marker="true"
            className="mt-4 btn btn-primary"
            style={{ width: "16rem", height: "3rem", fontSize: "1rem" }}
          >
            Update Production Capacity
          </button>
          <button
            onClick={async () => {
              let isShiftPaused;
              isShiftPaused = getShiftPausedStatus();

              let stopStartProductionBtnId =
                document.getElementById("stop-start-marker");

              if (isShiftPaused === false) {
                if (stopStartProductionBtnId !== null) {
                  stopStartProductionBtnId.dataset.runStopStartMarker = false;
                }

                let pauseProductionBtnId =
                  document.getElementById("pause-marker");

                if (pauseProductionBtnId !== null) {
                  pauseProductionBtnId.dataset.runPauseResumeMarker = true;
                  // toggleBtnText();
                }
              }

              await handleSubmit();

              setTimeout(() => {
                isShiftPaused = getShiftPausedStatus();
                if (isShiftPaused === true) {
                  cleanUpProductionId(isShiftPaused);
                }
              }, 5000);

              const cleanUpProductionId = (isShiftPaused) => {
                if (isShiftPaused === true) {
                  let resumeProductionBtnId =
                    document.getElementById("resume-marker");
                  if (resumeProductionBtnId !== null) {
                    resumeProductionBtnId.dataset.runPauseResumeMarker = false;
                    stopStartProductionBtnId.dataset.runStopStartMarker = true;
                  }
                  // toggleBtnText();
                }
              };
            }}
            name="txt"
            id="pause-marker"
            data-run-pause-resume-marker="false"
            data-btn-text=""
            className="mt-4 btn btn-warning"
            style={{ width: "16rem", height: "3rem", fontSize: "1rem" }}
          >
            Pause Shift
          </button>

          <button
            onClick={async () => {
              const loggedShiftEnd = moment().format("hh:mm");
              let endTimelineItem = {
                time: loggedShiftEnd,
                dotColor: "primary",
                text: "Shift ended",
              };
              if (document.getElementById("stop-start-marker") !== null) {
                document.getElementById("stop-start-marker").id = "stop-marker";
                await handleSubmit();
              }
            }}
            name="txt"
            id="stop-marker"
            data-run-stop-marker="false"
            data-btn-text=""
            className="mt-4 btn btn-danger"
            style={{ width: "16rem", height: "3rem", fontSize: "1rem" }}
          >
            End Shift
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductionCapacity;
