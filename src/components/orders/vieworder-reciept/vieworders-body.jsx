import React from "react";
import { Link } from "react-router-dom";
import { functionUtils } from "../../../hooks/function-utils";

const ViewordersTableBody = ({ content }) => {
  // console.log(content);
  return (
    <tbody>
      {content?.map((item, i) => (
        <tr key={item.id} role="row">
          <td>{item.date_in}</td>
          <td>{item.truck_no}</td>
          <td>{item.qty}</td>
          <td>₦{item.total_price}</td>
          <td className="sorting_1">{item.qty}cm³</td>
          <td>{item.order_ref}</td>
          <td className="text-center">
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
              className="feather feather-edit-2 edit"
              style={{ marginRight: "1rem" }}
              onClick={() =>
                functionUtils.handleDeleteOrder(item.id, item.order_ref)
              }
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            <button className="btn btn-primary">
              <Link
                to={{
                  pathname: "/orderreceipt",
                  state: item, // your data of arrays or objects
                }}
                style={{ color: "white" }}
              >
                View
              </Link>
            </button>{" "}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ViewordersTableBody;
