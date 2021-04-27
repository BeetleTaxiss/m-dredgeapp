import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { SummaryDetails, summaryData } from "../general/summary-components";
import WidgetHeader from "../general/widget-header";

const Summary = () => {
  const [summaryList, setSummaryList] = useState(["loading"]);
  useEffect(() => {
    setTimeout(() => setSummaryList(summaryData), 1500);
    return () => {};
  }, []);
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
      <div className="widget widget-three">
        {/* WIDGET HEADER */}
        <WidgetHeader title="Summary" dropdown />
        <div className="widget-content">
          <div className="order-summary">
            {/* WIDGET ORDER SUMMARY CONTENT */}

            {summaryList[0] === "loading" ? (
              <>
                <Skeleton height={70} count={3} />
              </>
            ) : (
              summaryList.map((details, i) => (
                <SummaryDetails key={i} details={details} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
