import React from "react";
import { revenueReportData } from "./single-revenue-report-data";
export const SingleRevenueReportFooterNote = () => {
  return (
    <div className="inv--note">
      <div className="row mt-4">
        <div className="col-sm-12 col-12 order-sm-0 order-1">
          <p>Note: Structed Business makes everyone happy.</p>
        </div>
      </div>
    </div>
  );
};
const SingleRevenueReportFooter = () => {
  const { footer } = revenueReportData;
  return (
    <div className="inv--total-amounts">
      <div className="row mt-4">
        <div className="col-sm-5 col-12 order-sm-0 order-1"></div>
        <div className="col-sm-7 col-12 order-sm-1 order-0">
          <div className="text-sm-right">
            <div className="row">
              <div className="col-sm-8 col-7">
                <p className="">Sub Total: </p>
              </div>
              <div className="col-sm-4 col-5">
                <p className="">₦{footer.subtotal}</p>
              </div>
              <div className="col-sm-8 col-7 grand-total-title">
                <h4 className="">Grand Total : </h4>
              </div>
              <div className="col-sm-4 col-5 grand-total-amount">
                <h4 className="">₦{footer.total}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRevenueReportFooter;
