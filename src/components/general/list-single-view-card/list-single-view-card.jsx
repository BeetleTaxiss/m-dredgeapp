import React from "react";

const ListSingleViewCard = ({ pending }) => {
  return (
    <div className="col-12 layout-spacing">
      <div className="widget widget-account-invoice-three">
        <div className="widget-heading">
          <div className="wallet-usr-info">
            <div className="usr-name">
              <span id="span-product"></span>
            </div>
            <div className="usr-name">
              <span id="span-pending">processing</span>
            </div>
          </div>
          <div className="wallet-balance">
            <p>Number of Buckets</p>
            <h5 className="" id="quantity">
              "
            </h5>
          </div>
          <div className="wallet-comment" id="wallet-comment">
            <div className="usr-name-comment">
              <span
                id="span-comment"
                style={{ backgroundColor: "#1b2e4b" }}
              ></span>
            </div>
          </div>
        </div>

        <div className="widget-amount">
          <div className="w-a-info funds-received">
            <span>Truck Number</span>
            <p id="truckNo">No truck Number</p>
          </div>

          <div className="w-a-info funds-spent">
            <span>Order Cost(₦)</span>
            <p id="cost"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSingleViewCard;
