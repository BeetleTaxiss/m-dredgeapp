import React from "react";
import PageHeader from "../page-header/page-header";

const PageWrapper = ({ children, ...otherProps }) => {
  return (
    <div className="main-container" id="container">
      {/* BEGIN CONTENT PART */}
      <div id="content" className="main-content">
        <div className="layout-px-spacing">
          <PageHeader />
          <div
            className={
              otherProps.classs ? otherProps.classs : "row layout-top-spacing"
            }
            {...otherProps}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
