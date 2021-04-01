import { ORDERS_TYPE } from "./orders-type";
import { addChange } from "./order-utils";

export const orderFormState = {
  buckets: "",
  truckRegistrationNumber: "",
  truckSize: "",
  serialNumber: "",
  Price: "",
  dateTime: "",
};

export const ordersReducer = (state = orderFormState, action) => {
  switch (action.type) {
    case ORDERS_TYPE.ADD_CHANGE:
      return {
        ...state,
        buckets: addChange,
        truckRegistrationNumber: action.payload,
        truckSize: action.payload,
      };
    case ORDERS_TYPE.SUBMIT_FORM:
      return {
        ...state,
      };
    default:
      return state;
  }
};
