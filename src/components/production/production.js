import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./timer";
import ShiftCalculator from "./shift-calculator";
import TimelineNotification from "./timeline-notification";
import ProductionCapacity from "./production-capacity";
import PageWrapper from "../general/page-wrapper";
import {
  errorAlert,
  functionUtils,
  useGetUserDetails,
  validateProductLocationPermission,
  warningAlert,
} from "../../hooks/function-utils";
import { BASE_API_URL } from "../../hooks/API";
import moment from "moment";
import "./production.scss";
import { useHistory } from "react-router";

export const Production = () => {
  // DISPLAY STATES FOR TIMER, PRODUCTION-CAPACITY AND TIMELINE COMPONENTS
  const [displayTimer, setDisplayTimer] = useState(false);
  const [timelineItem, setTimelineItem] = React.useState([]);
  const [displayTimeLine, setDisplayTimeLine] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [productionDetails, setProductionDetails] = useState();
  let time = moment().format("HH:MM");
  console.log("Current Time: ", time);
  const [selectedDate, setSelectedDate] = React.useState(`${time}`);
  const [selectedEndDate, setSelectedEndDate] = React.useState(`${time}`);

  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userPermissions, setUserPermissions] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["d", "7", "s", "w"];
  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(
    setUserName,
    setUserId,
    ...optionalParams,
    setUserPermissions
  );

  useEffect(() => {}, [userName, userId]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/product/list.php`, {
            cancelToken: source.token,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.error) {
              console.log("Products Error: ", res.data.error);
            } else {
              const data = res.data.data;
              /**
               * Validated product data that is derived from a user's product permisssion
               */
              let validatedProductData;
              /**
               * This block ensures the validateProductLocationPermission utility is run when the user permission state hasn't be updated with actual data
               */
              if (userPermissions !== undefined || userPermissions !== null) {
                /**
                 * utility function takes in a users permission and the product list from the database and validates what product permission the user has
                 */
                validatedProductData = validateProductLocationPermission(
                  userPermissions?.productPermissions,
                  data
                );
                /**
                 * "Select Product" option is added to product list to set it as the initial option a user views
                 */
                validatedProductData?.unshift({
                  id: "0",
                  product: "Select Product",
                  price: 0,
                  validation: "Can't select this option",
                });
                /**
                 * Set the data to state for the product dropdown
                 */
                setProducts(validatedProductData);
              }
            }
          })
          .catch((error) => {
            // errorAlert("Network Error", error);
            console.log("Error: ", error);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Axios Error: ", error);
        } else {
          throw error;
        }
      }
    };

    response();

    return () => {
      source.cancel();
    };
  }, [selectedDate, setSelectedDate, loading, userPermissions]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    let timeValue = moment().format("HH:MM");
    if (date === timeValue) {
      // setSelectedDate(time);
    } else if (date < timeValue) {
      const title = "Warning!",
        text = "Selected time should not be lowered than current time";
      warningAlert(title, text);
      // setSelectedDate("");
    }

    console.log("Time picker: ", selectedDate);
    console.log("Time status: ", date < timeValue);
    console.log("Clock time: ", date);
    console.log("Moment time: ", timeValue);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    console.log("End time picker: ", selectedEndDate);
  };

  let timelineItems = timelineItem;
  let currentProductionCapacity =
    productionDetails?.initial_production_capacity;
  const handleInputChangeWithID = (elementId, updatedElementId) => {
    let value;
    if (document.getElementById(elementId) !== null) {
      value = document.getElementById(elementId).value;
      document.getElementById(updatedElementId).innerHTML = value;
    }

    console.log("Element Value: ", value);
    return value;
  };

  console.log("Element Value  Two: ", currentProductionCapacity);

  /**
   * Form state to be made avaliable to handle Input Change function
   *  */
  const formState = {};
  /**
   *  Handle Input Change function for handling input changes across multiple forms if required, in this case we are concerned about the range count input field
   *  */
  const { formInput, handleCapacityChange } =
    functionUtils.HandleInputChange(formState);
  console.log("range selector: ", formInput);

  /**
   * Custom CountDown function which takes the "setState" functions from the above useState hooks to display a countdown time after calculating the duration of a shift and returns a shift array, shift duration and timeline item objects to be used in child components. Functions such as handle change are used to set the values of form inputs in the shift Calculator.
   */

  const {
    shift,
    shiftDuration,
    // timelineItems,
    handleChange,
    calculateShift,
    setTimelineItems,
    counter,
    setCounter,
  } = functionUtils.CountDown(
    setDisplayTimer,
    setDisplayTimeLine,
    formInput,
    products,
    setProductionDetails,
    timelineItems,
    setTimelineItem,
    setSelectedDate,
    selectedDate,
    selectedEndDate,
    userName,
    userId,
    setLoading
  );

  /**Handle Production Capacity submit and get it's return value */
  const history = useHistory();

  const getReturnValueAndHandleSubmit = async () => {
    functionUtils
      .getTimeAndProductionStamp(
        currentProductionCapacity,
        timelineItems,
        productionDetails,
        products,
        userName,
        userId,
        history
      )
      .then((value) => {
        timelineItems = value;
        console.log("Logged Array: ", timelineItems);
      });
  };
  console.log("New Time Line Items: ", timelineItems);
  // // timelineItems = newTimelineItems;

  /**
   * Retrive shift caLculator form values for client validation
   * */
  // const getShiftFormData = () => {};
  const selectProductFormData = [
    {
      id: "select",
      type: "select",
      name: "product",
      className: "form-control",
      // value: formInput.product,
      options: products,
      required: true,
    },
  ];
  const distanceFormData = {
    distance: [
      {
        id: "distance",
        type: "text",
        name: "distance",
        className: "form-control",
        holder: "Pumping Distance in meters",
        required: false,
      },
    ],
    elevation: [
      {
        id: "elevation",
        type: "text",
        name: "elevation",
        className: "form-control",
        holder: "Pipe elevation in meters",
        required: false,
      },
    ],
  };
  console.log("timeline Items 2: ", timelineItems);
  console.log("Counter State: ", counter);
  console.log("Production Details: ", productionDetails);
  return (
    <>
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
              <Timer
                counter={counter}
                setCounter={setCounter}
                timelineItems={timelineItems}
              />
            ) : (
              <ShiftCalculator
                shiftDuration={shiftDuration}
                handleChange={handleChange}
                calculateShift={() => calculateShift()}
                setTimeline={setDisplayTimeLine}
                selectProductData={selectProductFormData}
                distanceFormData={distanceFormData}
                formInput={formInput}
                handleCapacityChange={handleCapacityChange}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                selectedEndDate={selectedEndDate}
                handleEndDateChange={handleEndDateChange}
                loading={loading}
              />
            )}

            {/* ON SHIFT DURATION CALCULATED, PRODUCTION CAPACITY GENERATOR IS DISPLAYED */}
            {displayTimer ? (
              <>
                <ProductionCapacity
                  timelineItems={timelineItems}
                  handleSubmit={getReturnValueAndHandleSubmit}
                  formInput={currentProductionCapacity}
                  distanceFormData={distanceFormData}
                  handleChange={() =>
                    handleInputChangeWithID(
                      "current-production-capacity",
                      "range-count-number"
                    )
                  }
                />
              </>
            ) : null}

            {/* ON SHIFT DURATION CALCULATED, TIMELINE IS DISPLAYED */}
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className="widget-content widget-content-area pb-1"
                style={{ padding: "2rem" }}
              >
                <div
                  className="mt-container mx-auto"
                  id="timeline-notification-single"
                ></div>
              </div>
            </div>
            {/* <TimelineNotification timelineItems={timelineItems} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
