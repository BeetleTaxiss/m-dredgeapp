import React from "react";

const BarChart = () => {
  return (
    <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div class="widget widget-chart-three">
        <div class="widget-heading">
          <div class="">
            <h5 class="">Unique Visitors</h5>
          </div>

          <div class="dropdown">
            <a
              class="dropdown-toggle"
              href="#"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </a>

            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="uniqueVisitors"
              style="will-change: transform;"
            >
              <a class="dropdown-item" href="javascript:void(0);">
                View
              </a>
              <a class="dropdown-item" href="javascript:void(0);">
                Update
              </a>
              <a class="dropdown-item" href="javascript:void(0);">
                Download
              </a>
            </div>
          </div>
        </div>

        <div class="widget-content" style="position: relative;">
          <div id="uniqueVisits" style="min-height: 365px;">
            <div
              id="apexcharts4ivgsb0d"
              class="apexcharts-canvas apexcharts4ivgsb0d light"
              style="width: 944px; height: 350px;"
            >
              <svg
                id="SvgjsSvg1783"
                width="944"
                height="350"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.com/svgjs"
                class="apexcharts-svg"
                xmlns:data="ApexChartsNS"
                transform="translate(0, 0)"
                style="background: transparent;"
              >
                <foreignObject x="0" y="0" width="944" height="350">
                  <div
                    class="apexcharts-legend center position-bottom"
                    xmlns="http://www.w3.org/1999/xhtml"
                    style="inset: auto 0px 0px 20px; position: absolute;"
                  >
                    <div
                      class="apexcharts-legend-series"
                      rel="1"
                      data:collapsed="false"
                      style="margin: 0px 5px;"
                    >
                      <span
                        class="apexcharts-legend-marker"
                        rel="1"
                        data:collapsed="false"
                        style="background: rgb(97, 182, 205); color: rgb(97, 182, 205); height: 12px; width: 12px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 12px;"
                      ></span>
                      <span
                        class="apexcharts-legend-text"
                        rel="1"
                        data:collapsed="false"
                        style="color: rgb(55, 61, 63); font-size: 12px; font-family: Helvetica, Arial, sans-serif;"
                      >
                        Organic
                      </span>
                    </div>
                    <div
                      class="apexcharts-legend-series"
                      rel="2"
                      data:collapsed="false"
                      style="margin: 0px 5px;"
                    >
                      <span
                        class="apexcharts-legend-marker"
                        rel="2"
                        data:collapsed="false"
                        style="background: rgb(128, 93, 202); color: rgb(128, 93, 202); height: 12px; width: 12px; left: 0px; top: 0px; border-width: 0px; border-color: rgb(255, 255, 255); border-radius: 12px;"
                      ></span>
                      <span
                        class="apexcharts-legend-text"
                        rel="2"
                        data:collapsed="false"
                        style="color: rgb(55, 61, 63); font-size: 12px; font-family: Helvetica, Arial, sans-serif;"
                      >
                        Direct
                      </span>
                    </div>
                  </div>
                </foreignObject>
                <g
                  id="SvgjsG1785"
                  class="apexcharts-inner apexcharts-graphical"
                  transform="translate(81.80208333333333, 40)"
                >
                  <defs id="SvgjsDefs1784">
                    <clipPath id="gridRectMask4ivgsb0d">
                      <rect
                        id="SvgjsRect1793"
                        width="792.671875"
                        height="257.348"
                        x="-2"
                        y="-2"
                        rx="0"
                        ry="0"
                        fill="#ffffff"
                        opacity="1"
                        stroke-width="0"
                        stroke="none"
                        stroke-dasharray="0"
                      ></rect>
                    </clipPath>
                    <clipPath id="gridRectMarkerMask4ivgsb0d">
                      <rect
                        id="SvgjsRect1794"
                        width="790.671875"
                        height="255.348"
                        x="-1"
                        y="-1"
                        rx="0"
                        ry="0"
                        fill="#ffffff"
                        opacity="1"
                        stroke-width="0"
                        stroke="none"
                        stroke-dasharray="0"
                      ></rect>
                    </clipPath>
                  </defs>
                  <line
                    id="SvgjsLine1792"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="253.348"
                    stroke="#b6b6b6"
                    stroke-dasharray="3"
                    class="apexcharts-xcrosshairs"
                    x="0"
                    y="0"
                    width="1"
                    height="253.348"
                    fill="#b1b9c4"
                    filter="none"
                    fill-opacity="0.9"
                    stroke-width="1"
                  ></line>
                  <g
                    id="SvgjsG1816"
                    class="apexcharts-xaxis"
                    transform="translate(0, 0)"
                  >
                    <g
                      id="SvgjsG1817"
                      class="apexcharts-xaxis-texts-g"
                      transform="translate(0, -4)"
                    >
                      <text
                        id="SvgjsText1818"
                        font-family="Helvetica, Arial, sans-serif"
                        x="32.861328125"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1819"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Jan
                        </tspan>
                        <title>Jan</title>
                      </text>
                      <text
                        id="SvgjsText1820"
                        font-family="Helvetica, Arial, sans-serif"
                        x="98.583984375"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1821"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Feb
                        </tspan>
                        <title>Feb</title>
                      </text>
                      <text
                        id="SvgjsText1822"
                        font-family="Helvetica, Arial, sans-serif"
                        x="164.306640625"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1823"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Mar
                        </tspan>
                        <title>Mar</title>
                      </text>
                      <text
                        id="SvgjsText1824"
                        font-family="Helvetica, Arial, sans-serif"
                        x="230.029296875"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1825"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Apr
                        </tspan>
                        <title>Apr</title>
                      </text>
                      <text
                        id="SvgjsText1826"
                        font-family="Helvetica, Arial, sans-serif"
                        x="295.751953125"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1827"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          May
                        </tspan>
                        <title>May</title>
                      </text>
                      <text
                        id="SvgjsText1828"
                        font-family="Helvetica, Arial, sans-serif"
                        x="361.474609375"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1829"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Jun
                        </tspan>
                        <title>Jun</title>
                      </text>
                      <text
                        id="SvgjsText1830"
                        font-family="Helvetica, Arial, sans-serif"
                        x="427.197265625"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1831"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Jul
                        </tspan>
                        <title>Jul</title>
                      </text>
                      <text
                        id="SvgjsText1832"
                        font-family="Helvetica, Arial, sans-serif"
                        x="492.919921875"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1833"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Aug
                        </tspan>
                        <title>Aug</title>
                      </text>
                      <text
                        id="SvgjsText1834"
                        font-family="Helvetica, Arial, sans-serif"
                        x="558.642578125"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1835"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Sep
                        </tspan>
                        <title>Sep</title>
                      </text>
                      <text
                        id="SvgjsText1836"
                        font-family="Helvetica, Arial, sans-serif"
                        x="624.365234375"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1837"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Oct
                        </tspan>
                        <title>Oct</title>
                      </text>
                      <text
                        id="SvgjsText1838"
                        font-family="Helvetica, Arial, sans-serif"
                        x="690.087890625"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1839"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Nov
                        </tspan>
                        <title>Nov</title>
                      </text>
                      <text
                        id="SvgjsText1840"
                        font-family="Helvetica, Arial, sans-serif"
                        x="755.810546875"
                        y="282.348"
                        text-anchor="middle"
                        dominant-baseline="auto"
                        font-size="12px"
                        fill="#373d3f"
                        class="apexcharts-xaxis-label "
                        style="font-family: Helvetica, Arial, sans-serif;"
                      >
                        <tspan
                          id="SvgjsTspan1841"
                          style="font-family: Helvetica, Arial, sans-serif;"
                        >
                          Dec
                        </tspan>
                        <title>Dec</title>
                      </text>
                    </g>
                    <line
                      id="SvgjsLine1842"
                      x1="0"
                      y1="254.348"
                      x2="788.671875"
                      y2="254.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      stroke-width="1"
                    ></line>
                  </g>
                  <g id="SvgjsG1866" class="apexcharts-grid">
                    <g id="SvgjsG1867" class="apexcharts-gridlines-horizontal">
                      <line
                        id="SvgjsLine1880"
                        x1="0"
                        y1="0"
                        x2="788.671875"
                        y2="0"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1881"
                        x1="0"
                        y1="31.6685"
                        x2="788.671875"
                        y2="31.6685"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1882"
                        x1="0"
                        y1="63.337"
                        x2="788.671875"
                        y2="63.337"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1883"
                        x1="0"
                        y1="95.00550000000001"
                        x2="788.671875"
                        y2="95.00550000000001"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1884"
                        x1="0"
                        y1="126.674"
                        x2="788.671875"
                        y2="126.674"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1885"
                        x1="0"
                        y1="158.3425"
                        x2="788.671875"
                        y2="158.3425"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1886"
                        x1="0"
                        y1="190.011"
                        x2="788.671875"
                        y2="190.011"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1887"
                        x1="0"
                        y1="221.6795"
                        x2="788.671875"
                        y2="221.6795"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                      <line
                        id="SvgjsLine1888"
                        x1="0"
                        y1="253.34799999999998"
                        x2="788.671875"
                        y2="253.34799999999998"
                        stroke="#e0e0e0"
                        stroke-dasharray="0"
                        class="apexcharts-gridline"
                      ></line>
                    </g>
                    <g
                      id="SvgjsG1868"
                      class="apexcharts-gridlines-vertical"
                    ></g>
                    <line
                      id="SvgjsLine1869"
                      x1="65.72265625"
                      y1="254.348"
                      x2="65.72265625"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1870"
                      x1="131.4453125"
                      y1="254.348"
                      x2="131.4453125"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1871"
                      x1="197.16796875"
                      y1="254.348"
                      x2="197.16796875"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1872"
                      x1="262.890625"
                      y1="254.348"
                      x2="262.890625"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1873"
                      x1="328.61328125"
                      y1="254.348"
                      x2="328.61328125"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1874"
                      x1="394.3359375"
                      y1="254.348"
                      x2="394.3359375"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1875"
                      x1="460.05859375"
                      y1="254.348"
                      x2="460.05859375"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1876"
                      x1="525.78125"
                      y1="254.348"
                      x2="525.78125"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1877"
                      x1="591.50390625"
                      y1="254.348"
                      x2="591.50390625"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1878"
                      x1="657.2265625"
                      y1="254.348"
                      x2="657.2265625"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1879"
                      x1="722.94921875"
                      y1="254.348"
                      x2="722.94921875"
                      y2="260.348"
                      stroke="#78909c"
                      stroke-dasharray="0"
                      class="apexcharts-xaxis-tick"
                    ></line>
                    <line
                      id="SvgjsLine1890"
                      x1="0"
                      y1="253.348"
                      x2="788.671875"
                      y2="253.348"
                      stroke="transparent"
                      stroke-dasharray="0"
                    ></line>
                    <line
                      id="SvgjsLine1889"
                      x1="0"
                      y1="1"
                      x2="0"
                      y2="253.348"
                      stroke="transparent"
                      stroke-dasharray="0"
                    ></line>
                  </g>
                  <g
                    id="SvgjsG1796"
                    class="apexcharts-bar-series apexcharts-plot-series"
                  >
                    <g
                      id="SvgjsG1797"
                      class="apexcharts-series"
                      rel="1"
                      seriesName="Organic"
                      data:realIndex="0"
                    >
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 14.78759765625 253.348L 14.78759765625 114.00659999999999L 50.93505859375 114.00659999999999L 50.93505859375 253.348L 14.78759765625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 14.78759765625 253.348L 14.78759765625 114.00659999999999L 50.93505859375 114.00659999999999L 50.93505859375 253.348L 14.78759765625 253.348"
                        pathFrom="M 14.78759765625 253.348L 14.78759765625 253.348L 50.93505859375 253.348L 50.93505859375 253.348L 14.78759765625 253.348"
                        cy="114.00659999999999"
                        cx="80.51025390625"
                        j="0"
                        val="4400"
                        barHeight="139.34140000000002"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 80.51025390625 253.348L 80.51025390625 93.422075L 116.65771484375 93.422075L 116.65771484375 253.348L 80.51025390625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 80.51025390625 253.348L 80.51025390625 93.422075L 116.65771484375 93.422075L 116.65771484375 253.348L 80.51025390625 253.348"
                        pathFrom="M 80.51025390625 253.348L 80.51025390625 253.348L 116.65771484375 253.348L 116.65771484375 253.348L 80.51025390625 253.348"
                        cy="93.422075"
                        cx="146.23291015625"
                        j="1"
                        val="5050"
                        barHeight="159.925925"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 146.23291015625 253.348L 146.23291015625 122.24041L 182.38037109375 122.24041L 182.38037109375 253.348L 146.23291015625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 146.23291015625 253.348L 146.23291015625 122.24041L 182.38037109375 122.24041L 182.38037109375 253.348L 146.23291015625 253.348"
                        pathFrom="M 146.23291015625 253.348L 146.23291015625 253.348L 182.38037109375 253.348L 182.38037109375 253.348L 146.23291015625 253.348"
                        cy="122.24041"
                        cx="211.95556640625"
                        j="2"
                        val="4140"
                        barHeight="131.10759000000002"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 211.95556640625 253.348L 211.95556640625 40.85236499999999L 248.10302734375 40.85236499999999L 248.10302734375 253.348L 211.95556640625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 211.95556640625 253.348L 211.95556640625 40.85236499999999L 248.10302734375 40.85236499999999L 248.10302734375 253.348L 211.95556640625 253.348"
                        pathFrom="M 211.95556640625 253.348L 211.95556640625 253.348L 248.10302734375 253.348L 248.10302734375 253.348L 211.95556640625 253.348"
                        cy="40.85236499999999"
                        cx="277.67822265625"
                        j="3"
                        val="6710"
                        barHeight="212.49563500000002"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 277.67822265625 253.348L 277.67822265625 181.460505L 313.82568359375 181.460505L 313.82568359375 253.348L 277.67822265625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 277.67822265625 253.348L 277.67822265625 181.460505L 313.82568359375 181.460505L 313.82568359375 253.348L 277.67822265625 253.348"
                        pathFrom="M 277.67822265625 253.348L 277.67822265625 253.348L 313.82568359375 253.348L 313.82568359375 253.348L 277.67822265625 253.348"
                        cy="181.460505"
                        cx="343.40087890625"
                        j="4"
                        val="2270"
                        barHeight="71.887495"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 343.40087890625 253.348L 343.40087890625 122.557095L 379.54833984375 122.557095L 379.54833984375 253.348L 343.40087890625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 343.40087890625 253.348L 343.40087890625 122.557095L 379.54833984375 122.557095L 379.54833984375 253.348L 343.40087890625 253.348"
                        pathFrom="M 343.40087890625 253.348L 343.40087890625 253.348L 379.54833984375 253.348L 379.54833984375 253.348L 343.40087890625 253.348"
                        cy="122.557095"
                        cx="409.12353515625"
                        j="5"
                        val="4130"
                        barHeight="130.790905"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 409.12353515625 253.348L 409.12353515625 189.69431500000002L 445.27099609375 189.69431500000002L 445.27099609375 253.348L 409.12353515625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 409.12353515625 253.348L 409.12353515625 189.69431500000002L 445.27099609375 189.69431500000002L 445.27099609375 253.348L 409.12353515625 253.348"
                        pathFrom="M 409.12353515625 253.348L 409.12353515625 253.348L 445.27099609375 253.348L 445.27099609375 253.348L 409.12353515625 253.348"
                        cy="189.69431500000002"
                        cx="474.84619140625"
                        j="6"
                        val="2010"
                        barHeight="63.653685"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 474.84619140625 253.348L 474.84619140625 141.87488000000002L 510.99365234375 141.87488000000002L 510.99365234375 253.348L 474.84619140625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 474.84619140625 253.348L 474.84619140625 141.87488000000002L 510.99365234375 141.87488000000002L 510.99365234375 253.348L 474.84619140625 253.348"
                        pathFrom="M 474.84619140625 253.348L 474.84619140625 253.348L 510.99365234375 253.348L 510.99365234375 253.348L 474.84619140625 253.348"
                        cy="141.87488000000002"
                        cx="540.56884765625"
                        j="7"
                        val="3520"
                        barHeight="111.47312000000001"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 540.56884765625 253.348L 540.56884765625 15.200879999999984L 576.71630859375 15.200879999999984L 576.71630859375 253.348L 540.56884765625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 540.56884765625 253.348L 540.56884765625 15.200879999999984L 576.71630859375 15.200879999999984L 576.71630859375 253.348L 540.56884765625 253.348"
                        pathFrom="M 540.56884765625 253.348L 540.56884765625 253.348L 576.71630859375 253.348L 576.71630859375 253.348L 540.56884765625 253.348"
                        cy="15.200879999999984"
                        cx="606.29150390625"
                        j="8"
                        val="7520"
                        barHeight="238.14712000000003"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 606.29150390625 253.348L 606.29150390625 152.0088L 642.43896484375 152.0088L 642.43896484375 253.348L 606.29150390625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 606.29150390625 253.348L 606.29150390625 152.0088L 642.43896484375 152.0088L 642.43896484375 253.348L 606.29150390625 253.348"
                        pathFrom="M 606.29150390625 253.348L 606.29150390625 253.348L 642.43896484375 253.348L 642.43896484375 253.348L 606.29150390625 253.348"
                        cy="152.0088"
                        cx="672.01416015625"
                        j="9"
                        val="3200"
                        barHeight="101.3392"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 672.01416015625 253.348L 672.01416015625 171.959955L 708.16162109375 171.959955L 708.16162109375 253.348L 672.01416015625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 672.01416015625 253.348L 672.01416015625 171.959955L 708.16162109375 171.959955L 708.16162109375 253.348L 672.01416015625 253.348"
                        pathFrom="M 672.01416015625 253.348L 672.01416015625 253.348L 708.16162109375 253.348L 708.16162109375 253.348L 672.01416015625 253.348"
                        cy="171.959955"
                        cx="737.73681640625"
                        j="10"
                        val="2570"
                        barHeight="81.388045"
                        barWidth="36.1474609375"
                      ></path>
                      <path
                        id="apexcharts-bar-area-0"
                        d="M 737.73681640625 253.348L 737.73681640625 202.6784L 773.88427734375 202.6784L 773.88427734375 253.348L 737.73681640625 253.348"
                        fill="rgba(97,182,205,0.85)"
                        fill-opacity="1"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="0"
                        stroke-dasharray="0"
                        class="apexcharts-bar-area"
                        index="0"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 737.73681640625 253.348L 737.73681640625 202.6784L 773.88427734375 202.6784L 773.88427734375 253.348L 737.73681640625 253.348"
                        pathFrom="M 737.73681640625 253.348L 737.73681640625 253.348L 773.88427734375 253.348L 773.88427734375 253.348L 737.73681640625 253.348"
                        cy="202.6784"
                        cx="803.45947265625"
                        j="11"
                        val="1600"
                        barHeight="50.6696"
                        barWidth="36.1474609375"
                      ></path>
                      <g id="SvgjsG1798" class="apexcharts-datalabels"></g>
                    </g>
                  </g>
                  <g
                    id="SvgjsG1811"
                    class="apexcharts-line-series apexcharts-plot-series"
                  >
                    <g
                      id="SvgjsG1812"
                      class="apexcharts-series"
                      seriesName="Direct"
                      data:longestSeries="true"
                      rel="1"
                      data:realIndex="1"
                    >
                      <path
                        id="apexcharts-line-0"
                        d="M 32.861328125 136.80792000000002C 55.8642578125 136.80792000000002 75.5810546875 40.535679999999985 98.583984375 40.535679999999985C 121.5869140625 40.535679999999985 141.3037109375 76.0044 164.306640625 76.0044C 187.3095703125 76.0044 207.0263671875 116.54007999999999 230.029296875 116.54007999999999C 253.0322265625 116.54007999999999 272.7490234375 35.46871999999999 295.751953125 35.46871999999999C 318.7548828125 35.46871999999999 338.4716796875 141.87488000000002 361.474609375 141.87488000000002C 384.4775390625 141.87488000000002 404.1943359375 167.20968 427.197265625 167.20968C 450.2001953125 167.20968 469.9169921875 96.27224000000001 492.919921875 96.27224000000001C 515.9228515625 96.27224000000001 535.6396484375 141.87488000000002 558.642578125 141.87488000000002C 581.6455078125 141.87488000000002 601.3623046875 141.87488000000002 624.365234375 141.87488000000002C 647.3681640625 141.87488000000002 667.0849609375 192.54448000000002 690.087890625 192.54448000000002C 713.0908203125 192.54448000000002 732.8076171875 172.27664 755.810546875 172.27664"
                        fill="none"
                        fill-opacity="1"
                        stroke="rgba(128,93,202,0.85)"
                        stroke-opacity="1"
                        stroke-linecap="square"
                        stroke-width="4"
                        stroke-dasharray="0"
                        class="apexcharts-line"
                        index="1"
                        clip-path="url(#gridRectMask4ivgsb0d)"
                        pathTo="M 32.861328125 136.80792000000002C 55.8642578125 136.80792000000002 75.5810546875 40.535679999999985 98.583984375 40.535679999999985C 121.5869140625 40.535679999999985 141.3037109375 76.0044 164.306640625 76.0044C 187.3095703125 76.0044 207.0263671875 116.54007999999999 230.029296875 116.54007999999999C 253.0322265625 116.54007999999999 272.7490234375 35.46871999999999 295.751953125 35.46871999999999C 318.7548828125 35.46871999999999 338.4716796875 141.87488000000002 361.474609375 141.87488000000002C 384.4775390625 141.87488000000002 404.1943359375 167.20968 427.197265625 167.20968C 450.2001953125 167.20968 469.9169921875 96.27224000000001 492.919921875 96.27224000000001C 515.9228515625 96.27224000000001 535.6396484375 141.87488000000002 558.642578125 141.87488000000002C 581.6455078125 141.87488000000002 601.3623046875 141.87488000000002 624.365234375 141.87488000000002C 647.3681640625 141.87488000000002 667.0849609375 192.54448000000002 690.087890625 192.54448000000002C 713.0908203125 192.54448000000002 732.8076171875 172.27664 755.810546875 172.27664"
                        pathFrom="M -1 253.348L -1 253.348L 98.583984375 253.348L 164.306640625 253.348L 230.029296875 253.348L 295.751953125 253.348L 361.474609375 253.348L 427.197265625 253.348L 492.919921875 253.348L 558.642578125 253.348L 624.365234375 253.348L 690.087890625 253.348L 755.810546875 253.348"
                      ></path>
                      <g id="SvgjsG1813" class="apexcharts-series-markers-wrap">
                        <g class="apexcharts-series-markers">
                          <circle
                            id="SvgjsCircle1896"
                            r="0"
                            cx="0"
                            cy="0"
                            class="apexcharts-marker w46929ox5"
                            stroke="#ffffff"
                            fill="#805dca"
                            fill-opacity="1"
                            stroke-width="2"
                            stroke-opacity="0.9"
                            default-marker-size="0"
                          ></circle>
                        </g>
                      </g>
                      <g id="SvgjsG1814" class="apexcharts-datalabels"></g>
                    </g>
                  </g>
                  <line
                    id="SvgjsLine1891"
                    x1="0"
                    y1="0"
                    x2="788.671875"
                    y2="0"
                    stroke="#b6b6b6"
                    stroke-dasharray="0"
                    stroke-width="1"
                    class="apexcharts-ycrosshairs"
                  ></line>
                  <line
                    id="SvgjsLine1892"
                    x1="0"
                    y1="0"
                    x2="788.671875"
                    y2="0"
                    stroke-dasharray="0"
                    stroke-width="0"
                    class="apexcharts-ycrosshairs-hidden"
                  ></line>
                  <g id="SvgjsG1893" class="apexcharts-yaxis-annotations"></g>
                  <g id="SvgjsG1894" class="apexcharts-xaxis-annotations"></g>
                  <g id="SvgjsG1895" class="apexcharts-point-annotations"></g>
                </g>
                <rect
                  id="SvgjsRect1791"
                  width="0"
                  height="0"
                  x="0"
                  y="0"
                  rx="0"
                  ry="0"
                  fill="#fefefe"
                  opacity="1"
                  stroke-width="0"
                  stroke="none"
                  stroke-dasharray="0"
                ></rect>
                <g
                  id="SvgjsG1843"
                  class="apexcharts-yaxis"
                  rel="0"
                  transform="translate(48.80208333333333, 0)"
                >
                  <g id="SvgjsG1844" class="apexcharts-yaxis-texts-g">
                    <text
                      id="SvgjsText1845"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="41.8"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      8000
                    </text>
                    <text
                      id="SvgjsText1846"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="73.5685"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      7000
                    </text>
                    <text
                      id="SvgjsText1847"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="105.337"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      6000
                    </text>
                    <text
                      id="SvgjsText1848"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="137.1055"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      5000
                    </text>
                    <text
                      id="SvgjsText1849"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="168.87400000000002"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      4000
                    </text>
                    <text
                      id="SvgjsText1850"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="200.64250000000004"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      3000
                    </text>
                    <text
                      id="SvgjsText1851"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="232.41100000000006"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      2000
                    </text>
                    <text
                      id="SvgjsText1852"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="264.1795000000001"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      1000
                    </text>
                    <text
                      id="SvgjsText1853"
                      font-family="Helvetica, Arial, sans-serif"
                      x="20"
                      y="295.9480000000001"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      0
                    </text>
                  </g>
                  <g id="SvgjsG1854" class="apexcharts-yaxis-title">
                    <text
                      id="SvgjsText1855"
                      font-family="Helvetica, Arial, sans-serif"
                      x="-0.2031269073486328"
                      y="166.674"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-title-text "
                      style="font-family: Helvetica, Arial, sans-serif;"
                      transform="rotate(-90 -20.9609375 162.6796875)"
                    >
                      Organic
                    </text>
                  </g>
                </g>
                <g
                  id="SvgjsG1856"
                  class="apexcharts-yaxis"
                  rel="1"
                  transform="translate(901.4739583333334, 0)"
                >
                  <g id="SvgjsG1857" class="apexcharts-yaxis-texts-g">
                    <text
                      id="SvgjsText1858"
                      font-family="Helvetica, Arial, sans-serif"
                      x="-20"
                      y="41.5"
                      text-anchor="start"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      500
                    </text>
                    <text
                      id="SvgjsText1859"
                      font-family="Helvetica, Arial, sans-serif"
                      x="-20"
                      y="92.2696"
                      text-anchor="start"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      400
                    </text>
                    <text
                      id="SvgjsText1860"
                      font-family="Helvetica, Arial, sans-serif"
                      x="-20"
                      y="143.0392"
                      text-anchor="start"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      300
                    </text>
                    <text
                      id="SvgjsText1861"
                      font-family="Helvetica, Arial, sans-serif"
                      x="-20"
                      y="193.8088"
                      text-anchor="start"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      200
                    </text>
                    <text
                      id="SvgjsText1862"
                      font-family="Helvetica, Arial, sans-serif"
                      x="-20"
                      y="244.5784"
                      text-anchor="start"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      100
                    </text>
                    <text
                      id="SvgjsText1863"
                      font-family="Helvetica, Arial, sans-serif"
                      x="-20"
                      y="295.348"
                      text-anchor="start"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-label "
                      style="font-family: Helvetica, Arial, sans-serif;"
                    >
                      0
                    </text>
                  </g>
                  <g id="SvgjsG1864" class="apexcharts-yaxis-title">
                    <text
                      id="SvgjsText1865"
                      font-family="Helvetica, Arial, sans-serif"
                      x="29.9765625"
                      y="166.674"
                      text-anchor="end"
                      dominant-baseline="auto"
                      font-size="11px"
                      fill="#373d3f"
                      class="apexcharts-yaxis-title-text "
                      style="font-family: Helvetica, Arial, sans-serif;"
                      transform="rotate(90 14.3671875 162.6796875)"
                    >
                      Direct
                    </text>
                  </g>
                </g>
              </svg>
              <div class="apexcharts-tooltip light">
                <div
                  class="apexcharts-tooltip-title"
                  style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
                ></div>
                <div class="apexcharts-tooltip-series-group">
                  <span
                    class="apexcharts-tooltip-marker"
                    style="background-color: rgb(97, 182, 205);"
                  ></span>
                  <div
                    class="apexcharts-tooltip-text"
                    style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
                  >
                    <div class="apexcharts-tooltip-y-group">
                      <span class="apexcharts-tooltip-text-label"></span>
                      <span class="apexcharts-tooltip-text-value"></span>
                    </div>
                    <div class="apexcharts-tooltip-z-group">
                      <span class="apexcharts-tooltip-text-z-label"></span>
                      <span class="apexcharts-tooltip-text-z-value"></span>
                    </div>
                  </div>
                </div>
                <div class="apexcharts-tooltip-series-group">
                  <span
                    class="apexcharts-tooltip-marker"
                    style="background-color: rgb(128, 93, 202);"
                  ></span>
                  <div
                    class="apexcharts-tooltip-text"
                    style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
                  >
                    <div class="apexcharts-tooltip-y-group">
                      <span class="apexcharts-tooltip-text-label"></span>
                      <span class="apexcharts-tooltip-text-value"></span>
                    </div>
                    <div class="apexcharts-tooltip-z-group">
                      <span class="apexcharts-tooltip-text-z-label"></span>
                      <span class="apexcharts-tooltip-text-z-value"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom light">
                <div
                  class="apexcharts-xaxistooltip-text"
                  style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"
                ></div>
              </div>
            </div>
          </div>
          <div class="resize-triggers">
            <div class="expand-trigger">
              <div style="width: 945px; height: 366px;"></div>
            </div>
            <div class="contract-trigger"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
