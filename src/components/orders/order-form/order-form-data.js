import Success from "../../../assets/check.svg";
import Error from "../../../assets/cancel.svg";

export const successfulOrderData = {
  logo: Success,
  title: "Order Successful",
  text:
    " Your order has been successfully placed, click the link below to view your order",
  linkText: "View order",
  linkPath: "/orderreceipt",
};
export const errorOrderData = {
  logo: Error,
  title: "Error",
  text: "Your order wasn't processed, please fill in the form and try again",
};
