import React from "react";
import { Link } from "react-router-dom";

const PageHeader = () => {
  return (
    <div className="page-header">
      <nav className="breadcrumb-one" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="javascript:void(0);">Components</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to="javascript:void(0);">Countdown</Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
