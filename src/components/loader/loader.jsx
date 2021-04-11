import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import FormModal from "../general/modal/form-modal";
const Loader = () => {
  const [bodyData, setBodyData] = useState(null);
  const [load, setLoad] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(
    () =>
      axios
        .get(`${BASE_API_URL}/api/v1/order/dispatch-list.php`, { loaded: "0" })
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
            const userDetails = JSON.parse(localStorage.getItem("user"));
            const userId = userDetails.id;
            const comment = "";
            const loadingData = {
              "order-id": orderId,
              "order-ref": orderRef,
              "user-id": userId,
              comment: comment,
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
              comment,
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
                  class: "text-center",
                  itemClass: "btn btn-primary",
                  link: setShowModal,
                  linkText: "Process Order",
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
    tableTitle: "Loading List",
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
  const formData = [
    {
      id: "comment",
      type: "textarea",
      name: "comment",
      holder: "Order Cost",
      className: "form-control",
      required: true,
    },
  ];

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
  // const handleChange = () => {
  //   const comment = document.getElementById("comment").value;
  //   console.log("TextArea: ", comment);
  // };
  // Load Prompter/ Popup
  const loadOrder = () => {
    const comment = document.getElementById("comment").value;
    load.comment = comment;
    console.log("COMMENT: ", comment);
    console.log("Load DATA: ", load);

    axios.put(`${BASE_API_URL}/api/v1/order/load.php`, load).then((res) => {
      console.log("LOAD API RESPONSE: ", res.data);
      if (res.data.error) {
        const title = "Order Loading failed",
          message = res.data.message;
        errorAlert(title, message);
      } else {
        document.getElementById("loading-btn").disabled = true;
        const title = "Loaded Successfully",
          message = res.data.message,
          link = "<a href='/loader'>View Loading List</a>";
        successAlert(title, message, link);
        setShowModal(false);
      }
    });
  };

  return (
    <>
      <CustomTableList setLoad={setLoad} content={loaderListData} />
      <FormModal
        formTitle="Update Your Order"
        formSubtitle="Gave the wrong details? Change them below"
        formData={formData}
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={loadOrder}
        Btntext="Load Order"
        noClickOutside
        closeBtn
      />
    </>
  );
};

export default Loader;
