import React from "react";

const TimelineNotification = ({ timelineItems }) => {
  return (
    <div className="row">
      <div
        className="widget-content widget-content-area pb-1"
        style={{ padding: "2rem" }}
      >
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
