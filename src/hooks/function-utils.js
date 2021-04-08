import React from "react";
import moment from "moment";
import axios from "axios";
import { BASE_API_URL } from "./API";

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
    const handleChange = ({ currentTarget: { name, value } }) =>
      setFormInput((state) => ({
        ...state,
        [name]: value,
      }));
    /**
     * formInput object, handleChange and setForm Input is returned for external use
     */
    return {
      formInput,
      handleChange,
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
  CountDown: (setDisplayTimer, setDisplayTimeline) => {
    /**
     * Counter state for countdown timer which tracks time in hours, minutes and seconds
     *  */
    const [counter, setCounter] = React.useState({
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    /**
     * Shift duration state to track the "from" and "to" input values from the shift duration form in the shift duration component.
     */
    const [shiftDuration, setShiftDuration] = React.useState({
      from: "",
      to: "",
    });
    /**
     *  Handle Input Change function for handling input changes in the shift duration component
     *  */
    const handleChange = ({ currentTarget: { name, value } }) =>
      setShiftDuration((state) => ({ ...state, [name]: value }));
    /**
     * Counter timer Ref and function to help clear counter when timer values === 0
     */
    const counterId = React.useRef(null);
    const clear = () => clearInterval(counterId.current);
    /**
     * Used to set timeline notifications after the start or end of a shift and during shift duration when production capacity is inputted by the production manager
     */
    const [timelineItems, setTimelineItems] = React.useState([]);
    /**
     * ----------------------------------------------------------------------------------------------------------
     *----------------------------calculateShift embeded function----------------------------------------------
     * @param {e} e
     * @returns hours, minutes and seconds values
     * Shift calculator function which sets the duration of a single shift
     *---------------------------------------------------------------------------------------------------------
     */
    const calculateShift = (e) => {
      e.preventDefault();
      // Variable to get the accurate time a shift started then formated to hours and minutes display and finally used to set the time value property of the timeline item state
      const loggedShiftStart = moment().format("hh:mm");
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
      // Once the singular time values are gotten, they are set to the component's state using the setCounter function which will start the count down timer. Once this is done, the shift Calculator component is removed from the UI and the countdown timer, production capacity calculator and timeline notifications are shown by setting their respective display states to true while showing an inital timeline notification saying the shift has started.
      setCounter({ hours, minutes, seconds });
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
      // Set the previous time/start time of the shift on shift start to help ascertain difference in shift durations when production capacity is being calculated
      sessionStorage.setItem("prevTime", prevLoggedShiftTime);
    };
    /**--------------------------------------------------------------------------------------------------------
     * --------------------------------------Count Down Timer--------------------------------------------------
     * Logic to count down shift duration to Zero (0) as calculated in the above calculateShift function
     * --------------------------------------------------------------------------------------------------------
     */
    const countDownTimer = () => {
      // Variable to get the accurate time a shift ended then formated to hours and minutes display and finally used to set the time value property of the timeline item state
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
    // On Timer component mount, side effect starts countDownTimer function and repeats every one second with the help of a setinterval function until all time values are equals to zero
    React.useEffect(() => {
      counterId.current = setInterval(countDownTimer, 1000);
      return () => {
        clear();
      };
    });
    // Side effect which clears the interval function and stops the countDownTimer when all time values are zero simultaneously
    React.useEffect(() => {
      if (
        counter.minutes === 0 &&
        counter.seconds === 0 &&
        counter.hours === 0
      ) {
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
  },

  /** 3.
   * ----------------------------------------------------------------------------------------------------------
   * ---------------------------------getTimeAndProductionStamp------------------------------------------------
   * Function to retrive Time and Production capacity from production manager input
   * @param {formInput} formInput
   * @param {setTimelineItem} formInput
   * ----------------------------------------------------------------------------------------------------------
   */
  getTimeAndProductionStamp: async (formInput, setTimelineItem) => {
    // Variable to get the accurate time a given production capacity is logged and it's then formated to hours and minutes display and finally used to set the time value property of the timeline item state
    const loggedProductionTime = moment().format("hh:mm");

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
    const newloggedProductionTimeToServer = moment().format("hh:mm:ss");
    const newloggedProductionDateToServer = moment().format("dd/MM/YY");
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
     * ---------------------------- GET PRODUCT VARIABLES FROM SERVER--------------------------------
     * --------------------------------------------------------------------------------------------------------
     * */
    const PRODUCT_URL = `${BASE_API_URL}/api/v1/product/list.php`;

    let request = await axios.get(PRODUCT_URL, { id: 1 });

    const productResponse = await request?.data?.data[0];

    console.log("Product Details: ", productResponse);
    /**
     * --------------------------------------------------------------------------------------------------------
     * ---------------------------- SEND ADD MARKER DATA TO SERVER--------------------------------
     * --------------------------------------------------------------------------------------------------------
     * */

    const PREV_PRODUCTION_CAPACITY_URL = `${BASE_API_URL}/api/v1/production/add-marker.php`;
    // PRODUCTION AND TIME STAMP VALUES USING MOMENT.JS TO GET ACCURATE TIME
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = JSON.parse(user.id);
    const userName = user.username;
    const productId = JSON.parse(productResponse.id);
    const productName = productResponse.product;

    console.log("User details: ", user);
    console.log("User Id: ", userId);

    const productionCapacityStamp = {
      user: userName,
      "user-id": userId,
      "product-id": productId,
      product: productName,
      "production-capacity": formInput[""],
      "start-time": prevloggedProductionTimeToServer,
      "production-date": prevloggedProductionDateToServer,
    };
    // FORM POST METHOD TO WEB SERVER
    const productionRequest = await axios.post(
      PREV_PRODUCTION_CAPACITY_URL,
      productionCapacityStamp
    );
    // Prev Production Values
    const productionResponse = await productionRequest.data;
    console.log("ADD MARKER", productionResponse);
    /**
     * --------------------------------------------------------------------------------------------------------
     * ----------------------------BEGINNING OF PRODUCTION CAPACITY CALCULATION--------------------------------
     * --------------------------------------------------------------------------------------------------------
     * */
    // Production Capacity (in percentage) and time variables
    const MAX_PRODUCTION_OUTPUT = 10000;
    const SECONDS = 3600;
    const MAX_PRODUCTION_OUTPUT_PER_SECONDS = MAX_PRODUCTION_OUTPUT / SECONDS;
    const MAX_PRODUCTION_CAPACITY = 100 / 100;
    const PRODUCTION_CAPACITY = formInput[""] / 100;
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
    const calcProductionOutput =
      (PRODUCTION_CAPACITY * MAX_PRODUCTION_CAPACITY_AT_PRODUCTION_TIME) /
      MAX_PRODUCTION_CAPACITY;

    const productionOutputForUser = Math.round(calcProductionOutput);

    console.log("Output: ", productionOutputForUser);

    /*---------------------------------------------------------------------------------------------------------
     *-----------------------------------END OF PRODUCTION CAPACITY CALCULATION--------------------------------
    -----------------------------------------------------------------------------------------------------------
     */

    /*---------------------------------------------------------------------------------------------------------
     *-----------------------------------END MARKER AND SEND PRODUCTION DATA TO SERVER ------------------------
    -----------------------------------------------------------------------------------------------------------
     */
    const PRODUCTION_CAPACITY_URL = `${BASE_API_URL}/api/v1/production/stop-marker.php`;
    // PRODUCTION AND TIME STAMP VALUES USING MOMENT.JS TO GET ACCURATE TIME
    const productionId = productionResponse["production-id"];
    const batchNo = productionResponse["batch-no"];
    const productionStamp = {
      "product-id": productId,
      "production-id": productionId,
      "batch-no": batchNo,
      "end-time": newloggedProductionTimeToServer,
      "production-date": newloggedProductionDateToServer,
      "total-qty-pumped": calcProductionOutput,
      "duration-pumped-in-seconds": PRODUCTION_TIME,
    };
    // FORM POST METHOD TO WEB SERVER
    if (batchNo && productionId) {
      await axios
        .post(PRODUCTION_CAPACITY_URL, productionStamp)
        .then((res) => console.log("STOP MARKER: ", res.data));
    }

    /**
     * Timeline items for notifications. When production capacity falls bellow or above a range of percentages (35%, 50%, 70%),then the timeline item's dot should reflect the rough estimate of the production capacity in colors either danger(red) or warning(yellow) for bellow 50% and secondary(blue) or success(green) for above 50%
     */
    setTimelineItem((state) => [
      ...state,
      {
        time: loggedProductionTime,
        dotColor: `${
          formInput[""] < 35
            ? "danger"
            : formInput[""] < 50
            ? "warning"
            : formInput[""] < 70
            ? "secondary"
            : formInput[""] > 70
            ? "success"
            : "secondary"
        }`,
        text: `Production running at ${formInput[""]}%`,
        timeSpent: `${hours ? hours : "0"} hrs : ${
          minutes ? minutes : "0"
        } mins :  ${seconds ? seconds : "0"} secs `,
        productionOutput: `Production output per hour: ${productionOutputForUser}cm³ `,
      },
    ]);
    // Set the previous time of the shift while shift is running to help ascertain difference in shift durations when production capacity is being calculated
    sessionStorage.setItem("prevTime", getNewLoggedTime);
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
