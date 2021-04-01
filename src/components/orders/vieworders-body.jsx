import React from "react";
import { Link } from "react-router-dom";

const ViewordersTableBody = ({ content }) => {
  return (
    <tbody>
      {content.map((item, i) => (
        <tr key={i} role="row">
          <td>{item.truckNo}</td>
          <td>{item.orderSize}</td>
          <td>₦{item.orderCost}</td>
          <td className="sorting_1">{item.orderVolume}cm³</td>
          <td>{item.Date}</td>
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

export default ViewordersTableBody;
