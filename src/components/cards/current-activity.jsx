import React from "react";
import { TaskActionButton } from "../general/task-action";

const CurrentActivity = ({ data }) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-card-one">
        <div className="widget-content">
          <div className="media">
            <div className="w-img">
              <img src={data.image} alt="avatar" />
            </div>
            <div className="media-body">
              <h6>{data.user}</h6>
              <p className="meta-date-time">{data.date}</p>
            </div>
          </div>

          <p>{data.productionInfo}</p>

          <TaskActionButton link={data.link} />
        </div>
      </div>
    </div>
  );
};

export default CurrentActivity;
