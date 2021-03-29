import React from "react";
import { Link } from "react-router-dom";
const TotalRevenue = () => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-account-invoice-two">
        <div className="widget-content">
          <div className="account-box">
            <div
              className="info"
              style={{
                flexDirection: "column",
                gap: "1.5rem",
                marginBottom: "1.4rem",
              }}
            >
              <div className="inv-title">
                <h5 className="">Total Revenue</h5>
              </div>
              <div className="inv-balance-info" style={{ textAlign: "center" }}>
                <p className="inv-balance" style={{ fontSize: "45px" }}>
                  ₦ 41,741,800.42
                </p>

                <span
                  className="inv-stats balance-credited"
                  style={{ fontSize: "18px" }}
                >
                  + 2453
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
