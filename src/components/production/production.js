import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./timer";
import ShiftCalculator from "./shift-calculator";
import TimelineNotification from "./timeline-notification";
import ProductionCapacity from "./production-capacity";
import PageWrapper from "../general/page-wrapper";
import { functionUtils } from "../../hooks/function-utils";
import { BASE_API_URL } from "../../hooks/API";
import moment from "moment";

export const Production = () => {
  // DISPLAY STATES FOR TIMER, PRODUCTION-CAPACITY AND TIMELINE COMPONENTS
  const [displayTimer, setDisplayTimer] = useState(false);
  const [timelineItem, setTimelineItem] = React.useState([]);
  const [displayTimeLine, setDisplayTimeLine] = useState(false);
  const [products, setProducts] = useState();
  const [productionDetails, setProductionDetails] = useState();

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
              const newArray = data.unshift({
                id: "0",
                product: "Select Product",
                price: 0,
              });
              console.log("New Array", newArray);
              console.log("New Data", data);
              setProducts(data);
            }
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
  }, []);

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
  const { formInput, handleCapacityChange } = functionUtils.HandleInputChange(
    formState
  );
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
    setTimelineItem
  );

  /**Handle Production Capacity submit and get it's return value */
  const getReturnValueAndHandleSubmit = () => {
    functionUtils
      .getTimeAndProductionStamp(
        currentProductionCapacity,
        timelineItems,
        productionDetails,
        products
      )
      .then((value) => {
        timelineItems = value;
        console.log("Logged Array: ", timelineItems);
      });
  };
  console.log("New Time Line Items: ", timelineItems);
  // // timelineItems = newTimelineItems;
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
                calculateShift={calculateShift}
                setTimeline={setDisplayTimeLine}
                selectProductData={selectProductFormData}
                formInput={formInput}
                handleCapacityChange={handleCapacityChange}
              />
            )}

            {/* ON SHIFT DURATION CALCULATED, PRODUCTION CAPACITY GENERATOR IS DISPLAYED */}
            {displayTimer ? (
              <>
                <ProductionCapacity
                  timelineItems={timelineItems}
                  handleSubmit={getReturnValueAndHandleSubmit}
                  formInput={currentProductionCapacity}
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
            <div className="row">
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