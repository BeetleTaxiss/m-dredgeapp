import React from "react";
import { revenueReportData } from "./single-revenue-report-data";

const SingleRevenueReportHeader = () => {
  const { header } = revenueReportData;
  return (
    <div className="inv--head-section inv--detail-section">
      <div className="row">
        <div className="col-sm-6 col-12 mr-auto">
          <div className="d-flex">
            <img
              className="company-logo"
              src={header.logoSection.image}
              alt="company"
            />
            <h3 className="in-heading align-self-center">
              {header.logoSection.brandName}
            </h3>
          </div>
        </div>

        <div className="col-sm-6 text-sm-right">
          <p className="inv-list-number">
            <span className="inv-title">Revenue : </span>{" "}
            <span className="inv-number">{header.ReferenceNumber}</span>
          </p>
        </div>

        <div className="col-sm-6 align-self-center mt-3">
          {header.contactSection.map((item, i) => (
            <p className="inv-street-addr">{item}</p>
          ))}
        </div>
        <div className="col-sm-6 align-self-center mt-3 text-sm-right">
          <p className="inv-created-date">
            <span className="inv-title">Date : </span>{" "}
            <span className="inv-date">{header.date}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleRevenueReportHeader;
