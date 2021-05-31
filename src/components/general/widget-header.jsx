import React from "react";
import TaskAction, { TaskActionArrow } from "./task-action";

const WidgetHeader = ({ title, dropdown, links, change, arrow, link }) => {
  return (
    <div
      className="widget-heading"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <h5 className="">{title}</h5>

      {dropdown ? (
        <TaskAction links={links} change={change ? true : false} />
      ) : null}
      {arrow ? <TaskActionArrow link={link} /> : null}
    </div>
  );
};

export default WidgetHeader;
