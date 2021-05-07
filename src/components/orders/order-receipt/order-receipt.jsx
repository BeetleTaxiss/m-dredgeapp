import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./invoice-preview.css";
import OrderReceiptBody from "./order-receipt-body";
import OrderReceiptFooter, {
  OrderReceiptFooterNote,
} from "./order-receipt-footer";
import OrderReceiptHeader from "./order-receipt-header";
import OrderReceiptIntro from "./order-receipt-intro";
import FormModal from "../../general/modal/form-modal";
import { useUpdateOrderFormData } from "../../../hooks/useFormData";
import { BASE_API_URL } from "../../../hooks/API";
import Swal from "sweetalert2";
import { FormDetails } from "../order-form/order-form-details";
import {
  functionUtils,
  useGetUserDetails,
} from "../../../hooks/function-utils";
const OrderReceipt = () => {
  const { state } = useLocation();
  const [order, setOrder] = useState(state);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

  const handleChange = () => {
    // Get form values with document,getById
    const qtyValue = document.getElementById("qty").value;
    console.log("Qty Value: ", qtyValue);
    const truckNoValue = document.getElementById("truckNo").value;
    console.log("truckNo Value: ", truckNoValue);
    const orderPrice = JSON.parse(order.unit_price);
    console.log("Order Price: ", orderPrice);
    // Calculate the cost of an order
    const orderCost = qtyValue * orderPrice;
    // console.log("Order Price: ", order.price);
    console.log("Order Cost: ", orderCost);
    // Set the value of an order to the UI
    setTotalPrice(orderCost);
  };

  const handleShowUpdateOrderDetails = () => {
    if (document.getElementById("qty") !== null) {
      document.getElementById("qty").value = order.qty;
    }
    if (document.getElementById("truckNo") !== null) {
      document.getElementById("truckNo").value = order.truck_no;
    }
    console.log("Order details: ", order);
    setTotalPrice(order.total_price);
  };

  const handleUpdateOrder = (userName, userId) => {
    const qtyValue = document.getElementById("qty").value;
    const truckNoValue = document.getElementById("truckNo").value;
    console.log(" Order", order);
    const orderId = order.id;
    const orderRef = order.order_ref;
    // const user = order.user;
    // const userId = order.user_id;
    const productId = order.product_id;
    const product = order.product;
    const productUnit = order.unit;
    const unitPrice = order.unit_price;
    const measurement = order.measurement;
    const updateOrderData = {
      "product-id": productId,
      product: product,
      user: userName,
      "user-id": parseInt(userId),
      "order-id": orderId,
      "order-ref": orderRef,
      qty: qtyValue,
      unit: productUnit,
      "unit-price": unitPrice,
      measurement: measurement,
      "total-price": totalPrice,
      "truck-no": truckNoValue,
    };
    console.log("Submitted Update Order", updateOrderData);
    if (error || !error) {
      setLoading(true);
      document.getElementById("loading-btn").disabled = true;
    }
    axios
      .put(`${BASE_API_URL}/api/v1/order/update.php`, updateOrderData)
      .then((res) => {
        console.log("UPDATE ORDER: ", res.data);
        if (res.data.error) {
          setError(true);
          setShowModal(true);
          setErrorMsg(res.data.message);
          updateErrorAlert(res.data.message);
        } else {
          setError(false);
          setShowModal(true);
          updateSuccessAlert();
          console.log("Before: ", order);
          setOrder(res.data.data);
          console.log("After: ", order);
          document.getElementById("qty").value = "";
          document.getElementById("truckNo").value = "";
          setTotalPrice(0);
        }
      });
    if (!errorMsg) {
      setLoading(false);
      document.getElementById("loading-btn").disabled = false;
    }
  };

  const getUpdateOrderFormData = (userName, userId) => {
    const qtyValue = document.getElementById("qty").value;
    const truckNoValue = document.getElementById("truckNo").value;
    console.log(" Order", order);
    const orderId = order.id;
    const orderRef = order.order_ref;
    // const user = order.user;
    // const userId = order.user_id;
    const productId = order.product_id;
    const product = order.product;
    const productUnit = order.unit;
    const unitPrice = order.unit_price;
    const measurement = order.measurement;
    const updateOrderData = {
      "product-id": productId,
      product: product,
      user: userName,
      "user-id": userId,
      "order-id": orderId,
      "order-ref": orderRef,
      qty: qtyValue,
      unit: productUnit,
      "unit-price": unitPrice,
      measurement: measurement,
      "total-price": totalPrice,
      "truck-no": truckNoValue,
    };
    return updateOrderData;
  };

  const updateSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Order Updated Successfully",
      text:
        "Your order has been updated, you can close this pop-up and keep browsing",
    });
  };
  const updateErrorAlert = (errorMsg) => {
    Swal.fire({
      icon: "error",
      title: "Order Not Updated",
      text: `Your order was not updated, the reason is:  ${errorMsg}`,
    });
  };
  const successAlert = (title, text, link) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      footer: link,
      showConfirmButton: false,
    });
  };
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  const dispatchOrder = (userName, userId) => {
    const orderId = order.id;
    const orderRef = order.order_ref;
    // const user = order.user;
    // const userId = order.user_id;
    const comment = document.getElementById("comment").value;
    const dispatchData = {
      "order-id": orderId,
      "order-ref": orderRef,
      user: userName,
      "user-id": userId,
      comment: comment,
    };
    axios
      .post(`${BASE_API_URL}/api/v1/order/dispatch.php`, dispatchData)
      .then((res) => {
        console.log("Dispatch Resquest", res.data);
        if (res.data.error) {
          setErrorMsg(res.data.message);
          const title = "Order  dispatch failed",
            text = `Your order was not dispatched, the reason is:  ${errorMsg}`;
          errorAlert(title, text);
        } else {
          const title =
              res.data.message === "Order already dispatched"
                ? res.data.message
                : "Your Order has been dispatched successfully",
            text =
              res.data.message === "Order already dispatched"
                ? ""
                : `Click on the link to view your dispatch list`,
            link = "<a href='/dispatchlist'>View Dispatch List</a>";
          successAlert(title, text, link);
          document.getElementById("edit-order").disabled = true;
        }
      });
  };

  const dispatchFormData = [
    {
      id: "comment",
      type: "textarea",
      name: "comment",
      holder: "Comment if necessary",
      className: "form-control",
      required: false,
    },
  ];

  /** Validate total price before sendind */
  let validatedTotalPrice = isNaN(totalPrice)
    ? "Input a Number"
    : `${functionUtils.naira}${functionUtils.addCommaToNumbers(totalPrice)}`;

  const { formData } = useUpdateOrderFormData(validatedTotalPrice);

  useEffect(() => {
    setOrder(state);
  }, []);

  useEffect(() => {}, [order, userName, userId]);

  return (
    <div className="row invoice  layout-spacing layout-top-spacing">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="doc-container">
          <div className="row">
            <div className="col-xl-9">
              <div className="invoice-container">
                <div className="invoice-inbox">
                  <div id="ct" className="">
                    <div className="invoice-00001">
                      <div className="content-section">
                        {/* BEGINNING OF ORDER RECEIPT HEADER */}
                        <OrderReceiptHeader
                          date={order?.date_in}
                          orderRef={order?.order_ref}
                        />
                        {/* END OF ORDER RECEIPT HEADER */}
                        {/* BEGINNING OF ORDER RECEIPT INTRO*/}
                        <OrderReceiptIntro truckNo={order?.truck_no} />
                        {/* END OF ORDER RECEIPT INTRO*/}
                        {/* BEGINNING OF ORDER RECEIPT BODY*/}
                        <OrderReceiptBody
                          product={order?.product}
                          qty={functionUtils.addCommaToNumbers(order?.qty)}
                          price={functionUtils.addCommaToNumbers(
                            order?.unit_price
                          )}
                          amount={functionUtils.addCommaToNumbers(
                            order?.total_price
                          )}
                        />
                        {/* END OF ORDER RECEIPT BODY*/}

                        {/* BEGINNING OF ORDER RECEIPT FOOTER*/}
                        <OrderReceiptFooter
                          amount={functionUtils.addCommaToNumbers(
                            order?.total_price
                          )}
                        />
                        {/* END OF ORDER RECEIPT FOOTER*/}
                        {/* BEGINNING OF ORDER RECEIPT FOOTER NOTE*/}
                        <OrderReceiptFooterNote />
                        {/* END OF ORDER RECEIPT FOOTER NOTE*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* BEGINNING OF ORDER RECIEPT LINKS */}
            <div className="col-xl-3">
              <DispatchComment
                rows={5}
                cols={3}
                content={dispatchFormData}
                dispatchOrder={() => dispatchOrder(userName, userId)}
              />
              <OrderReceiptLinks
                setShowModal={() => {
                  setShowModal(true);
                  setTimeout(() => {
                    handleShowUpdateOrderDetails();
                  }, 1000);
                }}
              />
            </div>
            {/* END OF ORDER RECIEPT LINKS */}
          </div>
        </div>
      </div>
      {showModal && (
        <FormModal
          formTitle="Update Your Order"
          formSubtitle="Gave the wrong details? Change them below"
          formData={formData}
          showModal={showModal}
          setShowModal={setShowModal}
          loading={loading}
          setLoading={setLoading}
          errorMsg={errorMsg}
          status={error}
          handleSubmit={() => {
            const validationStatus = functionUtils.validateFormInputs(
              getUpdateOrderFormData(userName, userId)
            );
            if (validationStatus === true) {
              handleUpdateOrder(userName, userId);
            }
          }}
          handleChange={handleChange}
          Btntext="Update Order"
        />
      )}
    </div>
  );
};

export const OrderReceiptLinks = ({ setShowModal }) => (
  <div className="">
    <div className="invoice-actions-btn">
      <div className="invoice-action-btn">
        <div className="row">
          <div className="col-xl-12 col-md-4 col-sm-6">
            <a
              onClick={() => window.print()}
              href="javascript:void(0)"
              className="btn btn-secondary btn-print  action-print"
            >
              Print
            </a>
          </div>
          <div className="col-xl-12 col-md-4 col-sm-6">
            <a
              href="javascript:void(0)"
              className="btn btn-success btn-download"
            >
              Download
            </a>
          </div>
          <div className="col-xl-12 col-md-4 col-sm-6">
            <a
              id="edit-order"
              href="javascript:void(0)"
              onClick={() => setShowModal()}
              className="btn btn-dark btn-edit"
            >
              Edit
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export const DispatchComment = ({ content, rows, cols, dispatchOrder }) => (
  <div className="mb-4">
    <div className="invoice-actions-btn">
      <div className="invoice-action-btn">
        <div className="row">
          <div className="col-xl-12 ">
            {content.map((item) => (
              <FormDetails key={item.id} item={item} rows={rows} cols={cols} />
            ))}
          </div>
          <div className="col-xl-12">
            <a
              id="dispatch-order"
              onClick={() => dispatchOrder()}
              href="javascript:void(0)"
              className="btn btn-primary btn-send"
            >
              Dispatch Order
            </a>
          </div>
          {/* 
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link
              onClick={() => window.print()}
              to="#"
              className="btn btn-secondary btn-print  action-print"
            >
              Print
            </Link>
          </div>
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link to="#" className="btn btn-success btn-download">
              Download
            </Link>
          </div>
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link
              id="edit-order"
              to="#"
              onClick={() => setShowModal(true)}
              className="btn btn-dark btn-edit"
            >
              Edit
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  </div>
);

export default OrderReceipt;
