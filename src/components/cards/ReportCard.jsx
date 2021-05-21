import React from "react";

const ReportCard = ({ content }) => {
  return (
    <div className="bio layout-spacing ">
      <div
        className="widget-content widget-content-area"
        style={{ textAlign: "left", padding: "20px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Activity Report</h1>
        </div>

        <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
          <p style={{ marginBottom: "0.2rem" }}>
            Submitted by: {content["submitted-by"]}
          </p>
          <p style={{ marginBottom: "0.2rem" }}>
            Submitted date: {content["submitted-date"]}
          </p>
          <p style={{ marginBottom: "0.3rem" }}>
            Week Submitted: {content.week}
          </p>
        </div>
        <h3 className="">Completed Tasks</h3>
        <p>{content["tasks-completed"]}</p>

        <h3 className="">Ongoing Tasks</h3>
        <p>{content["tasks-ongoing"]}</p>

        <h3 className="">Next week Tasks</h3>
        <p>{content["nextweek-tasks"]}</p>
      </div>
    </div>
  );
};

export default ReportCard;
