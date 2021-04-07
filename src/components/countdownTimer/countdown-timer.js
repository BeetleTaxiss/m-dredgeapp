import React, { useState } from "react";
import Timer from "./timer";
import ShiftCalculator from "./shift-calculator";
import TimelineNotification from "./timeline-notification";
import ProductionCapacity from "./production-capacity";
import PageWrapper from "../general/page-wrapper";
import { functionUtils } from "../../hooks/function-utils";

export const CountdownTimer = () => {
  // DISPLAY STATES FOR TIMER, PRODUCTION-CAPACITY AND TIMELINE COMPONENTS
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayTimeLine, setDisplayTimeLine] = useState(false);

  /**
   * Custom CountDown function which takes the "setState" functions from the above useState hooks to display a countdown time after calculating the duration of a shift and returns a shift array, shift duration and timeline item objects to be used in child components. Functions such as handle change are used to set the values of form inputs in the shift Calculator.
   */
  const {
    shift,
    shiftDuration,
    timelineItems,
    handleChange,
    calculateShift,
    setTimelineItems,
  } = functionUtils.CountDown(setDisplayTimer, setDisplayTimeLine);

  return (
    <PageWrapper>
      <div className="col-xl-12 col-lg-12 layout-spacing">
        <div className="widget-content-area">
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
              padding: "3rem",
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
    </PageWrapper>
  );
};
