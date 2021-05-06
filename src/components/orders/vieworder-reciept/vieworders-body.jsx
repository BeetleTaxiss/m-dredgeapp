import React from "react";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { functionUtils } from "../../../hooks/function-utils";
import { ReactComponent as DeleteIcon } from "../../../assets/deleteIcon.svg";

const ViewordersTableBody = ({ content }) => {
  const title = "Are you sure you want to Delete this order ?";
  const warningAlert = (title, id, ref) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        functionUtils.handleDeleteOrder(id, ref);
      }
    });
  };
  const warningCantDeleteAlert = (title) => {
    Swal.fire({
      icon: "warning",
      title: title,
      showConfirmButton: false,
    });
  };
  // console.log(content);
  return (
    <tbody>
      {content ? (
        content?.map((item, i) => (
          <tr
            key={item.id}
            role="row"
            className={`${item.dispatched === "1" ? "dispatched" : ""}`}
          >
            <td>{item.date_in}</td>
            <td>{item.truck_no}</td>
            <td>{functionUtils.addCommaToNumbers(item.qty)}</td>
            <td>₦{functionUtils.addCommaToNumbers(item.total_price)}</td>
            <td className="sorting_1">{item.qty}cm³</td>
            <td>{item.order_ref}</td>
            <td className="text-center">
              <DeleteIcon
                style={{ marginRight: "1.5rem", cursor: "pointer" }}
                onClick={() =>
                  item.dispatched === "1"
                    ? warningCantDeleteAlert(
                        "Order already dispatched, can't be deleted"
                      )
                    : warningAlert(title, item.id, item.order_ref)
                }
              />
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
        ))
      ) : (
        <>
          <Skeleton count={3} width={2000} height={40} />
          <Skeleton count={3} width={2000} height={40} />
          <Skeleton count={3} width={2000} height={40} />
          <Skeleton count={3} width={2000} height={40} />
          <Skeleton count={3} width={2000} height={40} />
        </>
      )}
    </tbody>
  );
};

export default ViewordersTableBody;
