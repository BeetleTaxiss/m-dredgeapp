import React from "react";
import DOMSERVER from "react-dom/server";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import { TaskActionButton } from "../general/task-action";
import WidgetHeader from "../general/widget-header";
import { showDetailedLogItem } from "./ShowDetailedLogItem";
export const CustomActivitiesSummary = ({ data, popup }) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-activity-four">
        <WidgetHeader
          title={data.widgetHeader.title}
          link={data.widgetHeader.link}
          arrow
        />
        <div className="widget-content">
          <Activities content={data?.activities} showItem={popup} />
          <TaskActionButton link={data.taskAction} />
        </div>
      </div>
    </div>
  );
};
export const Activities = ({ content, showItem }) => {
  console.log("Pop up content: ", content);
  return (
    <div
      className="mt-container mx-auto ps ps--active-y"
      style={{ minWidth: "0px" }}
    >
      <div className="timeline-line">
        {content[0] === "loading" ? (
          <>
            <Skeleton height={35} />
            <span />
            <Skeleton height={35} />
            <span />
            <Skeleton height={35} />
            <span />
            <Skeleton height={35} />
            <span />
            <Skeleton height={35} />
            <span />
            <Skeleton height={35} />
            <span />
            <Skeleton height={35} />
            <span />
            <Skeleton height={35} />
          </>
        ) : (
          content.map((item, i) => (
            <div
              key={i}
              className={`item-timeline timeline-${
                item.status.color && item.status.color
              }`}
              style={{ cursor: showItem && "pointer" }}
              onClick={(e) => {
                if (!showItem) {
                  e.preventDefault();
                }
                return showItem && showLogItem(item?.logActionData);
              }}
            >
              {item.noTimeline === true ? null : (
                <div className="t-dot" data-original-title="" title=""></div>
              )}
              <div
                className="t-text"
                style={{
                  background:
                    item.action === "delete"
                      ? "#e7515a"
                      : item.action === "update"
                      ? "#2196f3"
                      : "",
                  borderRadius: item.action && "10px",
                }}
              >
                <p style={{ color: item.action && "white" }}>{item.activity}</p>
                <span
                  className="badge"
                  style={{ color: item.action && "white" }}
                >
                  {item.status.comment}
                </span>
                <p className="t-time" style={{ color: item.action && "white" }}>
                  {item.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const showLogItem = (item) => {
  console.log("Item: ", item);
  const logTable = DOMSERVER.renderToString(showDetailedLogItem(item));

  Swal.fire({
    html: logTable,
    showConfirmButton: false,
  });
};
