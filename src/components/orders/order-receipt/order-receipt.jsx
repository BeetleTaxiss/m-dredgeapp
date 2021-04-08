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
const OrderReceipt = () => {
  const { state } = useLocation();
  const [order, setOrder] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log("Order state", order);
    setOrder(state);
    console.log("Order state", order);
  }, [order]);

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

  const handleUpdateOrder = () => {
    const qtyValue = document.getElementById("qty").value;
    const truckNoValue = document.getElementById("truckNo").value;
    console.log("Submitted Order", order);
    const user = order.user;
    const userId = order.user_id;
    const productId = order.product_id;
    const product = order.product;
    const productUnit = order.unit;
    const unitPrice = order.unit_price;
    const measurement = order.measurement;
    const updateOrderData = {
      "product-id": productId,
      product: product,
      user: user,
      "user-id": userId,
      qty: qtyValue,
      unit: productUnit,
      "unit-price": unitPrice,
      measurement: measurement,
      "total-price": totalPrice,
      "truck-no": truckNoValue,
    };
    if (error || !error) {
      setLoading(true);
      document.getElementById("loading-btn").disabled = true;
    }
    axios
      .post(`${BASE_API_URL}/api/v1/order/update.php`, updateOrderData)
      .then((res) => {
        console.log("UPDATE ORDER: ", res.data);
        if (res.data.error) {
          setError(true);
          setShowModal(true);
          setErrorMsg(res.data.message);
        } else {
          setError(false);
          setShowModal(true);
          setOrder(res.data.data);
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

  const { formData } = useUpdateOrderFormData(totalPrice);
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
                          qty={order?.qty}
                          price={order?.unit_price}
                          amount={order?.total_price}
                        />
                        {/* END OF ORDER RECEIPT BODY*/}

                        {/* BEGINNING OF ORDER RECEIPT FOOTER*/}
                        <OrderReceiptFooter amount={order?.total_price} />
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
            <OrderReceiptLinks setShowModal={setShowModal} />
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
          handleSubmit={handleUpdateOrder}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export const OrderReceiptLinks = ({ setShowModal }) => (
  <div className="col-xl-3">
    <div className="invoice-actions-btn">
      <div className="invoice-action-btn">
        <div className="row">
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link to="#" className="btn btn-primary btn-send">
              Dispatch Order
            </Link>
          </div>
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
              to="#"
              onClick={() => setShowModal(true)}
              className="btn btn-dark btn-edit"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderReceipt;
