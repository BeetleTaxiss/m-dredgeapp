import React from "react";
import Skeleton from "react-loading-skeleton";

export default  function MenuGroupTwoDummy () {

  return (
    <div  className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-table-two">
        <div className="widget-heading">
          <h5 className=""></h5>
        </div>
        <div style={{minHeight:"370px"}} className="widget-content">
          <div className="table-responsive">
          </div>
        </div>
      </div>
    </div>
  );
};
