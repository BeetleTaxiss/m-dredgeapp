import React from "react";
import { Link } from "react-router-dom";

const TimelineNotification = ({ timelineItems }) => {
  return (
    <div className="row">
      <div className="widget-content widget-content-area pb-1">
        <div className="mt-container mx-auto">
          <div className="timeline-line">
            {timelineItems.map((item, i) => (
              <div key={i} className="item-timeline">
                <p className="t-time">{item.time}</p>
                <div className={`t-dot t-dot-${item.dotColor}`}></div>
                <div className="t-text">
                  <p>{item.text}</p>
                  {item.timeSpent ? (
                    <span
                      style={{
                        display: "grid",
                        gap: "2px",
                        justifyContent: "flex-start",
                      }}
                    >
                      <p className="t-meta-time">{item.productionOutput}</p>
                      {/* <hr
                        style={{
                          height: "0.5px",
                          margin: "0",
                          backgroundColor: "#3b3f5c",
                          width: "80%",
                        }}
                      /> */}
                      <p className="t-meta-time">Time since last input:</p>
                      <p className="t-meta-time">{item.timeSpent}</p>
                    </span>
                  ) : null}
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
