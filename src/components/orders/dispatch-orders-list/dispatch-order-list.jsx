import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";

const DispatchOrderList = () => {
  const [bodyData, setBodyData] = useState(["loading"]);
  useEffect(
    () =>
      axios
        .get(`${BASE_API_URL}/api/v1/order/dispatch-list.php`)
        .then((res) => {
          let body = [];
          console.log("Table Body: ", res.data.data);
          res.data.data.map((item) => {
            const dispatchId = item.id;
            const orderId = item.order_id;
            const orderRef = item.order_ref;
            const date = item.date_in;
            const time = item.time_in;
            const product = item.product;
            const loaded = item.loaded;
            const inspected = item.inspected;
            const cleared = item.security;
            const processing = item.processing;
            console.log(
              "Body Items: ",
              dispatchId,
              orderId,
              orderRef,
              product,
              loaded,
              inspected,
              cleared,
              processing
            );
            const currentDispatch = {
              id: dispatchId,
              fields: [
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: date,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: time,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: product,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-center",
                  item: orderRef,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass:
                    processing === "1"
                      ? "shadow-none badge badge-secondary"
                      : loaded === "0"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-primary",
                  item:
                    processing === "1"
                      ? "processing"
                      : loaded === "0"
                      ? "pending"
                      : "Loaded",
                  loaded: loaded,
                  processing: processing,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass:
                    inspected === "0"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-primary",
                  item: inspected === "0" ? "pending" : "Inspected",
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass:
                    cleared === "0"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-primary",
                  item: cleared === "0" ? "pending" : "Cleared",
                },
                {
                  orderId: orderId,
                  class: "text-center",
                  itemClass:
                    loaded && inspected && cleared === "0"
                      ? "shadow-none badge badge-warning"
                      : loaded && inspected === "0" && cleared === "1"
                      ? "shadow-none badge badge-warning"
                      : inspected && cleared === "0" && loaded === "1"
                      ? "shadow-none badge badge-warning"
                      : loaded && cleared === "0" && inspected === "1"
                      ? "shadow-none badge badge-warning"
                      : "shadow-none badge badge-success",
                  item:
                    loaded && inspected && cleared === "0"
                      ? "Not Completed"
                      : loaded && inspected === "0" && cleared === "1"
                      ? "Not Completed"
                      : inspected && cleared === "0" && loaded === "1"
                      ? "Not Completed"
                      : loaded && cleared === "0" && inspected === "1"
                      ? "Not Completed"
                      : "Completed",
                },
              ],
            };
            console.log("Current Dispatch: ", currentDispatch);
            return (body = body.concat(currentDispatch));
          });
          setBodyData(body);
          console.log("BODY ARRAY: ", body);
        }),
    [bodyData]
  );

  const dispatchListData = {
    tableTitle: "Clearance List",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Time" },
      { class: "", title: "Product" },
      { class: "", title: "Order Ref" },
      { class: "", title: "Loaded" },
      { class: "", title: "Inspected" },
      { class: "", title: "Cleared" },
      { class: "text-center", title: "Status" },
    ],

    body: bodyData,
  };
  return (
    <>
      <CustomTableList
        content={dispatchListData}
        filler="No dispatched orders, check back soon! "
      />
    </>
  );
};

export default DispatchOrderList;
