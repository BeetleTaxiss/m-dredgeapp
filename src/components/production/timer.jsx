import React from "react";
import axios from "axios";
import { functionUtils } from "../../hooks/function-utils";
import moment from "moment";

// TIMER COMPONENT
const Timer = ({ circle, counter, setCounter, timelineItems }) => {
  console.log("State: ", counter);
  let timerEnd = false;
  /** Stop marker boolen to start stop-marker axios call */
  let stopMarker = false;
  const countDownTimer = (counter) => {
    // Variable to get the accurate time a shift ended then formated to hours and minutes display and finally used to set the time value property of the timeline item state

    let hours = counter.hours;
    let minutes = counter.minutes;
    let seconds = counter.seconds;
    console.log("Counter: ", counter);
    // TIMER LOGIC WHICH MIMICKS AN ACTIVE CLOCK
    if (counter.seconds > 0) {
      seconds = counter.seconds - 1;
    } else if (counter.seconds === 0 && counter.minutes > 0) {
      minutes = counter.minutes - 1;
      seconds = 60;
    } else if (counter.minutes === 0 && counter.hours > 0) {
      hours = counter.hours - 1;
      minutes = 60;
    } else if (counter.hours === 0) {
      hours = 0;
    } else if (counter.hours === 0 && counter.minutes === 0) {
      hours = 0;
      minutes = 0;
    } else if (
      counter.hours === 0 &&
      counter.minutes === 0 &&
      counter.seconds === 0
    ) {
      hours = 0;
      minutes = 0;
      seconds = 0;
    }
    console.log("Counter Seconds: ", counter.seconds);
    console.log("Variable Seconds: ", seconds);
    return { hours, minutes, seconds };
  };
  let timerRunning = false;
  let timer = null;
  if (timerRunning === false) {
    /**  assign to initial state counter */
    timer = { ...counter };
    console.log("Counter Timer: ", timer);
    timerRunning = true;
    setCounter("");
  }
  const clear = (timerStatus) => {
    clearInterval(timerStatus);
  };
  // window.onunload = clear();

  const updateClockTimer = (elementId, value) => {
    if (value !== undefined && document.getElementById(elementId) !== null) {
      document.getElementById(elementId).innerHTML = value;
    }
  };

  const timerStatus = setInterval(() => {
    const currentTimer = countDownTimer(timer);
    /** update timer for next clock tick */
    timer = { ...currentTimer };

    // console.log("Current time", currentTimer);
    updateClockTimer("clock-face-hours", timer.hours);
    updateClockTimer("clock-face-minutes", timer.minutes);
    updateClockTimer("clock-face-seconds", timer.seconds);
    /** update the clockface  */

    if (
      timer.minutes === 0 &&
      timer.seconds === 0 &&
      timer.hours === 0 &&
      timerEnd === false
    ) {
      /** Axios call to end production Marker once timer runs out */
      stopMarker = true;
      const loggedShiftEnd = moment().format("hh:mm");
      let endTimelineItem = {
        time: loggedShiftEnd,
        dotColor: "primary",
        text: "Shift ended",
      };
      console.log(
        "stop marker working: ",
        document.getElementById("stop-start-marker")
      );
      if (document.getElementById("stop-start-marker") !== null) {
        document.getElementById("stop-start-marker").id = "stop-marker";
        document.getElementById("stop-marker").click();
      }

      console.log("Mutated Timeline Array: ", timelineItems);
      functionUtils.endTimeline(endTimelineItem, timelineItems);
      // clear(timerStatus);
      clearInterval(timerStatus);
      console.log("Timeline at end of shift: ", timelineItems);

      timerEnd = true;
    }
  }, 1000);

  return (
    // BASED ON THE PROPS PASSED TO THIS COMPONENT, YOU CAN HAVE EITHER A CIRCLE OR ROUNDED SQUARE SHAPED TIMER COMPONENT
    <div id={circle ? "cd-circle" : "cd-simple"}>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-hours"></h1>
        </div>
        <h4 className="clock-text"> Hours </h4>
      </div>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-minutes"></h1>
        </div>
        <h4 className="clock-text"> Minutes </h4>
      </div>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-seconds"></h1>
        </div>
        <h4 className="clock-text"> Seconds </h4>
      </div>
    </div>
  );
};

export default Timer;
