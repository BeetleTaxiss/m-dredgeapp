import React from "react";
import { Link } from "react-router-dom";
import TaskAction from "./task-action";

const WidgetHeader = ({ title, dropdown }) => {
  return (
    <div className="widget-heading">
      <h5 className="">{title}</h5>

      {dropdown ? <TaskAction /> : null}
    </div>
  );
};

export default WidgetHeader;
