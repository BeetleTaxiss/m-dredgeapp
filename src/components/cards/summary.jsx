import React from "react";
import { SummaryDetails, summaryData } from "../general/summary-components";
import WidgetHeader from "../general/widget-header";

const Summary = () => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
      <div className="widget widget-three">
        {/* WIDGET HEADER */}
        <WidgetHeader title="Summary" dropdown />
        <div className="widget-content">
          <div className="order-summary">
            {/* WIDGET ORDER SUMMARY CONTENT */}
            {summaryData.map((details, i) => (
              <SummaryDetails key={i} details={details} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
