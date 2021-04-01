import { combineReducers } from "redux";
import { ordersReducer } from "./orders/ordersReducer";

export default combineReducers({ orders: ordersReducer });
