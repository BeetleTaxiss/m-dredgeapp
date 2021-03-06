import React from "react";
import { Link } from "react-router-dom";
const ViewordersTablepaiginaition = ({
  currentPageNumber,
  totalPageNumbers,
  handleNextPagination,
  handlePrevPagination,
}) => {
  return (
    <div className="dt--bottom-section d-sm-flex justify-content-sm-between text-center">
      <div className="dt--pages-count  mb-sm-0 mb-3">
        <div
          className="dataTables_info"
          id="default-ordering_info"
          role="status"
          aria-live="polite"
        >
          Showing page {isNaN(currentPageNumber) ? 0 : currentPageNumber} of{" "}
          {isNaN(totalPageNumbers) ? 0 : totalPageNumbers}
        </div>
      </div>
      <div className="dt--pagination">
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="default-ordering_paginate"
        >
          <ul className="pagination pagination-style-13 pagination-bordered mb-5">
            <li
              className={`paginate_button page-item previous ${
                currentPageNumber === 1 && "disabled"
              }`}
              id="default-ordering_previous"
            >
              <Link
                to="javascript:void(0)"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevPagination();
                }}
                aria-controls="default-ordering"
                data-dt-idx="0"
                tabIndex="0"
                className="page-link"
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
                  className="feather feather-arrow-left"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </Link>
            </li>
            <li className="paginate_button page-item active">
              <Link
                to="javascript:void(0)"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-controls="default-ordering"
                data-dt-idx="1"
                tabIndex="0"
                className="page-link"
              >
                {isNaN(currentPageNumber) ? 0 : currentPageNumber}
              </Link>
            </li>
            <li
              className="paginate_button page-item next"
              id="default-ordering_next"
            >
              <Link
                to="javascript:void(0)"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextPagination();
                }}
                aria-controls="default-ordering"
                data-dt-idx="5"
                tabIndex="0"
                className="page-link"
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
                  className="feather feather-arrow-right"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewordersTablepaiginaition;
