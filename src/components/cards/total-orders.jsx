import React from "react";
import ChartProgress from "../../assets/chartprogressline.svg";

const TotalOrders = () => {
  const ordersData = { title: "Total Orders", value: "423,964" };
  return (
    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-one">
        <div className="widget-heading">
          <h6 className="">Orders</h6>
        </div>
        <div className="w-chart">
          <div
            className="w-chart-section total-visits-content"
            style={{ width: "100%" }}
          >
            <div className="w-detail">
              <p className="w-title">{ordersData.title}</p>
              <p className="w-stats">{ordersData.value}</p>
            </div>
            <div className="w-chart-render-one">
              <div id="total-users">
                <div
                  id="apexchartsuxfyuapj"
                  className="apexcharts-canvas apexchartsuxfyuapj light"
                  style={{ width: "312px", height: "58px" }}
                >
                  {/* BEGINNING OF CHART PROGRESS LINE */}
                  <ion-icon
                    src={ChartProgress}
                    id="SvgjsSvg3145"
                    style={{
                      width: "312px",
                      height: "58px",
                    }}
                  />
                  {/* END OF CHART PROGRESS LINE */}
                  <div className="apexcharts-legend"></div>
                  <div
                    className="apexcharts-tooltip light"
                    style={{ left: "168.641px", top: "23px" }}
                  >
                    <div
                      className="apexcharts-tooltip-series-group active"
                      style={{ display: "flex" }}
                    >
                      <span
                        className="apexcharts-tooltip-marker"
                        style={{ backgroundColor: "rgb(33, 150, 243)" }}
                      ></span>
                      <div
                        className="apexcharts-tooltip-text"
                        style={{
                          fontFamily:
                            "Helvetica, Arial, sans-serif; font-size: 12px",
                        }}
                      >
                        <div className="apexcharts-tooltip-y-group">
                          <span className="apexcharts-tooltip-text-label"></span>
                          <span className="apexcharts-tooltip-text-value">
                            41
                          </span>
                        </div>
                        <div className="apexcharts-tooltip-z-group">
                          <span className="apexcharts-tooltip-text-z-label"></span>
                          <span className="apexcharts-tooltip-text-z-value"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="w-chart-section paid-visits-content">
            <div className="w-detail">
              <p className="w-title">Paid Visits</p>
              <p className="w-stats">7,929</p>
            </div>
            <div className="w-chart-render-one">
              <div id="paid-visits"></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TotalOrders;
