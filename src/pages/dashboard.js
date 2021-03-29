import React from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    // BEGIN MAIN CONTAINER
    <div className="main-container" id="container">
      <div className="overlay"></div>
      <div className="search-overlay"></div>

      {/* BEGIN CONTENT PART */}
      <div id="content" className="main-content">
        <div className="layout-px-spacing">
          <div className="page-header">
            <nav className="breadcrumb-one" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="javascript:void(0);">Dashboad</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="javascript:void(0);">Analytics</Link>
                </li>
              </ol>
            </nav>
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
          </div>

          <div className="row layout-top-spacing">
            <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-one">
                <div className="widget-heading">
                  <h6 className="">Statistics</h6>

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
                        <Link
                          className="dropdown-item"
                          to="javascript:void(0);"
                        >
                          View
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="javascript:void(0);"
                        >
                          Download
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-chart">
                  <div className="w-chart-section total-visits-content">
                    <div className="w-detail">
                      <p className="w-title">Total Visits</p>
                      <p className="w-stats">423,964</p>
                    </div>
                    <div className="w-chart-render-one">
                      <div id="total-users">
                        <div
                          id="apexchartsuxfyuapj"
                          className="apexcharts-canvas apexchartsuxfyuapj light"
                          style={{ width: "312px", height: "58px" }}
                        >
                          <svg
                            // throwIfnamespace={false}
                            id="SvgjsSvg3145"
                            width="312"
                            height="58"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlnssvgjs="http://svgjs.com/svgjs"
                            className="apexcharts-svg"
                            xmlnsdata="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <g
                              id="SvgjsG3147"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, 0)"
                            >
                              <defs id="SvgjsDefs3146">
                                <clipPath id="gridRectMaskuxfyuapj">
                                  <rect
                                    id="SvgjsRect3151"
                                    width="314"
                                    height="60"
                                    x="-1"
                                    y="-1"
                                    rx="0"
                                    ry="0"
                                    fill="#ffffff"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                  ></rect>
                                </clipPath>
                                <clipPath id="gridRectMarkerMaskuxfyuapj">
                                  <rect
                                    id="SvgjsRect3152"
                                    width="314"
                                    height="60"
                                    x="-1"
                                    y="-1"
                                    rx="0"
                                    ry="0"
                                    fill="#ffffff"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                  ></rect>
                                </clipPath>
                              </defs>
                              <line
                                id="SvgjsLine3150"
                                x1="242.16666666666666"
                                y1="0"
                                x2="242.16666666666666"
                                y2="58"
                                stroke="#b6b6b6"
                                strokeDasharray="3"
                                className="apexcharts-xcrosshairs"
                                x="242.16666666666666"
                                y="0"
                                width="1"
                                height="58"
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth="1"
                              ></line>
                              <g
                                id="SvgjsG3159"
                                className="apexcharts-xaxis"
                                transform="translate(0, 0)"
                              >
                                <g
                                  id="SvgjsG3160"
                                  className="apexcharts-xaxis-texts-g"
                                  transform="translate(0, -4)"
                                ></g>
                              </g>
                              <g id="SvgjsG3163" className="apexcharts-grid">
                                <line
                                  id="SvgjsLine3165"
                                  x1="0"
                                  y1="58"
                                  x2="312"
                                  y2="58"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                ></line>
                                <line
                                  id="SvgjsLine3164"
                                  x1="0"
                                  y1="1"
                                  x2="0"
                                  y2="58"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                ></line>
                              </g>
                              <g
                                id="SvgjsG3154"
                                className="apexcharts-line-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG3155"
                                  className="apexcharts-series"
                                  seriesname="seriesx1"
                                  datalongestseries="true"
                                  rel="1"
                                  datarealindex="0"
                                >
                                  <path
                                    id="apexcharts-line-0"
                                    d="M 0 40.599999999999994C 12.133333333333331 40.599999999999994 22.53333333333333 50.542857142857144 34.666666666666664 50.542857142857144C 46.8 50.542857142857144 57.199999999999996 28.17142857142857 69.33333333333333 28.17142857142857C 81.46666666666667 28.17142857142857 91.86666666666666 48.05714285714286 104 48.05714285714286C 116.13333333333333 48.05714285714286 126.53333333333333 21.542857142857144 138.66666666666666 21.542857142857144C 150.79999999999998 21.542857142857144 161.2 37.285714285714285 173.33333333333331 37.285714285714285C 185.46666666666664 37.285714285714285 195.86666666666667 9.114285714285714 208 9.114285714285714C 220.13333333333333 9.114285714285714 230.53333333333333 24.028571428571425 242.66666666666666 24.028571428571425C 254.79999999999998 24.028571428571425 265.2 3.3142857142857096 277.3333333333333 3.3142857142857096C 289.46666666666664 3.3142857142857096 299.8666666666667 37.285714285714285 312 37.285714285714285"
                                    fill="none"
                                    fillOpacity="1"
                                    stroke="rgba(33,150,243,0.85)"
                                    strokeOpacity="1"
                                    strokeLinecap="butt"
                                    strokeWidth="2"
                                    strokeDasharray="0"
                                    className="apexcharts-line"
                                    index="0"
                                    clipPath="url(#gridRectMaskuxfyuapj)"
                                    pathto="M 0 40.599999999999994C 12.133333333333331 40.599999999999994 22.53333333333333 50.542857142857144 34.666666666666664 50.542857142857144C 46.8 50.542857142857144 57.199999999999996 28.17142857142857 69.33333333333333 28.17142857142857C 81.46666666666667 28.17142857142857 91.86666666666666 48.05714285714286 104 48.05714285714286C 116.13333333333333 48.05714285714286 126.53333333333333 21.542857142857144 138.66666666666666 21.542857142857144C 150.79999999999998 21.542857142857144 161.2 37.285714285714285 173.33333333333331 37.285714285714285C 185.46666666666664 37.285714285714285 195.86666666666667 9.114285714285714 208 9.114285714285714C 220.13333333333333 9.114285714285714 230.53333333333333 24.028571428571425 242.66666666666666 24.028571428571425C 254.79999999999998 24.028571428571425 265.2 3.3142857142857096 277.3333333333333 3.3142857142857096C 289.46666666666664 3.3142857142857096 299.8666666666667 37.285714285714285 312 37.285714285714285"
                                    pathfrom="M -1 58L -1 58L 34.666666666666664 58L 69.33333333333333 58L 104 58L 138.66666666666666 58L 173.33333333333331 58L 208 58L 242.66666666666666 58L 277.3333333333333 58L 312 58"
                                  ></path>
                                  <g
                                    id="SvgjsG3156"
                                    className="apexcharts-series-markers-wrap"
                                  >
                                    <g className="apexcharts-series-markers">
                                      <circle
                                        id="SvgjsCircle3171"
                                        r="0"
                                        cx="242.66666666666666"
                                        cy="24.028571428571425"
                                        className="apexcharts-marker wscy5hn0k no-pointer-events"
                                        stroke="#ffffff"
                                        fill="#2196f3"
                                        fillOpacity="1"
                                        strokeWidth="2"
                                        strokeOpacity="0.9"
                                        defaultmarkersize="0"
                                      ></circle>
                                    </g>
                                  </g>
                                  <g
                                    id="SvgjsG3157"
                                    className="apexcharts-datalabels"
                                  ></g>
                                </g>
                              </g>
                              <line
                                id="SvgjsLine3166"
                                x1="0"
                                y1="0"
                                x2="312"
                                y2="0"
                                stroke="#b6b6b6"
                                strokeDasharray="0"
                                strokeWidth="1"
                                className="apexcharts-ycrosshairs"
                              ></line>
                              <line
                                id="SvgjsLine3167"
                                x1="0"
                                y1="0"
                                x2="312"
                                y2="0"
                                strokeDasharray="0"
                                strokeWidth="0"
                                className="apexcharts-ycrosshairs-hidden"
                              ></line>
                              <g
                                id="SvgjsG3168"
                                className="apexcharts-yaxis-annotations"
                              ></g>
                              <g
                                id="SvgjsG3169"
                                className="apexcharts-xaxis-annotations"
                              ></g>
                              <g
                                id="SvgjsG3170"
                                className="apexcharts-point-annotations"
                              ></g>
                            </g>
                            <rect
                              id="SvgjsRect3149"
                              width="0"
                              height="0"
                              x="0"
                              y="0"
                              rx="0"
                              ry="0"
                              fill="#fefefe"
                              opacity="1"
                              strokeWidth="0"
                              stroke="none"
                              strokeDasharray="0"
                            ></rect>
                            <g
                              id="SvgjsG3161"
                              className="apexcharts-yaxis"
                              rel="0"
                              transform="translate(-21, 0)"
                            >
                              <g
                                id="SvgjsG3162"
                                className="apexcharts-yaxis-texts-g"
                              ></g>
                            </g>
                          </svg>
                          <div className="apexcharts-legend"></div>
                          <div
                            className="apexcharts-tooltip light"
                            style={{ left: "168.641px", top: "23px" }}
                          >
                            <div
                              className="apexcharts-tooltip-series-group active"
                              style={{ display: "flex" }}
                            >
                              <span
                                className="apexcharts-tooltip-marker"
                                style={{ backgroundColor: "rgb(33, 150, 243)" }}
                              ></span>
                              <div
                                className="apexcharts-tooltip-text"
                                style={{
                                  fontFamily:
                                    "Helvetica, Arial, sans-serif; font-size: 12px",
                                }}
                              >
                                <div className="apexcharts-tooltip-y-group">
                                  <span className="apexcharts-tooltip-text-label"></span>
                                  <span className="apexcharts-tooltip-text-value">
                                    41
                                  </span>
                                </div>
                                <div className="apexcharts-tooltip-z-group">
                                  <span className="apexcharts-tooltip-text-z-label"></span>
                                  <span className="apexcharts-tooltip-text-z-value"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-chart-section paid-visits-content">
                    <div className="w-detail">
                      <p className="w-title">Paid Visits</p>
                      <p className="w-stats">7,929</p>
                    </div>
                    <div className="w-chart-render-one">
                      <div id="paid-visits"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-account-invoice-two">
                <div className="widget-content">
                  <div className="account-box">
                    <div className="info">
                      <div className="inv-title">
                        <h5 className="">Total Balance</h5>
                      </div>
                      <div className="inv-balance-info">
                        <p className="inv-balance">$ 41,741.42</p>

                        <span className="inv-stats balance-credited">
                          + 2453
                        </span>
                      </div>
                    </div>
                    <div className="acc-action">
                      <div className="">
                        <Link to="javascript:void(0);">
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
                            className="feather feather-plus"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </Link>
                        <Link to="javascript:void(0);">
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
                            className="feather feather-credit-card"
                          >
                            <rect
                              x="1"
                              y="4"
                              width="22"
                              height="16"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="1" y1="10" x2="23" y2="10"></line>
                          </svg>
                        </Link>
                      </div>
                      <Link to="javascript:void(0);">Upgrade</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-card-four">
                <div className="widget-content">
                  <div className="w-header">
                    <div className="w-info">
                      <h6 className="value">Expenses</h6>
                    </div>
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
                          <Link
                            className="dropdown-item"
                            to="javascript:void(0);"
                          >
                            This Week
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="javascript:void(0);"
                          >
                            Last Week
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="javascript:void(0);"
                          >
                            Last Month
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-content">
                    <div className="w-info">
                      <p className="value">
                        $ 45,141 <span>this week</span>{" "}
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
                          className="feather feather-trending-up"
                        >
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      </p>
                    </div>
                  </div>

                  <div className="w-progress-stats">
                    <div className="progress">
                      <div
                        className="progress-bar bg-gradient-secondary"
                        role="progressbar"
                        style={{ width: "57%" }}
                        aria-valuenow="57"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <div className="">
                      <div className="w-icon">
                        <p>57%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-chart-three">
                <div className="widget-heading">
                  <div className="">
                    <h5 className="">Unique Visitors</h5>
                  </div>

                  <div className="dropdown ">
                    <Link
                      className="dropdown-toggle"
                      to="#"
                      role="button"
                      id="uniqueVisitors"
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
                      aria-labelledby="uniqueVisitors"
                    >
                      <Link className="dropdown-item" to="javascript:void(0);">
                        View
                      </Link>
                      <Link className="dropdown-item" to="javascript:void(0);">
                        Update
                      </Link>
                      <Link className="dropdown-item" to="javascript:void(0);">
                        Download
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="widget-content">
                  <div id="uniqueVisits"></div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-activity-five">
                <div className="widget-heading">
                  <h5 className="">Activity Log</h5>

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
                        <Link
                          className="dropdown-item"
                          to="javascript:void(0);"
                        >
                          View All
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="javascript:void(0);"
                        >
                          Mark as Read
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget-content">
                  <div className="w-shadow-top"></div>

                  <div className="mt-container mx-auto">
                    <div className="timeline-line">
                      <div className="item-timeline timeline-new">
                        <div className="t-dot">
                          <div className="t-secondary">
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
                              className="feather feather-plus"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </div>
                        </div>
                        <div className="t-content">
                          <div className="t-uppercontent">
                            <h5>
                              New project created :{" "}
                              <Link to="javscript:void(0);">
                                <span>[Cork Admin Template]</span>
                              </Link>
                            </h5>
                          </div>
                          <p>27 Feb, 2020</p>
                        </div>
                      </div>

                      <div className="item-timeline timeline-new">
                        <div className="t-dot">
                          <div className="t-success">
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
                              className="feather feather-mail"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div className="t-content">
                          <div className="t-uppercontent">
                            <h5>
                              Mail sent to{" "}
                              <Link to="javascript:void(0);">HR</Link> and{" "}
                              <Link to="javascript:void(0);">Admin</Link>
                            </h5>
                          </div>
                          <p>28 Feb, 2020</p>
                        </div>
                      </div>

                      <div className="item-timeline timeline-new">
                        <div className="t-dot">
                          <div className="t-primary">
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
                              className="feather feather-check"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div className="t-content">
                          <div className="t-uppercontent">
                            <h5>Server Logs Updated</h5>
                          </div>
                          <p>27 Feb, 2020</p>
                        </div>
                      </div>

                      <div className="item-timeline timeline-new">
                        <div className="t-dot">
                          <div className="t-danger">
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
                              className="feather feather-check"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div className="t-content">
                          <div className="t-uppercontent">
                            <h5>
                              Task Completed :{" "}
                              <Link to="javscript:void(0);">
                                <span>[Backup Files EOD]</span>
                              </Link>
                            </h5>
                          </div>
                          <p>01 Mar, 2020</p>
                        </div>
                      </div>

                      <div className="item-timeline timeline-new">
                        <div className="t-dot">
                          <div className="t-warning">
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
                              className="feather feather-file"
                            >
                              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                              <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div className="t-content">
                          <div className="t-uppercontent">
                            <h5>
                              Documents Submitted from{" "}
                              <Link to="javascript:void(0);">Sara</Link>
                            </h5>
                            <span className=""></span>
                          </div>
                          <p>10 Mar, 2020</p>
                        </div>
                      </div>

                      <div className="item-timeline timeline-new">
                        <div className="t-dot">
                          <div className="t-dark">
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
                              className="feather feather-server"
                            >
                              <rect
                                x="2"
                                y="2"
                                width="20"
                                height="8"
                                rx="2"
                                ry="2"
                              ></rect>
                              <rect
                                x="2"
                                y="14"
                                width="20"
                                height="8"
                                rx="2"
                                ry="2"
                              ></rect>
                              <line x1="6" y1="6" x2="6" y2="6"></line>
                              <line x1="6" y1="18" x2="6" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                        <div className="t-content">
                          <div className="t-uppercontent">
                            <h5>Server rebooted successfully</h5>
                            <span className=""></span>
                          </div>
                          <p>06 Apr, 2020</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-shadow-bottom"></div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
              <div className="widget-four">
                <div className="widget-heading">
                  <h5 className="">Visitors by Browser</h5>
                </div>
                <div className="widget-content">
                  <div className="vistorsBrowser">
                    <div className="browser-list">
                      <div className="w-icon">
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
                          className="feather feather-chrome"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="4"></circle>
                          <line x1="21.17" y1="8" x2="12" y2="8"></line>
                          <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                          <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                        </svg>
                      </div>
                      <div className="w-browser-details">
                        <div className="w-browser-info">
                          <h6>Chrome</h6>
                          <p className="browser-count">65%</p>
                        </div>
                        <div className="w-browser-stats">
                          <div className="progress">
                            <div
                              className="progress-bar bg-gradient-primary"
                              role="progressbar"
                              style={{ width: "65%" }}
                              aria-valuenow="90"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="browser-list">
                      <div className="w-icon">
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
                          className="feather feather-compass"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                      </div>
                      <div className="w-browser-details">
                        <div className="w-browser-info">
                          <h6>Safari</h6>
                          <p className="browser-count">25%</p>
                        </div>

                        <div className="w-browser-stats">
                          <div className="progress">
                            <div
                              className="progress-bar bg-gradient-danger"
                              role="progressbar"
                              style={{ width: "35%" }}
                              aria-valuenow="65"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="browser-list">
                      <div className="w-icon">
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
                          className="feather feather-globe"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      </div>
                      <div className="w-browser-details">
                        <div className="w-browser-info">
                          <h6>Others</h6>
                          <p className="browser-count">15%</p>
                        </div>

                        <div className="w-browser-stats">
                          <div className="progress">
                            <div
                              className="progress-bar bg-gradient-warning"
                              role="progressbar"
                              style={{ width: "15%" }}
                              aria-valuenow="15"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row widget-statistic">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                  <div className="widget widget-one_hybrid widget-followers">
                    <div className="widget-heading">
                      <div className="w-title">
                        <div className="w-icon">
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
                            className="feather feather-users"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <div className="">
                          <p className="w-value">31.6K</p>
                          <h5 className="">Followers</h5>
                        </div>
                      </div>
                    </div>
                    <div className="widget-content">
                      <div className="w-chart">
                        <div id="hybrid_followers"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                  <div className="widget widget-one_hybrid widget-referral">
                    <div className="widget-heading">
                      <div className="w-title">
                        <div className="w-icon">
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
                            className="feather feather-link"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                        </div>
                        <div className="">
                          <p className="w-value">1,900</p>
                          <h5 className="">Referral</h5>
                        </div>
                      </div>
                    </div>
                    <div className="widget-content">
                      <div className="w-chart">
                        <div id="hybrid_followers1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                  <div className="widget widget-one_hybrid widget-engagement">
                    <div className="widget-heading">
                      <div className="w-title">
                        <div className="w-icon">
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
                            className="feather feather-message-circle"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                          </svg>
                        </div>
                        <div className="">
                          <p className="w-value">18.2%</p>
                          <h5 className="">Engagement</h5>
                        </div>
                      </div>
                    </div>
                    <div className="widget-content">
                      <div className="w-chart">
                        <div id="hybrid_followers3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-card-one">
                <div className="widget-content">
                  <div className="media">
                    <div className="w-img">
                      <img src="assets/img/profile-19.jpeg" alt="avatar" />
                    </div>
                    <div className="media-body">
                      <h6>Jimmy Turner</h6>
                      <p className="meta-date-time">Monday, Nov 18</p>
                    </div>
                  </div>

                  <p>
                    "Duis aute irure dolor" in reprehenderit in voluptate velit
                    esse cillum "dolore eu fugiat" nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident.
                  </p>

                  <div className="w-action">
                    <div className="card-like">
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
                        className="feather feather-thumbs-up"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                      <span>551 Likes</span>
                    </div>

                    <div className="read-more">
                      <Link to="javascript:void(0);">
                        Read More{" "}
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
                          className="feather feather-chevrons-right"
                        >
                          <polyline points="13 17 18 12 13 7"></polyline>
                          <polyline points="6 17 11 12 6 7"></polyline>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-card-two">
                <div className="widget-content">
                  <div className="media">
                    <div className="w-img">
                      <img src="assets/img/g-8.png" alt="avatar" />
                    </div>
                    <div className="media-body">
                      <h6>Dev Summit - New York</h6>
                      <p className="meta-date-time">Bronx, NY</p>
                    </div>
                  </div>

                  <div className="card-bottom-section">
                    <h5>4 Members Going</h5>
                    <div className="img-group">
                      <img src="assets/img/profile-19.jpeg" alt="avatar" />
                      <img src="assets/img/profile-6.jpeg" alt="avatar" />
                      <img src="assets/img/profile-8.jpeg" alt="avatar" />
                      <img src="assets/img/profile-3.jpeg" alt="avatar" />
                    </div>
                    <Link to="javascript:void(0);" className="btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
              <div className="widget widget-five">
                <div className="widget-heading">
                  <Link to="javascript:void(0)" className="task-info">
                    <div className="usr-avatar">
                      <span>FD</span>
                    </div>

                    <div className="w-title">
                      <h5>Figma Design</h5>
                      <span>Design Reset</span>
                    </div>
                  </Link>

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
                        <Link
                          className="dropdown-item"
                          to="javascript:void(0);"
                        >
                          View Project
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="javascript:void(0);"
                        >
                          Edit Project
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="javascript:void(0);"
                        >
                          Mark as Done
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget-content">
                  <p>
                    Doloribus nisi vel suscipit modi, optio ex repudiandae
                    voluptatibus officiis commodi. Nesciunt quas aut neque
                    incidunt!
                  </p>

                  <div className="progress-data">
                    <div className="progress-info">
                      <div className="task-count">
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
                          className="feather feather-check-square"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        <p>5 Tasks</p>
                      </div>
                      <div className="progress-stats">
                        <p>86.2%</p>
                      </div>
                    </div>

                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "65%" }}
                        aria-valuenow="90"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>

                  <div className="meta-info">
                    <div className="due-time">
                      <p>
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
                          className="feather feather-clock"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>{" "}
                        3 Days Left
                      </p>
                    </div>

                    <div className="avatar--group">
                      <div className="avatar translateY-axis more-group">
                        <span className="avatar-title">+6</span>
                      </div>
                      <div className="avatar translateY-axis">
                        <img alt="avatar" src="assets/img/profile-8.jpeg" />
                      </div>
                      <div className="avatar translateY-axis">
                        <img alt="avatar" src="assets/img/profile-12.jpeg" />
                      </div>
                      <div className="avatar translateY-axis">
                        <img alt="avatar" src="assets/img/profile-19.jpeg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-wrapper">
            <div className="footer-section f-section-1">
              <p className="">
                Copyright © 2021{" "}
                <Link target="_blank" to="https://designreset.com">
                  DesignReset
                </Link>
                , All rights reserved.
              </p>
            </div>
            <div className="footer-section f-section-2">
              <p className="">
                Coded with{" "}
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
                  className="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </p>
            </div>
          </div>
        </div>

        {/* END CONTENT PART */}
      </div>
      {/* END OF MAIN CONTENT  */}
    </div>
  );
};
