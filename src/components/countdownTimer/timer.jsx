import React from "react";

// TIMER COMPONENT
const Timer = ({ circle, shift }) => {
  return (
    // BASED ON THE PROPS PASSED TO THIS COMPONENT, YOU CAN HAVE EITHER A CIRCLE OR ROUNDED SQUARE SHAPED TIMER COMPONENT
    <div id={circle ? "cd-circle" : "cd-simple"}>
      {/* SHIFT PROP IS AN ARRARY CONTAINING TIMER LEGEND AND VALUE PROPERTIES */}
      {shift.map((time, i) => (
        <div key={i} className="countdown">
          <div className="clock-count-container">
            <h1 className="clock-val">{time.value && time.value}</h1>
          </div>
          <h4 className="clock-text"> {time.legend} </h4>
        </div>
      ))}
    </div>
  );
};

export default Timer;
