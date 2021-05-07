import React from "react";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "./API";
import TimelineNotification from "../components/production/timeline-notification";
import { render } from "react-dom";
import { batch } from "pullstate";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { StoreManager } from "react-persistent-store-manager";
import { Stores, AppStore } from "./../state/store";
import { createUserRoutes } from "../Menu";
import PageWrapper from "../components/general/page-wrapper";
import { Route } from "react-router";
import NavBar from "./../components/navbar/navbar";
import { toggleBtnText } from "../components/production/production-capacity";

// Alerts
export const successAlert = (title, text, link, showBtn) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    footer: link,
    showConfirmButton: showBtn ? true : false,
  });
};

export const successAlertWithFunction = (
  title,
  text,
  showCloseBtn,
  btnText,
  handleConfirmed,
  handleCanceled
) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: btnText,
    showCancelButton: showCloseBtn === true ? true : false,
    cancelButtonColor: "red",
  }).then((value) => {
    if (value.isConfirmed) {
      typeof handleConfirmed === "function" && handleConfirmed();
    }
    if (value.isDismissed) {
      typeof handleCanceled === "function" && handleCanceled();
    }
  });
};
export const errorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    showConfirmButton: false,
  });
};

export const warningAlert = (title, text, showBtn) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    showConfirmButton: showBtn ? true : false,
  });
};

export const getShiftPausedStatus = () => {
  console.log("Shift Paused status: ", functionUtils.shiftPausedStatus);
  return functionUtils.shiftPausedStatus;
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

  const response = await axios
    .post(`${BASE_API_URL}/api/v1/user/login.php`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      errorAlert(
        error.message,
        "Could not login. Please check internet connection"
      );
    });

  if (response === null || response === undefined) {
    /** there was an error login in */
    errorAlert(
      "Login Error",
      "Could not login. Please check internet connection"
    );
    return { status: false };
  }

  /** validate response */
  if (response && response.data && response.data.error) {
    let title = "Login Error",
      text = response.data.message;
    errorAlert(title, text);

    /** user not logged in */
    return { status: false };
  } else {
    let responseData = response.data.data;
    if (!responseData || !responseData.id) {
      /**
       * this user is certainly not logged in. This could be a login error from the server
       * */
      let title = "Login Error",
        text =
          "Could not login. Something went wrong from the server. Please contact system admin";
      errorAlert(title, text);
      return { status: false };
    }

    /** login was successful add 1status=true to use for validation` */
    responseData = { ...responseData, status: true };

    /** update store */
    const Store = StoreManager(AppStore, Stores, "UserStore");

    Store.update("userId", responseData.id);
    Store.update("user", responseData.user);
    Store.update("email", responseData["email"]);
    Store.update("phone", responseData["phone"]);
    Store.update("userType", responseData["user_type"]);
    Store.update("login", true);
    Store.update(
      "permission",
      functionUtils.parseUserPermission(responseData.permission)
    );
    return responseData;
  }
};

export const useGetAppSettings = async (
  setUserTypesList,
  setMeasurementList,
  setUsersPermissions
) => {
  /** fetch saved app settings informarion from store */
  const Store = StoreManager(AppStore, Stores, "AppSettingsStore");

  /** Fetch users types list and set it to state */
  Store.useStateAsync("userTypes").then((typesList) => {
    // typesList.unshift({
    //   user_type: "Select Job Description",
    //   id: "0",
    //   validation: "Can't select this option",
    // });
    typeof setUserTypesList === "function" && setUserTypesList(typesList);
  });

  /** Fetch measurement list and set it to state */
  Store.useStateAsync("userTypes").then((measurementList) => {
    typeof setMeasurementList === "function" &&
      setUserTypesList(measurementList);
  });
  /** Fetch users permissions and set it to state */
  Store.useStateAsync("userTypes").then((permissionList) => {
    typeof setUsersPermissions === "function" &&
      setUserTypesList(permissionList);
  });
};

export const useGetUserDetails = async (
  setUserName,
  setUserId,
  setUserType,
  setIsUserLoggedIn,
  setUserEmail,
  setUserPhoneNo,
  setUserPermissions
) => {
  /** fetch saved user information from store */
  const Store = StoreManager(AppStore, Stores, "UserStore");

  /** Fetch user Name and set it to state */
  Store.useStateAsync("user").then((user) => {
    typeof setUserName === "function" && setUserName(user);
  });
  /** Fetch user Id and set it to state */
  Store.useStateAsync("userId").then((userId) => {
    typeof setUserId === "function" && setUserId(userId);
  });
  /** Fetch user Email and set it to state */
  Store.useStateAsync("email").then((email) => {
    typeof setUserEmail === "function" && setUserEmail(email);
  });
  /** Fetch user phone number and set it to state */
  Store.useStateAsync("phone").then((phone) => {
    typeof setUserPhoneNo === "function" && setUserPhoneNo(phone);
  });
  /** Fetch user type and set it to state */
  Store.useStateAsync("userType").then((type) => {
    typeof setUserType === "function" && setUserType(type);
  });
  /** Fetch user login status and set it to state */
  Store.useStateAsync("login").then((login) => {
    typeof setIsUserLoggedIn === "function" && setIsUserLoggedIn(login);
  });
  /** Fetch user permissions and set it to state */
  Store.useStateAsync("permission").then((permission) => {
    typeof setUserPermissions === "function" && setUserPermissions(permission);
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
 * Get an instance of the `UserStore`. We can call this every time we need to get user details
 */
export const getStoreInstance = (storeName = null) => {
  /** create store instance */
  return StoreManager(AppStore, Stores, storeName);
};

/**
 * Get the `UserStore` instance
 */
export const getUserStoreInstance = () => {
  /** create store instance */
  return StoreManager(AppStore, Stores, "UserStore");
};

/**
 * Get the `UserStore` instance
 */
export const getAppSettingStoreInstance = () => {
  /** create store instance */
  return StoreManager(AppStore, Stores, "AppSettingsStore");
};

/**
 * use this function to create user routes based on the user permission level
 */
export const createUserAllowedRoutes = (
  userPermission,
  addDefaultRoutes = true
) => {
  /**
   * hold the default route within our application. Due to the peculiar nature of react-router-dom
   * where "/" matches other routes, we must add this entry as the last  item in our router stack
   * */
  let defaultRoute = null;

  /**
   * These are the valid routes this user can have access to within the application
   * Pass the `userMenu` provided during user setup
   */
  let UserAllowedRoutes = createUserRoutes(
    userPermission,
    addDefaultRoutes
  ).map((page, k) => {
    const { link, component, hideNavBar, usePageWrapper } = page;
    const Component = component;

    /**
     * process route component and hide navigation bar if `hideNavBar=false`
     * In the login menu definition, we will pass `usePageWrapper=false` property to be false
     * so that we can hide `PageWrapper` around the login page
     */
    const PageComponent = () => {
      const NavigationBar =
        hideNavBar && hideNavBar === true
          ? () => null
          : () => <NavBar userPermission={userPermission} />;

      /** Create an helper component for pageWrapper
       */
      const PageWrapperContainer = (props) => {
        if (usePageWrapper === false) {
          /** no page wrapper needed */
          return <>{props.children}</>;
        }
        /** return pages with wrapper */
        return <PageWrapper>{props.children}</PageWrapper>;
      };
      return (
        <>
          <NavigationBar />
          <PageWrapperContainer>
            <Component />
          </PageWrapperContainer>
        </>
      );
    };

    if (link === "/") {
      defaultRoute = (
        <Route key={k} exact path={link} component={PageComponent} />
      );
      return [];
    }
    /** return the route */
    return <Route key={k} path={link} component={PageComponent} />;
  });

  /** return allowed routes */
  return defaultRoute
    ? UserAllowedRoutes.concat(defaultRoute)
    : UserAllowedRoutes;
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
    setTimelineItem,
    setSelectedDate,
    selectedDate,
    selectedEndDate
  ) => {
    /**
     * Counter state for countdown timer which tracks time in hours, minutes and seconds
     *  */
    const [counter, setCounter] = React.useState();
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
    const handleChange = ({ currentTarget: { name, value } }) => {
      setShiftDuration((state) => ({ ...state, [name]: value }));

      const selectValue = document.getElementById("select").value;
      console.log("Select Value: ", selectValue);

      // Filter Products Array to get single product
      const product = products?.filter((product) => product.id === selectValue);
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
      const endDate = document.getElementById("enddateFlatpickr").value;
      console.log("End value: ", endDate);
      let newEndTime;
      if (selectedEndDate.length >= 5) {
        console.log("String not altered");
        newEndTime = selectedEndDate;
      } else {
        newEndTime = "0" + selectedEndDate;
      }
      let newEndDate = endDate + `T${newEndTime}`;

      // New Start Date
      const startDate = document.getElementById("enddateFlatpickr").value;
      console.log("Start value: ", startDate);
      let newStartTime;
      if (selectedDate.length >= 5) {
        console.log("String not altered");
        newStartTime = selectedDate;
      } else {
        newStartTime = "0" + selectedDate;
      }
      let newStartDate = startDate + `T${newStartTime}`;

      // Convert Shift duration form input values to date-time values which can be used in calculations
      let shiftStart = new Date(newStartDate),
        shiftEnd = new Date(newEndDate),
        // Calaculated difference between both shift duration form values and get the result in milliseconds
        durationInMilliseconds = shiftEnd.getTime() - shiftStart.getTime(),
        // Process to retrive single time values in hours, minutes and seconds from shift duration
        shiftObject = new Date(durationInMilliseconds),
        hours = shiftObject.getUTCHours(),
        minutes = shiftObject.getUTCMinutes(),
        seconds = shiftObject.getSeconds();
      console.log(
        "New start date: ",
        newStartDate,
        "New End date: ",
        newEndDate
      );
      console.log("Shift start: ", shiftStart);
      console.log("Shift end: ", shiftEnd);
      console.log("Duration in milliseconds: ", durationInMilliseconds);
      console.log("New Shift Object: ", shiftObject);
      console.log(
        "Hours: ",
        hours,
        " Minutes: ",
        minutes,
        " seconds: ",
        seconds
      );

      // Add Marker Values to be sent to the server
      const selectValue = document.getElementById("select").value;
      console.log("Select Value: ", selectValue);

      // Filter Products Array to get single product
      const product = products?.filter((product) => product.id === selectValue);
      console.log("Product: ", product);
      const productId = product[0].id,
        productName = product[0].product,
        validation = product[0].validation;
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const userId = parseInt(userDetails.id),
        userName = userDetails.username;
      const productionCapacityOnStart = parseInt(formInput[""]);
      const pumping_distance_in_meters = document.getElementById("distance")
        .value;
      const pumping_elevation_in_meters = document.getElementById("elevation")
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
        "pumping-elevation-in-meters": pumping_elevation_in_meters,
      };
      /** Retrive Add marker form data for client validation */
      const addMarkerClientData = {
        user: userName,
        "user-id": userId,
        "product-id": productId,
        product: productName,
        "production-capacity": productionCapacityOnStart,
        "start-time": durationInMilliseconds === 0 ? NaN : loggedShiftStart,
        "production-date": loggedShiftStartDate,
        "pumping-distance-in-meters": pumping_distance_in_meters,
        "pumping-elevation-in-meters": pumping_elevation_in_meters,
        validation: validation,
      };
      console.log("add Marker Values: ", addMarkerData);
      /** Client form validation before https call */
      const validationStatus = functionUtils.validateFormInputs(
        addMarkerClientData
      );
      if (validationStatus === true) {
        try {
          axios
            .post(
              `${BASE_API_URL}/api/v1/production/add-marker.php`,
              addMarkerData
            )
            .then((res) => {
              // alert("Axios Working");
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
                  text: `Shift started and Production running at ${productionCapacityOnStart}%`,
                });
                setTimelineItem(timelineItems);
                console.log("timeline Items: ", timelineItems);
                res.data["initial_production_capacity"] = formInput[""];
                res.data["product_id"] = productId;
                res.data[
                  "pumping_distance_in_meters"
                ] = pumping_distance_in_meters;
                res.data[
                  "pumping_elevation_in_meters"
                ] = pumping_elevation_in_meters;
                res.data["product_name"] = productName;

                setProductionDetails(res.data);
                setCounter({ hours, minutes, seconds });
                document.getElementById(
                  "distance"
                ).value = pumping_distance_in_meters;
                document.getElementById(
                  "elevation"
                ).value = pumping_elevation_in_meters;
                document.getElementById(
                  "current-production-capacity"
                ).value = productionCapacityOnStart;
                document.getElementById(
                  "range-count-number"
                ).innerHTML = productionCapacityOnStart;

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
      }
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

  shiftPausedStatus: false,

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
    console.log("New Production Capacity", temporaryProductionCapacity);
    console.log("New Production Capacity", temporaryProductionCapacity);

    // Production Capacity (in percentage) and time variables
    const MAX_PRODUCTION_OUTPUT = 350;
    const SECONDS = 3600;
    const DISTANCE_BENCHMARK = 1000;
    const pumping_distance_in_meters =
      productDetailsStateless.pumping_distance_in_meters;
    const pumping_elevation_in_meters =
      productDetailsStateless.pumping_elevation_in_meters;
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
    console.log("Pumping distance in meters: ", pumping_distance_in_meters);

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
      newTimelineItems,
      pause,
      resume
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
        text: `${
          pause
            ? "Shift Paused"
            : resume
            ? `Shift resumed and Production running at ${currentProductionCapacity}%`
            : `Production running at ${currentProductionCapacity}%`
        } `,
        timeSpent: `${hours ? hours : "0"} hrs : ${
          minutes ? minutes : "0"
        } mins :  ${seconds ? seconds : "0"} secs `,
        productionOutput: `${
          pause
            ? ""
            : `Production output per hour: ${productionOutputForUser}cm³`
        }`,
      });

      console.log("Mutated Timeline Array: ", timelineItems);
      functionUtils.showTimeLine(timelineItems, "timeline-notification-single");
      functionUtils.globalTimeline = timelineItems;
      console.log("Global timeline items: ", functionUtils.globalTimeline);
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
      "pumping-elevation-in-meters": pumping_elevation_in_meters,
      "production-date": prevloggedProductionDateToServer,
    };
    console.log("Old Pumping in meters: ", addStopMarkerData);
    /** Stop Marker production data */

    const stopMarkerData = {
      "product-id": productId,
      "production-id": production_id,
      "batch-no": batch_no,
      "end-time": endloggedProductionTimeToServer,
      "total-qty-pumped": calcProductionOutput,
      "duration-pumped-in-seconds": PRODUCTION_TIME,
    };
    const addMarkerData = {
      user: userName,
      "user-id": userId,
      "product-id": productId,
      product: productName,
      "production-capacity": temporaryProductionCapacity,
      "start-time": prevloggedProductionTimeToServer,
      "production-date": prevloggedProductionDateToServer,
      "pumping-distance-in-meters": pumping_distance_in_meters,
      "pumping-elevation-in-meters": pumping_elevation_in_meters,
    };
    let restartMarker = null;
    const restartStopMarker = () => {
      restartMarker = setTimeout(() => {
        if (document.getElementById("stop-marker") !== null) {
          document.getElementById("stop-marker").click();
        }
      }, 20000);
      return restartMarker;
    };

    let stopStartProductionBtnId = document.getElementById("stop-start-marker");
    let stopStartProductionBtnIdAttribute;
    if (stopStartProductionBtnId !== null) {
      stopStartProductionBtnIdAttribute =
        stopStartProductionBtnId.dataset.runStopStartMarker;
    }

    let stopProductionBtnId = document.getElementById("stop-marker");
    let stopProductionBtnIdAttribute;
    if (stopProductionBtnId !== null) {
      stopProductionBtnIdAttribute =
        stopProductionBtnId.dataset.runStopStartMarker;
    }

    let pauseProductionBtnId = document.getElementById("pause-marker");
    let pauseProductionBtnIdAttribute;
    if (pauseProductionBtnId !== null) {
      pauseProductionBtnIdAttribute =
        pauseProductionBtnId.dataset.runPauseResumeMarker;
    }

    let resumeProductionBtnId = document.getElementById("resume-marker");
    let resumeProductionBtnIdAttribute;
    if (resumeProductionBtnId !== null) {
      resumeProductionBtnIdAttribute =
        resumeProductionBtnId.dataset.runPauseResumeMarker;
    }

    console.log("Update Data Attribute: ", stopStartProductionBtnIdAttribute);
    console.log("Pause Data Attribute: ", pauseProductionBtnIdAttribute);
    console.log("Data Attribute: ", pauseProductionBtnIdAttribute === "false");
    /**
     * New Pumping distance and elevation in meters
     */
    let new_pumping_distance_in_meters;
    let new_pumping_elevation_in_meters;
    if (document.getElementById("distance").value === "") {
      new_pumping_distance_in_meters = parseInt(pumping_distance_in_meters);
    } else {
      new_pumping_distance_in_meters = document.getElementById("distance")
        .value;
    }
    if (document.getElementById("elevation").value === "") {
      new_pumping_elevation_in_meters = parseInt(pumping_elevation_in_meters);
    } else {
      new_pumping_elevation_in_meters = document.getElementById("elevation")
        .value;
    }

    /** Validation Pumping distance and elevation to be Numbers only */

    const validationStatus = functionUtils.validateFormInputs({
      new_pumping_elevation_in_meters:
        document.getElementById("elevation").value === ""
          ? ""
          : /^\d+$/.test(new_pumping_elevation_in_meters)
          ? parseInt(new_pumping_elevation_in_meters)
          : NaN,
      new_pumping_distance_in_meters:
        document.getElementById("distance").value === ""
          ? ""
          : /^\d+$/.test(new_pumping_distance_in_meters)
          ? parseInt(new_pumping_distance_in_meters)
          : typeof new_pumping_distance_in_meters === "number"
          ? new_pumping_distance_in_meters
          : NaN,
    });

    if (validationStatus === true) {
      /** Stop Start Marker Axios Call Begins */
      if (
        stopStartProductionBtnId &&
        pauseProductionBtnIdAttribute === "false"
      ) {
        console.log("Stop start marker working");
        console.log("Button clicked: ", stopStartProductionBtnId);

        /** Reset isShiftPaused state */
        functionUtils.shiftPausedStatus = false;

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
          productDetailsStateless.pumping_distance_in_meters = new_pumping_distance_in_meters;
          productDetailsStateless.pumping_elevation_in_meters = new_pumping_elevation_in_meters;
          console.log("Product Details stateless: ", productDetailsStateless);

          /**
           * Set pumping and elevation values to their respective elements so it displays
           */
          document.getElementById("distance").value =
            productDetailsStateless.pumping_distance_in_meters;
          document.getElementById("elevation").value =
            productDetailsStateless.pumping_elevation_in_meters;
          /**
           * Timeline items for notifications. When production capacity falls bellow or above a range of percentages (35%, 50%, 70%),then the timeline item's dot should reflect the rough estimate of the production capacity in colors either danger(red) or warning(yellow) for bellow 50% and secondary(blue) or success(green) for above 50%
           */
          currentProductionCapacity = temporaryProductionCapacity;
          updatedTimelineItems(
            timelineItems,
            currentProductionCapacity,
            functionUtils.newTimelineItems
          );

          // Set the previous time of the shift while shift is running to help ascertain difference in shift durations when production capacity is being calculated
          sessionStorage.setItem("prevTime", getNewLoggedTime);

          const title = "Production details posted successfully";
          successAlert(title);
        }
      } else if (
        stopProductionBtnId &&
        pauseProductionBtnIdAttribute === "false"
      ) {
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
      } else if (
        pauseProductionBtnId &&
        stopStartProductionBtnIdAttribute === "false"
      ) {
        /** Request confirmation to pause shift before proceeding with axios call */
        Swal.fire({
          icon: "warning",
          title: "Are you sure you want to pause this shift?",
          showConfirmButton: true,
          confirmButtonText: "Yes",
          showCancelButton: true,
        }).then((value) => {
          if (value.isDismissed) {
            let stopStartProductionBtnId = document.getElementById(
              "stop-start-marker"
            );

            if (stopStartProductionBtnId !== null) {
              stopStartProductionBtnId.dataset.runStopStartMarker = true;
            }

            let pauseProductionBtnId = document.getElementById("pause-marker");

            if (pauseProductionBtnId !== null) {
              pauseProductionBtnId.dataset.runPauseResumeMarker = false;
            }
            // toggleBtnText();
          }
          if (value.isConfirmed) {
            runPauseShiftAxiosCall();
          }
        });

        /*** Function which handles pausing a shift once warning alert confirmation is received. This axios call is similar to an end-shift Marker API used once shift has ended and timer value is equals to 00:00:00 */
        const runPauseShiftAxiosCall = () => {
          /** Axios call to pause production Marker once timer runs out */
          console.log("Pause Marker working");
          console.log("Button  clicked stop", pauseProductionBtnId);

          axios
            .put(
              `${BASE_API_URL}/api/v1/production/stop-marker.php`,
              stopMarkerData
            )
            .then((res) => {
              console.log("Pause marker response: ", res.data);
              if (res.data.error) {
                functionUtils.shiftPausedStatus = false;
                const title = "Server Error Response",
                  text = res.data.message;
                errorAlert(title, text);
                restartStopMarker();
              } else {
                stopStartProductionBtnId.disabled = true;
                /** indicate that the shift ispaused */
                functionUtils.shiftPausedStatus = true;
                const title = "Shift paused Successfully";
                successAlert(title);
                document.getElementById("pause-marker").id = "resume-marker";
                // pauseProductionBtnIdAttribute = "true";
                /**
                 * Timeline items for notifications. When production capacity falls bellow or above a range of percentages (35%, 50%, 70%),then the timeline item's dot should reflect the rough estimate of the production capacity in colors either danger(red) or warning(yellow) for bellow 50% and secondary(blue) or success(green) for above 50%
                 */
                let pause = true;
                currentProductionCapacity = temporaryProductionCapacity;
                updatedTimelineItems(
                  timelineItems,
                  currentProductionCapacity,
                  functionUtils.newTimelineItems,
                  pause
                );
                toggleBtnText();
                // Set the previous time of the shift while shift is running to help ascertain difference in shift durations when production capacity is being calculated
                sessionStorage.setItem("prevTime", getNewLoggedTime);
              }
            })
            .catch((error) => {
              console.log("Error occurred", error);
              functionUtils.shiftPausedStatus = false;
              const title = "Network Error",
                text = `Network not available, try switching on your network/data: ${error}`;
              errorAlert(title, text);
              restartStopMarker();
            });
        };
        /** End of run Pause Shift Axios call function */
      } else if (
        resumeProductionBtnId &&
        stopStartProductionBtnIdAttribute === "true"
      ) {
        /** Axios call to pause production Marker once timer runs out */
        console.log("resume Marker working");
        console.log("Button  clicked stop", resumeProductionBtnId);

        axios
          .post(
            `${BASE_API_URL}/api/v1/production/add-marker.php`,
            addMarkerData
          )
          .then((res) => {
            console.log("Resume marker response: ", res.data);
            if (res.data.error) {
              const title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
              restartStopMarker();
            } else {
              productDetailsStateless.production_id = res.data.production_id;
              productDetailsStateless.batch_no = res.data.batch_no;
              productDetailsStateless.pumping_distance_in_meters = new_pumping_distance_in_meters;
              productDetailsStateless.pumping_elevation_in_meters = new_pumping_elevation_in_meters;
              stopStartProductionBtnId.disabled = false;

              const title = "Shift Resumed Successfully";
              successAlert(title);

              document.getElementById("resume-marker").id = "pause-marker";
              /**
               * Timeline items for notifications. When production capacity falls bellow or above a range of percentages (35%, 50%, 70%),then the timeline item's dot should reflect the rough estimate of the production capacity in colors either danger(red) or warning(yellow) for bellow 50% and secondary(blue) or success(green) for above 50%
               */
              currentProductionCapacity = temporaryProductionCapacity;

              console.log(
                " Current Production Capacity: ",
                currentProductionCapacity
              );

              const loggedShiftEnd = moment().format("hh:mm");
              let resumeTimelineItem = {
                time: loggedShiftEnd,
                dotColor: "primary",
                text: `Shift resumed at production capacity of ${currentProductionCapacity}%`,
              };
              functionUtils.globalTimeline = functionUtils.globalTimeline.concat(
                resumeTimelineItem
              );
              console.log(
                "Global timeline items 3: ",
                functionUtils.globalTimeline
              );
              functionUtils.showTimeLine(
                functionUtils.globalTimeline,
                "timeline-notification-single"
              );
              functionUtils.globalTimeline = functionUtils.globalTimeline;
              toggleBtnText();
              functionUtils.shiftPausedStatus = false;
              // Set the previous time of the shift while shift is running to help ascertain difference in shift durations when production capacity is being calculated
              sessionStorage.setItem("prevTime", getNewLoggedTime);
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
    }

    /*---------------------------------------------------------------------------------------------------------
     *-----------------------------------END MARKER AND SEND PRODUCTION DATA TO SERVER ------------------------
    -----------------------------------------------------------------------------------------------------------
     */
    console.log("Global timeline items 2: ", functionUtils.globalTimeline);
    return functionUtils.globalTimeline;
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
    const product = products?.filter((product) => product.id === selectValue);
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
  handleDeleteOrder: async (id, order_ref, userName, userId) => {
    await axios
      .post(`${BASE_API_URL}/api/v1/order/delete.php`, {
        "order-id": id,
        "order-ref": order_ref,
        user: userName,
        "user-id": parseInt(userId),
      })
      .then((res) => {
        if (res.data.error === true) {
          errorAlert("Order wasn't deleted", res.data.message);
        } else {
          successAlert("Order deleted successfully", res.data.message);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
    // const response = request.data;

    // if (response.error === false) {
    //   // window.refresh();
    // }
    // console.log("Order deleted? ", response);
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
   * @param  {approuter} approuter
   * ----------------------------------------------------------------------------------------------------------
   */
  SignInFormSubmit: (
    errors,
    user,
    password,
    history,
    location,
    successLocation = "/"
  ) => {
    const handleSubmit = async (event) => {
      if (validateForm(errors)) {
        console.info("Valid Form");
      } else {
        console.error("Invalid Form");
      }

      const response = await Login(user.user, password.password);
      const { state } = location;

      if (response && response.status === true) {
        history.push({
          pathname: state?.from || successLocation,
          state: response,
        });
      } else {
        return false;
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
              ? setErrors((state) => ({
                  ...state,
                  user: "Full Name must be at least 5 characters long!",
                }))
              : setErrors((state) => ({
                  ...state,
                  user: "",
                }));
          break;
        case "password":
          errors.password =
            value.length < 6
              ? setErrors((state) => ({
                  ...state,
                  password: "Password must be at least 8 characters long!",
                }))
              : setErrors((state) => ({
                  ...state,
                  password: "",
                }));
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
  truncate: (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  },
  /**
   * Use this function to validate usr login
   * calling this function at the top of every dashboard page will ensure that only valid
   * user is allowed to view the page
   */
  useValidateLogin: (takeToPage = "/") => {
    /*** create a StoreManager instance*/
    const Store = StoreManager(AppStore, Stores, "UserStore");

    /** create an history object to navigate page */
    const history = useHistory();

    /** check to see if user is indeed logged in */
    Store.useStateAsync("login").then((login) => {
      if (login === false || login === null) {
        /**  clear out every other user details pertaining to session
         * and  take user back to the login page */
        Store.update("email", null);
        Store.update("name", null);
        Store.update("userType", null);
        Store.update("permission", null);

        history.push({
          pathname: takeToPage,
        });
      }
    });
  },
  /**
   * Use this function to validate usr login and log them out
   */
  useValidateLoginAndLogUserOut: (takeToPage = "/", history) => {
    /*** create a StoreManager instance*/
    const Store = StoreManager(AppStore, Stores, "UserStore");

    /** check to see if user is indeed logged in */
    Store.useStateAsync("login").then((login) => {
      if (login === true) {
        /**  clear out every other user details pertaining to session
         * and  take user back to the login page */
        Store.update("user", null);
        Store.update("userId", null);
        Store.update("email", null);
        Store.update("name", null);
        Store.update("userType", null);
        Store.update("permission", null);
        Store.update("login", false);
        history.push({
          pathname: takeToPage,
        });
      }
    });
  },

  /**
   * Use to parse user permission.
   * fix this issue of server appending " to beginning and end of user_permission
   * this occurs while trying to convert  the json file saved in db to json again
   * during the server APi response
   */
  parseUserPermission: (userPermission) => {
    if (userPermission === null || userPermission === undefined) {
      /** return empty object */
      return {};
    }

    if (typeof userPermission === "object") {
      /** this is already an object. No need to parse */
      return userPermission;
    }

    if (typeof userPermission === "string") {
      return JSON.parse(userPermission.replace(/"{/, "{").replace(/}"/, "}"));
    }
  },
  /** Function to add comma after every third number in a number string */
  addCommaToNumbers: (number) => {
    if (typeof number !== "string") {
      /** Convert numbers to string */
      number = `${number}`;
    }
    if (typeof number === "string") {
      number = number.split("");
      let newNumber = "",
        lastItem = number.length - 1,
        comma = ",",
        counter = 0;

      for (let i = lastItem; i >= 0; i--) {
        counter += 1;
        console.log(counter);
        if (counter % 3 === 0 && i > 0) {
          newNumber = `${comma}${number[i]}` + newNumber;
          console.log("New number: ", newNumber);
        } else {
          newNumber = number[i] + newNumber;
        }
      }
      return newNumber;
    } else {
      return number;
    }
  },

  /**
   * A function to strip value of all formating commas
   * @param {*} string
   * @returns
   */
  removeCommas: (string) => {
    let newString;
    newString = string.replace(/,/, "");
    return newString;
  },

  /** Naira sign */
  naira: "₦",

  /**
   * Validate form inputs
   * @param {*} formData `formData` is passed as a key value pair
   * @returns
   */
  validateFormInputs: (formData) => {
    console.log("Form data in validation: ", formData);
    let formInputValue = true;
    /** Check if form data is undefined */
    if (formData === undefined || formData === null) {
      return (formInputValue = false);
    }
    for (const [key, value] of Object.entries(formData)) {
      /** Convert value to string without spacing */
      let stringValue = `${value}`;
      let trimmedValue = stringValue.replace(/W+/, "");

      /** Validate for select dropdowns */
      if (trimmedValue === "Can't select this option") {
        const title = "Form Error",
          text = `${value}. Check the form for the dropdown and select a valid option `;
        errorAlert(title, text);
        return (formInputValue = false);
      }

      /** Validate for empty strings */
      if (trimmedValue === "") {
        const title = "Form Error",
          text = `${key}: ${value} missing in your form`;
        errorAlert(title, text);
        return (formInputValue = false);
      }

      /** Validate for numbers which are'nt numbers */
      if (typeof value === "number" && isNaN(value)) {
        const title = "Form Error",
          text = `${key}: Must be a number`;
        errorAlert(title, text);
        return (formInputValue = false);
      }

      /** Validate for undefined and null */
      // if (trimmedValue === null || value === undefined) {
      //   const title = "Form Error",
      //     text = `${key}: Input a proper value`;
      //   errorAlert(title, text);
      //   return (formInputValue = false);
      // }
    }
    return formInputValue;
  },

  /***
   * convert first letter to upperCase
   */
  firstLetterToUpperCase: (value) => {
    if (!value) return null;
    return value
      .split("")
      .map((v, k) => {
        return k === 0 ? v.toUpperCase() : v;
      })
      .join("");
  },

  /**
   *
   */
  getUserPositionFromTypeId: (userTypes, userTypeId) => {
    if (!userTypes || userTypes.length <= 0) return null;
    if (userTypeId === null) return null;

    for (let { id, user_type } of userTypes) {
      if (id === userTypeId) return user_type;
    }
  },
};
