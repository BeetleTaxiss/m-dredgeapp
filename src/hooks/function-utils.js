import React from "react";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "./API";
import TimelineNotification from "../components/production/timeline-notification";
import { render } from "react-dom";
import { batch } from "pullstate";
import { Link } from "react-router-dom";

// Alerts
const successAlert = (title, text, link, showBtn) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    footer: link,
    showConfirmButton: showBtn ? true : false,
  });
};
const errorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    showConfirmButton: false,
  });
};
// Validate Form entries
export const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

// Login function to
const Login = async (user, password) => {
  const data = JSON.stringify({ user, password });
  console.log("Data: ", data);
  console.log("Username: ", user);
  console.log("Password: ", password);
  return await axios
    .post(`${BASE_API_URL}/api/v1/user/login.php`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.data) {
        const data = response.data.data;
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            username: data.user,
            userType: data.user_type,
          })
        );
      }
      return response.data;
    });
};

// GENERATE RANDOM SERIAL NUMBER FUNCTION
export const generateSerial = () => {
  let chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    serialLength = 10,
    randomSerial = "",
    i,
    randomNumber;

  for (i = 0; i < serialLength; i = i + 1) {
    randomNumber = Math.floor(Math.random() * chars.length);

    randomSerial += chars.substring(randomNumber, randomNumber + 1);

    return { randomSerial };
  }
};

// CALCULATION FUNCTION TO DETERMINE THE COST AND VOLUME OF AN ORDER
export const calculateOrderCost = (bucketPrice, bucketValue, bucketNumber) => {
  // CALCULATE THE COST OF AN ORDER BASED ON GIVEN BUCKET NUMBER VALUE AND BUCKET PRICE
  const orderCost = Math.floor(bucketNumber * bucketPrice);
  // CALCULATE THE VOLUME OF AN ORDER BASED ON GIVEN BUCKET NUMBER VALUE AND CONSTANT BUCKET VOLUME
  const orderVolume = Math.floor(bucketNumber * bucketValue);
  return { orderCost, orderVolume };
};

/**
 * --------------------------------------------------------------------------------------------------------------
 * ------------------------------------Utils Object for storing App logic--------------------------------------
 *--------------------------------------------------------------------------------------------------------------
 */
export const functionUtils = {
  /** 1
   * ----------------------------------------------------------------------------------------------------------
   * ------------------------------------Handle Input Change---------------------------------------------------
   * Handle Input Change is a function that handles the changes in an input field by using a state argument which is passed to a useState function to enables the embeded handleChange fuction set the form property state to a value from any input field that it matches.
   * @param {formState} formState
   * @returns {formInput, handleChange, setFormInput}
   * ---------------------------------------------------------------------------------------------------------
   */
  HandleInputChange: (formState) => {
    /**
     * Form Input state is collated in a form state object so input fields are modelled after the structure of the form state object/Array
     */
    const [formInput, setFormInput] = React.useState(formState);
    /**
     *handle change function matches the name of an input field to its value and calls a setState function to save input value to the formState object. The input name has to be exactly the same with its formInput state property name.
     */
    const handleCapacityChange = ({ currentTarget: { name, value } }) =>
      setFormInput((state) => ({
        ...state,
        [name]: value,
      }));
    /**
     * formInput object, handleChange and setForm Input is returned for external use
     */
    return {
      formInput,
      handleCapacityChange,
      setFormInput,
    };
  },
  /** 2.
   * ----------------------------------------------------------------------------------------------------------
   * ---------------------------------------CountDown Function-------------------------------------------------
   * @param  {setDisplayTimer} setDisplayTimer
   * @param  {setDisplayTimeline} setDisplayTimeline
   * Custom CountDown function which takes the "setState" functions from the above useState hooks to display a countdown time after calculating the duration of a shift and returns a shift array, shift duration and timeline item objects to be used in child components. Functions such as handle change are used to set the values of form inputs in the shift Calculator.
   * ----------------------------------------------------------------------------------------------------------
   */
  CountDown: (
    setDisplayTimer,
    setDisplayTimeline,
    formInput,
    products,
    setProductionDetails,
    timelineItems,
    setTimelineItem
  ) => {
    /**
     * Counter state for countdown timer which tracks time in hours, minutes and seconds
     *  */
    const [counter, setCounter] = React.useState();
    /**
     * Shift duration state to track the "from" and "to" input values from the shift duration form in the shift duration component.
     */
    let time = moment().format("hh:mm");
    const [selectedDate, setSelectedDate] = React.useState();

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const [shiftDuration, setShiftDuration] = React.useState({
      from: "",
      to: "",
    });
    /**
     *  Handle Input Change function for handling input changes in the shift duration component
     *  */
    const handleChange = ({ currentTarget: { name, value } }) => {
      setShiftDuration((state) => ({ ...state, [name]: value }));

      const selectValue = document.getElementById("select").value;
      console.log("Select Value: ", selectValue);

      // Filter Products Array to get single product
      const product = products.filter((product) => product.id === selectValue);
      console.log("Product: ", product);
    };
    /**
     * Counter timer Ref and function to help clear counter when timer values === 0
     */
    const counterId = React.useRef(null);
    const clear = () => clearInterval(counterId.current);
    /**
     * Used to set timeline notifications after the start or end of a shift and during shift duration when production capacity is inputted by the production manager
     */

    /**
     * ----------------------------------------------------------------------------------------------------------
     *----------------------------calculateShift embeded function----------------------------------------------
     * @param {e} e
     * @returns hours, minutes and seconds values
     * Shift calculator function which sets the duration of a single shift
     *---------------------------------------------------------------------------------------------------------
     */
    const calculateShift = () => {
      // e.preventDefault();
      // Variable to get the accurate time a shift started then formated to hours and minutes display and finally used to set the time value property of the timeline item state
      const loggedShiftStart = moment().format("hh:mm");
      const loggedShiftStartDate = moment().format("dd/mm/yy");
      // Variable to set the previous time in the session storage which will help in calculating the duration between two production capacity inputs by the production manager and the logged to the timeline
      const prevLoggedShiftTime = moment();
      // Destructured shift duration state to access the to and from properties which will be used as the values for the date-time input fields in the shift Calculator component
      const { from, to } = shiftDuration;
      // Convert Shift duration form input values to date-time values which can be used in calculations
      let shiftStart = new Date(from),
        shiftEnd = new Date(to),
        // Calaculated difference between both shift duration form values and get the result in milliseconds
        durationInMilliseconds = shiftEnd.getTime() - shiftStart.getTime(),
        // Process to retrive single time values in hours, minutes and seconds from shift duration
        shiftObject = new Date(durationInMilliseconds),
        hours = shiftObject.getUTCHours(),
        minutes = shiftObject.getUTCMinutes(),
        seconds = shiftObject.getSeconds();

      // Add Marker Values to be sent to the server
      const selectValue = document.getElementById("select").value;
      console.log("Select Value: ", selectValue);

      // Filter Products Array to get single product
      const product = products.filter((product) => product.id === selectValue);
      console.log("Product: ", product);
      const productId = product[0].id,
        productName = product[0].product;
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const userId = parseInt(userDetails.id),
        userName = userDetails.username;
      const productionCapacityOnStart = parseInt(formInput[""]);
      const pumping_distance_in_meters = document.getElementById("distance")
        .value;
      const addMarkerData = {
        user: userName,
        "user-id": userId,
        "product-id": productId,
        product: productName,
        "production-capacity": productionCapacityOnStart,
        "start-time": loggedShiftStart,
        "production-date": loggedShiftStartDate,
        "pumping-distance-in-meters": pumping_distance_in_meters,
      };
      console.log("add Marker Values: ", addMarkerData);
      try {
        axios
          .post(
            `${BASE_API_URL}/api/v1/production/add-marker.php`,
            addMarkerData
          )
          .then((res) => {
            alert("Axios Working");
            console.log("Add Marker Data: ", res.data);
            if (res.data.error) {
              let title = "Shift failed",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              // Once the singular time values are gotten, they are set to the component's state using the setCounter function which will start the count down timer. Once this is done, the shift Calculator component is removed from the UI and the countdown timer, production capacity calculator and timeline notifications are shown by setting their respective display states to true while showing an inital timeline notification saying the shift has started.

              setDisplayTimer(true);
              setDisplayTimeline(true);

              timelineItems = timelineItems.concat({
                time: loggedShiftStart,
                dotColor: "primary",
                text: "Shift started",
              });
              setTimelineItem(timelineItems);
              console.log("timeline Items: ", timelineItems);
              res.data["initial_production_capacity"] = formInput[""];
              res.data["product_id"] = productId;
              res.data["product_name"] = productName;
              setProductionDetails(res.data);
              setCounter({ hours, minutes, seconds });

              functionUtils.showTimeLine(
                timelineItems,
                "timeline-notification-single"
              );
            }
          });
      } catch (error) {
        let title = "Shift failed",
          text = error;
        errorAlert(title, text);
      }

      // Set the previous time/start time of the shift on shift start to help ascertain difference in shift durations when production capacity is being calculated
      sessionStorage.setItem("prevTime", prevLoggedShiftTime);
    };
    /**--------------------------------------------------------------------------------------------------------
     * --------------------------------------Count Down Timer--------------------------------------------------
     * Logic to count down shift duration to Zero (0) as calculated in the above calculateShift function
     * --------------------------------------------------------------------------------------------------------
     */
    const countDownTimer = (counter) => {
      // Variable to get the accurate time a shift ended then formated to hours and minutes display and finally used to set the time value property of the timeline item state
      const loggedShiftEnd = moment().format("hh:mm");
      let hours = null;
      let minutes = null;
      let seconds = null;

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
      return { hours, minutes, seconds };
    };

    // NECESSARY VALUES COMPONENTS NEED FOR THE CUSTOM COUNTDOWN HOOK TO FUNCTION
    return {
      // shift,
      shiftDuration,
      // timelineItems,
      handleChange,
      calculateShift,
      selectedDate,
      handleDateChange,
      // setTimelineItems,
      counter,
      setCounter,
      countDownTimer,
    };
  },
  /**HANDLE INPUT CHANGE WITH GETELEMENNT BY ID */
  handleInputChangeWithID: (elementId, updatedElementId) => {
    let value;

    if (document.getElementById(elementId) !== null) {
      value = document.getElementById(elementId).value;
      document.getElementById(updatedElementId).innerHTML = value;
    }
    console.log("Element Value: ", value);
    return value;
  },
  /**Render Time Line Items Dynamically */
  showTimeLine: (timelineItems, targetLayer) => {
    const TimeLineView = <TimelineNotification timelineItems={timelineItems} />;
    console.log(
      "Check if timeline is targeted: ",
      document.getElementById(targetLayer)
    );
    /** render to layer */
    render(TimeLineView, document.getElementById(targetLayer));
  },
  /**Global Variable to track the timeline state and use it to update the final timeline entry when the countdown timer has exhausted it's values */
  globalTimeline: null,
  newTimelineItems: null,
  /** 3.
   * ----------------------------------------------------------------------------------------------------------
   * ---------------------------------getTimeAndProductionStamp------------------------------------------------
   * Function to retrive Time and Production capacity from production manager input
   * @param {formInput} formInput
   * @param {setTimelineItem} formInput
   * ----------------------------------------------------------------------------------------------------------
   */
  getTimeAndProductionStamp: async (
    currentProductionCapacity,
    timelineItems,
    productionDetails,
    products
  ) => {
    // Variable to get the accurate time a given production capacity is logged and it's then formated to hours and minutes display and finally used to set the time value property of the timeline item state
    const loggedProductionTime = moment().format("hh:mm");
    /**Global updated Timeline Array */

    // Variable to set the new time/time a production capacity is inputed which is used to calculate the difference between two logged duration on the timeline and saved to session storage
    const LogTime = moment();
    // Set new logged time in session storage and get previous logged time
    sessionStorage.setItem("New Time", LogTime);
    const getNewLoggedTime = sessionStorage.getItem("New Time");
    const getPrevLoggedTime = sessionStorage.getItem("prevTime");
    const prevloggedProductionTimeToServer = moment(getPrevLoggedTime).format(
      "hh:mm:ss"
    );
    const prevloggedProductionDateToServer = moment(getPrevLoggedTime).format(
      "dd/MM/YY"
    );
    const endloggedProductionTimeToServer = moment().format("hh:mm:ss");
    const newloggedProductionDateToServer = moment().format("dd/MM/YYYY");
    console.log("New logged time: ", getNewLoggedTime);
    console.log("Prev Logged Time: ", getPrevLoggedTime);
    // Convert logged time values to useful time values for calculations
    let prevLoggedTime = new Date(getPrevLoggedTime),
      newLoggedTime = new Date(getNewLoggedTime),
      // Difference between logged values to get duration in milliseconds
      durationInMilliseconds =
        newLoggedTime.getTime() - prevLoggedTime.getTime(),
      // Convert above duration to hours, minutes and seconds to be used in time line notification items
      logObject = new Date(durationInMilliseconds),
      hours = logObject.getUTCHours(),
      minutes = logObject.getUTCMinutes(),
      seconds = logObject.getSeconds();
    console.log("Difference: ", durationInMilliseconds);
    console.log("Start Time in Hours: ", prevloggedProductionTimeToServer);
    console.log("Start Date : ", prevloggedProductionDateToServer);
    /**
     * --------------------------------------------------------------------------------------------------------
     * ---------------------------- SEND ADD MARKER DATA TO SERVER--------------------------------
     * --------------------------------------------------------------------------------------------------------
     * */

    /**
     * --------------------------------------------------------------------------------------------------------
     * ----------------------------BEGINNING OF PRODUCTION CAPACITY CALCULATION--------------------------------
     * --------------------------------------------------------------------------------------------------------
     * */

    let productDetailsActive = false;
    let productDetailsStateless;
    if (productDetailsActive === false) {
      productDetailsStateless = productionDetails;
      productDetailsActive = true;
    }

    /** Temporary / New production capacity */
    const temporaryProductionCapacity = document.getElementById(
      "current-production-capacity"
    ).value;

    console.log("Old Production Capacity", currentProductionCapacity);

    // Production Capacity (in percentage) and time variables
    const MAX_PRODUCTION_OUTPUT = 10000;
    const SECONDS = 3600;
    const DISTANCE_BENCHMARK = 1000;
    const pumping_distance_in_meters = 1200;
    const calDistance = DISTANCE_BENCHMARK / pumping_distance_in_meters;
    const MAX_PRODUCTION_OUTPUT_PER_SECONDS = MAX_PRODUCTION_OUTPUT / SECONDS;
    const MAX_PRODUCTION_CAPACITY = 100 / 100;
    let PRODUCTION_CAPACITY = currentProductionCapacity / 100;

    const PRODUCTION_TIME = durationInMilliseconds / 1000;
    /**
     * MAX PRODUCTION OUTPUT AT PRODUCTION TIME
     */
    const MAX_PRODUCTION_CAPACITY_AT_PRODUCTION_TIME = parseFloat(
      MAX_PRODUCTION_OUTPUT_PER_SECONDS * PRODUCTION_TIME
    );
    /**
     * Production Output at Inputted Production Capacity by Production manager
     */
    const calcProductionOutputPerDistance =
      (PRODUCTION_CAPACITY * MAX_PRODUCTION_CAPACITY_AT_PRODUCTION_TIME) /
      MAX_PRODUCTION_CAPACITY;
    const calcProductionOutput = calcProductionOutputPerDistance * calDistance;

    const productionOutputForUser = Math.round(calcProductionOutput);

    console.log("Output: ", productionOutputForUser);
    console.log("Calculated Production Capacity: ", PRODUCTION_CAPACITY);

    /*---------------------------------------------------------------------------------------------------------
     *-----------------------------------END OF PRODUCTION CAPACITY CALCULATION--------------------------------
    -----------------------------------------------------------------------------------------------------------
     */

    /**
     * Timeline items for notifications. When production capacity falls bellow or above a range of percentages (35%, 50%, 70%),then the timeline item's dot should reflect the rough estimate of the production capacity in colors either danger(red) or warning(yellow) for bellow 50% and secondary(blue) or success(green) for above 50%
     */
    const updatedTimelineItems = (
      timelineItems,
      currentProductionCapacity,
      newTimelineItems
    ) => {
      console.log("Previous Timeline Array: ", timelineItems);
      timelineItems = timelineItems.concat({
        time: loggedProductionTime,
        dotColor: `${
          currentProductionCapacity < 35
            ? "danger"
            : currentProductionCapacity < 50
            ? "warning"
            : currentProductionCapacity < 70
            ? "secondary"
            : currentProductionCapacity > 70
            ? "success"
            : "secondary"
        }`,
        text: `Production running at ${currentProductionCapacity}%`,
        timeSpent: `${hours ? hours : "0"} hrs : ${
          minutes ? minutes : "0"
        } mins :  ${seconds ? seconds : "0"} secs `,
        productionOutput: `Production output per hour: ${productionOutputForUser}cm³ `,
      });

      console.log("Mutated Timeline Array: ", timelineItems);
      functionUtils.showTimeLine(timelineItems, "timeline-notification-single");
      functionUtils.globalTimeline = timelineItems;
    };

    const userDetails = JSON.parse(localStorage.getItem("user"));
    const userId = parseInt(userDetails.id);
    const userName = userDetails.username;
    const productId = parseInt(productDetailsStateless.product_id);
    const productName = productDetailsStateless.product_name;
    const production_id = productDetailsStateless.production_id;
    const batch_no = productDetailsStateless.batch_no;
    /**Add Stop Production Data */
    const addStopMarkerData = {
      user: userName,
      "user-id": userId,
      "product-id": productId,
      product: productName,
      "production-capacity": temporaryProductionCapacity,
      "start-time": prevloggedProductionTimeToServer,
      "production-id": production_id,
      "batch-no": batch_no,
      "end-time": endloggedProductionTimeToServer,
      "total-qty-pumped": calcProductionOutput,
      "duration-pumped-in-seconds": PRODUCTION_TIME,
      "pumping-distance-in-meters": pumping_distance_in_meters,
      "production-date": prevloggedProductionDateToServer,
    };

    /** Stop Marker production data */

    const stopMarkerData = {
      "product-id": productId,
      "production-id": production_id,
      "batch-no": batch_no,
      "end-time": endloggedProductionTimeToServer,
      "total-qty-pumped": calcProductionOutput,
      "duration-pumped-in-seconds": PRODUCTION_TIME,
    };
    let restartMarker = null;
    const restartStopMarker = () => {
      restartMarker = setTimeout(
        () => document.getElementById("stop-marker").click(),
        20000
      );
      return restartMarker;
    };

    let stopStartProductionBtnId = document.getElementById("stop-start-marker");
    let stopProductionBtnId = document.getElementById("stop-marker");
    if (stopStartProductionBtnId) {
      console.log("Stop start marker working");
      console.log("Button clicked: ", stopStartProductionBtnId);

      const response = await axios
        .post(
          `${BASE_API_URL}/api/v1/production/stop-add-marker.php`,
          addStopMarkerData
        )
        .catch((error) => {
          const title = "Error Response",
            text = error;
          errorAlert(title, text);
        });

      console.log("Add Stop Marker Response Data: ", response.data);
      if (response.data.error) {
        const title = "Server Error Response",
          text = response.data.message;
        errorAlert(title, text);
      } else {
        productDetailsStateless.production_id = response.data.production_id;
        productDetailsStateless.batch_no = response.data.batch_no;
        /**
         * Timeline items for notifications. When production capacity falls bellow or above a range of percentages (35%, 50%, 70%),then the timeline item's dot should reflect the rough estimate of the production capacity in colors either danger(red) or warning(yellow) for bellow 50% and secondary(blue) or success(green) for above 50%
         */
        updatedTimelineItems(
          timelineItems,
          currentProductionCapacity,
          functionUtils.newTimelineItems
        );

        currentProductionCapacity = temporaryProductionCapacity;
        // Set the previous time of the shift while shift is running to help ascertain difference in shift durations when production capacity is being calculated
        sessionStorage.setItem("prevTime", getNewLoggedTime);
      }
    } else if (stopProductionBtnId) {
      /** Axios call to end production Marker once timer runs out */
      console.log("Stop Marker working");
      console.log("Button  clicked stop", stopProductionBtnId);

      axios
        .put(
          `${BASE_API_URL}/api/v1/production/stop-marker.php`,
          stopMarkerData
        )
        .then((res) => {
          console.log("Stop marker response: ", res.data);
          if (res.data.error) {
            const title = "Server Error Response",
              text = res.data.message;
            errorAlert(title, text);
            restartStopMarker();
          } else {
            const title = "Shift ended Successfully",
              text = `Start new shift? Click the link below: ${res.data.message}`,
              link = "<a href='/production'>Start New Production</a>";
            successAlert(title, text, link);
            clearTimeout(restartMarker);
            document.getElementById("stop-marker").id = "stop-start-marker";
          }
        })
        .catch((error) => {
          console.log("Error occurred", error);
          const title = "Network Error",
            text = `Network not available, try switching on your network/data: ${error}`;
          errorAlert(title, text);
          restartStopMarker();
        });
    }

    /*---------------------------------------------------------------------------------------------------------
     *-----------------------------------END MARKER AND SEND PRODUCTION DATA TO SERVER ------------------------
    -----------------------------------------------------------------------------------------------------------
     */

    return timelineItems;
  },

  /**End Timeline function which takes timeline values and adds it's item to the previous timeline array by using the global timeline variable*/
  endTimeline: (endTimelineItem, timelineItems) => {
    console.log("End TimeLine Item: ", endTimelineItem);
    if (functionUtils.globalTimeline === null) {
      functionUtils.globalTimeline = timelineItems;
    }
    functionUtils.globalTimeline = functionUtils.globalTimeline.concat(
      endTimelineItem
    );
    console.log("Global timeline: ", functionUtils.globalTimeline);
    functionUtils.showTimeLine(
      functionUtils.globalTimeline,
      "timeline-notification-single"
    );
    // alert("How many times ran?", console.log("Alert ran 1 time"));
    // return globalTimeline;
  },
  /** 4.
   * ----------------------------------------------------------------------------------------------------------
   * ------------------------------------HANDLE ORDER FORM SUBMIT FUNCTION-------------------------------------
   * @param  {formInput} formInput
   * ----------------------------------------------------------------------------------------------------------
   */
  handleOrderChange: (products, setTotalPrice, qtyValue, selectValue) => {
    // Get form values with document,getById

    // Filter Products Array to get single product
    const product = products.filter((product) => product.id === selectValue);
    console.log("Product: ", product);
    // Calculate the cost of an order
    const orderCost = qtyValue * product[0].price;
    console.log("Order Cost: ", orderCost);
    // Set the value of an order to the UI
    setTotalPrice(orderCost);

    return {
      product,
    };
  },
  /**
   * @param  {} handleOrderChange
   * @param  {} totalPrice
   */
  handleOrderSubmit: (
    handleOrderChange,
    totalPrice,
    qtyValue,
    truckNoValue,
    selectValue
  ) => {
    const { product } = handleOrderChange();
    console.log("Submitted Product", product);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User Object: ", user);
    const addOrderData = {
      "product-id": selectValue,
      product: product[0].product,
      user: user.username,
      "user-id": user.id,
      qty: qtyValue,
      unit: product[0].unit,
      "unit-price": product[0].price,
      measurement: product[0].measurement,
      "total-price": totalPrice,
      "truck-no": truckNoValue,
      description: product[0].description,
    };
    axios
      .post(`${BASE_API_URL}/api/v1/order/add.php`, addOrderData)
      .then((res) => console.log("ADD ORDER: ", res.data));
  },
  /** 5.
   * -----------------------------------------------DELETE ORDER-----------------------------------------------
   * @param  {order_id} order_id
   * @param  {order_ref} order_ref
   * ----------------------------------------------------------------------------------------------------------
   */
  handleDeleteOrder: async (id, order_ref) => {
    const request = await axios.post(
      `${BASE_API_URL}/api/v1/order/delete.php`,
      { "order-id": id, "order-ref": order_ref }
    );
    const response = request.data;
    if (response.error === false) {
      // window.refresh();
    }
    console.log("Order deleted? ", response);
    console.log("Order Id ", id);
    console.log("Order Ref ", order_ref);
  },
  /** 5.
   * ----------------------------------------------------------------------------------------------------------
   *-------------------------------------------Handle Unit form Submit-----------------------------------------
   * @param  {formInput} formInput
   * @param  {setDisplayUnitList} setDisplayUnitList
   * @param  {setFormInput} setFormInput
   * ----------------------------------------------------------------------------------------------------------
   */
  handleUnitFormSubmit: (formInput, setDisplayUnitList, setFormInput) => {
    console.log(formInput);
    setDisplayUnitList(true);
    // setFormInput({
    //   product: "",
    //   description: "",
    //   unit: "",
    //   measurement: "",
    // });
  },
  /** 6.
   * ----------------------------------------------------------------------------------------------------------
   * -----------------------------------------Handle Unit Update-----------------------------------------------
   * @param  {formInput} formInput
   * @param  {setDisplayUnitList} setDisplayUnitList
   * @param  {setFormInput} setFormInput
   * ----------------------------------------------------------------------------------------------------------
   */
  handleUnitUpdate: (formInput, setDisplayUnitList, setFormInput) => {
    console.log(formInput);
    // setDisplayUnitList(true);
    // setFormInput({
    //   product: "",
    //   description: "",
    //   unit: "",
    //   measurement: "",
    // });
  },
  /** 7.
   * ----------------------------------------------------------------------------------------------------------
   * ---------------------------------------Handle Post Expense------------------------------------------------
   * @param  {formInput} formInput
   * @param  {setFormInput} setFormInput
   * ----------------------------------------------------------------------------------------------------------
   */
  handlePostExpense: (formInput, setFormInput) => {
    console.log("Expense: ", formInput);

    // setDisplayUnitList(true);
    // setFormInput({
    //   product: "",
    //   description: "",
    //   unit: "",
    //   measurement: "",
    // });
  },
  /** 8.
   * ----------------------------------------------------------------------------------------------------------
   * ----------------------------------- Sign-In Form Submit---------------------------------------------------
   * @param  {errors} errors
   * @param  {user} user
   * @param  {password} password
   * @param  {setUser} setUser
   * @param  {history} history
   * @param  {loaction} location
   * ----------------------------------------------------------------------------------------------------------
   */
  SignInFormSubmit: (errors, user, password, history, location) => {
    const handleSubmit = (event) => {
      event.preventDefault();

      if (validateForm(errors)) {
        console.info("Valid Form");
      } else {
        console.error("Invalid Form");
      }

      try {
        Login(user.user, password.password).then((response) => {
          console.log("login object", response);
          console.log("login object", user.user);
          console.log("login object", password.password);
          const { state } = location;
          if (response.data) {
            history.push({
              pathname: state?.from || `/dashboard`,
              state: response.data,
            });
            // history.push(state?.from || `/dashboard/${user.user}`);
          }
        });
      } catch (error) {
        console.error("Error in creating User Docs", error);
      }
    };
    return handleSubmit;
  },
  /** 9.
   * ----------------------------------------------------------------------------------------------------------
   * ----------------------------------------Sign-In Form Change-----------------------------------------------
   * @param  {errors} errors
   * @param  {setErrors} setErrors
   * @param  {setUsername} setUsername
   * @param  {setPassword} setPassword
   * ----------------------------------------------------------------------------------------------------------
   */
  SignInFormChange: (errors, setErrors, setUsername, setPassword) => {
    const handleChange = (event) => {
      const { name, value } = event.target;

      switch (name) {
        case "user":
          errors.user =
            value.length < 5
              ? "Full Name must be at least 5 characters long!"
              : "";
          break;
        case "password":
          errors.password =
            value.length < 4
              ? "Password must be at least 8 characters long!"
              : "";
          break;
        default:
          break;
      }

      event.target.name === "user"
        ? setUsername({ [name]: value })
        : event.target.name === "password"
        ? setPassword({ [name]: value })
        : alert("Wrong form Selection");
    };
    return handleChange;
  },
};
