import React from "react";
import Skeleton from "react-loading-skeleton";

export default function MenuGroupFourDummy()  {

  return (
    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-one">
        <div className="widget-heading" style={{ marginBottom: "0px" }}>
          <h6 className=""></h6>
        </div>
          <Skeleton count={0}  height={130} />
      </div>
    </div>
  );
};
