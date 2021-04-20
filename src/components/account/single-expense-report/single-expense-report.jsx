import React from "react";
import { Link } from "react-router-dom";
import "./invoice-preview.css";
import SingleExpenseReportBody from "./single-expense-report-body";
import SingleExpenseReportFooter, {
  SingleExpenseReportFooterNote,
} from "./single-expense-report-footer";
import SingleExpenseReportHeader from "./single-expense-report-header";
// import SingleExpenseReportIntro from "./single-expense-report-intro";
const SingleExpenseReport = () => {
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
                        <SingleExpenseReportHeader />
                        {/* END OF ORDER RECEIPT HEADER */}
                        {/* BEGINNING OF ORDER RECEIPT INTRO*/}
                        {/* <SingleExpenseReportIntro /> */}
                        {/* END OF ORDER RECEIPT INTRO*/}
                        {/* BEGINNING OF ORDER RECEIPT BODY*/}
                        <SingleExpenseReportBody />
                        {/* END OF ORDER RECEIPT BODY*/}

                        {/* BEGINNING OF ORDER RECEIPT FOOTER*/}
                        <SingleExpenseReportFooter />
                        {/* END OF ORDER RECEIPT FOOTER*/}
                        {/* BEGINNING OF ORDER RECEIPT FOOTER NOTE*/}
                        <SingleExpenseReportFooterNote />
                        {/* END OF ORDER RECEIPT FOOTER NOTE*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* BEGINNING OF ORDER RECIEPT LINKS */}
            <SingleExpenseReportLinks />
            {/* END OF ORDER RECIEPT LINKS */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SingleExpenseReportLinks = () => (
  <div className="col-xl-3">
    <div className="invoice-actions-btn">
      <div className="invoice-action-btn">
        <div className="row">
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link to="#" className="btn btn-primary btn-send">
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
            <Link to="#" className="btn btn-success btn-download">
              Download
            </Link>
          </div>
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link to="#" className="btn btn-dark btn-edit">
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SingleExpenseReport;
