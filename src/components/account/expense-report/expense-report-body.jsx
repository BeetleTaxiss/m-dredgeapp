import React from "react";
import { Link } from "react-router-dom";

const ExpenseReportTablebody = ({ content }) => {
  return (
    <tbody>
      {content.map((item, i) => (
        <tr key={i} role="row">
          <td>{item.date}</td>
          <td>{item.expense}</td>
          <td>{item.description}</td>
          <td>₦{item.amount}</td>
          <td className="sorting_1">{item.issuer}</td>
          <td>#{item.serialNo}</td>
          <td className="text-center">
            <button className="btn btn-primary">
              <Link to={item.link} style={{ color: "white" }}>
                View
              </Link>
            </button>{" "}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ExpenseReportTablebody;
