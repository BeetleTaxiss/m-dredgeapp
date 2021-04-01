import React from "react";

const PieChart = () => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
      <div className="widget-two">
        <div className="widget-content">
          <div className="w-numeric-value">
            <div className="w-content">
              <span className="w-value">Daily sales</span>
              <span className="w-numeric-title">
                Go to columns for details.
              </span>
            </div>
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
                className="feather feather-dollar-sign"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
          <div className="w-chart">
            <div id="daily-sales" style={{ miHeight: "175px" }}>
              <div
                id="apexchartsdozxcpwfl"
                className="apexcharts-canvas apexchartsdozxcpwfl light"
                style={{ width: "456px", height: "160px;" }}
              >
                <svg
                  id="SvgjsSvg1990"
                  width="456"
                  height="160"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlnsSvgis="http://svgjs.com/svgjs"
                  className="apexcharts-svg"
                  xmlnsData="ApexChartsNS"
                  transform="translate(0, 0)"
                  style={{ background: "transparent" }}
                >
                  <g
                    id="SvgjsG1992"
                    className="apexcharts-inner apexcharts-graphical"
                    transform="translate(0, 40)"
                  >
                    <defs id="SvgjsDefs1991">
                      <linearGradient
                        id="SvgjsLinearGradient1994"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          id="SvgjsStop1995"
                          stopOpacity="0.4"
                          stop-color="rgba(216,227,240,0.4)"
                          offset="0"
                        ></stop>
                        <stop
                          id="SvgjsStop1996"
                          stopOpacity="0.5"
                          stop-color="rgba(190,209,230,0.5)"
                          offset="1"
                        ></stop>
                        <stop
                          id="SvgjsStop1997"
                          stopOpacity="0.5"
                          stop-color="rgba(190,209,230,0.5)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <clipPath id="gridRectMaskdozxcpwfl">
                        <rect
                          id="SvgjsRect1999"
                          width="457"
                          height="121"
                          x="-0.5"
                          y="-0.5"
                          rx="0"
                          ry="0"
                          fill="#ffffff"
                          opacity="1"
                          strokeWidth="0"
                          stroke="none"
                          stroke-dasharray="0"
                        ></rect>
                      </clipPath>
                      <clipPath id="gridRectMarkerMaskdozxcpwfl">
                        <rect
                          id="SvgjsRect2000"
                          width="458"
                          height="122"
                          x="-1"
                          y="-1"
                          rx="0"
                          ry="0"
                          fill="#ffffff"
                          opacity="1"
                          strokeWidth="0"
                          stroke="none"
                          stroke-dasharray="0"
                        ></rect>
                      </clipPath>
                    </defs>
                    <rect
                      id="SvgjsRect1998"
                      width="16.285714285714285"
                      height="120"
                      x="0"
                      y="0"
                      rx="0"
                      ry="0"
                      fill="url(#SvgjsLinearGradient1994)"
                      opacity="1"
                      strokeWidth="0"
                      stroke-dasharray="3"
                      className="apexcharts-xcrosshairs"
                      y2="120"
                      filter="none"
                      fillOpacity="0.9"
                    ></rect>
                    <g
                      id="SvgjsG2021"
                      className="apexcharts-xaxis"
                      transform="translate(0, 0)"
                    >
                      <g
                        id="SvgjsG2022"
                        className="apexcharts-xaxis-texts-g"
                        transform="translate(0, -4)"
                      ></g>
                      <line
                        id="SvgjsLine2023"
                        x1="0"
                        y1="121"
                        x2="456"
                        y2="121"
                        stroke="#78909c"
                        stroke-dasharray="0"
                        strokeWidth="1"
                      ></line>
                    </g>
                    <g id="SvgjsG2025" className="apexcharts-grid">
                      <line
                        id="SvgjsLine2027"
                        x1="0"
                        y1="120"
                        x2="456"
                        y2="120"
                        stroke="transparent"
                        stroke-dasharray="0"
                      ></line>
                      <line
                        id="SvgjsLine2026"
                        x1="0"
                        y1="1"
                        x2="0"
                        y2="120"
                        stroke="transparent"
                        stroke-dasharray="0"
                      ></line>
                    </g>
                    <g
                      id="SvgjsG2002"
                      className="apexcharts-bar-series apexcharts-plot-series"
                    >
                      <g
                        id="SvgjsG2003"
                        className="apexcharts-series"
                        seriesName="Sales"
                        rel="1"
                        dataRealIndex="0"
                      >
                        <path
                          id="apexcharts-bar-area-0"
                          d="M 24.428571428571427 120L 24.428571428571427 54Q 32.07142857142857 46.85714285714286 39.71428571428571 54L 39.71428571428571 120L 23.928571428571427 120"
                          fill="rgba(112,178,217,1)"
                          fillOpacity="1"
                          stroke="#70b2d9"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="0"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 24.428571428571427 120L 24.428571428571427 54Q 32.07142857142857 46.85714285714286 39.71428571428571 54L 39.71428571428571 120L 23.928571428571427 120"
                          pathFrom="M 24.428571428571427 120L 24.428571428571427 120L 39.71428571428571 120L 39.71428571428571 120L 39.71428571428571 120L 23.928571428571427 120"
                          cy="54"
                          cx="89.07142857142857"
                          j="0"
                          val="44"
                          barHeight="66"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-0"
                          d="M 89.57142857142857 120L 89.57142857142857 37.5Q 97.21428571428571 30.357142857142858 104.85714285714286 37.5L 104.85714285714286 120L 89.07142857142857 120"
                          fill="rgba(112,178,217,1)"
                          fillOpacity="1"
                          stroke="#70b2d9"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="0"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 89.57142857142857 120L 89.57142857142857 37.5Q 97.21428571428571 30.357142857142858 104.85714285714286 37.5L 104.85714285714286 120L 89.07142857142857 120"
                          pathFrom="M 89.57142857142857 120L 89.57142857142857 120L 104.85714285714286 120L 104.85714285714286 120L 104.85714285714286 120L 89.07142857142857 120"
                          cy="37.5"
                          cx="154.21428571428572"
                          j="1"
                          val="55"
                          barHeight="82.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-0"
                          d="M 154.71428571428572 120L 154.71428571428572 58.5Q 162.35714285714286 51.35714285714286 170 58.5L 170 120L 154.21428571428572 120"
                          fill="rgba(112,178,217,1)"
                          fillOpacity="1"
                          stroke="#70b2d9"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="0"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 154.71428571428572 120L 154.71428571428572 58.5Q 162.35714285714286 51.35714285714286 170 58.5L 170 120L 154.21428571428572 120"
                          pathFrom="M 154.71428571428572 120L 154.71428571428572 120L 170 120L 170 120L 170 120L 154.21428571428572 120"
                          cy="58.5"
                          cx="219.35714285714286"
                          j="2"
                          val="41"
                          barHeight="61.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-0"
                          d="M 219.85714285714286 120L 219.85714285714286 19.5Q 227.5 12.357142857142858 235.14285714285714 19.5L 235.14285714285714 120L 219.35714285714286 120"
                          fill="rgba(112,178,217,1)"
                          fillOpacity="1"
                          stroke="#70b2d9"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="0"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 219.85714285714286 120L 219.85714285714286 19.5Q 227.5 12.357142857142858 235.14285714285714 19.5L 235.14285714285714 120L 219.35714285714286 120"
                          pathFrom="M 219.85714285714286 120L 219.85714285714286 120L 235.14285714285714 120L 235.14285714285714 120L 235.14285714285714 120L 219.35714285714286 120"
                          cy="19.5"
                          cx="284.5"
                          j="3"
                          val="67"
                          barHeight="100.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-0"
                          d="M 285 120L 285 87Q 292.64285714285717 79.85714285714286 300.2857142857143 87L 300.2857142857143 120L 284.5 120"
                          fill="rgba(112,178,217,1)"
                          fillOpacity="1"
                          stroke="#70b2d9"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="0"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 285 120L 285 87Q 292.64285714285717 79.85714285714286 300.2857142857143 87L 300.2857142857143 120L 284.5 120"
                          pathFrom="M 285 120L 285 120L 300.2857142857143 120L 300.2857142857143 120L 300.2857142857143 120L 284.5 120"
                          cy="87"
                          cx="349.6428571428571"
                          j="4"
                          val="22"
                          barHeight="33"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-0"
                          d="M 350.1428571428571 120L 350.1428571428571 55.5Q 357.7857142857143 48.35714285714286 365.4285714285714 55.5L 365.4285714285714 120L 349.6428571428571 120"
                          fill="rgba(112,178,217,1)"
                          fillOpacity="1"
                          stroke="#70b2d9"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="0"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 350.1428571428571 120L 350.1428571428571 55.5Q 357.7857142857143 48.35714285714286 365.4285714285714 55.5L 365.4285714285714 120L 349.6428571428571 120"
                          pathFrom="M 350.1428571428571 120L 350.1428571428571 120L 365.4285714285714 120L 365.4285714285714 120L 365.4285714285714 120L 349.6428571428571 120"
                          cy="55.5"
                          cx="414.7857142857142"
                          j="5"
                          val="43"
                          barHeight="64.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-0"
                          d="M 415.2857142857142 120L 415.2857142857142 88.5Q 422.9285714285714 81.35714285714286 430.5714285714285 88.5L 430.5714285714285 120L 414.7857142857142 120"
                          fill="rgba(112,178,217,1)"
                          fillOpacity="1"
                          stroke="#70b2d9"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="0"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 415.2857142857142 120L 415.2857142857142 88.5Q 422.9285714285714 81.35714285714286 430.5714285714285 88.5L 430.5714285714285 120L 414.7857142857142 120"
                          pathFrom="M 415.2857142857142 120L 415.2857142857142 120L 430.5714285714285 120L 430.5714285714285 120L 430.5714285714285 120L 414.7857142857142 120"
                          cy="88.5"
                          cx="479.92857142857133"
                          j="6"
                          val="21"
                          barHeight="31.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <g
                          id="SvgjsG2004"
                          className="apexcharts-datalabels"
                        ></g>
                      </g>
                      <g
                        id="SvgjsG2012"
                        className="apexcharts-series"
                        seriesName="LastxWeek"
                        rel="2"
                        dataRealIndex="1"
                      >
                        <path
                          id="apexcharts-bar-area-1"
                          d="M 24.428571428571427 54L 24.428571428571427 34.5Q 32.07142857142857 27.357142857142858 39.71428571428571 34.5L 39.71428571428571 54L 23.928571428571427 54"
                          fill="rgba(231,247,255,1)"
                          fillOpacity="1"
                          stroke="#e7f7ff"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="1"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 24.428571428571427 54L 24.428571428571427 34.5Q 32.07142857142857 27.357142857142858 39.71428571428571 34.5L 39.71428571428571 54L 23.928571428571427 54"
                          pathFrom="M 24.428571428571427 54L 24.428571428571427 54L 39.71428571428571 54L 39.71428571428571 54L 39.71428571428571 54L 23.928571428571427 54"
                          cy="34.5"
                          cx="89.07142857142857"
                          j="0"
                          val="13"
                          barHeight="19.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-1"
                          d="M 89.57142857142857 37.5L 89.57142857142857 3Q 97.21428571428571 -4.142857142857142 104.85714285714286 3L 104.85714285714286 37.5L 89.07142857142857 37.5"
                          fill="rgba(231,247,255,1)"
                          fillOpacity="1"
                          stroke="#e7f7ff"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="1"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 89.57142857142857 37.5L 89.57142857142857 3Q 97.21428571428571 -4.142857142857142 104.85714285714286 3L 104.85714285714286 37.5L 89.07142857142857 37.5"
                          pathFrom="M 89.57142857142857 37.5L 89.57142857142857 37.5L 104.85714285714286 37.5L 104.85714285714286 37.5L 104.85714285714286 37.5L 89.07142857142857 37.5"
                          cy="3"
                          cx="154.21428571428572"
                          j="1"
                          val="23"
                          barHeight="34.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-1"
                          d="M 154.71428571428572 58.5L 154.71428571428572 28.5Q 162.35714285714286 21.357142857142858 170 28.5L 170 58.5L 154.21428571428572 58.5"
                          fill="rgba(231,247,255,1)"
                          fillOpacity="1"
                          stroke="#e7f7ff"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="1"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 154.71428571428572 58.5L 154.71428571428572 28.5Q 162.35714285714286 21.357142857142858 170 28.5L 170 58.5L 154.21428571428572 58.5"
                          pathFrom="M 154.71428571428572 58.5L 154.71428571428572 58.5L 170 58.5L 170 58.5L 170 58.5L 154.21428571428572 58.5"
                          cy="28.5"
                          cx="219.35714285714286"
                          j="2"
                          val="20"
                          barHeight="30"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-1"
                          d="M 219.85714285714286 19.5L 219.85714285714286 7.5Q 227.5 0.35714285714285765 235.14285714285714 7.5L 235.14285714285714 19.5L 219.35714285714286 19.5"
                          fill="rgba(231,247,255,1)"
                          fillOpacity="1"
                          stroke="#e7f7ff"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="1"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 219.85714285714286 19.5L 219.85714285714286 7.5Q 227.5 0.35714285714285765 235.14285714285714 7.5L 235.14285714285714 19.5L 219.35714285714286 19.5"
                          pathFrom="M 219.85714285714286 19.5L 219.85714285714286 19.5L 235.14285714285714 19.5L 235.14285714285714 19.5L 235.14285714285714 19.5L 219.35714285714286 19.5"
                          cy="7.5"
                          cx="284.5"
                          j="3"
                          val="8"
                          barHeight="12"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-1"
                          d="M 285 87L 285 67.5Q 292.64285714285717 60.35714285714286 300.2857142857143 67.5L 300.2857142857143 87L 284.5 87"
                          fill="rgba(231,247,255,1)"
                          fillOpacity="1"
                          stroke="#e7f7ff"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="1"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 285 87L 285 67.5Q 292.64285714285717 60.35714285714286 300.2857142857143 67.5L 300.2857142857143 87L 284.5 87"
                          pathFrom="M 285 87L 285 87L 300.2857142857143 87L 300.2857142857143 87L 300.2857142857143 87L 284.5 87"
                          cy="67.5"
                          cx="349.6428571428571"
                          j="4"
                          val="13"
                          barHeight="19.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-1"
                          d="M 350.1428571428571 55.5L 350.1428571428571 15Q 357.7857142857143 7.857142857142858 365.4285714285714 15L 365.4285714285714 55.5L 349.6428571428571 55.5"
                          fill="rgba(231,247,255,1)"
                          fillOpacity="1"
                          stroke="#e7f7ff"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="1"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 350.1428571428571 55.5L 350.1428571428571 15Q 357.7857142857143 7.857142857142858 365.4285714285714 15L 365.4285714285714 55.5L 349.6428571428571 55.5"
                          pathFrom="M 350.1428571428571 55.5L 350.1428571428571 55.5L 365.4285714285714 55.5L 365.4285714285714 55.5L 365.4285714285714 55.5L 349.6428571428571 55.5"
                          cy="15"
                          cx="414.7857142857142"
                          j="5"
                          val="27"
                          barHeight="40.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <path
                          id="apexcharts-bar-area-1"
                          d="M 415.2857142857142 88.5L 415.2857142857142 39Q 422.9285714285714 31.857142857142858 430.5714285714285 39L 430.5714285714285 88.5L 414.7857142857142 88.5"
                          fill="rgba(231,247,255,1)"
                          fillOpacity="1"
                          stroke="#e7f7ff"
                          strokeOpacity="1"
                          strokeLinecap="butt"
                          strokeWidth="1"
                          stroke-dasharray="0"
                          className="apexcharts-bar-area"
                          index="1"
                          clip-path="url(#gridRectMaskdozxcpwfl)"
                          pathTo="M 415.2857142857142 88.5L 415.2857142857142 39Q 422.9285714285714 31.857142857142858 430.5714285714285 39L 430.5714285714285 88.5L 414.7857142857142 88.5"
                          pathFrom="M 415.2857142857142 88.5L 415.2857142857142 88.5L 430.5714285714285 88.5L 430.5714285714285 88.5L 430.5714285714285 88.5L 414.7857142857142 88.5"
                          cy="39"
                          cx="479.92857142857133"
                          j="6"
                          val="33"
                          barHeight="49.5"
                          barWidth="16.285714285714285"
                        ></path>
                        <g
                          id="SvgjsG2013"
                          className="apexcharts-datalabels"
                        ></g>
                      </g>
                    </g>
                    <line
                      id="SvgjsLine2028"
                      x1="0"
                      y1="0"
                      x2="456"
                      y2="0"
                      stroke="#b6b6b6"
                      stroke-dasharray="0"
                      strokeWidth="1"
                      className="apexcharts-ycrosshairs"
                    ></line>
                    <line
                      id="SvgjsLine2029"
                      x1="0"
                      y1="0"
                      x2="456"
                      y2="0"
                      stroke-dasharray="0"
                      strokeWidth="0"
                      className="apexcharts-ycrosshairs-hidden"
                    ></line>
                    <g
                      id="SvgjsG2030"
                      className="apexcharts-yaxis-annotations"
                    ></g>
                    <g
                      id="SvgjsG2031"
                      className="apexcharts-xaxis-annotations"
                    ></g>
                    <g
                      id="SvgjsG2032"
                      className="apexcharts-point-annotations"
                    ></g>
                  </g>
                  <g
                    id="SvgjsG2024"
                    className="apexcharts-yaxis"
                    rel="0"
                    transform="translate(-21, 0)"
                  ></g>
                </svg>
                <div className="apexcharts-legend"></div>
                <div className="apexcharts-tooltip light">
                  <div
                    className="apexcharts-tooltip-title"
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: "12px",
                    }}
                  ></div>
                  <div className="apexcharts-tooltip-series-group">
                    <span
                      className="apexcharts-tooltip-marker"
                      style={{ backgroundColor: "rgb(112, 178, 217)" }}
                    ></span>
                    <div
                      className="apexcharts-tooltip-text"
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontsize: "12px",
                      }}
                    >
                      <div className="apexcharts-tooltip-y-group">
                        <span className="apexcharts-tooltip-text-label"></span>
                        <span className="apexcharts-tooltip-text-value"></span>
                      </div>
                      <div className="apexcharts-tooltip-z-group">
                        <span className="apexcharts-tooltip-text-z-label"></span>
                        <span className="apexcharts-tooltip-text-z-value"></span>
                      </div>
                    </div>
                  </div>
                  <div className="apexcharts-tooltip-series-group">
                    <span
                      className="apexcharts-tooltip-marker"
                      style={{ backgroundColor: " rgb(231, 247, 255)" }}
                    ></span>
                    <div
                      className="apexcharts-tooltip-text"
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: "12px;",
                      }}
                    >
                      <div className="apexcharts-tooltip-y-group">
                        <span className="apexcharts-tooltip-text-label"></span>
                        <span className="apexcharts-tooltip-text-value"></span>
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
            <div className="resize-triggers">
              <div className="expand-trigger">
                <div style={{ width: "457px", height: "176px" }}></div>
              </div>
              <div className="contract-trigger"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
