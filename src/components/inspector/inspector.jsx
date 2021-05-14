import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import FormModal from "../general/modal/form-modal";
import { functionUtils, useGetUserDetails } from "../../hooks/function-utils";
const Inspector = () => {
  const [bodyData, setBodyData] = useState(["loading"]);
  const [load, setLoad] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

  /**
   * use this state value to check when we have addeed or updated data and need to refresh
   * it work by concatenating  `true` to the array when we need to refresh
   * */
  const [refreshData, setRefreshData] = useState([]);

  /**
   *  an helper function to always refresh the page
   * */
  const reloadServerData = () => {
    /** refresh the page so we can newly added users */
    setRefreshData(refreshData.concat(true));
  };

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/order/dispatch-list.php`, {
        params: {
          loaded: "1",
          inspected: "0",
          cleared: "0",
        },
      })
      .then((res) => {
        let body = [];
        console.log("Table Body: ", res.data);
        res.data.data.map((item) => {
          const dispatchId = item.id;
          const orderId = item.order_id;
          const orderRef = item.order_ref;
          const product = item.product;
          const qty = item.qty;
          const total_price = item.total_price;
          const total_volume = item.total_volume;
          const truck_Number = item.truck_no;
          const dispatcherComment = item.dispatcher_comment;
          const loaderComment = item.loader_comment;
          console.log("Dispatcher comment: ", dispatcherComment);
          const loadingData = {
            "order-id": orderId,
            "order-ref": orderRef,
            "user-id": parseInt(userId),
            user: userName,
            comment: "",
          };
          const loadingDisplayData = {
            product: product,
            qty: qty,
            volume: total_volume,
            truckNo: truck_Number,
            price: total_price,
            loaderComment: loaderComment,
            dispatcherComment: dispatcherComment,
          };
          console.log("DISPATCH DATA: ", res.data);
          console.log(
            "Body Items: ",
            dispatchId,
            orderId,
            orderRef,
            product,
            qty,
            total_price,
            total_volume,
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
                item: functionUtils.addCommaToNumbers(qty),
              },
              {
                orderId: orderId,
                class: "text-left",
                itemClass: "text-left",
                item: functionUtils.addCommaToNumbers(total_price),
              },
              {
                orderId: orderId,
                class: "text-left",
                itemClass: "text-left",
                item: total_volume,
                // item: functionUtils.addCommaToNumbers(total_volume),
              },
              {
                orderId: orderId,
                load: loadingData,
                loadDisplay: loadingDisplayData,
                class: "text-center",
                itemClass: "btn btn-primary",
                link: setShowModal,
                linkText: "Inspect Order",
              },
            ],
          };
          console.log("Current Dispatch: ", currentDispatch);
          return (body = body.concat(currentDispatch));
        });
        setBodyData(body);
        console.log("BODY ARRAY: ", body);
        console.log("BODY Data: ", bodyData);
      });
  }, [bodyData, userName, userId, refreshData]);

  const loaderListData = {
    tableTitle: "Inspection List",
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
  console.log("List Data: ", loaderListData);
  const formData = [
    {
      id: "comment",
      type: "textarea",
      name: "comment",
      holder: "Comment if necessary",
      className: "form-control",
      required: false,
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
  const InspectOrder = () => {
    const comment = document.getElementById("comment").value;
    load.comment = comment;
    console.log("COMMENT: ", comment);
    console.log("Load DATA: ", load);

    axios.put(`${BASE_API_URL}/api/v1/order/inspect.php`, load).then((res) => {
      console.log("LOAD API RESPONSE: ", res.data);
      if (res.data.error) {
        const title = "Inspection failed",
          message = res.data.message;
        errorAlert(title, message);
      } else {
        document.getElementById("loading-btn").disabled = true;
        const title = "Inspection Successful",
          message = res.data.message,
          link = "<a href='/inspect'>View Inspection List</a>";
        successAlert(title, message, link);
        setShowModal(false);
        reloadServerData();
      }
    });
  };

  return (
    <>
      <CustomTableList setLoad={setLoad} content={loaderListData} />
      <FormModal
        formData={formData}
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={InspectOrder}
        Btntext="Inspection Completed"
        // noClickOutside
        // closeBtn
        listItems
        cols={5}
        rows={3}
      />
    </>
  );
};

export default Inspector;
