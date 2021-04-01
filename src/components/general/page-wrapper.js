import React from "react";

const PageWrapper = ({ children, ...otherProps }) => {
  return (
    <div
      className="main-container"
      id="container"
      style={{ marginTop: "185px" }}
    >
      {/* BEGIN CONTENT PART */}
      <div id="content" className="main-content">
        <div className="layout-px-spacing">
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
