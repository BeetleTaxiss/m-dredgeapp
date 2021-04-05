import React from "react";

const ExpenseReportTablefooter = ({ content }) => {
  return (
    <tfoot>
      <tr>
        {content.map((item, i) => (
          <th key={i} rowSpan="1" colSpan="1">
            {item}
          </th>
        ))}
        <th className="invisible" rowSpan="1" colSpan="1"></th>
      </tr>
    </tfoot>
  );
};

export default ExpenseReportTablefooter;
