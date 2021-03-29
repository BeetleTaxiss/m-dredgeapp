import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

export const useCountDown = (setDisplayTimer, setDisplayTimeline) => {
  // COUNTER STATE FOR TIMER
  const [counter, setCounter] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // SHIFT DURATION STATE FOR DATE-TIME FORM INPUT
  const [shiftDuration, setShiftDuration] = useState({
    from: "",
    to: "",
  });

  // TIMELINE STATE
  const [timelineItems, setTimelineItems] = useState([]);

  // COUNTER REF TO HELP CLEAR COUNTER WHEN TIMER VALUE IS === 0
  const counterId = useRef(null);

  // HANDLE CHANGE FUNCTION TO TRACK CHANGES IN FORM INPUTS
  const handleChange = ({ currentTarget: { name, value } }) =>
    setShiftDuration((state) => ({ ...state, [name]: value }));

  // CALCULATOR FUNCTION TO SET THE DURATION OF A SINGLE SHIFT
  const calculateShift = (e) => {
    e.preventDefault();
    const { from, to } = shiftDuration;

    const loggedShiftStart = moment().format("hh:mm");
    const LogShiftTime = moment();

    let shiftStart = new Date(from);
    let shiftEnd = new Date(to);
    // DIFFERENCE BETWEEN SHIFT VALUES TO GET SHIFT DURATION IN MILLISECONDS
    let durationInMilliseconds = shiftEnd.getTime() - shiftStart.getTime();
    // PROCESS TO CONVERT SHIFT DURATION ABOVE TO HOURS, MINUTES AND SECONDS
    let shiftObject = new Date(durationInMilliseconds);
    let hours = shiftObject.getUTCHours(),
      minutes = shiftObject.getUTCMinutes(),
      seconds = shiftObject.getSeconds();
    // SET THE STATE OF THE COUNTER/TIMER COMPONENT FOR DISPLAY
    setCounter({ hours, minutes, seconds });
    // SET THE DISPLAY STATE TO TRANSITION FROM SHIFT CALCULATION TO TIMER AND PRODUCTION CAPACITY DISPLAY
    setDisplayTimer(true);
    setDisplayTimeline(true);
    setTimelineItems((state) => [
      ...state,
      {
        time: loggedShiftStart,
        dotColor: "primary",
        text: "Shift started",
      },
    ]);

    sessionStorage.setItem("prevTime", LogShiftTime);

    return { hours, minutes, seconds };
  };

  // FUNCTION TO CLEAR SET INTERVAL FUNCTION ONCE TIMER VALUES REACH ZERO (0)
  const clear = () => clearInterval(counterId.current);

  // COUNT DOWN TIMER FUNCTION TO COUNTDOWN FROM DURATION START TO DURATION END
  const countDownTimer = () => {
    // LOGGED SHIFT END TIMESTAMP
    const loggedShiftEnd = moment().format("hh:mm");

    // TIMER LOGIC WHICH MIMICKS AN ACTIVE CLOCK
    if (counter.seconds > 0) {
      setCounter((count) => ({
        ...count,
        seconds: count.seconds - 1,
      }));
    } else if (counter.seconds === 0 && counter.minutes > 0) {
      setCounter((count) => ({
        ...count,
        minutes: count.minutes - 1,
        seconds: 60,
      }));
    } else if (counter.minutes === 0 && counter.hours > 0) {
      setCounter((count) => ({
        ...count,
        hours: count.hours - 1,
        minutes: 60,
      }));
    } else if (counter.hours === 0) {
      setCounter((count) => ({
        ...count,
        hours: 0,
      }));
    } else if (counter.hours === 0 && counter.minutes === 0) {
      setCounter((count) => ({
        ...count,
        hours: 0,
        minutes: 0,
      }));
    } else if (
      counter.hours === 0 &&
      counter.minutes === 0 &&
      counter.seconds === 0
    ) {
      setCounter((count) => ({
        ...count,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }));
      setDisplayTimeline((state) => [
        ...state,
        {
          time: loggedShiftEnd,
          dotColor: "primary",
          text: "Shift ended",
        },
      ]);
    }
  };

  // ON MOUNT SIDE EFFECT WHICH STARTS COUNT DOWN TIMER AND REPEATS EVERY ONE SECOND
  useEffect(() => {
    counterId.current = setInterval(countDownTimer, 1000);
    return () => {
      clear();
    };
  });

  // LOGIC TO CLEAR SET INTERVAL ONCE ALL TIMER VALUES ARE EQUAL TO ZERO
  useEffect(() => {
    if (counter.minutes === 0 && counter.seconds === 0 && counter.hours === 0) {
      clear();
    }
  }, [counter]);

  // SHIFT DISPLAY ARRAY WHICH IS MAPPED OVER TO PRODUCE TIMER VALUES. IT CONTAINS A TIMER LEGEND AND VALUE
  const shift = [
    { legend: "Hours", value: counter.hours },
    { legend: "Mins", value: counter.minutes },
    { legend: "Secs", value: counter.seconds },
  ];

  // NECESSARY VALUES COMPONENTS NEED FOR THE CUSTOM COUNTDOWN HOOK TO FUNCTION
  return {
    shift,
    shiftDuration,
    timelineItems,
    handleChange,
    calculateShift,
    setTimelineItems,
  };
};
