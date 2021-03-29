import React from "react";
import { ReactComponent as ChartLine } from "../../assets/chartLine.svg";

// DYNAMIC STOCK PROGRESS BAR
export const StockPileProgressBar = ({ content }) => (
  <div className="w-progress-stats">
    <div className="progress">
      <div
        className="progress-bar bg-gradient-secondary"
        role="progressbar"
        style={{ width: `${content}%` }}
        aria-valuenow={content}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <div className="">
      <div className="w-icon">
        <p>{content}</p>
      </div>
    </div>
  </div>
);

// DYNAMIC STOCK INFORMATION COMPONENT
export const StockPileInformation = ({ content }) => (
  <div className="w-content">
    <div
      className="w-info"
      style={{ display: "flex", gap: "0.2rem", alignItems: "flex-end" }}
    >
      <p className="value">
        {content.value} <span>{content.duration}</span>{" "}
      </p>
      {/* Beginning of Duration Chartline SVG */}
      <ChartLine />
      {/* End of Duration Chartline SVG  */}
    </div>
  </div>
);
const TotalStockpile = () => {
  // STOCK PILE DATA
  const stockpiledata = {
    info: { value: "400,000cm³", duration: "this week" },
    progressPercentage: "47",
  };
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-card-four">
        <div className="widget-content">
          <div className="w-header">
            <div className="w-info">
              <h6 className="value">Total Stock</h6>
            </div>
          </div>
          {/* BEGINNING OF STOCK PILE INFORMATION */}
          <StockPileInformation content={stockpiledata.info} />
          {/* END OF STOCK PILE INFORMATION */}

          {/* BEGINNING OF PROGRESS BAR FOR STOCK PILE CAPACITY */}
          <StockPileProgressBar content={stockpiledata.progressPercentage} />
          {/* ENDING OF PROGRESS BAR FOR STOCK PILE CAPACITY */}
        </div>
      </div>
    </div>
  );
};

export default TotalStockpile;
