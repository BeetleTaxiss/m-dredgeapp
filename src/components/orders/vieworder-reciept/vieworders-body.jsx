import React from "react";
import { Link } from "react-router-dom";

const ViewordersTableBody = ({ content }) => {
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
