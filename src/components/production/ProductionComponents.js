import Skeleton from "react-loading-skeleton";
import { functionUtils } from "../../hooks/function-utils";

/**
 * 
 * @returns Display the Timer Display View
 */
export const TimerDisplay = (props) => {

  /** get the timer values */
  const { timerHours, timerMinutes, timerSeconds } = props;

  /** 
   * get the timer function.  This is the function that updates our timer view
   * This function is pased in from the main production page and utilizes 
   * */
  return (
    <div id={/**circle ? "cd-circle" : */"cd-simple"}>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-hours">{timerHours}</h1>
        </div>
        <h4 className="clock-text"> Hours </h4>
      </div>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-minutes">{timerMinutes}</h1>
        </div>
        <h4 className="clock-text"> Minutes </h4>
      </div>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-seconds">{timerSeconds}</h1>
        </div>
        <h4 className="clock-text"> Seconds </h4>
      </div>
    </div>
  )
}

/**
 * Production Timeline view. Each time we update our production, we will write
 * updates to the production timeline
 * @returns
 */
export const ProductionTimeline = ({ timelineItems }) => {

  const timelineList = timelineItems && timelineItems.map((item, key) => {

    return <TimelineItem key={key} action={item.action} data={item.actionData} />
  });

  return (
    <div className="row" style={{ display: "flex", width: "100%", padding: "25px", alignItems: "flex-start", justifyContent: "flex-start" }}>
      <div className="widget-content widget-content-area pb-1" style={{ width: "80vw" }} >
        <div style={{ width: "100%" }} className="mt-container mx-auto" id="timeline-notification-single">
          <div className="timeline-line" id="production-timeline" >
            {timelineList}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Individual timeline item entry
 */
export const TimelineItem = (props) => {

  const { action, key} = props;

  const {
    product, batchStartTime, endTime, productionCapacity, pumpingElevationInMeters, pumpingDistanceInMeters,  totalQtyPumped,
    durationPumpedInSecondsAfterWakeup, previousBatchNo, durationPumpedInSeconds, durationPausedInSeconds,
  } = props.data;
  
  const dotColor = action === "start" || action === "resume" ? "success" : 
  action === "update" ? "primary" : 
  action === "pause" ? "warning" : 
  action === "wakeup" ? "success" : 
  action === "output" ? "black" : 
  action === "stop" ? "danger" : 
  "primary";
  
  const formatNumber=functionUtils.addCommaToNumbers;
  
  
  /** create a description based on the action performed */
  let message = "";

  switch (action) {

    case ("start"):
      message = <>
        <>Production of {product} started</>
        <p className="t-meta-time">Elevation: {pumpingElevationInMeters}</p>
        <p className="t-meta-time">Distance: {formatNumber(pumpingDistanceInMeters)}</p>
        <p className="t-meta-time">Production Capacity: {productionCapacity} %</p>
      </>
      break;

    case ("update"):
      message = <>
      <>Updated production parameter</>
      <p className="t-meta-time">Production Capacity: {productionCapacity} %</p>
      <p className="t-meta-time">Elevation: {pumpingElevationInMeters}</p>
      <p className="t-meta-time">Distance: {formatNumber(pumpingDistanceInMeters)}</p>
    </>
      break;

      case ("output"):
        message = <>
        <>Production Output @ {endTime}</>
        <p className="t-meta-time">Batch Start Time: {batchStartTime}</p>
        <p className="t-meta-time">Batch Number: {previousBatchNo}</p>
        <p className="t-meta-time">Production Capacity: {productionCapacity} %</p>
        <p className="t-meta-time">Elevation: {pumpingElevationInMeters}</p>
        <p className="t-meta-time">Distance: {formatNumber(pumpingDistanceInMeters)}</p>
        <p className="t-meta-time">Duration pumped in seconds: {formatNumber(durationPumpedInSeconds)}</p>
        <p className="t-meta-time">total Qty Pumped: {formatNumber(totalQtyPumped)} CM3</p>
      </>
        break;

    case ("pause"):
      message = <>
        <>Production paused</>
        <p className="t-meta-time">Pause at Capacity: {productionCapacity} %</p>
      </>
      break;

    case ("resume"):
      message = <>
        <>Productionn resumed</>
        <p className="t-meta-time">Resumed at Capacity: {productionCapacity} %</p>
        <p className="t-meta-time">Duration Paused in seconds: {formatNumber(durationPausedInSeconds)}</p>
      </>
      break;

    case ("wakeup"):
      message = <>
        <>Production restarted from last session</>
        <p className="t-meta-time">Resume Capacity: {productionCapacity} %</p>
        <p className="t-meta-time">Resume Elevation: {pumpingElevationInMeters}</p>
        <p className="t-meta-time">Resume Distance: {formatNumber(pumpingDistanceInMeters)}</p>
        {durationPumpedInSecondsAfterWakeup && (
          <p className="t-meta-time">Duration since shutdown: {durationPumpedInSecondsAfterWakeup}</p>
        )}
      </>
      break;

    case ("stop"):
      message = <>
        <>Production stopped @ {endTime}</>
        <p className="t-meta-time">Batch Start Time: {batchStartTime}</p>
        <p className="t-meta-time">Batch Number: {previousBatchNo}</p>
        <p className="t-meta-time">Production Capacity: {productionCapacity} %</p>
        <p className="t-meta-time">Elevation: {pumpingElevationInMeters}</p>
        <p className="t-meta-time">Distance: {formatNumber(pumpingDistanceInMeters)}</p>
        <p className="t-meta-time">Duration pumped in seconds: {formatNumber(durationPumpedInSeconds)}</p>
        <p className="t-meta-time">total Qty Pumped: {formatNumber(totalQtyPumped)} CM3</p>
      </>
      break;

    default:
      message = `Production running`;
  }

  return (
    <div key={key} className="item-timeline" style={{ paddingRight: "50px", paddingLeft: "50px" }}>
      <p className={`t-time ${dotColor}`} style={{ marginRight: "10px" }}>{action}</p>
      <div className={`t-dot t-dot-${dotColor}`}></div>
      <div className="t-text">
        <h6>{message}</h6>
      </div>
    </div>
  )
}


/**
 * The production slider measuring our production capacity.
 * This component wiil accept two major props 
 * `productionCapacity` and  `onCapacityChange`
 * @param {*} props 
 * @returns 
 */
export const ProductionCapacitySlider = (props) => {

  const productionCapacity = props.productionCapacity ?? 0;

  const onCapacitySliderChange = props.onCapacitySliderChange ?? null;

  const onCapacityInputChange = props.onCapacityInputChange ?? null;

  return (
    <div
      className="shift-calculator-production-capacity-setter"
      style={{ display: "flex", alignItems: "center", margin: "3rem 0 2rem", gap: "0.5rem" }}>
      <input
        id="production-capacity"
        type="range"
        min="0"
        max="100"
        name="production-capacity"
        className="production-slider"
        style={{
          WebkitAppearance: "none",
          appearance: "none",
        }}
        defaultValue={productionCapacity}
        onChange={() => onCapacitySliderChange ? onCapacitySliderChange() : null}
      />
      <div className="range-count" style={{ borderRadius: "100px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <input type="text" id="production-capacity-value"
          className="range-count-number"
          style={{
            borderRadius: "100px", width: "60px", height: "60px", textAlign: "center", fontSize: "14pt",
            fontWeight: "bold", color: "rgb(66, 132, 255)"
          }}
          defaultValue={productionCapacity}
          onChange={() => onCapacityInputChange ? onCapacityInputChange() : null}
        />
        <span className="range-count-unit"
          style={{ fontSize: "14pt", fontWeight: "bold", color: "rgb(66, 132, 255)" }}>%</span>
      </div>
    </div>
  )
}


/**
 * This is the section above the production date and time picker .
 * In this section, we will be able to select the `product`, the `pumping distance`
 * and the `pumping elevation` in meters. I have detached this component so that  we 
 * can use it not only when we want to commence a shift, but also when the shift is already 
 * running and we simply want to change the `pumping distance` and `elevation parameters`.
 * @Note: once production is running, we will not be able to change the value of the `product` 
 */
export const ProductionDistanceAndElevationFields = (props) => {

  const { elevation, distance, selectProductData, productId } = props;

  /** get event props   */
  const { onProductChange, onDistanceChange, onElevationChange } = props;

  /** seelct product can be hidden on some screen */
  const hideProductSelectView = props.hideProductSelect === true ? "none" : "flex";

  /** create the product list options */
  const productOptions = selectProductData && selectProductData.map((product, key) => <option key={key} selected={productId===product.id} value={product.id}>{product.name}</option>);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", width: "100%" }}>

        <span style={{ display: hideProductSelectView, padding: "1rem 1rem", borderRadius: "10px", width: "50%", backgroundColor: "rgba(235, 237, 242, 0.5)" }}>
          <select id="production-product" type="text" className="form-control flatpickr flatpickr-input active"
            onChange={() => onProductChange ? onProductChange() : null}>
            <option key={"selct-paroduct"} value={null}>Select a product</option>)
            {productOptions}
          </select>
        </span>

        <span style={{ padding: "1rem 1rem", borderRadius: "10px", width: "50%", backgroundColor: "rgba(235, 237, 242, 0.5)" }}>
          <input id="production-pumping-distance" type="text" placeholder="Pumping Distance in meters"
            className="form-control flatpickr flatpickr-input" defaultValue={distance ?? null}
            style={{ textAlign: "center", fontSize: "14pt", fontWeight: "bold", color: "rgb(66, 132, 255)" }}
            onChange={() => onDistanceChange ? onDistanceChange() : null}
          />
        </span>
        {hideProductSelectView === "none" &&
          <span style={{ padding: "1rem 1rem", borderRadius: "10px", width: "50%", backgroundColor: "rgba(235, 237, 242, 0.5)" }}>
            <input id="production-pumping-elevation" type="text" placeholder="Pumping Elevation in meters"
              className="form-control flatpickr flatpickr-input active" defaultValue={elevation ?? null}
              style={{ textAlign: "center", fontSize: "14pt", fontWeight: "bold", color: "rgb(66, 132, 255)" }}
              onChange={() => onElevationChange ? onElevationChange() : null} />
          </span>}

      </div>
      {hideProductSelectView === "flex" &&
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", width: "100%" }}>
          <span style={{ padding: "1rem 1rem", borderRadius: "10px", width: "100%", backgroundColor: "rgba(235, 237, 242, 0.5)" }}>
            <input id="production-pumping-elevation" type="text" placeholder="Pumping Elevation in meters"
              className="form-control flatpickr flatpickr-input active" defaultValue={elevation ?? null}
              style={{ textAlign: "center", fontSize: "14pt", fontWeight: "bold", color: "rgb(66, 132, 255)" }}
              onChange={() => onElevationChange ? onElevationChange() : null} />
          </span>
        </div>
      }
    </>
  )
}

/**
 * This is the production date and field field on the production screen.This screen will usually be immediately after 
 * the `ProductionDistanceAndElevationFields` when we are starting a production session. It will only be available when 
 * we are starting a new production session
 */
export const ProductionDateAndTimeFields = (props) => {

  /** get defaualt input variabales passed in */
  const { dateFrom, dateTo, timeFrom, timeTo } = props;

  /** get input events */
  const { onDateFromChange, onDateToChange, onTimeFromChange, onTimeToChange } = props;

  return (
    <>
      <div style={{
        display: "grid", alignItems: "center", padding: "1.5rem 0", width: "100%", borderRadius: "10px",
        backgroundColor: "rgba(235, 237, 242, 0.5)"
      }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", width: "100%" }}>

          <label className="input-label" htmlFor="production-from-date" style={{ width: "45%", fontWeight: "bold" }} >
            Start Date and time:
            <input id="production-from-date" style={{ marginTop: "0.5rem", }}
              type="date"
              name="production-from-date"
              className="form-control flatpickr flatpickr-input active"
              defaultValue={dateFrom ?? null}
            // min={date}
            />
          </label>
          <label className="input-label" htmlFor="production-to-date"
            style={{ width: "45%", fontWeight: "bold", }} >
            End Date and time:
            <input style={{ marginTop: "0.5rem" }}
              id="production-to-date" className="form-control flatpickr flatpickr-input active"
              type="date"
              name="production-to-date"
              defaultValue={dateTo ?? null}
            // min={date}
            />
          </label>
        </span>

        <span
          className="timepicker-btn" style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: "center",
            gap: "2rem",
            width: "100%",
          }} >
          <label
            className="input-label"
            htmlFor="production-from-time"
            style={{
              width: "45%",
            }}>
            <input
              id="production-from-time"
              name="production-from-time"
              type="time"
              defaultValue={timeFrom ?? null}
              className="form-control flatpickr flatpickr-input active"
            />
          </label>
          <label
            className="input-label"
            htmlFor="production-to-time"
            style={{
              width: "45%",
            }}
          >
            <input
              id="production-to-time"
              name="production-to-time"
              type="time"
              className="form-control flatpickr flatpickr-input active"
              defaultValue={timeTo ?? null}
            />
          </label>
        </span>
      </div>
    </>
  )
}


/**
 * This is the production screen user will see when production starts
 * @param {*} props 
 * @returns 
 */
export const StartNewProductionScreen = (props) => {

  /** get parameters  */
  const {productId,  distance, elevation, dateFrom, dateTo, timeFrom, timeTo, productionCapacity } = props;

  /** get the list of products we can show */
  const selectProductData = props.selectProductData ?? [];

  /** get events */
  const { onStartClick, onCapacitySliderChange, onCapacityInputChange, onProductChange } = props;

  return (
    <div className="shift-calculator">
      <h2 id="title">Select your working Hours</h2>
      <form className="form-group mb-0">
        <div className="input-group" style={{ alignItems: "center", justifyContent: "center", gap: "2rem" }} >
          <ProductionDistanceAndElevationFields elevation={elevation} distance={distance} selectProductData={selectProductData}
            onProductChange={onProductChange} productId={productId} />
          <ProductionDateAndTimeFields dateFrom={dateFrom} dateTo={dateTo} timeFrom={timeFrom} timeTo={timeTo} />
        </div>

        <ProductionCapacitySlider productionCapacity={productionCapacity}
          onCapacitySliderChange={onCapacitySliderChange}
          onCapacityInputChange={onCapacityInputChange}
        />
        <div id="production-start-button" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <StartButton text="Start Shift" extraClass="shift-calculator-loading-btn" onClick={onStartClick} />
        </div>
      </form>
    </div>
  )
}

/**
 * This is the screen view user will see when production is running
 * @param {*} props 
 * @returns 
 */
export const CurrentRunningProductionScreen = (props) => {

  /** data for the production details and capacity slider section */
  const { distance, elevation, hideProductSelect, onDistanceChange, onElevationChange } = props;

  /** capacity slider props */
  const { productionCapacity, onCapacitySliderChange, onCapacityInputChange } = props;

  /** get the timer data and function details  */
  const { timerHours, timerMinutes, timerSeconds, timerFunction } = props;

  /** get the buttons lick events */
  const { onUpdateClick, onPauseClick, onStopClick } = props;

  /** Get the timeline data information */
  const { timelineData } = props;


  return (
    <>
      <div id="production-clock-face">

        <TimerDisplay timerHours={timerHours}
          timerMinutes={timerMinutes}
          timerSeconds={timerSeconds}
          timerFunction={timerFunction} />

      </div>

      <ProductionDistanceAndElevationFields distance={distance} elevation={elevation}
        onDistanceChange={onDistanceChange} onElevationChange={onElevationChange}
        hideProductSelect={hideProductSelect} />

      <ProductionCapacitySlider productionCapacity={productionCapacity}
        onCapacitySliderChange={onCapacitySliderChange}
        onCapacityInputChange={onCapacityInputChange}
      />

      <div id="production-action-buttons">
        <CurrentRunningProductionButtons onUpdateClick={onUpdateClick} onPauseClick={onPauseClick} onStopClick={onStopClick} />
      </div>
      <ProductionTimeline timelineData={timelineData} />
    </>
  )
}

/**
 * Screen that show when we are still checking the production status 
 * Once status is confirmed, we will show the start production screen
 * @param {*} props 
 * @returns 
 */
export const CheckingProductionStatusScreen = (props) => {
  const title = props.title ?? "Checking production status. Please wait...";
  return (
    <>
      <Skeleton count={1} height={200} circle={true} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h5>{title}</h5>
      </div>
    </>
  )
}

/**
 * The current running production action buttons
 * @param {*} props 
 * @returns 
 */
export const CurrentRunningProductionButtons = (props) => {

  /** The component buttons click events */
  const { onUpdateClick, onPauseClick, onStopClick } = props;

  /** the buton disabled states . We will always enable button except otherwise*/
  const updateDisabled = props.updateDisabled ?? false;
  const pauseDisabled = props.pauseDisabled ?? false;
  const stopDisabled = props.stopDisabled ?? false;

  /** the button loading states. They will always be false except provided */
  const updateLoading = props.updateLoading ?? false;
  const pauseLoading = props.pauseLoading ?? false;
  const stopLoading = props.stopLoading ?? false;

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "2rem", }}>
      <div id="production-action-button-update">
        <ActionButton text="Update Production" onClick={onUpdateClick} disabled={updateDisabled} loading={updateLoading} />
      </div>
      <div id="production-action-button-pause">
        <ActionButton text="Pause" buttonType="pause" onClick={onPauseClick} disabled={pauseDisabled} loading={pauseLoading} />
      </div>
      <div id="production-action-button-stop">
        <ActionButton text="Stop Production" buttonType="stop" onClick={onStopClick} disabled={stopDisabled} loading={stopLoading} />
      </div>
    </div>
  )
}

/**
 * This screen notifies user when there is a current running production. 
 * Production cannnot start because a production is currently running 
 */
export const ProductionCannotStartScreen = (props) => {

  /** The component buttons click events */
  const { onGoToDashboardClick, onRefreshClick, message } = props;

  return (
    <>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <p>{message ?? null}</p>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "2rem", }}>
        <ActionButton text="Go to Dashboard" onClick={onGoToDashboardClick} />
        <ActionButton text="Refresh" buttonType="pause" onClick={onRefreshClick} />
      </div>
    </>
  )
}

export const ProductionExistScreen = (props) => {

  /** The component buttons click events */
  const { onContinueClick, onResumeClick, message } = props;

  const { hours, minutes, seconds } = props.hydratedClock ?? { hours: null, minutes: null, seconds: null }

  return (
    <>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <p>{message ?? null}</p>
      </div>
      <TimerDisplay timerHours={hours} timerMinutes={minutes} timerSeconds={seconds} />
      <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "2rem", }}>
        <ActionButton text="Continue" onClick={onContinueClick} />
        <ActionButton buttonType="stop" text="Resume" onClick={onResumeClick} />
      </div>
    </>
  )
}

/**
 * The start button
 * @param {*} props 
 * @returns 
 */
export const StartButton = (props) => {

  const { loading, text, extraClass, disabled, onClick } = props;

  /** create a loading indicator if loading */
  const LoadingIndicator = () => loading ? <span className="spinner-grow text-white mr-2 align-self-center loader-sm" /> : null;

  return (
    <button id="loading-btn" type="button" disabled={disabled}
      className={`mt-4 btn btn-primary ${extraClass && extraClass}`}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
      onClick={() => onClick && typeof onClick === "function" ? onClick() : null}
    >
      <LoadingIndicator />
      {text ?? "Submit"}
    </button>
  );
};


/**
 * The start button
 * @param {*} props 
 * @returns 
 */
export const ActionButton = (props) => {
  const { loading, text, extraClass, disabled, buttonType, onClick } = props;

  /** create a loading indicator if loading */
  const LoadingIndicator = () => loading ? <span className="spinner-grow text-white mr-2 align-self-center loader-sm" /> : null;

  /** build the button class . default button to `mt-4 btn btn-primary` */
  const buttonClass = buttonType === "pause" ? "mt-4 btn btn-warning" : buttonType === "stop" ? "mt-4 btn btn-danger" : "mt-4 btn btn-primary";

  return (
    <button id="stop-start-marker" type="button" disabled={disabled}
      className={`${buttonClass} ${extraClass && extraClass}`}
      style={{ width: "16rem", height: "3rem", fontSize: "1rem" }}
      onClick={() => onClick && typeof onClick === "function" ? onClick() : null}
    >
      <LoadingIndicator />
      {text ?? "Submit"}
    </button>
  );
};

/**
 * This section is the main production view. This is the actual display application user 
 * will interact with. This is the collection of each individual component that make up our 
 * production section. We can pass in the `CurrentScreen` component which is the screen 
 * we want the user to see at a specific time. The default view for user is the `StartNewProductionScreen`
 * @param {*} props 
 * @returns 
 */
export const MainProductionScreen = (props) => {
  /** 
   * get the CurrentScreen and otherProps 
   * @note: how we pass the CurrentScreen property. This is indicatative of the property been a component and not 
   * just a variable. For every component props, we will pass as `SnakeCase` and not `camelCase`.
   * */
  const { CurrentScreen, ...otherProps } = props;

  /**
   * if we have passed in a a valid CurrentScreen component, we will use as view, otherwise, `<StartNewProductionScreen>`
   */
  const View = () => CurrentScreen ? <CurrentScreen {...otherProps} /> : <StartNewProductionScreen {...otherProps} />;
  return (
    <div className="col-xl-12 col-lg-12 layout-spacing">
      <div className="widget-content-area">
        <div id="production-main-container" className="container"
          style={{ display: "flex", flexDirection: "column", gap: "3rem", padding: "3rem" }}>
          <View />
        </div>
      </div>
    </div>
  );
};

export default MainProductionScreen;
