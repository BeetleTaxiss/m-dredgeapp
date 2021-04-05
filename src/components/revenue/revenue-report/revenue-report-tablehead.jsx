import React from "react";

const RevenueReportTablehead = ({ content }) => {
  return (
    <thead>
      <tr role="row">
        {content?.map((item, i) => (
          <th
            key={i}
            className={item.className}
            tabIndex="0"
            aria-controls="default-ordering"
            rowSpan="1"
            colSpan="1"
            aria-sort={item.ariaSort && item.ariaSort}
            aria-label={item.ariaLabel}
            style={{ width: item.width }}
          >
            {item.text}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default RevenueReportTablehead;
