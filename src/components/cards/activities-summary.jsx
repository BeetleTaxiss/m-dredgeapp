import React from "react";
import { TaskActionButton } from "../general/task-action";
import WidgetHeader from "../general/widget-header";

const Activities = ({ content }) => (
  <div className="mt-container mx-auto ps ps--active-y">
    <div className="timeline-line">
      {content.map((item, i) => (
        <div
          key={i}
          className={`item-timeline timeline-${
            item.status.color && item.status.color
          }`}
        >
          <div className="t-dot" data-original-title="" title=""></div>
          <div className="t-text">
            <p>{item.activity}</p>
            <span className="badge">{item.status.comment}</span>
            <p className="t-time">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
const ActivitiesSummary = ({ data }) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-activity-four">
        <WidgetHeader
          title={data.widgetHeader.title}
          link={data.widgetHeader.link}
          arrow
        />
        <div className="widget-content">
          <Activities content={data.activities} />
          <TaskActionButton link={data.taskAction} />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSummary;
