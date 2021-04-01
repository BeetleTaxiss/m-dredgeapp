import React from "react";
import { Link } from "react-router-dom";

const DropdownFilter = () => {
  return (
    <div className="dropdown filter custom-dropdown-icon">
      <Link
        className="dropdown-toggle btn"
        to="#"
        role="button"
        id="filterDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="text">
          <span>Show</span> : Daily Analytics
        </span>{" "}
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
          className="feather feather-chevron-down"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </Link>

      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="filterDropdown"
      >
        <Link
          className="dropdown-item"
          data-value="<span>Show</span> : Daily Analytics"
          to="javascript:void(0);"
        >
          Daily Analytics
        </Link>
        <Link
          className="dropdown-item"
          data-value="<span>Show</span> : Weekly Analytics"
          to="javascript:void(0);"
        >
          Weekly Analytics
        </Link>
        <Link
          className="dropdown-item"
          data-value="<span>Show</span> : Monthly Analytics"
          to="javascript:void(0);"
        >
          Monthly Analytics
        </Link>
        <Link
          className="dropdown-item"
          data-value="Download All"
          to="javascript:void(0);"
        >
          Download All
        </Link>
        <Link
          className="dropdown-item"
          data-value="Share Statistics"
          to="javascript:void(0);"
        >
          Share Statistics
        </Link>
      </div>
    </div>
  );
};

export default DropdownFilter;
