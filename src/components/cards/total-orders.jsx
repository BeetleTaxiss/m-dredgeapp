import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { BASE_API_URL } from "../../hooks/API";
import ChartProgress from "../../assets/chartprogressline.svg";

const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    let totalOrdersSchema;
    const response = async () => {
      await axios
        .get(`${BASE_API_URL}/api/v1/order/summary.php`, {
          params: {
            count: "15",
          },
        })
        .then((res) => {
          let totalOrdersResponse = res.data;
          console.log("Total orders: ", totalOrdersResponse);
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            const orders_count = totalOrdersResponse.orders.count;

            totalOrdersSchema = { title: "Total Orders", value: orders_count };

            setTotalOrders(totalOrdersSchema);
            console.log("Total order list: ", totalOrders);
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
  const { title, value } = totalOrders;
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
              <p className="w-title">{title}</p>
              <p className="w-stats">{value}</p>
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
