import React from "react";
import { expenseReportData } from "./single-expense-report-data";

const SingleExpenseReportBody = () => {
  const { body } = expenseReportData;
  return (
    <div className="inv--product-table-section">
      <div className="table-responsive">
        <table className="table">
          <thead className="">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Expenses</th>
              <th className="text-right" scope="col">
                Description
              </th>
              <th className="text-right" scope="col">
                Date
              </th>
              <th className="text-right" scope="col">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {body.map((item) => (
              <tr key={item.sn}>
                <td>{item.sn}</td>
                <td>{item.product}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">₦{item.price}</td>
                <td className="text-right">₦{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleExpenseReportBody;
