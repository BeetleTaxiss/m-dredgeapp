import React, { useState } from "react";
import { useCountDown } from "../../hooks/useCountDown";
import Timer from "./timer";
import ShiftCalculator from "./shiftCalculator";
import TimelineNotification from "./timelineNotification";
import ProductionCapacity from "./productionCapacity";

export const CountdownTimer = () => {
  // DISPLAY STATES FOR TIMER, PRODUCTION-CAPACITY AND TIMELINE COMPONENTS
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayTimeLine, setDisplayTimeLine] = useState(false);

  // CUSTOM COUNTDOWN HOOK
  const {
    shift,
    shiftDuration,
    timelineItems,
    handleChange,
    calculateShift,
    setTimelineItems,
  } = useCountDown(setDisplayTimer, setDisplayTimeLine);

  return (
    <div className="col-xl-12 col-lg-12 layout-spacing">
      <div className="widget-content-area">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            paddingTop: "3rem",
            marginTop: "128px",
            // alignItems: "center",
          }}
        >
          {/* ON SHIFT DURATION CALCULATED, TIMER IS DISPLAYED AND SHIFT CALCULATOR DISAPPEARS */}
          {displayTimer ? (
            <Timer shift={shift} />
          ) : (
            <ShiftCalculator
              shiftDuration={shiftDuration}
              handleChange={handleChange}
              calculateShift={calculateShift}
              setTimeline={setDisplayTimeLine}
            />
          )}

          {/* ON SHIFT DURATION CALCULATED, PRODUCTION CAPACITY GENERATOR IS DISPLAYED */}
          {displayTimer ? (
            <ProductionCapacity
              setTimeLine={setDisplayTimeLine}
              setTimelineItem={setTimelineItems}
            />
          ) : null}

          {/* ON SHIFT DURATION CALCULATED, TIMELINE IS DISPLAYED */}
          {displayTimeLine ? (
            <TimelineNotification timelineItems={timelineItems} />
          ) : null}
          {/* <TimelineNotification timelineItems={timelineItems} /> */}
        </div>
      </div>
    </div>
  );
};
