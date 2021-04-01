import { ORDERS_TYPE } from "./orders-type";
export const OnBucketInputChange = (value) => ({
  type: ORDERS_TYPE.ADD_CHANGE,
  payload: value,
});
export const OnTruckRegInputChange = (value) => ({
  type: ORDERS_TYPE.ADD_CHANGE,
  payload: value,
});
export const OnTruckSizeInputChange = (value) => ({
  type: ORDERS_TYPE.ADD_CHANGE,
  payload: value,
});

export const handleSubmit = (addedNumber) => ({
  type: ORDERS_TYPE.SUBMIT_FORM,
  payload: addedNumber,
});
