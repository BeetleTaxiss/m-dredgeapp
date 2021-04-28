import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { BASE_API_URL } from "../../hooks/API";
import { ReactComponent as ChartLine } from "../../assets/chartLine.svg";
import { functionUtils } from "../../hooks/function-utils";

const TotalStockpile = () => {
  const [totalStockpile, setTotalStockpile] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    let totalStockpileSchema;
    const response = async () => {
      await axios
        .get(`${BASE_API_URL}/api/v1/production/summary.php`)
        .then((res) => {
          let totalStockpileResponse = res.data;
          console.log("Total orders: ", totalStockpileResponse);
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            const max_stockpiled_capacity = 40000;
            const max_stockpiled_percentage = 100 / 100;
            const stockpiled_value = Math.round(
              totalStockpileResponse.stockpiled.total_stockpiled
            );
            const current_stockpiled_percentage = Math.round(
              ((stockpiled_value * max_stockpiled_percentage) /
                max_stockpiled_capacity) *
                100
            );

            totalStockpileSchema = {
              info: { value: `${stockpiled_value}cm³`, duration: "this week" },
              progressPercentage: `${current_stockpiled_percentage}`,
            };

            setTotalStockpile(totalStockpileSchema);
            console.log("Total order list: ", totalStockpile);
          }
        })
        .catch((error) => {
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
        });
    };

    response();

    return () => {
      source.cancel();
    };
  }, []);

  /** Multipurpose success, error and warning pop-ups for handling and displaying errors, success and warning alerts */
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };
  // STOCK PILE DATA
  const { info, progressPercentage } = totalStockpile;
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
          {!info ? (
            <Skeleton height={120} />
          ) : (
            <StockPileInformation content={info} />
          )}
          {/* END OF STOCK PILE INFORMATION */}

          {/* BEGINNING OF PROGRESS BAR FOR STOCK PILE CAPACITY */}
          {progressPercentage === undefined ? (
            <Skeleton height={27} />
          ) : (
            <StockPileProgressBar content={progressPercentage} />
          )}
          {/* ENDING OF PROGRESS BAR FOR STOCK PILE CAPACITY */}
        </div>
      </div>
    </div>
  );
};

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
        <p>{`${content}%`}</p>
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
        {functionUtils.addCommaToNumbers(content?.value)}{" "}
        <span>{content?.duration}</span>{" "}
      </p>
      {/* Beginning of Duration Chartline SVG */}
      <ChartLine />
      {/* End of Duration Chartline SVG  */}
    </div>
  </div>
);

export default TotalStockpile;
