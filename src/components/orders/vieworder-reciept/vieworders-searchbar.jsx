import React from "react";

// For commit to git on creation of this new branch
const ViewordersSearchbar = ({ handleSearchList, TableDropdown }) => {
  return (
    <div className="dt--top-section">
      <div className="row">
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
                onChange={() => {
                  return handleSearchList && handleSearchList();
                }}
              />
            </label>
          </div>
        </div>
        <div className="col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center">
          <TableDropdown />
        </div>
      </div>
    </div>
  );
};

export default ViewordersSearchbar;
