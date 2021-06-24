import { useHistory } from "react-router-dom";
import {
  CheckingProductionStatusScreen,
  MainProductionScreen,
  StartNewProductionScreen,
  ProductionCannotStartScreen,
  ProductionExistScreen,
  CurrentRunningProductionScreen,
  TimerDisplay,
  StartButton,
  ActionButton,
  ProductionTimeline,
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
  convertHyphenatedPropsToCamel,
  getTimerTick,
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
  hydrateProductionData,
  deHydrateProductionData,
} from "./ProductionUtilities";

import {
  errorAlert,
  functionUtils,
  getUserStoreInstance,
  successAlert,
} from "../../hooks/function-utils";
import moment from "moment";
import Swal from "sweetalert2";

export const Production = () => {
  const history = useHistory();

  /**
   * Use function to adjust the slider when the capacity input changes
   */
  const onCapacityInputChange = () => {
    const capacitySlider =
      document.getElementById("production-capacity") || null;
    const capacityInput =
      document.getElementById("production-capacity-value") || null;

    if (parseInt(capacityInput.value) > 100) {
      capacityInput.value = 100;
    }
    const value = capacityInput.value.replace(/[% | \D]/, "");
    capacitySlider.value = value;
    capacityInput.value = value;
    /** set productionData  */
    setProductionDataByKey("productionCapacity", capacityInput.value);
  };

  /**
   * change the input value when the capacity slider value changes
   */
  const onCapacitySliderChange = () => {
    const capacitySlider = document.getElementById("production-capacity");
    const capacityInput = document.getElementById("production-capacity-value");
    capacityInput.value = capacitySlider.value;

    /** set productionData  */
    setProductionDataByKey("productionCapacity", capacitySlider.value);
  };

  /**
   * Update productionData when distance value changes
   * @param {*} layerId
   */
  const onDistanceChange = (
    updateProdutionData = true,
    layerId = "production-pumping-distance"
  ) => {
    /** set productionData  */
    const el = document.getElementById(layerId);
    el.value = el.value.replace(/[\D]/, "");
    const value = el.value;

    if (value === "" || value === 0) {
      setProductionDataByKey("pumpingDistanceInMeters", "");
      return errorAlert("Distance cannot be empty or zero");
    }

    setProductionDataByKey("pumpingDistanceInMeters", value);
  };

  /**
   * Update productionData when the elevation changes
   * @param {*} layerId
   */
  const onElevationChange = (
    updateProdutionData = true,
    layerId = "production-pumping-elevation"
  ) => {
    const el = document.getElementById(layerId);
    el.value = el.value.replace(/[\D]/, "");
    const value = el.value;

    if (value === "") {
      setProductionDataByKey("pumpingElevationInMeters", "");
      return errorAlert("Pumping elevation cannot be empty");
    }

    /** set productionData  */
    setProductionDataByKey("pumpingElevationInMeters", value);
  };

  /**
   * set the product selected details in the  productionData`
   */
  const onProductChange = () => {
    const productId = document.getElementById("production-product").value;

    /** value is saved when the screen loads for the first time  */
    const selectProductData = getProductionDataByKey("selectProductData");

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

    /** display production validation screen */
    updateMainContainerView(<CheckingProductionStatusScreen />);

    /** validate if production is currently running */
    validateProduction(productId);
  };

  /**
   * confirm dualogue
   * @param {*} title
   * @param {*} buttonText
   * @param {*} icon
   * @returns
   */
  const confirmDialog = async (
    title = "Warning",
    buttonText = "Yes",
    icon = "warning"
  ) => {
    const value = await Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: true,
      confirmButtonText: buttonText,
      showCancelButton: true,
    });
    return value;
  };

  /**
   * Use to update the button state for the production start button
   */
  const updateStartButtonState = (
    text = "Start Shift",
    loading = true,
    disabled = true,
    onClick = null
  ) => {
    updateContainerView(
      <StartButton
        extraClass="shift-calculator-loading-btn"
        text={text}
        loading={loading}
        disabled={disabled}
        onClick={onClick ?? startProduction}
      />,
      "production-start-button"
    );
  };

  /**
   * Load the restart button
   * @param {*} text
   * @param {*} route
   */
  const loadRestartButton = (text = "Start New", route = "/#") => {
    const selectProductData = getProductionDataByKey("selectProductData");
    /** reload the start production page afresh */
    const onClick = () => {
      updateMainContainerView(
        <StartNewProductionScreen
          /** validate elevation and distance. we pass `false` so production dats is not updated */
          onElevationChange={onElevationChange}
          onDistanceChange={onDistanceChange}
          onCapacityInputChange={onCapacityInputChange}
          onCapacitySliderChange={onCapacitySliderChange}
          onStartClick={startProduction}
          selectProductData={selectProductData}
          onProductChange={onProductChange}
          dateFrom={moment()}
          dateTo={moment()}
          timeFrom={moment()}
        />
      );
    };

    updateContainerView(
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <StartButton
          extraClass="shift-calculator-loading-btn"
          text={text}
          onClick={onClick}
        />
      </div>,
      "production-action-buttons"
    );
  };

  /**
   * Set the state of production action button
   * @param {*} butonType
   * @param {*} text
   * @param {*} loading
   * @param {*} disabled
   * @param {*} onClick
   * @param {*} buttonLayerPrefix
   */
  const setActionButtonState = (
    buttonType,
    text = "Submit",
    loading = true,
    disabled = true,
    onClick = null,
    buttonLayerPrefix = "production-action-button"
  ) => {
    const buttonLayerId = `${buttonLayerPrefix}-${buttonType.toLowerCase()}`;

    updateContainerView(
      <ActionButton
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        buttonType={buttonType}
        text={text}
      />,
      buttonLayerId
    );
  };

  /**
   * Update the timeline view with details of the current action
   * @param {*} action
   * @param {*} actionData
   * @param {*} timelineLayerId
   */
  const updateTimelineView = (
    action = "start",
    actionData = null,
    timelineLayerId = "production-timeline"
  ) => {
    let timelineItems = getProductionDataByKey("timelineItems");

    const newTimelineItems = timelineItems.concat({ action, actionData });

    /** update production data */
    setProductionDataByKey("timelineItems", newTimelineItems);

    updateContainerView(
      <ProductionTimeline timelineItems={newTimelineItems} />,
      timelineLayerId
    );
  };

  /** hold reference to our timer interval function call */
  let timerInterval = null;

  /** * hold value shown on the countdown clock.  This value must be updated while hydrating production data* */
  let clockFaceValue;

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

    /** assume a timer is already running. clear any interval existing */
    clearInterval(timerInterval);

    /** tick every 1000 ms (1 second) */
    timerInterval = setInterval(() => {
      const tick = timer.next();
      const { hours, minutes, seconds } = tick.done === false ? tick.value : {};

      /** save the clock face */
      clockFaceValue = { hours, minutes, seconds };

      if (tick.done) {
        clearInterval(timerInterval);
        /** call the stop production call here. Dont bother to show confirmation popup */
        return stopProduction(false);
      }

      /** the current clock face view */
      const CurrentTime = (
        <TimerDisplay
          timerHours={hours}
          timerMinutes={minutes}
          timerSeconds={seconds}
        />
      );

      /** render this value to update screen time */
      updateContainerView(CurrentTime, clockFace);

      /**
       * We have added this section to handle issue that occurs when user system abruptly shut down before`window.beforeunload`
       * event could fire. This section enables us to recover the previous session incase of an abrupt shutdown . we cannot loose
       * mmore than `10 seconds` as this runs every 10 seconds.
       */
      try {
        if (seconds % 10 === 0) {
          hydrateProductionData(new Date(), clockFaceValue);
        }
      } catch (e) {
        console.error(e);
      }

      /**
       * lastly, we need to update the seconds pumped. We must update this only when production is running.
       * */
      if (isProductionPaused() === false) {
        incrementDurationPumped();
      }
    }, wait);
  };

  /**
   * Stops the clock Tmer and reset the value
   */
  const stopTimer = (clockFace = "production-clock-face") => {
    clearInterval(timerInterval);
    /** reset the clock face to 0 */
    const CurrentTime = (
      <TimerDisplay timerHours={0} timerMinutes={0} timerSeconds={0} />
    );
    /** render this value to update screen time */
    updateContainerView(CurrentTime, clockFace);
  };

  /**
   * Add an event listener to track when the window closes
   */
  const listenToWindowClose = () => {
    /** if we are currently pumping, then there is an existing production running */
    // let isAnyTaskInProgress = getProductionDataByKey("durationPumpedInSeconds") > 0 ? true: false;

    const confirmExit = () => {
      /**
       * save the current production information to store so that we can implement a wakeup call when user restart
       * This call will look for the production details and propmt user to restart a pending production session
       * The `clockFaceValue` value is the current values shown on our clock before we close window
       * */
      hydrateProductionData(new Date(), clockFaceValue);

      /** send the production data to server so that in case user ends this session abruptly, we can restart  from where it stopped */
      const msg = "If you close, you musrt resume production when you start";
      uploadProductionData();
      return msg;
    };

    window.onbeforeunload = confirmExit;
    window.onclose = confirmExit;
  };

  /**
   * remove window close event listener
   */
  const removeWindowOnCloseListener = () => {
    window.onbeforeunload = null;
    window.onclose = null;
  };

  /**
   * Resume production that was abaadoned from last pumping session.
   * @Note: this will asume that machine was stopped  and will
   * @param {*} hydratedData
   */
  const resumeProductionFromLastSession = async (hydratedData) => {
    const confirm = await confirmDialog(
      "Are you sure machine was stopped since last session?",
      "Yes, proceed"
    );
    if (!confirm.isConfirmed) return null;

    const {
      hydratedClock,
      productionCapacity,
      pumpingElevationInMeters,
      pumpingDistanceInMeters,
    } = hydratedData;

    /** get the clock values */
    const { hours, minutes, seconds } = hydratedClock;

    /** assign hydrated data as the productionData so that we can continue from where  we stopped   */
    setProductionData(hydratedData);

    /** monitor window status so we can hydrate `productionData` on window close */
    listenToWindowClose();

    updateMainContainerView(
      <>
        <CurrentRunningProductionScreen
          onDistanceChange={onDistanceChange}
          onElevationChange={onElevationChange}
          onCapacityInputChange={onCapacityInputChange}
          onCapacitySliderChange={onCapacitySliderChange}
          hideProductSelect={true}
          productionCapacity={productionCapacity}
          elevation={pumpingElevationInMeters}
          distance={pumpingDistanceInMeters}
          onUpdateClick={updateProduction}
          onPauseClick={pauseProduction}
          onStopClick={stopProduction}
          timerHours={hours}
          timerMinutes={minutes}
          timerSeconds={seconds}
        />

        {timerFunction(hours, minutes, seconds)}
      </>
    );

    setTimeout(() => {
      updateTimelineView("wakeup", hydratedData);
    }, 2000);
  };

  /**
   * Continue production from the last session. This function assumes that the engine was never stopped
   * so we will continue by adding all the time the application is not in session to the `durationPumpedInSeconds`
   * @param {*} hydratedData
   */
  const continueProductionFromLastSession = async (hydratedData) => {
    const confirm = await confirmDialog(
      "Are you sure machine was not stopped since last session?",
      "Yes, proceed"
    );
    if (!confirm.isConfirmed) return null;

    const {
      hydratedClock,
      hydratedDate,
      productionCapacity,
      pumpingElevationInMeters,
      pumpingDistanceInMeters,
    } = hydratedData;

    /** get the clock values */
    const { hours, minutes, seconds } = hydratedClock;

    // const fromDateTimeObject = convertInputDateValueToDateObjectInLocalFormat(fromDate, getTimePartInLocalFormat(fromTime));

    /** convert the hydrateDate string to a date object. */
    const lastSessionDateObject = new Date(hydratedDate);

    /** get the current date and time */
    const currentDateObject = new Date();

    /**
     * get the time difference between the last time we pumped and now since we are of the opinion that pumping never stops,
     *  we will add the difference in seconds between the two date to our durationPumpedInSeconds. This is to ensure that the
     * time that the system `shuts down` or `closed` was not lost in our calculation.
     */
    const timeDifferenceInMs =
      currentDateObject.getTime() - lastSessionDateObject.getTime();

    /** to convert ms to seconds, divide by 1000 */
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMs / 1000);

    /**
     * Add the extra value to our `durationPumpedInSeconds`. for our tracking, we will add
     * `durationPumpedInSecondsAfterWakeup` to store the value as a refrence
     *  */
    const durationPumpedInSecondsAfterWakeup =
      hydratedData["durationPumpedInSeconds"] + timeDifferenceInSeconds;

    /** update production data with the new details  */
    setProductionData({
      ...hydratedData,
      durationPumpedInSeconds: durationPumpedInSecondsAfterWakeup,
      durationPumpedInSecondsAfterWakeup: timeDifferenceInSeconds,

      /** this is the value before we canculate time difference. We keep this as a reference */
      durationPumpedInSecondsBeforeWakeup:
        hydratedData["durationPumpedInSeconds"],
    });

    /** monitor window status so we can hydrate `productionData` on window close */
    listenToWindowClose();

    //console.log(getProductionData(), " product data");

    updateMainContainerView(
      <>
        <CurrentRunningProductionScreen
          onDistanceChange={onDistanceChange}
          onElevationChange={onElevationChange}
          onCapacityInputChange={onCapacityInputChange}
          onCapacitySliderChange={onCapacitySliderChange}
          hideProductSelect={true}
          productionCapacity={productionCapacity}
          elevation={pumpingElevationInMeters}
          distance={pumpingDistanceInMeters}
          onUpdateClick={updateProduction}
          onPauseClick={pauseProduction}
          onStopClick={stopProduction}
          timerHours={hours}
          timerMinutes={minutes}
          timerSeconds={seconds}
        />

        {timerFunction(hours, minutes, seconds)}
      </>
    );

    /** wait a little bit. This is to ensure that the  */
    setTimeout(() => {
      updateTimelineView("wakeup", hydratedData);
    }, 2000);
  };

  /**
   * Start a new  production sesion
   * @returns
   */
  const startProduction = () => {
    const apiPath = buildApiPath("start");

    /** get the production data saved in productionData. @Note: see the `onProductChange`  and
     *  `useValidateIfProductionIsInProgress` methods  for details of how we save this production data.
     */
    const product =
      getProductionDataByKey(
        "product"
      ); /** this value is set when we change product on the list. see `onProductChange` method aboove */
    const productId = getProductionDataByKey("productId");
    const user = getProductionDataByKey("user");
    const userId = getProductionDataByKey("userId");

    /**
     * we will get the rest of the data directly from the form for now. These data will be save to the `productionData`
     * once we successfully commence production. From time to time,  we will read and write back to the `productionData`.
     * @note: `productionData` is our only source of data once production starts and you must never pick data from anywhere else.
     */
    const distance = document.getElementById(
      "production-pumping-distance"
    ).value;
    const elevation = document.getElementById(
      "production-pumping-elevation"
    ).value;
    const fromDate = document.getElementById("production-from-date").value;
    const toDate = document.getElementById("production-to-date").value;
    const fromTime = document.getElementById("production-from-time").value;
    const toTime = document.getElementById("production-to-time").value;
    const productionCapacity = document.getElementById(
      "production-capacity-value"
    ).value;

    let callData = {
      user: user,
      "user-id": userId,
      product: product,
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
      "production-capacity": {
        validationValue: 0,
        validator: "gt",
        message: "production capacity must be greater than zero",
      },
      "pumping-distance-in-meters": {
        validationValue: 0,
        validator: "gt",
        message: "pumping distance cannot be zero",
      },
    };

    const validationStatus = functionUtils.validateFormInputs(
      callData,
      extraValidator
    );
    if (!validationStatus) return false;

    /**
     * Here, we will convert our date and time string to their date object equivalent. To do this, we will
     * use the  `convertInputDateValueToDateObjectInLocalFormat` method and pass our time values  parts with it.
     * The `getTimePartInLocalFormat` method converts the time value to their corresponding timePart object of key value pair.
     * these two values will be formated and added to our callData value for local and server production data update
     */
    const fromDateTimeObject = convertInputDateValueToDateObjectInLocalFormat(
      fromDate,
      getTimePartInLocalFormat(fromTime)
    );
    const toDateTimeObject = convertInputDateValueToDateObjectInLocalFormat(
      toDate,
      getTimePartInLocalFormat(toTime)
    );

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
    };
    callData = { ...callData, ...callDataDateAndTime };

    /**
     * run extra validation on  `callDataDateAndTime` to ensure that all the values  meets our requirement
     * Here, we will check date and time to see that they do not exceed current date or time
     * for example, callData['start-date'] must be todaty's date. We cannot run production in a previous or later date
     */
    const extraDateTimeValidator = {
      "start-date": {
        validationValue: callData["production-date"],
        validator: "eq",
        message: "start date cannot be less or more than the current date",
      },
      "start-time": {
        validationValue: callData["end-time"],
        validator: "neq",
        message: "start time and end time cannot be the same",
      },
    };
    const extraDateTimeValidationStatus = functionUtils.validateFormInputs(
      callDataDateAndTime,
      extraDateTimeValidator
    );
    if (!extraDateTimeValidationStatus) return false;

    /**
     * We will proceed to creating our production time differences so that we can estimate
     * the amount of time we are pumping.
     * this is the difference between the two dates and time in milliseconds
     * */
    const dateTimeDifferenceInMs =
      toDateTimeObject.getTime() - fromDateTimeObject.getTime();

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
      const msg =
        "You must select valid time input. There is no time span to use for production";
      return errorAlert("Error Alert", msg);
    }

    /***
     * assign hour, minutes, and seconds value to the timerInfo and use value to initialize our countdown timer.
     * We will also save these values to the productionData once the production is successfully started
     * */
    const timerDetails = {
      hours,
      minutes,
      seconds,
      fromDateTimeObject,
      toDateTimeObject,
      dateTimeDifferenceObject,
    };

    /** diable start button and show loading indicator */
    updateStartButtonState("Starting...");

    makeApiCall(apiPath, callData, "post")
      .then((response) => {
        const data = response && response.data ? response.data : null;

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
          const callDataWithCamelProps =
            convertHyphenatedPropsToCamel(callData);

          const callDataWithServerDetails = {
            ...callDataWithCamelProps,
            previousBatchNo: data["batch_no"],
            previousProductionId: data["production_id"],
            previousProductionCapacity: callData["production-capacity"],
            previousPumpingDistanceInMeters:
              callData["pumping-distance-in-meters"],
            previousPumpingElevationInMeters:
              callData["pumping-elevation-in-meters"],
            timerDetails,
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
          const RunningScreen = () => (
            <>
              <CurrentRunningProductionScreen
                onDistanceChange={onDistanceChange}
                onElevationChange={onElevationChange}
                onCapacityInputChange={onCapacityInputChange}
                onCapacitySliderChange={onCapacitySliderChange}
                hideProductSelect={true}
                productionCapacity={
                  callDataWithServerDetails.productionCapacity
                }
                elevation={callDataWithServerDetails.pumpingElevationInMeters}
                distance={callDataWithServerDetails.pumpingDistanceInMeters}
                onUpdateClick={updateProduction}
                onPauseClick={pauseProduction}
                onStopClick={stopProduction}
                timerHours={hours}
                timerMinutes={minutes}
                timerSeconds={seconds}
              />

              {timerFunction(hours, minutes, seconds)}
            </>
          );

          /** enable start button before showing the next screen */
          updateStartButtonState("Start Shift", false, false);
          updateMainContainerView(<RunningScreen />);

          updateTimelineView("start", callDataWithServerDetails);

          /**
           * Add an event  listener to window object to check if user  attempt to close window before production ends
           * It also call the `hydrateProductionData` which freezes the current production data and save in storage
           * @Note: we will check the hydrated production data when we re-open the page to check if there is an existing
           * or pending production not yet completed.
           *  */
          listenToWindowClose();
        }
      })
      .catch((e) => {
        errorAlert("Error Alert", e.message);
      });
  };

  /**
   * Updates current running production. All the required values for running our update are retrieved from
   * the production data via `getProductionData` and formated for API call
   */
  const updateProduction = async () => {
    const confirm = await confirmDialog(
      "Are you sure you want to update production parameters?",
      "Yes, update"
    );
    if (!confirm.isConfirmed) return null;

    const apiPath = buildApiPath("update");

    /** get all the production data */
    const productionData = getProductionData();

    const currentTime = moment().format("hh:mm");

    const totalDurationPumpedInSeconds = getProductionDataByKey(
      "durationPumpedInSeconds"
    );

    const totalQtyPumped = computeTotalQtyPumped(totalDurationPumpedInSeconds);

    /**
     * before we can perform an update, any of the following parameters must have changed
     * If nothign hs changed since last batch, there is no need to update production parameters
     */
    if (
      productionData.previousProductionCapacity ===
        productionData.productionCapacity &&
      productionData.previousPumpingDistanceInMeters ===
        productionData.pumpingDistanceInMeters &&
      productionData.previousPumpingElevationInMeters ===
        productionData.pumpingElevationInMeters
    ) {
      return errorAlert(
        "Nothing has changed. You must update any of the production parameters before you can proceed"
      );
    }

    const callData = {
      /** data for new production to start */
      user: productionData["user"],
      "user-id": productionData["userId"],
      "product-id": productionData["productId"],
      product: productionData["product"],
      "production-capacity": productionData["productionCapacity"],
      "production-date": productionData["productionDate"],
      "start-time":
        currentTime /** the currrent time  will be use as the start-time for our new productioin batch */,
      "pumping-distance-in-meters": productionData["pumpingDistanceInMeters"],
      "pumping-elevation-in-meters": productionData["pumpingElevationInMeters"],

      /** data for the current production to stop */
      "production-id":
        productionData[
          "previousProductionId"
        ] /** this is the id saved when we started the last batch */,
      "batch-no": productionData["previousBatchNo"],
      "total-qty-pumped": totalQtyPumped,
      "duration-pumped-in-seconds": totalDurationPumpedInSeconds,
      "end-time": currentTime,
      /** this is the time we paused during this production. Value  will always reset once we update production or sop*/
      "duration-paused-in-seconds": productionData["durationPausedInSeconds"],
    };

    /** validate inputs to ensure we have all  */
    let validationStatus = functionUtils.validateFormInputs(callData);

    if (!validationStatus) return false;

    /** do some extra validations  */
    const extraValidator = {
      //"start-date": { validationValue: callData["production-date"], validator: "eq", message: "start date cannot be less or more than the current date" },
      "production-capacity": {
        validationValue: 0,
        validator: "gt",
        message: "production capacity must be greater than zero",
      },
      "pumping-distance-in-meters": {
        validationValue: 0,
        validator: "gt",
        message: "pumping distance cannot be zero",
      },
    };

    validationStatus = functionUtils.validateFormInputs(
      callData,
      extraValidator
    );
    if (!validationStatus) return false;

    /** disable the update button while we make call */
    setActionButtonState("update", "Updating", true, true, updateProduction);

    makeApiCall(apiPath, callData, "post")
      .then((response) => {
        const data = response && response.data ? response.data : null;

        if (data && data.error) {
          const msg = "There was an error. Please try again";
          /** reset button */
          setActionButtonState(
            "update",
            "Update Production",
            false,
            false,
            updateProduction
          );
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
            previousPumpingDistanceInMeters:
              callData["pumping-distance-in-meters"],
            previousPumpingElevationInMeters:
              callData["pumping-elevation-in-meters"],
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

          /** reset button back to default on success */
          setActionButtonState(
            "update",
            "Update Production",
            false,
            false,
            updateProduction
          );

          /**  retrieve the output calculation returned from the server. We will show the server output first  */
          const outputData = {
            batchStartTime: data["start_time"] ?? null,
            endTime: data["end_time"] ?? null,
            previousBatchNo: data["batch_no"] ?? null,
            productionCapacity: data["production_capacity"] ?? null,
            productionId: data["production_id"] ?? null,
            durationPumpedInSeconds: data["duration_pumped_in_seconds"] ?? null,
            pumpingDistanceInMeters: data["pumping_distance_in_meters"] ?? null,
            pumpingElevationInMeters:
              data["pumping_elevation_in_meters"] ?? null,
            totalQtyPumped: data["total_qty_pumped"] ?? null,
          };
          updateTimelineView("output", outputData);

          /**@note the `convertHyphenatedPropsToCamel` for converting hyphynated props to camel  */
          updateTimelineView("update", convertHyphenatedPropsToCamel(callData));
        }
      })
      .catch((e) => {
        errorAlert("Error Alert", e.message);
      });
  };

  /**
   * Temporarily stops production while the production batch is still running.
   * we will implement pausing in a very simplistic way. Rather than making a call to the API to stop a batch
   * during a pause, we will `pauseProduction()` so that the `productionData.durationPumpedInSeconds` remain the
   * the same by the time we resume the pumping.
   */
  const pauseProduction = async () => {
    const confirm = await confirmDialog(
      "Are you sure you want to pause?",
      "Yes, pause"
    );
    if (!confirm.isConfirmed) return null;

    /**
     * Pause production and begin to track the duration of time we pause. This time will be updated when we resume
     */
    setPauseProduction();

    /** begin to record the `durationPausedInSeconds` timer will only run if we have `paused` */
    startPauseTimer();

    /** disable other two action buttons so that user cannot update or stop production during a pause */
    setActionButtonState(
      "stop",
      "Stop Production",
      false,
      true,
      stopProduction
    );
    setActionButtonState(
      "update",
      "Update Production",
      false,
      true,
      updateProduction
    );

    /** finally, change pause button text and onClick event to resume */
    setActionButtonState("pause", "Resume", false, false, resumeProduction);

    const batchNo = getProductionDataByKey("previousBatchNo");

    successAlert("Production Alert", `Production paused for ${batchNo}`);

    updateTimelineView("pause", getProductionData());
  };

  /**
   * Resume a puased production session
   */
  const resumeProduction = () => {
    /** make the production resume again */
    setResumeProduction();

    /** stop the pause timer  */
    stopPauseTimer();

    /** enable other two action buttons so that user can update or stop production during */
    setActionButtonState(
      "update",
      "Update Production",
      false,
      false,
      updateProduction
    );
    setActionButtonState(
      "stop",
      "Stop Production",
      false,
      false,
      stopProduction
    );

    /** finally, change pause button text and onClick event to Pause */
    setActionButtonState("pause", "Pause", false, false, pauseProduction);

    const batchNo = getProductionDataByKey("previousBatchNo");

    successAlert("Production Alert", `Production resumed for ${batchNo}`);

    updateTimelineView("resume", getProductionData());
  };

  /**
   * Stops current production session. Once production stops, all production related data are cleaned
   * @returns
   */
  const stopProduction = async (showPopup = true) => {
    if (showPopup) {
      const confirm = await confirmDialog(
        "Are you sure you want to stop?",
        "Yes, stop"
      );
      if (!confirm.isConfirmed) return null;
    }

    const apiPath = buildApiPath("stop");

    const productionData = getProductionData();

    const currentTime = moment().format("hh:mm");

    const totalDurationPumpedInSeconds = getProductionDataByKey(
      "durationPumpedInSeconds"
    );

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

    makeApiCall(apiPath, callData, "post")
      .then((response) => {
        const data = response && response.data ? response.data : null;

        if (data && data.error) {
          const msg = "There was an error. Please try again";
          /** reset button */
          setActionButtonState(
            "stop",
            "Stop Production",
            false,
            false,
            stopProduction
          );
          return errorAlert("Error Alert", data.message ?? msg);
        }

        if (data.error === false) {
          successAlert("Production Alert", data.message);

          /**  retrieve the output calculation returned from the server. */
          const outputData = {
            batchStartTime: data["start_time"] ?? null,
            endTime: data["end_time"] ?? null,
            previousBatchNo: data["batch_no"] ?? null,
            productionCapacity: data["production_capacity"] ?? null,
            productionId: data["production_id"] ?? null,
            durationPumpedInSeconds: data["duration_pumped_in_seconds"] ?? null,
            pumpingDistanceInMeters: data["pumping_distance_in_meters"] ?? null,
            pumpingElevationInMeters:
              data["pumping_elevation_in_meters"] ?? null,
            totalQtyPumped: data["total_qty_pumped"] ?? null,
          };

          updateTimelineView("stop", outputData);

          /**
           * This production session has ended. Clear out all the production data
           * @todo: in the future, we can print out a detailed production report
           * */
          resetProductionData();

          /** load a restart production button to start a new production session*/
          loadRestartButton();

          stopTimer();

          /** no need to track window event. Production properly ended */
          removeWindowOnCloseListener();
        }
      })
      .catch((e) => {
        errorAlert("Error Alert", e.message);
      });
  };

  /**
   * Upload the production data if user attempt to close the production screen when we have not yet completed  production
   * This will provide us with data to work with when we resume or the admin wasnt to check the pumping status from their end
   */
  const uploadProductionData = () => {
    const productionData = getProductionDataByKey();

    const callData = {
      "product-id": productionData["productId"],
      "production-id": productionData["previousProductionId"],
      "production-data": JSON.stringify(productionData),
    };

    const apiPath = buildApiPath("updateTrackerData");

    makeApiCall(apiPath, callData, "post")
      .then((response) => {
        const data = response && response.data ? response.data : null;

        console.log(response, " response on save");

        if (data && data.error) {
        }

        if (data.error === false) {
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const Test = () => (
    <CurrentRunningProductionScreen
      onDistanceChange={onDistanceChange}
      onElevationChange={onElevationChange}
      onCapacityInputChange={onCapacityInputChange}
      onCapacitySliderChange={onCapacitySliderChange}
      hideProductSelect={true}
      productionCapacity={30}
      elevation={10}
      distance={1000}
      onUpdateClick={updateProduction}
      onPauseClick={pauseProduction}
      onStopClick={stopProduction}
    />
  );

  /**
   * A help function to validate production. Because we are not using state,this is implemented such that
   * we must wait for our user permission data to be provided before we can call this function
   * @param {*} productId
   * @param {*} selectProductData
   * @returns
   */
  const validateProduction = async (
    productId = null,
    selectProductData = getProductionDataByKey("selectProductData")
  ) => {
    const apiPath = buildApiPath("getTracker");

    if (!selectProductData || selectProductData.length <= 0) {
      /**
       * we cannot allow user to view anything. User has not product permission
       * @toto: we must implement notification here
       *  */
      return null;
    }

    /**
     * for the start, we will pick the first  product user has the permission to see and validate
     * each time user select new product, we will rerun the validation to see if such product is
     * currently in production. See `onProductChange()` method for the validation.
     * */
    const callData = { "product-id": productId ?? selectProductData[0].id };

    makeApiCall(apiPath, callData, "get").then(async (response) => {
      const data = response && response.data ? response.data : null;
      if (data && data.error) {
        const msg = "There was an error. Please try again";
        errorAlert("Error Alert", data.message ?? msg);
      }

      /** validate and check to see if production can move ahead.This must happen only when the status returned is `0` if status is `1`
       * If the status is `1`, we will perform two operations.
       * 1. if there is an hydratedData and the batch_no and production_id matches the value retuened from the server, then we will resume production
       * from where we stopped
       * 2. if details does not match, we will notify that production is currently running and we cannot run multiple production
       */
      if (parseInt(data.status) === 1) {
        const productionBatchFromServer = data["batch_no"] ?? null;
        const productionIdFromServer = data["production_id"] ?? null;

        /** get the if there is any hydrated information saved locally */
        const hydratedData = await deHydrateProductionData();
        console.log(hydratedData, "hydrated data found");

        if (hydratedData) {
          const { previousProductionId, previousBatchNo, hydratedClock } =
            hydratedData;

          /** if this value corresponds to whhat we returned from server We will promt user to give information about the
           * paroduction status if the machine was stopped since the last time or not
           */
          if (
            previousBatchNo == productionBatchFromServer &&
            previousProductionId == productionIdFromServer
          ) {
            /** we must resume this production as the local details matches with server response */

            return updateMainContainerView(
              <ProductionExistScreen
                title="You have a pending production not yet completed. Please indicate what happen since last  pumping session"
                continueText={`Click on  "Continue" if  pumping machine never stops`}
                resumeText={`Click on "Resume"  if machine stops and is now running`}
                onContinueClick={() =>
                  continueProductionFromLastSession(hydratedData)
                }
                onResumeClick={() =>
                  resumeProductionFromLastSession(hydratedData)
                }
                hydratedClock={hydratedClock}
              />
            );
          }
        }

        /** show production cannot start screen */
        const msg = `Production is curerntly running. You cannot run multiple production at the same time. Please contact admin to 
              manually end current production session`;
        return updateMainContainerView(
          <ProductionCannotStartScreen
            message={msg}
            onGoToDashboardClick={() => history.push("/")}
            onRefreshClick={() => history.push("#")}
          />
        );
      }
      /**
       * If production is not currently running, we will show user the production startScreen
       * @note
       *  */
      updateMainContainerView(
        <StartNewProductionScreen
          /** validate elevation and distance. we pass `false` so production dats is not updated
           */
          onElevationChange={onElevationChange}
          onDistanceChange={onDistanceChange}
          /** select first product or use productId */
          productId={productId ?? selectProductData[0].id}
          onCapacityInputChange={onCapacityInputChange}
          onCapacitySliderChange={onCapacitySliderChange}
          onStartClick={startProduction}
          selectProductData={selectProductData}
          onProductChange={onProductChange}
          dateFrom={moment()}
          dateTo={moment()}
          timeFrom={moment()}
        />
      );
    });
  };

  /**
   *  Validate if there is currently a running production. If there is one, we will not allow production to proceed
   * Before we commence production, we will check for two things:
   * 1. Check if there is a currrent production seession. We cannot run multiple production at the same time.
   * 2. Validate if there is an uncompleted pumping session. If we see any, we will prompt user to continues the abandoned
   * session.
   * @param {*} productId
   */
  const useValidateIfProductionIsInProgress = (productId = null) => {
    const UserStore = getUserStoreInstance();

    /** holds all product user have permission to pump */
    let selectProductData = [];

    /**  read user store infos and save to producttionData*/
    UserStore.useStateAsync("user").then((user) => {
      setProductionDataByKey("user", user);
    });
    UserStore.useStateAsync("userId").then((userId) => {
      setProductionDataByKey("userId", userId);
    });

    UserStore.useStateAsync("permission").then((permission) => {
      if (permission && permission["productPermissions"]) {
        for (let key in permission.productPermissions) {
          selectProductData = selectProductData.concat({
            id: key,
            name: permission.productPermissions[key].text,
          });
        }
        /** sete a productData so we can reference it at a later time */
        setProductionDataByKey("selectProductData", selectProductData);

        /** we are calling this here so that the permission data to use is already available */
        validateProduction();
      }
    });
  };

  /** * Check if a production is running */
  useValidateIfProductionIsInProgress();

  return (
    /**
     * Always return the `MainProductionScreen`. This is the component that will control production view
     * when component loads, we will display `CheckingProductionStatusScreen` which will notify user that 
     * app is checking production status to ensure that we do not run multiple production at the same  time.
     * @note: at varioous point within the application lifecycle, we will update the view to reflect the appropriate 
     * screen user should see. 
     <><MainProductionScreen CurrentScreen={Test} /></>
     */
    <MainProductionScreen CurrentScreen={CheckingProductionStatusScreen} />
  );
};

export default Production;
