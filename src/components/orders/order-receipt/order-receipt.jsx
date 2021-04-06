import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./invoice-preview.css";
import OrderReceiptBody from "./order-receipt-body";
import OrderReceiptFooter, {
  OrderReceiptFooterNote,
} from "./order-receipt-footer";
import OrderReceiptHeader from "./order-receipt-header";
import OrderReceiptIntro from "./order-receipt-intro";
const OrderReceipt = () => {
  const { state } = useLocation();
  const [order, setOrder] = useState();
  useEffect(() => {
    setOrder(state);
  }, [order, state]);
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
            <OrderReceiptLinks />
            {/* END OF ORDER RECIEPT LINKS */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderReceiptLinks = () => (
  <div className="col-xl-3">
    <div className="invoice-actions-btn">
      <div className="invoice-action-btn">
        <div className="row">
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link to="javascript:void(0);" className="btn btn-primary btn-send">
              Send Invoice
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
            <Link
              to="javascript:void(0);"
              className="btn btn-success btn-download"
            >
              Download
            </Link>
          </div>
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link to="apps_invoice-edit.html" className="btn btn-dark btn-edit">
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderReceipt;
