import React from "react";

/**
 * 
 * @returns Display the Timer Display View
 */
export const TimerDisplay = ({ circle }) => {

  return (
    <div id={circle ? "cd-circle" : "cd-simple"}>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-hours"></h1>
        </div>
        <h4 className="clock-text"> Hours </h4>
      </div>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-minutes"></h1>
        </div>
        <h4 className="clock-text"> Minutes </h4>
      </div>
      <div className="countdown" style={{ justifySelf: "center" }}>
        <div className="clock-count-container">
          <h1 className="clock-val" id="clock-face-seconds"></h1>
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
export const ProductionTimeline = () => {
  return (
    <div className="row" style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="widget-content widget-content-area pb-1"
        style={{ padding: "2rem" }}
      >
        <div
          className="mt-container mx-auto"
          id="timeline-notification-single"
        >
          Hello. Something on the Timeline

        </div>
      </div>
    </div>
  );
};


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

  const onCapacityInputChange = () => {

    const capacitySlider = document.getElementById("production-capacity");
    const capacityInput = document.getElementById("production-capacity-value");
    capacitySlider.value= capacityInput.value.replace(/[%]/, "");
  }

  return (
    <div
      className="shift-calculator-production-capacity-setter"
      style={{
        display: "flex",
        alignItems: "center",
        margin: "3rem 0 2rem",
        gap: "0.5rem",
      }}
    >
      <input
        id="production-capacity"
        type="range"
        min="0"
        max="100"
        name="production-capacity"
        className="custom-range progress-range-counter slider"
        defaultValue={productionCapacity}
        onChange={() => onCapacitySliderChange ? onCapacitySliderChange() : null}
      />
      <div className="range-count" style={{ borderRadius: "100px", display:"flex", flexDirection:"row", alignItems:"center"}}>
        <input type="text" id="production-capacity-value"
          className="range-count-number"
          style={{ borderRadius: "100px", width: "50px", height: "50px", textAlign: "center" }}
          defaultValue={productionCapacity}
          onChange={() => onCapacityInputChange ? onCapacityInputChange() : null}
        />
        <span className="range-count-unit">%</span>
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

  const { productId, elevation, distance, selectProductData } = props;

  /** get event props   */
  const { productOnChange, distanceOnOnChange, elevationOnChange } = props;

  /** create the product list options */
  const productOptions = selectProductData && selectProductData.map((product, key) => <option key={key} value={product.id}>{product.name}</option>);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", width: "100%" }}>
        <span style={{ padding: "1rem 1rem", borderRadius: "10px", width: "50%", backgroundColor: "rgba(235, 237, 242, 0.5)" }}>

          <select id="production-product" type="text" defaultValue="Sand" className="form-control flatpickr flatpickr-input active"
            onChange={() => productOnChange ? productOnChange() : null}>
            <option key={"selct-paroduct"} value={null}>Select a product</option>)
            {productOptions}
          </select>

        </span>

        <span style={{ padding: "1rem 1rem", borderRadius: "10px", width: "50%", backgroundColor: "rgba(235, 237, 242, 0.5)" }}>
          <input id="production-pumping-distance" type="text" placeholder="Pumping Distance"
            className="form-control flatpickr flatpickr-input" defaultValue={distance ?? 0}
            onChange={() => distanceOnOnChange ? distanceOnOnChange() : null}
          />
        </span>

      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", width: "100%" }}>
        <span style={{ padding: "1rem 1rem", borderRadius: "10px", width: "100%", backgroundColor: "rgba(235, 237, 242, 0.5)" }}>
          <input id="production-pumping-elevation" type="text" placeholder="Pumping Elevation"
            className="form-control flatpickr flatpickr-input active" defaultValue={elevation ?? 0}
            onChange={() => elevationOnChange ? elevationOnChange() : null} />
        </span>
      </div>
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
  /** dummy data */
  const data = [{
    id: 1,
    name: "Sand"
  }];

  return (
    <div className="shift-calculator">
      <h2 id="title">Select your working Hours</h2>
      <form className="form-group mb-0">
        <div className="input-group" style={{ alignItems: "center", justifyContent: "center", gap: "2rem" }} >
          <ProductionDistanceAndElevationFields elevation={20} distance={300} selectProductData={data} />
          <ProductionDateAndTimeFields dateFrom={"09/22/2030"} />
        </div>
        <ProductionCapacitySlider />

        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <LoadingButton text="Start Shift" extraClass="shift-calculator-loading-btn" />
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

  return (
    <>
      <TimerDisplay {...props} />
      <ProductionCapacitySlider {...props} />
      <ProductionTimeline {...props} />
    </>
  )
}


export const LoadingButton = (props) => {

  const {loading, text, extraClass, disabled, onClick} =props;

  /** create a loading indicator if loading */
  const LoadingIndicator= ()=> loading ? <span className="spinner-grow text-white mr-2 align-self-center loader-sm" />: null; 

  return (
    <button id="loading-btn" type="button" disabled={disabled}
      className={`mt-4 btn btn-primary ${extraClass && extraClass}`}
      style={{display: "flex",alignItems: "center",justifyContent: "center",gap: "0.5rem"}}
      onClick={()=> onClick && typeof onClick ==="function" ? onClick() : null}
      >
        <LoadingIndicator/>
        {text?? "Submit" }
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
