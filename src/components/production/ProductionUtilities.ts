import { ReactElement } from "react";
import axios from "axios";
import { BASE_API_URL } from "./../../hooks/API";
import { render } from "react-dom";
import reactDOMServer from "react-dom/server";
import localforage from "localforage";



/**
 * Interfaces and types definitions
 */
export interface ApiEndPoint {
    readonly start: string,
    readonly update: string,
    readonly pause: string,
    readonly stop: string,
    readonly getTracker: string,
    readonly updateTracker: string,
    readonly updateTrackerData: string,
}

/**
 * Production  Data interface 
 */
export interface ProductionDataInterface {
    product: string | null,
    productId: number | null,
    startDate: string | null,
    endDate: string | null,
    startTime: string | null,
    endTime: string | null,
    durationPumpedInSeconds: number,
    durationPausedInSeconds: number,
    productionCapacity: number | null,
    productionPaused: boolean,
    timelineItems: Array<object> | null,
    /** any other property at run time could be added */
    [propName: string]: any
}

export interface ConvertHyphenToCamelInterface {
    /** this will allow us to assign properties at runtime */
    [propName: string]: any
}

/**
 * Interface for date conversion
 */
export interface DatePart {
    day: number,
    month: number,
    year: number,
    [paramName: string]: number,
}
export interface TimePart {
    hour: number,
    minutes: number,
    seconds?: any,
    milliseconds?: any,
    [paramName: string]: number,
}

export interface CustomDate {
    getTime: Function
}


/** 
 * the main layer that contains our varying components. This layer is returned by `MainProductionScreen`
 * aFor every update we are writing for user view, we will use this layer
 * */
const productionMainContainer: string = "production-main-container";

/** the base directory for production api */
export const apiBaseDirectory: string = "api/v1/production";

/**
 * These are the available API endpoints that we can call. Append the `apiBaseDirectory` so we can have the full
 * api path.
 */
export const apiEndPoints: ApiEndPoint = {
    start: `add-marker.php`,
    update: `stop-add-marker.php`,
    pause: `stop-marker.php`,
    stop: `stop-marker.php`,
    getTracker: `get-production-tracker-state.php`,
    updateTracker: `update-production-tracker.php`,
    updateTrackerData: `update-production-tracker-data.php`,
}

/** list of allowed API method verbs */
const allowedApiMethods: ReadonlyArray<string> = ["post", "get"];

/**
 * This contains all the information about our current running production
 * To get information when application screen changes, we will make a request 
 * for this information or set them as appropriate. initialize with empty values
 */
let productionData: ProductionDataInterface = {
    product: null,
    productId: null,
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    productionCapacity: null,
    durationPumpedInSeconds: 0,
    durationPausedInSeconds: 0,
    productionPaused: false,
    selectProductData:[],
    timelineItems: [],
}

/**
 * This variable will track the production pause timer countdown when its running
 */
let productionPausedTimer: NodeJS.Timeout;


/**
 * Get the production data including any last custom property added 
 * @param productionData 
 */
export const getProductionData = (): ProductionDataInterface => {
    return ({ ...productionData })
}

/**
 * Retrieve production data by the entry key
 * @param key 
 * @returns 
 */
export const getProductionDataByKey = (key: string): any | null => {
    return productionData[key] ?? null;
}

/**
 * Set all the production data all at once. This could include additional props not defined in `ProductionDataInterface`
 * @param data 
 * @returns 
 */
export const setProductionData = (data: ProductionDataInterface): ProductionDataInterface => {
    productionData = { ...productionData, ...data };
    return productionData
}

/**
 * Reset the productionData to the default state.
 * @Note: only use this at the end of a production session
 * @returns 
 */
export const resetProductionData = (): boolean => {
    productionData = {
        user:productionData.user?? null,
        userId:productionData.userId?? null,
        product: null,
        productId: null,
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        productionCapacity: null,
        durationPumpedInSeconds: 0,
        durationPausedInSeconds: 0,
        productionPaused: false,
        selectProductData:productionData.selectProductData?? [],
        timelineItems: [],
    }
    return true;
}

/**
 * Saves production data to local storage in JSON format.
 * 
 * Wake up hydrated production data. If data is found, we will need to prompt user to:
 * 1. Tell us the production is still running since the last time window abruptly closed
 * 2. continue production if its is still running, or start a new production afresh
 * 
 * @param currentDate 
 * @param storageKey 
 * @param clockFaceValue
 */

/**
 * Saves production data to local storage in JSON format.
 * 
 * Wake up hydrated production data. If data is found, we will need to prompt user to:
 * 1. Tell us the production is still running since the last time window abruptly closed
 * 2. continue production if its is still running, or start a new production afresh
 * 
 * @param currentDate 
 * @param clockFaceValue 
 * @param storageKey 
 * @param storageKeyTimelineItems 
 */
export const hydrateProductionData = async (currentDate: Date, clockFaceValue : TimePart,  storageKey: string ="hydrated-production-data", storageKeyTimelineItems: string ="hydrated-production-data-timeline-items") => {

    productionData = { ...productionData, hydratedDate: currentDate, hydratedClock: clockFaceValue };

    /** save  all production information to session storage except the `timelineItems` props  */
    await localforage.setItem(storageKey, JSON.stringify(productionData));
}   

/**
 * Wake up hydrated production data. If data is found, we will need to prompt user to:
 * 1. Tell us the production is still running since the last time window abruptly closed
 * 2. continue production if its is still running, or start a new production afresh
 * @param storageKey 
 */
export const deHydrateProductionData = async (storageKey: string ="hydrated-production-data", storageKeyTimelineItems: string ="hydrated-production-data-timeline-items")=> {
    
    const storedProductionData : string | null = await localforage.getItem(storageKey);

    if(!storedProductionData)  return null;

    /** 
     * ensure that when we deHydrate, we must set `productionPaused: false` 
     * so that timer can resume running when we start
     * 
     * Also add back the `timelineItems` seperated during hydration
     * */
    return ({...JSON.parse(storedProductionData), productionPaused: false})
}

/**
 * Set the production data by prop key. We can pass in any arbitrary property not defined in our 
 * `ProductionDataInterface`
 * @param key
 * @param value 
 * @returns 
 */
export const setProductionDataByKey = (key: string, value: any): boolean => {
    productionData[key] = value;
    return true
}

/**
 * get production running status. 
 * @returns 
 */
export const isProductionPaused = () => {
    return productionData.productionPaused
}

/**
 * Pause a current running production. 
 * @Note: this function does not actually pause the clock screen. It simply 
 * set the `productionData.productionPaused` so that the timer functions does not 
 * update the `productionData.durationPumpedInSeconds` while this is true.
 * @Note: see the timer implementation on the 
 */
export const pauseProduction = () => {
    productionData.productionPaused = true;
}

/**
 * set the `productionData.productionPaused` back to false. This will allow the timer 
 * cose update the `productionData.durationPumpedInSeconds` as the clock ticks 
 */
export const resumeProduction = () => {
    productionData.productionPaused = false;
}

/**
 * Increment the duration pumped only when pumping is not paused
 */
export const incrementDurationPumped = () => {
    /** only update timer if the production is not paused */
    if (isProductionPaused() === false) {
        productionData.durationPumpedInSeconds = productionData.durationPumpedInSeconds + 1;
    }
}

/**
 * increment the total time we have paused. Will run only if we have paused
 */
export const incrementDurationPausedInSeconds = () => {
    /** only update value if the production  is paused */
    if (isProductionPaused() === true) {
        productionData.durationPausedInSeconds = productionData.durationPausedInSeconds + 1;
    }
}

/**
 * Starts the production pause timer.
 */
export const startPauseTimer = () => {
    const wait = 1000;
    if (isProductionPaused() === true) {
        productionPausedTimer = setInterval(() => {
            incrementDurationPausedInSeconds();
            console.log(productionData.durationPausedInSeconds, "paused in seconds")
        }, wait)
    }
}

/**
 * stops the pause timer 
 */
export const stopPauseTimer = () => {

    if (isProductionPaused() === true) {
        clearInterval(productionPausedTimer)
    }
}

/**
 * reset the durationPumpedInSeconds
 */
export const resetDurationPumpedInSeconds = () => {
    productionData.durationPumpedInSeconds = 0;
}

/**
 * Reset the total duration paused time
 */
export const resetDurationPausedInSeconds = () => {
    productionData.durationPausedInSeconds = 0;
}

/**
 * This function gets the timer ticks as each seconds passes
 * @param hours 
 * @param minutes
 * @param seconds 
 */
export const getTimerTick = function* (hours: number, minutes: number, seconds: number) {

    /** create an indefinite loop to return timer tick values */
    for (; ;) {

        if (hours === 0 && minutes === 0 && seconds === 0) {
            /** stop generator. Time has ran out */
            return { hours: hours, minutes: minutes, seconds: seconds }
        }

        if (seconds > 0) {
            seconds = seconds - 1;
        } else if (seconds === 0 && minutes > 0) {
            minutes = minutes - 1;
            seconds = 60;
        } else if (minutes === 0 && hours > 0) {
            hours = hours - 1;
            minutes = 60;
        } else if (hours === 0) {
            hours = 0;
        } else if (hours === 0 && minutes === 0) {
            hours = 0;
            minutes = 0;
        }
        /** return the tick value */
        yield { hours: hours, minutes: minutes, seconds: seconds };

    }
}


/**
 * Convert an object with `hyphen-casing` prop to `camelCasing` and return the cloned object
 * @param data 
 * @returns 
 */
export const convertHyphenatedPropsToCamel = (data: ConvertHyphenToCamelInterface): object => {
    let cloneObject: ConvertHyphenToCamelInterface = {};

    for (let key in data) {

        const camelKey = key.split("-").map((keyPart, k) => {
            let keyPartArr = keyPart.split("");
            if (k > 0) {
                const [firstKey, ...restKey] = keyPartArr;
                return `${firstKey.toUpperCase()}${restKey.join("")}`
            } else {
                return keyPart
            }
        }).join("");

        /** assign the new `camelKey` as object props and copy value from `data` */
        cloneObject[camelKey] = data[key];
    }
    return cloneObject;
}

/**
 * Convert camelCase props to hyphenated props
 * @param data 
 * @returns 
 */
export const convertCamelPropsToHyphen = (data: ConvertHyphenToCamelInterface): object => {
    let cloneObject: ConvertHyphenToCamelInterface = {};

    for (let key in data) {
        let hyphenKey = "";
        key.split("").forEach(letter => {
            if (letter === letter.toUpperCase()) {
                /** convert all upper case to hyphenated props */
                hyphenKey += `-${letter.toLowerCase()}`
            } else {
                hyphenKey += letter
            }
        });
        /** assign the new `hyphenKey` as object props and copy value from `data` */
        cloneObject[hyphenKey] = data[key];
    }
    return cloneObject;
}


/**
 * Extract the day, month, and year value from an html input 
 * @Note: html form input is traditionally formatted like "yyyy-mm-dd"
 * @param dateValue 
 * @param delimiter 
 * @returns 
 */
export const getDatePartInLocalFormat = (dateValue: string, delimiter: string = "-"): DatePart => {

    const regEx = new RegExp(delimiter, "ig");

    if (!regEx.test(dateValue)) return ({ day: 0, month: 0, year: 0 });

    const arrDate = dateValue.split(regEx);

    if (arrDate.length < 3) return ({ day: 0, month: 0, year: 0 });;
    /** 
     * return the date value in dd/mm/yyyy format
     * @Note: the date provided is in yyyy mm dd format. This is the default format from an html form date input field
     */
    return ({ day: parseInt(arrDate[2]), month: parseInt(arrDate[1]), year: parseInt(arrDate[0]) })
}

/**
 * convert a date form input value to a date object
 * @param dateValue 
 * @param delimiter 
 * @returns 
 */
export const convertInputDateValueToDateObjectInLocalFormat = (dateValue: string, timePart: TimePart | null = null, delimiter: string = "-"): Date | CustomDate => {

    const datePart: DatePart = getDatePartInLocalFormat(dateValue);

    if (datePart === null || typeof datePart === "string") return ({ getTime: () => null });

    /**
     * @Note: we subtract `1` from the `datepart.month` to give room for javascript month that starts from `0` and not `1`
     * for example, `Jan` has an index of `0` and not `1` in javascript.
     */
    if (timePart !== null) {
        const timeArr = Object.entries(timePart);

        if (timeArr.length >= 2) {

            switch (timeArr.length) {
                case (4):
                    return new Date(datePart.year, datePart.month - 1, datePart.day, timePart.hour, timePart.minutes, timePart.seconds, timePart.milliseconds);
                case (3):
                    return new Date(datePart.year, datePart.month - 1, datePart.day, timePart.hour, timePart.minutes, timePart.seconds);
                case (2):
                    return new Date(datePart.year, datePart.month - 1, datePart.day, timePart.hour, timePart.minutes);
                default:
                    /** default return uses only the `hour` and `minutes` values */
                    return new Date(datePart.year, datePart.month - 1, datePart.day, timePart.hour, timePart.minutes);
            }
        }
    }

    /** default return date object value without timePart */
    return new Date(datePart.year, datePart.month - 1, datePart.day);
}

/**
 * Get the time part values of value from an html time input field
 * @param timeValue 
 * @param delimiter 
 * @returns 
 */
export const getTimePartInLocalFormat = (timeValue: string, delimiter: string = ":"): TimePart | null => {

    const regEx = new RegExp(delimiter, "ig");
    const arrTime = timeValue.split(regEx);

    if (arrTime.length < 2) return null;

    /**
     * return time parts based on the input format provided. But our time must have at least `hour` and `minutes`
     */
    switch (arrTime.length) {
        case (4):
            return ({ hour: parseInt(arrTime[0]), minutes: parseInt(arrTime[1]), seconds: parseInt(arrTime[2]), milliseconds: parseInt(arrTime[3]) })
        case (3):
            return ({ hour: parseInt(arrTime[0]), minutes: parseInt(arrTime[1]), seconds: parseInt(arrTime[2]) })
        case (2):
            return ({ hour: parseInt(arrTime[0]), minutes: parseInt(arrTime[1]) })
        default:
            return null
    }
}

/**
 * Compute the total quantity pumped in seconds
 * @param fromDate 
 * @param toDate 
 * @param fromTime 
 * @param toTime 
 * @returns 
 */
export const computeTotalDurationPumpedInSeconds = (fromDate: string, toDate: string, fromTime: string, toTime: string): number => {

    const fromDateTimeObject = convertInputDateValueToDateObjectInLocalFormat(fromDate, getTimePartInLocalFormat(fromTime));
    const toDateTimeObject = convertInputDateValueToDateObjectInLocalFormat(toDate, getTimePartInLocalFormat(toTime));

    /** get the variance between the `start` and `end time` */
    const dateTimeDifferenceInMs = toDateTimeObject.getTime() - fromDateTimeObject.getTime();
    const timeObject = new Date(dateTimeDifferenceInMs);
    /** get the seconds value */
    return timeObject.getSeconds()
}

/**
 * Calculate the total quantity pumped
 * @param durationsPumpedInSeconds 
 * @returns 
 */
export const computeTotalQtyPumped = (durationsPumpedInSeconds: number,): number | null => {
    return 5000;
}

/**
 * Use to build a full path api path for our call based on the callType provided
 */
export const buildApiPath = (callType: string) => {

    if (Object.keys(apiEndPoints).indexOf(callType) === -1) {
        alert(`This call type is not available. You can either use ${Object.keys(apiEndPoints).join(", or ")}`)
        return null
    }

    /** 
     * split our endpoint arrays into key value pair
     * return the api endPoint defined for this callType 
    */
    for (const [key, value] of Object.entries(apiEndPoints)) {
        if (key === callType) {
            return `${BASE_API_URL}/${apiBaseDirectory}/${value}`;
        }
    }
    /** default return to null */
    return null;
}

/**
 * Use this to make dynamic api calls
 * @param apiPoint 
 * @param callData 
 * @param method 
 */
export const makeApiCall = (apiPoint: string, callData: object | null, method: string = "get") => new Promise((resolve, reject) => {

    /** Check if this is a valid call allowed */
    if (allowedApiMethods.indexOf(method) === -1) {
        const msg = "The method is not a valid axios API call method";
        alert(msg);
        return console.error(msg)
    }

    /** create a wrapper around axios calls. default to `get`  */
    const axiosCall = method.toLowerCase() === "post" ? axios.post : axios.get;

    /**
     * create the call data object based on the method we are calling. if this is a `get` method
     * we will append callData provided to a param key, else we will pass it directly
     */
    const axiosCallData = method.toLowerCase() === "get" ? ({ params: { ...callData } }) : callData;

    /** 
     * make the call. Note that this call could be any of the accepted call methods
     * for now, we only accept `get` and `post` calls 
     * */
    axiosCall(apiPoint, axiosCallData).then(response => {
        resolve(response);
    }).catch(e => {
        reject(e)
    })
});


/**
 * Renders a react component to a provided layer
 * @param component 
 * @param layer 
 * @returns 
 */
export const updateContainerView = (component: ReactElement, layer: string) => {

    const layerElement: HTMLElement | null = document.getElementById(layer);
    if (!layerElement || layerElement === null || layerElement === undefined) {
        return console.warn(`Layer ${layer} not loaded  or found in DOM tree`)
    } else {
        render(component, layerElement)
    }

}

/**
 * Render child component to the `production-main-container` main production layer
 * @param component 
 * @param mainLayer 
 * @returns 
 */
export const updateMainContainerView = (component: ReactElement, mainLayer: string = productionMainContainer) => {
    /** update the main container layer with component */
    updateContainerView(component, mainLayer);
}