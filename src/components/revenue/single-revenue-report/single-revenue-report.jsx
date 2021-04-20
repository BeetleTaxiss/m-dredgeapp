import React from "react";
import { Link } from "react-router-dom";
import "./invoice-preview.css";
import SingleRevenueReportBody from "./single-revenue-report-body";
import SingleRevenueReportFooter, {
  SingleRevenueReportFooterNote,
} from "./single-revenue-report-footer";
import SingleRevenueReportHeader from "./single-revenue-report-header";
// import SingleRevenueReportIntro from "./single-revenue-report-intro";
const SingleRevenueReport = () => {
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
                        <SingleRevenueReportHeader />
                        {/* END OF ORDER RECEIPT HEADER */}
                        {/* BEGINNING OF ORDER RECEIPT INTRO*/}
                        {/* <SingleRevenueReportIntro /> */}
                        {/* END OF ORDER RECEIPT INTRO*/}
                        {/* BEGINNING OF ORDER RECEIPT BODY*/}
                        <SingleRevenueReportBody />
                        {/* END OF ORDER RECEIPT BODY*/}

                        {/* BEGINNING OF ORDER RECEIPT FOOTER*/}
                        <SingleRevenueReportFooter />
                        {/* END OF ORDER RECEIPT FOOTER*/}
                        {/* BEGINNING OF ORDER RECEIPT FOOTER NOTE*/}
                        <SingleRevenueReportFooterNote />
                        {/* END OF ORDER RECEIPT FOOTER NOTE*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* BEGINNING OF ORDER RECIEPT LINKS */}
            <SingleRevenueReportLinks />
            {/* END OF ORDER RECIEPT LINKS */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SingleRevenueReportLinks = () => (
  <div className="col-xl-3">
    <div className="invoice-actions-btn">
      <div className="invoice-action-btn">
        <div className="row">
          <div className="col-xl-12 col-md-3 col-sm-6">
            <Link to="#" className="btn btn-primary btn-send">
              Send to Email
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

export default SingleRevenueReport;
