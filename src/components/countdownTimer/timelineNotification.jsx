import React from "react";
import { Link } from "react-router-dom";

const TimelineNotification = ({ timelineItems }) => {
  return (
    <div className="row">
      <div className="widget-content widget-content-area pb-1">
        <div className="mt-container mx-auto">
          <div className="timeline-line">
            {timelineItems.map((item) => (
              <div key={item.time} className="item-timeline">
                <p className="t-time">{item.time}</p>
                <div className={`t-dot t-dot-${item.dotColor}`}></div>
                <div className="t-text">
                  {item.text ? <p>{item.text}</p> : null}

                  <p className="t-meta-time">{item.timeSpent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineNotification;
