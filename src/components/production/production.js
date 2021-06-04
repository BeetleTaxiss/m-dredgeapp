import { useHistory } from "react-router-dom";
import {
  CheckingProductionStatusScreen,
  MainProductionScreen,
  StartNewProductionScreen,
  ProductionCannotStartScreen,
  CurrentRunningProductionScreen,
  TimerDisplay,
  StartButton,
  ActionButton,
} from "./ProductionComponents";
import {
  makeApiCall,
  buildApiPath,
  updateMainContainerView,
  updateContainerView,
  getProductionData,
  setProductionData,
  setProductionDataByKey,
  getProductionDataByKey,
  convertHyphenatedPropsToCamel,  getTimerTick,
  convertInputDateValueToDateObjectInLocalFormat,
  getTimePartInLocalFormat,
  computeTotalQtyPumped,
  isProductionPaused,
  pauseProduction as setPauseProduction,
  resumeProduction as setResumeProduction,
  incrementDurationPumped,
  resetDurationPumpedInSeconds,
  startPauseTimer,
  stopPauseTimer,
  resetDurationPausedInSeconds,
  resetProductionData,
} from "./ProductionUtilities";

import { errorAlert, functionUtils, getUserStoreInstance, successAlert } from "../../hooks/function-utils";
import moment from "moment";
import Swal from "sweetalert2";

export const Production = () => {

  /** @todo we must get this by any means other than using state values */
  const UserStore = getUserStoreInstance();
  const user = "John";
  const userId = 56;

  /** @todo: this section must come from our store. Replace the product-id with value we get 
   * from current user productPermissions 
   * */
  const selectProductData = [{ id: 8, name: "Sand" }];
  const productPermission = { "product-id": 8 };

  const history = useHistory();

  /**
 * Use function to adjust the slider when the capacity input changes
 */
  const onCapacityInputChange = () => {
    const capacitySlider = document.getElementById("production-capacity") || null;
    const capacityInput = document.getElementById("production-capacity-value") || null;

    if(parseInt(capacityInput.value) > 100) {
      capacityInput.value=100;
    }
    capacitySlider.value = capacityInput.value.replace(/[%]/, "");
    /** set productionData  */
    setProductionDataByKey("productionCapacity", capacityInput.value);
  }
  /**
   * change the input value when the capacity slider value changes
   */
  const onCapacitySliderChange = () => {
    const capacitySlider = document.getElementById("production-capacity");
    const capacityInput = document.getElementById("production-capacity-value");
    capacityInput.value = capacitySlider.value;

    /** set productionData  */
    setProductionDataByKey("productionCapacity", capacitySlider.value);
  }

  const onDistanceChange = (layerId = "production-pumping-distance") => {
    /** set productionData  */
    const value = document.getElementById(layerId).value;
    setProductionDataByKey("pumpingDistanceInMeters", value);
  }

  const onElevationChange = (layerId = "production-pumping-elevation") => {
    const value = document.getElementById(layerId).value;
    /** set productionData  */
    setProductionDataByKey("pumpingElevationInMeters", value);
  }

  /**
   * set the product selected details in the  productionData`
   */
  const onProductChange = () => {
    const productId = document.getElementById("production-product").value;

    for (let product of selectProductData) {
      const { id, name } = product;

      if (id == productId) {
        /**
         * set the `product` in the `productionData`. Each time product changes, we will update the current product
         * @todo we could notify user before we start this pumping of the details of product we will pump 
         */
        setProductionDataByKey("product", name);
        setProductionDataByKey("productId", id);
        break;
      } else {
        /** clear out the product details incase we could not find product  */
        setProductionDataByKey("product", null);
        setProductionDataByKey("productId", null);
      }
    }
  }

  /**
   * confirm dualogue 
   * @param {*} title 
   * @param {*} buttonText 
   * @param {*} icon 
   * @returns 
   */
  const confirmDialog= async (title="Warning", buttonText="Yes",  icon="warning")=>{

  const value= await Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: true,
      confirmButtonText: buttonText,
      showCancelButton: true,
    });
    return value;
  }

  /**
   * Use to update the button state for the production start button
   */
  const updateStartButtonState = (text = "Start Shift", loading = true, disabled = true, onClick = null) => {

    updateContainerView(
      <StartButton extraClass="shift-calculator-loading-btn"
        text={text}
        loading={loading}
        disabled={disabled}
        onClick={onClick ?? startProduction}
      />,
      "production-start-button"
    )
  }

  /**
   * Load the restart button
   * @param {*} text 
   * @param {*} route 
   */
  const loadRestartButton = (text = "Start New", route="/#") => {
    
    /** reload the start production page afresh */
    const onClick=()=>{
      updateMainContainerView(
        <StartNewProductionScreen
          onCapacityInputChange={onCapacityInputChange}
          onCapacitySliderChange={onCapacitySliderChange}
          onStartClick={startProduction}
          selectProductData={selectProductData}
          onProductChange={onProductChange}
          dateFrom={moment()}
          dateTo={moment()}
          timeFrom={moment()}
        />);
    }

    updateContainerView(
      <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "2rem", }}>
        <StartButton extraClass="shift-calculator-loading-btn"
          text={text}
          onClick={onClick}/>
      </div>,
      "production-action-buttons"
    )
  }

  /**
   * Set the state of production action button
   * @param {*} butonType 
   * @param {*} text 
   * @param {*} loading 
   * @param {*} disabled 
   * @param {*} onClick 
   * @param {*} buttonLayerPrefix 
   */
  const setActionButtonState = (buttonType, text = "Submit", loading = true, disabled = true, onClick = null, buttonLayerPrefix = "production-action-button") => {

    const buttonLayerId = `${buttonLayerPrefix}-${buttonType.toLowerCase()}`;

    updateContainerView(<ActionButton loading={loading} disabled={disabled} onClick={onClick} buttonType={buttonType} text={text} />, buttonLayerId)
  }

  /**
   * This is the main function that drives our clock face countdown. This funcion is passed along 
   * with the `CurrentRunningProductionScreen` once production starts. See below for details
   * `<>
   *    <CurrentRunningProductionScreen ...{props}/>
   *    {timerFunction()}
   * </>`
   * This ensures that the timerFunction() only runs when the current production screen is visible 
   * 
   * @param {*} timerHours 
   * @param {*} timerMinutes 
   * @param {*} timerSeconds 
   */
  const timerFunction = (timerHours, timerMinutes, timerSeconds) => {

    /** default tick time for a second */
    const wait = 1000;

    /** the layer containing the clock */
    const clockFace = "production-clock-face";

    /** pass the intial timer value to set our timer generator */
    const timer = getTimerTick(timerHours, timerMinutes, timerSeconds);

    /** hold reference to our timer interval function call */
    let timerInterval = null;

    /** assume a timer is already running. clear any interval existing */
    clearInterval(timerInterval);

    /** tick every 1000 ms (1 second) */
    timerInterval = setInterval(() => {

      const tick = timer.next();
      const { hours, minutes, seconds } = tick.done === false ? tick.value : {};

      if (tick.done) {
        clearInterval(timerInterval);
        /** call the stop production call here. Dont bother to show confirmation popup */
        return stopProduction(false);
      }

      /** the current clock face view */
      const CurrentTime = <TimerDisplay timerHours={hours} timerMinutes={minutes} timerSeconds={seconds} />

      /** render this value to update screen time */
      updateContainerView(CurrentTime, clockFace);

      /** 
       * lastly, we need to update the seconds pumped. We must update this only when production is running.
       * */
      if (isProductionPaused() === false) {
        incrementDurationPumped();
      }
    }, wait)
  }


  /**
   * Validate if there is currently a running production. If there is one, we will not allow production to proceed
   */
  const validateIfProductionIsInProgress = () => {

    const apiPath = buildApiPath("getTracker");

    /** Use only the product id  for this call */
    const callData = { "product-id": productPermission["product-id"] };

    makeApiCall(apiPath, callData, "get").then(response => {

      const data = (response && response.data) ? response.data : null;

      if (data && data.error) {
        const msg = "There was an error. Please try again";
        errorAlert("Error Alert", data.message ?? msg);
      }

      /** validate and check to see if production can move ahead.This must happen only when the status returned is `0`
       * if status is `1`, then we must notify and let user contact admin to manually end the production session
       */
      //data.status=1;
      if (parseInt(data.status) === 1) {
        const msg = `Production is curerntly running. You cannot run multiple 
                  production at the same time. Please contact admin to manually end current production session`;

        /** show production cannot start screen*/
        return (updateMainContainerView(
          <ProductionCannotStartScreen message={msg}
            onGoToDashboardClick={() => history.push("/")}
            onRefreshClick={() => history.push("#")} />
        ))
      }

      /** 
       * If production is not currently running, we will show user the production startScreen
       *  */
      updateMainContainerView(
        <StartNewProductionScreen
          onCapacityInputChange={onCapacityInputChange}
          onCapacitySliderChange={onCapacitySliderChange}
          onStartClick={startProduction}
          selectProductData={selectProductData}
          onProductChange={onProductChange}
          dateFrom={moment()}
          dateTo={moment()}
          timeFrom={moment()}
        />);
    });

  }


  /**
   * Start the  production sesion
   * @returns 
   */
  const startProduction = () => {

    const apiPath = buildApiPath("start");

    /** get the production data saved in productionData. @Note: see the `onProductChange` 
     * for details of how we save this production data. 
     */
    const product = getProductionDataByKey("product"); /** this value is set when we change product on the list. see `onProductChange` method aboove */
    const productId = getProductionDataByKey("productId");

    /**
     * we will get the rest of the data directly from the form for now. These data will be save to the `productionData` 
     * once we successfully commence production. From time to time,  we will read and write back to the `productionData`. 
     * @note: `productionData` is our only source of data once production starts and you must never pick data from anywhere else.
     */
    const distance = document.getElementById("production-pumping-distance").value;
    const elevation = document.getElementById("production-pumping-elevation").value;
    const fromDate = document.getElementById("production-from-date").value;
    const toDate = document.getElementById("production-to-date").value;
    const fromTime = document.getElementById("production-from-time").value;
    const toTime = document.getElementById("production-to-time").value;
    const productionCapacity = document.getElementById("production-capacity-value").value

    let callData = {
      user: user,
      "user-id": userId,
      "product": product,
      "product-id": productId,
      "production-capacity": productionCapacity ?? null,
      "start-date": fromDate,
      "end-date": toDate,
      "start-time": fromTime,
      "end-time": toTime,
      "production-date": moment().format("DD/MM/YYYY"),
      "pumping-distance-in-meters": distance,
      "pumping-elevation-in-meters": elevation,
    };

    /** 
     * create an extra validator to check against specific input values  
     * @Note: we have used callData["production-date"] value as a validator because this value 
     * contains the connstant current date. It 
    */
    const extraValidator = {
      //"start-date": { validationValue: callData["production-date"], validator: "eq", message: "start date cannot be less or more than the current date" },
      "production-capacity": { validationValue: 0, validator: "gt", message: "production capacity must be greater than zero" },
      "pumping-distance-in-meters": { validationValue: 0, validator: "gt", message: "pumping distance cannot be zero" },
    };

    const validationStatus = functionUtils.validateFormInputs(callData, extraValidator);
    if (!validationStatus) return false;

    /**
     * Here, we will convert our date and time string to their date object equivalent. To do this, we will 
     * use the  `convertInputDateValueToDateObjectInLocalFormat` method and pass our time values  parts with it.
     * The `getTimePartInLocalFormat` method converts the time value to their corresponding timePart object of key value pair.
     * these two values will be formated and added to our callData value for local and server production data update
     */
    const fromDateTimeObject = convertInputDateValueToDateObjectInLocalFormat(fromDate, getTimePartInLocalFormat(fromTime));
    const toDateTimeObject = convertInputDateValueToDateObjectInLocalFormat(toDate, getTimePartInLocalFormat(toTime));

    /** 
     * When we intially update call data for input validation, we have not gotten the value of `fromDateTimeObject`
     * and `toDateTimeObject` which contain both the date and time values object that can be use for proper date formatting. 
     * Therefore, we will reformat the date and time to reflect "dd/mm/yyy"  and "hh:mm" formt respectively.
     * @Note: this will enable have same formating as we have in `callData["production-date"]` which is the current date
     * 
     * */
    const callDataDateAndTime = {
      "start-date": moment(fromDateTimeObject).format("DD/MM/YYYY"),
      "end-date": moment(toDateTimeObject).format("DD/MM/YYYY"),
      /** 
       * @var `batch-start-time` is the actual time this batch starts. during production start, this is also the `start-time`
       * We will use this value when we compute the totalDurationPumpedInSeconds
       * */
      "batch-start-time": callData["start-time"],
    }
    callData = { ...callData, ...callDataDateAndTime }

    /**
     * run extra validation on  `callDataDateAndTime` to ensure that all the values  meets our requirement
     * Here, we will check date and time to see that they do not exceed current date or time
     * for example, callData['start-date'] must be todaty's date. We cannot run production in a previous or later date
     */
    const extraDateTimeValidator = {
      "start-date": { validationValue: callData["production-date"], validator: "eq", message: "start date cannot be less or more than the current date" },
      "start-time": { validationValue: callData["end-time"], validator: "neq", message: "start time and end time cannot be the same" },
    };
    const extraDateTimeValidationStatus = functionUtils.validateFormInputs(callDataDateAndTime, extraDateTimeValidator);
    if (!extraDateTimeValidationStatus) return false;

    /** 
     * We will proceed to creating our production time differences so that we can estimate 
     * the amount of time we are pumping.
     * this is the difference between the two dates and time in milliseconds 
     * */
    const dateTimeDifferenceInMs = toDateTimeObject.getTime() - fromDateTimeObject.getTime();

    /** create a new date object utilizing the time difference between the two dates and time `dateTimeDifferenceInMs` */
    const dateTimeDifferenceObject = new Date(dateTimeDifferenceInMs);

    const hours = dateTimeDifferenceObject.getUTCHours();
    const minutes = dateTimeDifferenceObject.getUTCMinutes();
    const seconds = dateTimeDifferenceObject.getUTCSeconds();

    /** 
     * manually validate to ensure we have the `hours`, `minutes`, and `seconds` 
     * This is a fail safe incase the value slips through the `extraDateTimeValidationStatus`
    */
    if (hours === 0 && minutes === 0 && seconds === 0) {
      const msg = "You must select valid time input. There is no time span to use for production";
      return errorAlert("Error Alert", msg);
    }

    /*** 
     * assign hour, minutes, and seconds value to the timerInfo and use value to initialize our countdown timer.
     * We will also save these values to the productionData once the production is successfully started
     * */
    const timerDetails = { hours, minutes, seconds, fromDateTimeObject, toDateTimeObject, dateTimeDifferenceObject };

    /** diable start button and show loading indicator */
    updateStartButtonState("Starting...");

    makeApiCall(apiPath, callData, "post").then(response => {

      const data = (response && response.data) ? response.data : null;

      if (data && data.error) {
        const msg = "There was an error. Please try again";

        /** enable the start button for retry */
        updateStartButtonState("Start Shift", false, false);
        return errorAlert("Error Alert", data.message ?? msg);
      }

      if (data.error === false && data["batch_no"] && data["production_id"]) {
        /**
       * At this point, production has started. There are few things to do before we change the screen to the `CurrentRuningProduction`
       * 1. we will save the `batch_no`, and `production_id` retfurned from the server.
       * 2 Add `batch_no`, and `producttion_id` to `callData`  and convert callData props to camelCasing so that we can save once to `productionData`
       * 3. Add timerDetails. This will contain details about our timer. 
       * 4. save the `callDataWithServerDetails` object now containing some server information to  `productData`
       */
        const callDataWithCamelProps = convertHyphenatedPropsToCamel(callData);

        const callDataWithServerDetails = {
          ...callDataWithCamelProps,
          previousBatchNo: data["batch_no"],
          previousProductionId: data["production_id"],
          previousProductionCapacity: callData["production-capacity"],
          previousPumpingDistanceInMeters: callData["pumping-distance-in-meters"],
          previousPumpingElevationInMeters: callData["pumping-elevation-in-meters"],
          timerDetails
        };

        /** update productionData with both local and server information */
        setProductionData(callDataWithServerDetails);

        console.log(getProductionData(), "production Data updated");

        successAlert("Production Alert", data.message);

        /**
         * finally, show the `CurrentRunningProductionScreen`. We will use the value from `callDataWithServerDetails`
         * to populate our `CurrentRunningProductionScreen` properties. Once this screen is showned, we will always 
         * get production related information by calling either `getProductionDataByKey`, or `getProductionData` methods.
         */
        const RunningScreen = () =>
          <>
            <CurrentRunningProductionScreen
              onDistanceChange={onDistanceChange}
              onElevationChange={onElevationChange}
              onCapacityInputChange={onCapacityInputChange}
              onCapacitySliderChange={onCapacitySliderChange}
              hideProductSelect={true}
              productionCapacity={callDataWithServerDetails.productionCapacity}
              elevation={callDataWithServerDetails.pumpingElevationInMeters}
              distance={callDataWithServerDetails.pumpingDistanceInMeters}

              onUpdateClick={updateProduction}
              onPauseClick={pauseProduction}
              onStopClick={stopProduction}

              timerHours={hours}
              timerMinutes={minutes}
              timerSeconds={seconds} />

            {timerFunction(hours, minutes, seconds)}
          </>

        /** enable start button before showing the next screen */
        updateStartButtonState("Start Shift", false, false);
        updateMainContainerView(<RunningScreen />);
      }
    }).catch(e => {
      errorAlert("Error Alert", e.message)
    });
  }

  /**
   * Updates current running production. All the required values for running our update are retrieved from 
   * the production data via `getProductionData` and formated for API call
   */
  const updateProduction = async () => {

    const confirm= await confirmDialog("Are you sure you want to update production parameters?", "Yes, update");
      if(!confirm.isConfirmed)
        return null;

    const apiPath = buildApiPath("update");

    /** get all the production data */
    const productionData = getProductionData();

    // /** this is the actual time the  production batch starts  */
    // const batchStartTime= productionData["batchStartTime"];

    // /**
    //  * get the total time pumped in seconds. This will be a difference between `productionData["batchStartTime"]` 
    //  * and the `currentTime`.
    //  * @Note: that we passed the currentDate into the method twice is that we only want the time difference since 
    //  * the production is happening on the same date.  
    // const currentTimeWithSeconds=moment().format("hh:mm:ss");
    //  */
    // const currentDate= productionData["productionDate"];
    // const totalDurationPumpedInSeconds = computeTotalDurationPumpedInSeconds(currentDate, currentDate, batchStartTime, currentTimeWithSeconds);

    const currentTime = moment().format("hh:mm");

    const totalDurationPumpedInSeconds = getProductionDataByKey("durationPumpedInSeconds");

    console.log(totalDurationPumpedInSeconds, " pumped in seconds");

    const totalQtyPumped = computeTotalQtyPumped(totalDurationPumpedInSeconds);

    const callData = {
      /** data for new production to start */
      user: productionData["user"],
      "user-id": productionData["userId"],
      "product-id": productionData["productId"],
      product: productionData["product"],
      "production-capacity": productionData["productionCapacity"],
      "production-date": productionData["productionDate"],
      "start-time": currentTime,   /** the currrent time  will be use as the start-time for our new productioin batch */
      "pumping-distance-in-meters": productionData["pumpingDistanceInMeters"],
      "pumping-elevation-in-meters": productionData["pumpingElevationInMeters"],

      /** data for the current production to stop */
      "production-id": productionData["previousProductionId"],  /** this is the id we saved when we started the last batch */
      "batch-no": productionData["previousBatchNo"],
      "total-qty-pumped": totalQtyPumped,
      "duration-pumped-in-seconds": totalDurationPumpedInSeconds,
      "end-time": currentTime,
      /** this is the time we paused during this production. Value  will always reset once we update production*/
      "duration-paused-in-seconds": productionData["durationPausedInSeconds"],  
    };

    /** 
     * since we are stopping the last production session and starting a new one, we will grab all the information  about the 
     * last production batch  and usee to compute both the total qty pumped and start a new production session
     */

    /** validate inputs to ensure we have all  */
    const validationStatus = functionUtils.validateFormInputs(callData);

    if (!validationStatus) return false;

    /** disable the update button while we make call */
    setActionButtonState("update", "Updating", true, true, updateProduction);

    makeApiCall(apiPath, callData, "post").then(response => {

      console.log(response, "update response");

      const data = (response && response.data) ? response.data : null;

      if (data && data.error) {
        const msg = "There was an error. Please try again";
        /** reset button */
        setActionButtonState("update", "Update Production", false, false, updateProduction);
        return errorAlert("Error Alert", data.message ?? msg);
      }

      if (data.error === false && data["batch_no"] && data["production_id"]) {

        successAlert("Production Alert", data.message);

        /**
         * update production data  with the new details returned from the server 
         */
        const updatedProductionDetails = {

          previousBatchNo: data["batch_no"],
          previousProductionId: data["production_id"],
          previousProductionCapacity: callData["production-capacity"],
          previousPumpingDistanceInMeters: callData["pumping-distance-in-meters"],
          previousPumpingElevationInMeters: callData["pumping-elevation-in-meters"],
          /** 
           * The batchStartTime update is very key for our next totalDurationPumpedInSeconds
           * as this value changes anytime we update a production. This is also the `currentTime`
           * we must update this time to reflect the batch successfully start this time 
           * */
          batchStartTime: currentTime,

          /** reset duration pumped in seconds for the next production batch */
          durationPumpedInSeconds: 0,

        };
        setProductionData(updatedProductionDetails);

        /** ensure that durationPumpedInSeconds is fully reset. This is just an extra layer of reset */
        resetDurationPumpedInSeconds();

        /** reset if there is any paused information so that when we pause next, we get a fresh count  */
        resetDurationPausedInSeconds();

        console.log(getProductionData(), "production data after update")

        /** reset button back to default on success */
        setActionButtonState("update", "Update Production", false, false, updateProduction);
      }
    }).catch(e => {
      errorAlert("Error Alert", e.message)
    });
  }

  /**
   * Temporarily stops production while the production batch is still running. 
   * we will implement pausing in a very simplistic way. Rather than making a call to the API to stop a batch 
   * during a pause, we will `pauseProduction()` so that the `productionData.durationPumpedInSeconds` remain the
   * the same by the time we resume the pumping. 
   */
  const pauseProduction = async () => {

    const confirm= await confirmDialog("Are you sure you want to pause?", "Yes, pause");
    if(!confirm.isConfirmed)
      return null;

    /**
     * Pause production and begin to track the duration of time we pause. This time will be updated when we resume 
     */
    setPauseProduction();

    /** begin to record the `durationPausedInSeconds` timer will only run if we have `paused` */
    startPauseTimer();
    
    /** disable other two action buttons so that user cannot update or stop production during a pause */
    setActionButtonState("stop", "Stop Production", false, true, stopProduction);
    setActionButtonState("update", "Update Production", false, true, updateProduction);

    /** finally, change pause button text and onClick event to resume */
    setActionButtonState("pause", "Resume", false, false, resumeProduction);

    const batchNo= getProductionDataByKey("previousBatchNo");

    successAlert("Production Alert", `Production paused for ${batchNo}`)

  }

  /**
   * Resume a puased production session
   */
  const resumeProduction = () => {

    /** make the production resume again */
    setResumeProduction();

    /** stop the pause timer  */
    stopPauseTimer();
     
     /** enable other two action buttons so that user can update or stop production during */
     setActionButtonState("update", "Update Production", false, false, updateProduction);
     setActionButtonState("stop", "Stop Production", false, false, stopProduction);
 
     /** finally, change pause button text and onClick event to Pause */
     setActionButtonState("pause", "Pause", false, false, pauseProduction);

    const batchNo= getProductionDataByKey("previousBatchNo");
    
    successAlert("Production Alert", `Production resumed for ${batchNo}`)
   
  }


  /**
   * Stops current production session. Once production stops, all production related data are cleaned
   * @returns 
   */
  const stopProduction =  async (showPopup=true) => {
    
    if(showPopup) {
      const confirm= await confirmDialog("Are you sure you want to stop?", "Yes, stop");
      if(!confirm.isConfirmed)
        return null;
    }

    const apiPath = buildApiPath("stop");

    const productionData = getProductionData();

    const currentTime = moment().format("hh:mm");

    const totalDurationPumpedInSeconds = getProductionDataByKey("durationPumpedInSeconds");

    const totalQtyPumped = computeTotalQtyPumped(totalDurationPumpedInSeconds);

    /**
     * retrieve all production related data from the `productionData`
     * @Note: see `updateProduction` method above for details
     */
    const callData = {
      user: productionData["user"],
      "user-id": productionData["userId"],
      "product-id": productionData["productId"],
      "production-id": productionData["previousProductionId"], 
      "batch-no": productionData["previousBatchNo"],
      "total-qty-pumped": totalQtyPumped,
      "duration-pumped-in-seconds": totalDurationPumpedInSeconds,
      "end-time": currentTime,
      "duration-paused-in-seconds": productionData["durationPausedInSeconds"],  
    };

    /** validate inputs to ensure we have all  */
    const validationStatus = functionUtils.validateFormInputs(callData);
    if (!validationStatus) return false;

    /** disable the update button while we make call */
    setActionButtonState("stop", "Stopping", true, true, stopProduction);

    makeApiCall(apiPath, callData, "post").then(response => {

      console.log(response, "update response");

      const data = (response && response.data) ? response.data : null;

      if (data && data.error) {
        const msg = "There was an error. Please try again";
        /** reset button */
        setActionButtonState("stop", "Stop Production", false, false, stopProduction);
        return errorAlert("Error Alert", data.message ?? msg);
      }

      if (data.error === false) {

        successAlert("Production Alert", data.message);

        /** 
         * This production session has ended. Clear out all the production data
         * @todo: in the future, we can print out a detailed production report 
         * */
        resetProductionData();

        /** load a restart production button to start a new production session*/
        loadRestartButton();
      }
    }).catch(e => {
      errorAlert("Error Alert", e.message)
    });

  }


  /**
   * Check if a production is running. 
   */

  // const Test=()=><CurrentRunningProductionScreen
  // onDistanceChange={onDistanceChange} 
  // onElevationChange={onElevationChange}
  // onCapacityInputChange={onCapacityInputChange}
  // onCapacitySliderChange={onCapacitySliderChange}
  // hideProductSelect={true}
  // productionCapacity={30}
  // elevation={10}
  // distance={1000}
  // onUpdateClick={updateProduction}
  // onPauseClick={pauseProduction}
  // onStopClick={stopProduction}
  // />

  validateIfProductionIsInProgress();

  return (
    /**
     * Always return the `MainProductionScreen`. This is the component that will control production view
     * when component loads, we will display `CheckingProductionStatusScreen` which will notify user that 
     * app is checking production status to ensure that we do not run multiple production at the same  time.
     * @note: at varioous point within the application lifecycle, we will update the view to reflect the appropriate 
     * screen user should see. 
     <MainProductionScreen CurrentScreen={Test} />
     */
    <MainProductionScreen CurrentScreen={CheckingProductionStatusScreen} />
  )
}

export default Production;