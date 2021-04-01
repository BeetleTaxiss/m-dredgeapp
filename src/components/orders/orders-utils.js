import moment from "moment";

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

export const orderUtils = {
  // HANDLE ORDER FORM SUBMIT FUNCTION
  handleFormSubmit: (formInput) => {
    // DESTRUCTURE GENERATE SERIAL NUMBER TO GET RANDOM SERIAL NUMBER
    const { randomSerial } = generateSerial();

    // VARAIABLES TO MIMICK CONSTANT VALUES GOTTEN FROM THE DATABASE
    const orderValueConstants = {
      bucketPrice: 3000,
      bucketvalue: 1.5,
      time: moment().format("MM/DD/YY  hh:mm:ss"),
      serialNumber: randomSerial,
    };

    // DESTRUCTURED VARIABLES FROM MIMICKED DATABASE
    const {
      bucketPrice,
      bucketvalue,
      serialNumber,
      time,
    } = orderValueConstants;

    // CONVERSION OF BUCKET INPUT VALUE TO INTEGER
    const bucketNumber = parseInt(formInput?.buckets);

    // TRUCK INPUT VALUES
    const truckRegistrationNumber = formInput?.truckRegNo;
    const truckSize = formInput?.truckSize;

    // DESTRUCTED CALCULATED VALUES GOTTEN FROM CALCULATION FUNCTION
    const { orderCost, orderVolume } = calculateOrderCost(
      bucketPrice,
      bucketvalue,
      bucketNumber
    );

    console.log(
      "form submitted",
      "bucket number: ",
      bucketNumber,
      " price: ",
      bucketPrice,
      "order cost: ₦",
      orderCost,
      " order size: ",
      orderVolume,
      "cm³",
      " time and date: ",
      time,
      " serial number: ",
      serialNumber,
      " Truck Registration Number: ",
      truckRegistrationNumber,
      "Truck Size: ",
      truckSize
    );
  },

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
};
