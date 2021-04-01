import React from "react";
const TotalRevenue = () => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div
        className="widget widget-account-invoice-two"
        style={widgetInvoice.invoiceTwo}
      >
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
const widgetInvoice = {
  invoiceTwo: {
    padding: "22px 19px",
    border: "none",
    boxShadow:
      "0 0.1px 0px rgba(0, 0, 0, 0.002), 0 0.2px 0px rgba(0, 0, 0, 0.003), 0 0.4px 0px rgba(0, 0, 0, 0.004), 0 0.6px 0px rgba(0, 0, 0, 0.004), 0 0.9px 0px rgba(0, 0, 0, 0.005), 0 1.2px 0px rgba(0, 0, 0, 0.006), 0 1.8px 0px rgba(0, 0, 0, 0.006), 0 2.6px 0px rgba(0, 0, 0, 0.007), 0 3.9px 0px rgba(0, 0, 0, 0.008), 0 7px 0px rgba(0, 0, 0, 0.01)",
    background: "#3b3f5c",
    backgroundImage: "linear-gradient(to top, #09203f 0%, #537895 100%)",
    backgroundBlendMode: "multiply",
  },
};

export default TotalRevenue;
