import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import FormModal from "../general/modal/form-modal";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
const Inspector = () => {
  const [bodyData, setBodyData] = useState(["loading"]);
  const [load, setLoad] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["d", "7", "s", "w"];

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(
    setUserName,
    setUserId,
    ...optionalParams,
    setUserPermissions
  );

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

  /**
   * Fetch Product list from database and validate per user
   */
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/product/list.php`)
      .then((res) => {
        if (res.data.error) {
          errorAlert("Server Error Response", res.data.message);
        } else {
          let data = res.data.data;
          /**
           * Validated product data that is derived from a user's product permisssion
           */
          let validatedProductData;

          /**
           * This block ensures the validateProductLocationPermission utility is run when the user permission state hasn't be updated with actual data
           */
          if (userPermissions !== undefined || userPermissions !== null) {
            /**
             * utility function takes in a users permission and the product list from the database and validates what product permission the user has
             */
            validatedProductData = validateProductLocationPermission(
              userPermissions?.productPermissions,
              data
            );

            /**
             * Set the validated product to state to make it globally accessiable
             */
            const tableDropdown = productDropdownForTable(
              validatedProductData,
              setProductId
            );

            setUserProductPermission(tableDropdown);
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, [userPermissions, productId]);

  /**
   * Fetch dispatch list from DB
   */

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      await axios
        .get(`${BASE_API_URL}/api/v1/order/dispatch-list.php`, {
          params: {
            loaded: "1",
            inspected: "0",
            cleared: "0",
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
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

            return (body = body.concat(currentDispatch));
          });
          setBodyData(body);
        })
        .catch((error) => {
          errorAlert("Network Error", error);
        });
    };

    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [bodyData, userName, userId, userProductPermission, refreshData]);

  const loaderListData = {
    tableTitle: "Inspection List",
    links: userProductPermission,
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

    axios
      .post(`${BASE_API_URL}/api/v1/order/inspect.php`, load)
      .then((res) => {
        if (res.data.error) {
          const title = "Inspection failed",
            message = res.data.message;
          errorAlert(title, message);
          setLoading(false);
        } else {
          document.getElementById("loading-btn").disabled = true;
          const title = "Inspection Successful",
            message = res.data.message,
            link = "<a href='/inspect'>View Inspection List</a>";
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
        filler="No orders to inspect"
        dropdown
        change
      />
      <FormModal
        formData={formData}
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={() => {
          setLoading(true);
          InspectOrder();
        }}
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
