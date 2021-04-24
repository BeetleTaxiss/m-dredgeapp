import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import FormModal from "../general/modal/form-modal";
const Security = () => {
  const [bodyData, setBodyData] = useState(null);
  const [load, setLoad] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(
    () =>
      axios
        .get(`${BASE_API_URL}/api/v1/order/dispatch-list.php`, {
          params: {
            loaded: "1",
            inspected: "1",
            cleared: "0",
          },
        })
        .then((res) => {
          let body = [];
          console.log("Table Body: ", res.data.data);
          res.data.data.map((item) => {
            const dispatchId = item.id;
            const orderId = item.order_id;
            const orderRef = item.order_ref;
            const product = item.product;
            const qty = item.qty;
            const total_price = item.total_price;
            const total_volume = item.total_volume;
            const truck_Number = item.truck_no;
            const userDetails = JSON.parse(localStorage.getItem("user"));
            const userId = userDetails.id;
            const userName = userDetails.username;
            const inspectorComment = item.inspector_comment;

            const loadingData = {
              "order-id": orderId,
              "order-ref": orderRef,
              "user-id": userId,
              user: userName,
            };
            const loadingDisplayData = {
              product: product,
              qty: qty,
              volume: total_volume,
              truckNo: truck_Number,
              price: total_price,
              inspectorComment: inspectorComment,
            };
            console.log(
              "Body Items: ",
              dispatchId,
              orderId,
              orderRef,
              product,
              qty,
              total_price,
              total_volume,
              userDetails,
              userId,
              "Load Data: ",
              loadingData
            );
            const currentDispatch = {
              id: dispatchId,
              fields: [
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-left",
                  item: product,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-left",
                  item: orderRef,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-left",
                  item: qty,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-left",
                  item: total_price,
                },
                {
                  orderId: orderId,
                  class: "text-left",
                  itemClass: "text-left",
                  item: total_volume,
                },
                {
                  orderId: orderId,
                  load: loadingData,
                  loadDisplay: loadingDisplayData,
                  class: "text-center",
                  itemClass: "btn btn-primary",
                  link: setShowModal,
                  linkText: "Clear Order",
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

  const loaderListData = {
    tableTitle: "Clearance List",
    header: [
      { class: "", title: "Product" },
      { class: "", title: "Order Ref" },
      { class: "", title: "Quantity" },
      { class: "", title: "Price" },
      { class: "", title: "Volume" },
      { class: "text-center", title: "Status" },
    ],

    body: bodyData,
  };

  const successAlert = (title, text, link) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      footer: link,
      showConfirmButton: false,
    });
  };
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  // Load Prompter/ Popup
  const clearOrder = () => {
    console.log("Load DATA: ", load);

    axios.put(`${BASE_API_URL}/api/v1/order/clear.php`, load).then((res) => {
      console.log("LOAD API RESPONSE: ", res.data);
      if (res.data.error) {
        const title = "Clearance failed",
          message = res.data.message;
        errorAlert(title, message);
      } else {
        document.getElementById("loading-btn").disabled = true;
        const title = "Clearance Successful",
          message = res.data.message,
          link = "<a href='/security'>View Clearance List</a>";
        successAlert(title, message, link);
        setShowModal(false);
      }
    });
  };

  return (
    <>
      <CustomTableList setLoad={setLoad} content={loaderListData} />
      <FormModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={clearOrder}
        Btntext="Clearance Finished"
        // noClickOutside
        closeBtn
        listItems
        cols={5}
        rows={3}
      />
    </>
  );
};

export default Security;
