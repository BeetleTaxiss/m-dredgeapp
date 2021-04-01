import React from "react";
import { Orders, TableHeading, tableData } from "../general/table-components";
const RecentOrders = () => {
  return (
    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-table-two">
        <div className="widget-heading">
          <h5 className="">Recent Orders</h5>
        </div>

        <div className="widget-content">
          <div className="table-responsive">
            {/* Recent Orders */}
            <table className="table">
              {/* TABLE HEADING */}
              <TableHeading />
              <tbody>
                {/* Table Information */}
                {tableData.map((order, i) => (
                  <Orders key={i} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
