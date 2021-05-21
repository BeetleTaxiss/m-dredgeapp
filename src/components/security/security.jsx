import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import FormModal from "../general/modal/form-modal";
import { functionUtils, useGetUserDetails } from "../../hooks/function-utils";
const Security = () => {
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
            const inspectorComment = item.inspector_comment;

            const loadingData = {
              "order-id": orderId,
              "order-ref": orderRef,
              "user-id": parseInt(userId),
              user: userName,
            };
            const loadingDisplayData = {
              product: product,
              qty: qty,
              volume: total_volume,
              truckNo: truck_Number,
              price: total_price,
              inspectorComment: inspectorComment,
              dispatcherComment: dispatcherComment,
              loaderComment: loaderComment,
            };

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
                  item: truck_Number,
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
                  linkText: "Clear Order",
                },
              ],
            };

            return (body = body.concat(currentDispatch));
          });
          setBodyData(body);
        }),
    [bodyData, userName, userId, refreshData]
  );

  const loaderListData = {
    tableTitle: "Clearance List",
    header: [
      { class: "", title: "Product" },
      { class: "", title: "Truck No" },
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
    axios
      .post(`${BASE_API_URL}/api/v1/order/clear.php`, load)
      .then((res) => {
        if (res.data.error) {
          const title = "Clearance failed",
            message = res.data.message;
          errorAlert(title, message);
          setLoading(false);
        } else {
          document.getElementById("loading-btn").disabled = true;
          const title = "Clearance Successful",
            message = res.data.message,
            link = "<a href='/security'>View Clearance List</a>";
          successAlert(title, message, link);
          setShowModal(false);
          reloadServerData();
          setLoading(false);
          if (document.getElementById("span-comment-dispatcher") !== null) {
            document.getElementById(
              "span-comment-dispatcher"
            ).innerHTML = `Dispatcher comment: No comment from dispatcher`;
          }

          if (document.getElementById("span-comment-dispatcher") !== null) {
            document.getElementById(
              "span-comment-loader"
            ).innerHTML = `Loader comment: No comment from loader`;
          }

          if (document.getElementById("span-comment-inspector") !== null) {
            document.getElementById(
              "span-comment-loader"
            ).innerHTML = `Inspector comment: No comment from inspector`;
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
      });
  };

  return (
    <>
      <CustomTableList
        setLoad={setLoad}
        content={loaderListData}
        filler="No order to clear"
      />
      <FormModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={() => {
          setLoading(true);
          clearOrder();
        }}
        Btntext="Clearance Finished"
        // noClickOutside
        // closeBtn
        listItems
        cols={5}
        rows={3}
      />
    </>
  );
};

export default Security;
