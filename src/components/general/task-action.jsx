import React from "react";
import { Link, useHistory } from "react-router-dom";

const TaskAction = ({ links, handleChange, change }) => {
  const history = useHistory();
  return (
    <div className="task-action">
      <div className="dropdown">
        <Link
          className="dropdown-toggle"
          onClick={(e) => {
            e.preventDefault();
          }}
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
          {links?.map((item, i) => (
            <Link
              key={i}
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                change ? item.link() : history.push(item.link);
              }}
              to="#"
              data-product={item.text}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TaskActionArrow = ({ link }) => {
  return (
    <div className="w-icon">
      <Link className="btn btn-primary" to={link}>
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
          className="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  );
};

export const TaskActionButton = ({ link, mt }) => (
  <div
    className="tm-action-btn"
    style={{
      textAlign: "center",
      // marginTop: mt && "1.5rem",
      paddingTop: mt && "2rem",
    }}
  >
    <Link to={link}>
      <button className="btn">
        <span>View All</span>{" "}
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
          className="feather feather-arrow-right"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </Link>
  </div>
);

export default TaskAction;
