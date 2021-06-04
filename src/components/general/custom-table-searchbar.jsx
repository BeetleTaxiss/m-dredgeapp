import React from "react";

const CustomTableSearchbar = ({ handleSearchList, searchBoxValue }) => {
  console.log("search function: ", handleSearchList);
  return (
    <div className="col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center mt-sm-0 mt-3">
      <div id="default-ordering_filter" className="dataTables_filter">
        <label>
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
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            id="page-filter"
            className="form-control"
            placeholder="Search..."
            aria-controls="default-ordering"
            value={searchBoxValue}
            onChange={(e) => {
              return (
                typeof handleSearchList === "function" && handleSearchList(e)
              );
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default CustomTableSearchbar;
