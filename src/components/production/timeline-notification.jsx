import React from "react";

const TimelineNotification = ({ timelineItems }) => {
  let timeLineItemsActive = false;
  let timelineItem = null;
  if (timeLineItemsActive === false) {
    timelineItem = [...timelineItems];
    console.log("TimeLine Item in Component: ", timelineItem);
    console.log("TimeLine Item State in Component: ", timelineItems);
    timeLineItemsActive = true;
  }
  console.log("TimeLine Item in Component: ", timelineItem);
  const Timeline = () => (
    <div className="timeline-line">
      {timelineItem.map((item, i) => (
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
  );
  //console.log("Target Element: ", document.getElementById("timeline"));

  // render(<Timeline />, document.getElementById("timeline"));
  return <Timeline />;
};

export default TimelineNotification;
