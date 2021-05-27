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
  errorAlert,
  functionUtils,
  useGetUserDetails,
} from "../../../hooks/function-utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import LoadingButton from "../../general/loading-button";

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
    const truckNoValue = document.getElementById("truckNo").value;
    const orderPrice = JSON.parse(order.unit_price);
    // Calculate the cost of an order
    const orderCost = qtyValue * orderPrice;
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

    setTotalPrice(order.total_price);
  };

  const handleUpdateOrder = (userName, userId) => {
    const qtyValue = document.getElementById("qty").value;
    const truckNoValue = document.getElementById("truckNo").value;
    const orderId = order.id;
    const orderRef = order.order_ref;
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
    // if (error || !error) {
    //   setLoading(true);
    //   document.getElementById("loading-btn").disabled = true;
    // }
    axios
      .post(`${BASE_API_URL}/api/v1/order/update.php`, updateOrderData)
      .then((res) => {
        if (res.data.error) {
          setError(true);
          setShowModal(true);
          setErrorMsg(res.data.message);
          updateErrorAlert(res.data.message);
          setLoading(false);
        } else {
          setError(false);
          setShowModal(true);
          updateSuccessAlert();
          setOrder(res.data.data);
          document.getElementById("qty").value = "";
          document.getElementById("truckNo").value = "";
          setTotalPrice(0);
          setLoading(false);
        }
      })
      .catch((error) => {
        updateErrorAlert(error);
        setLoading(false);
      });
    // if (!errorMsg) {
    //   setLoading(false);
    //   document.getElementById("loading-btn").disabled = false;
    // }
  };

  const getUpdateOrderFormData = (userName, userId) => {
    const qtyValue = document.getElementById("qty").value;
    const truckNoValue = document.getElementById("truckNo").value;
    const orderId = order.id;
    const orderRef = order.order_ref;
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
      text: "Your order has been updated, you can close this pop-up and keep browsing",
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
        if (res.data.error) {
          setErrorMsg(res.data.message);
          const title = "Order  dispatch failed",
            text = `Your order was not dispatched, the reason is:  ${errorMsg}`;
          errorAlert(title, text);
          setLoading(false);
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
          setLoading(false);
          setOrder((state) => ({ ...state, dispatched: "1" }));
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
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
    <div
      id="order-receipt-view"
      className="row invoice  layout-spacing layout-top-spacing"
    >
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
            <div id="order-receipt-view-links" className="col-xl-3">
              <DispatchComment
                rows={5}
                cols={3}
                content={dispatchFormData}
                loading={loading}
                dispatchOrder={() => {
                  setLoading(true);
                  dispatchOrder(userName, userId);
                }}
              />
              <OrderReceiptLinks
                dispatched={order?.dispatched}
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
              setLoading(true);
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

/** use this function to print out the order receipt  */
const printOrderReceiptOld = (
  printTitle = "Order Receipt",
  orderReceiptLayer = "order-receipt-view"
) => {
  const receiptContentLayer = document
    .getElementById(orderReceiptLayer)
    .cloneNode(true);

  /** get all the style links on our current page */
  const links = document.getElementsByTagName("link");
  const scripts = document.getElementsByTagName("script");

  console.log(scripts, "all scripts");

  /** get the content to print without the links */
  let receiptContent = receiptContentLayer.innerHTML;

  let printWindow = window.open("", "PRINT", "height=400,width=600");

  const receiptView = `<div style="padding:5px">${receiptContent}</div>`;

  const printCommand =
    "<scr" +
    'ipt type="text/javascript">' +
    "window.onload = function() {" +
    'document.getElementById("order-receipt-view-link").innerHTML=null;' +
    "window.print();" +
    "window.close();" +
    "};" +
    "</sc" +
    "ript>";

  printWindow.document.write(`<html><head><title>${printTitle}</title>`);

  /** add all the  css links */
  for (let link of links) {
    console.log(link, "current link");
    printWindow.document.head.appendChild(link);
  }

  /** append all the links to the print window */
  for (let script of scripts) {
    printWindow.document.head.appendChild(script);
  }

  // printWindow.document.write(printCommand);
  printWindow.document.write("</head><body>");
  printWindow.document.write(receiptView);
  printWindow.document.write("</body></html>");

  printWindow.addEventListener("DOMContentLoaded", () => {
    alert("loaded");
    // printWindow.document.getElementsByClassName(
    //   "order-receipt-view-links"
    // )[0].innerHTML = null;
  });

  printWindow.document.close();
  printWindow.focus();

  return true;
};

/**
 * Use to create a printable and downloadable orderReceipt
 */
const printOrderReceipt = (
  saveReceipt = false,
  receiptName = "Order Receipt",
  orderReceiptLayer = "order-receipt-view",
  orderReceiptLayerLinks = "order-receipt-view-links"
) => {
  /**
   * first scroll the window to top. This is to fix the bug of the
   * pdf generated adding too much `marginTop` and cutting off receipt
   */
  window.scrollTo(0, 0);

  /** hide the links layer.  */
  const links = document.getElementById(orderReceiptLayerLinks);
  links.setAttribute("style", "display:none");

  const receiptContentLayer = document.getElementById(orderReceiptLayer);

  const canvasOptions = {
    scale: 0.88,
    //scale: 1,
    backgroundColor: "#ffffff",
  };
  const pdfOptions = {
    orientation: "p",
    unit: "px",
    format: "a4",
  };

  html2canvas(receiptContentLayer, canvasOptions).then((canvas) => {
    let imgData = canvas.toDataURL("image/png");
    let doc = new jsPDF(pdfOptions);
    const marginTop = 30;
    const marginLeft = 3;

    doc.addImage(imgData, "JPEG", marginLeft, marginTop);

    if (saveReceipt === true) {
      return doc.save(receiptName);
    }
    /** by default attempt to open the receipt  */
    window.open(doc.output("bloburl"), "_blank");
  });
  /** show link layer  */
  links.setAttribute("style", "display:block");
};

export const OrderReceiptLinks = ({ setShowModal, dispatched }) => (
  <div className="">
    <div className="invoice-actions-btn">
      <div className="invoice-action-btn">
        <div className="row">
          <div className="col-xl-12 col-md-4 col-sm-6">
            <a
              onClick={() => {
                printOrderReceipt();
              }}
              href="javascript:void(0)"
              className="btn btn-secondary btn-print  action-print"
            >
              Print
            </a>
          </div>
          <div className="col-xl-12 col-md-4 col-sm-6">
            <a
              onClick={() => {
                printOrderReceipt(true);
              }}
              href="javascript:void(0)"
              className="btn btn-success btn-download"
            >
              Download
            </a>
          </div>
          <div className="col-xl-12 col-md-4 col-sm-6">
            <LoadingButton
              handleSubmit={() => {
                if (dispatched === "1") {
                  errorAlert("Order Already dispatched can't be edited");
                } else {
                  setShowModal();
                }
              }}
              text="Edit"
              extraClass="edit-order-loading-btn btn btn-dark btn-edit"
            />
            {/* <a
              id="edit-order"
              href="javascript:void(0)"
              onClick={() => setShowModal()}
              className="btn btn-dark btn-edit"
            >
              Edit
            </a> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);
export const DispatchComment = ({
  content,
  rows,
  cols,
  dispatchOrder,
  loading,
}) => (
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
            <LoadingButton
              handleSubmit={dispatchOrder}
              loading={loading}
              text="Dispatch Order"
              extraClass="dispatch-order-loading-btn btn btn-primary btn-send"
            />
            {/* <a
              id="dispatch-order"
              onClick={() => dispatchOrder()}
              href="javascript:void(0)"
              className="btn btn-primary btn-send"
            >
              Dispatch Order
            </a> */}
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
