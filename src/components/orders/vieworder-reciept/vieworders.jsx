import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../hooks/API";
import ViewordersTablehead from "./vieworders-tablehead";
import ViewordersTableBody from "./vieworders-body";
import ViewordersTablefooter from "./vieworders-tablefooter";
import ViewordersSearchbar from "./vieworders-searchbar";
import ViewordersTablepaiginaition from "./vieworders-tablepaiginaition";
import "./vieworders.scss";
import { errorAlert } from "../../../hooks/function-utils";
import { useGetUserDetails } from "../../../hooks/function-utils";
/**
 * Orders List Data object which is divided into table header, body and footer properties
 */
const viewOrdersData = {
  tableHeader: [
    {
      text: "Date",
      className: "sorting",
      ariaLabel: "Start date: activate to sort column ascending",
      // ariaSort: "descending",
      width: "81px",
    },
    {
      text: "Truck No",
      className: "sorting",
      ariaLabel: "Name: activate to sort column ascending",
      // ariaSort: "descending",
      width: "110px",
    },
    {
      text: "Order size",
      className: "sorting",
      ariaLabel: "Position: activate to sort column ascending",
      // ariaSort: "descending",
      width: "87px",
    },
    {
      text: "Order cost",
      className: "sorting",
      ariaLabel: "Office: activate to sort column ascending",
      // ariaSort: "descending",
      width: "78px",
    },
    {
      text: "Order Volume",
      className: "sorting_desc",
      ariaLabel: "Age: activate to sort column ascending",
      ariaSort: "descending",
      width: "31px",
    },

    {
      text: "Order Ref",
      className: "sorting",
      ariaLabel: "Salary: activate to sort column ascending",
      // ariaSort: "descending",
      width: "52px",
    },
    {
      text: "Action",
      className: "text-center dt-no-sorting sorting",
      ariaLabel: "Action: activate to sort column ascending",
      // ariaSort: "descending",
      width: "68px",
    },
  ],
  tableFooter: [
    "Date",
    "Truck No",
    "Order size",
    "Order cost",
    "Order Volume",
    "Order Ref",
  ],
};
const ViewOrders = () => {
  const [ordersList, setOrdersList] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () =>
      await axios
        .get(`${BASE_API_URL}/api/v1/order/list.php`)
        .then((res) => {
          if (res.data.error === true) {
            errorAlert("Server Error", res.data.message);
          } else {
            let data = res.data.data;
            data["userName"] = userName;
            data["userId"] = userId;
            setOrdersList(data);
            console.log("Item: ", ordersList, res.data.data);
          }
        })
        .catch((error) => {
          errorAlert("Network Error", error);
        });

    response();
    return () => {
      source.cancel();
    };
  }, [userName, userId]);
  return (
    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
      <div className="widget-content widget-content-area br-6">
        <div
          id="default-ordering_wrapper"
          className="dataTables_wrapper container-fluid dt-bootstrap4"
        >
          {/* BEGINNING OF VIEW ORDERS SEARCH BAR */}
          <ViewordersSearchbar />
          {/* END OF VIEW ORDERS SEARCH BAR */}
          <div className="table-responsive">
            <table
              id="default-ordering"
              className="table table-hover dataTable"
              style={{ width: "100%" }}
              role="grid"
              aria-describedby="default-ordering_info"
            >
              {/* BEGINNING OF VIEW ORDERS TABLE HEADER */}
              <ViewordersTablehead content={viewOrdersData.tableHeader} />
              {/* END OF VIEW ORDERS TABLE HEADER */}
              {/* BEGINNING OF VIEW ORDERS TABLE BODY */}
              <ViewordersTableBody content={ordersList} />
              {/* END OF VIEW ORDERS TABLE BODY */}
              {/* BEGINNING OF VIEW ORDERS TABLE FOOTER*/}
              <ViewordersTablefooter content={viewOrdersData.tableFooter} />
              {/* END OF VIEW ORDERS TABLE FOOTER*/}
            </table>
          </div>
          {/* BEGINNING OF VIEW ORDERS TABLE PAGINAITION*/}
          <ViewordersTablepaiginaition />
          {/* END OF VIEW ORDERS TABLE PAGINAITION*/}
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
