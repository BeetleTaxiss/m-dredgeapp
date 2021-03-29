import React from "react";
import { Link } from "react-router-dom";

const TaskAction = () => {
  return (
    <div className="task-action">
      <div className="dropdown">
        <Link
          className="dropdown-toggle"
          to="#"
          role="button"
          id="pendingTask"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-more-horizontal"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </Link>

        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="pendingTask"
          style={{ willChange: "transform" }}
        >
          <Link className="dropdown-item" to="javascript:void(0);">
            This Week
          </Link>
          <Link className="dropdown-item" to="javascript:void(0);">
            Last Week
          </Link>
          <Link className="dropdown-item" to="javascript:void(0);">
            Last Month
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskAction;
