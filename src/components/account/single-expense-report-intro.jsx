import React from "react";
import { expenseReportData } from "./single-expense-report-data";
const SingleExpenseReportIntro = () => {
  const { truckDetails } = expenseReportData;
  return (
    <div className="inv--detail-section inv--customer-detail-section">
      <div className="row">
        <div className="col-xl-8 col-lg-7 col-md-6 col-sm-4 align-self-center">
          <p className="inv-to">Receipt To</p>
        </div>

        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 align-self-center order-sm-0 order-1 inv--payment-info">
          <h6 className=" inv-title">Product Info:</h6>
        </div>

        <div className="col-xl-8 col-lg-7 col-md-6 col-sm-4">
          <p className="inv-customer-name">{truckDetails.truckNumber}</p>
        </div>

        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12 order-sm-0 order-1">
          <div className="inv--payment-info">
            <p>
              <span className=" inv-subtitle">{truckDetails.productDesc}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleExpenseReportIntro;
