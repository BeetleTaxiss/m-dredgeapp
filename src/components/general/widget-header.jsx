import React from "react";
import TaskAction from "./task-action";

const WidgetHeader = ({ title, dropdown, links }) => {
  return (
    <div
      className="widget-heading"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <h5 className="">{title}</h5>

      {dropdown ? <TaskAction links={links} /> : null}
    </div>
  );
};

export default WidgetHeader;
