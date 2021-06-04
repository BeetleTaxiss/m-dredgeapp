import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../../general/widget-header";
import { BASE_API_URL } from "../../../hooks/API";
import PostAccountForm from "../../fuel-issues/add-Fuel-Form";
import {
  functionUtils,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../../hooks/function-utils";

const PostAccount = () => {
  const [creditAccount, setCreditAccount] = useState();
  const [debitAccount, setDebitAccount] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [userPermissions, setUserPermissions] = useState();

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
   *  Update username, user id and loading state values for functions which need their values to run effectively
   */
  useEffect(() => {}, [userName, userId, loading]);

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
             * "Select Product" option is added to product list to set it as the initial option a user views
             */
            validatedProductData?.unshift({
              id: "0",
              product: "Select Product",
              price: 0,
              validation: "Can't select this option",
            });

            /**
             * Set the data to state for the product dropdown
             */
            setProducts(validatedProductData);
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, [userPermissions]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let creditAccountBody = [];
      let debitAccountBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/account/account-list.php`)
          .then((res) => {
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const postAccountItems = res.data.data;
              postAccountItems.map((item) => {
                const account_id = parseInt(item.id),
                  account = item.account,
                  chart_id = item.chart_id;

                const currentPostAccountItem = {
                  id: account_id,
                  account: account,
                  "chart-id": chart_id,
                };

                return (
                  (creditAccountBody = creditAccountBody.concat(
                    currentPostAccountItem
                  )),
                  (debitAccountBody = debitAccountBody.concat(
                    currentPostAccountItem
                  ))
                );
              });
              debitAccountBody.unshift({
                id: 0,
                account: "Select an account to debit",
                validation: "Can't select this option",
              });
              setDebitAccount(debitAccountBody);

              creditAccountBody.unshift({
                id: 0,
                account: "Select an account to credit",
                validation: "Can't select this option",
              });
              setCreditAccount(creditAccountBody);
            }
          })
          .catch((error) => {
            console.log("API error: ", error);
            let title = "Network Error",
              text = error;
            errorAlert(title, text);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Axios Error: ", error);
        } else {
          throw error;
        }
      }
    };

    response();

    return () => {
      source.cancel();
    };
  }, []);

  const handlePostAccount = (userName, userId) => {
    const amount = document.getElementById("amount").value;
    const narration = document.getElementById("narration").value;
    const debitValue = parseInt(document.getElementById("debit-id").value);
    const creditValue = parseInt(document.getElementById("credit-id").value);
    const productId = parseInt(document.getElementById("product-id").value);

    const debitItem = debitAccount.filter(({ id }) => id === debitValue),
      creditItem = creditAccount.filter(({ id }) => id === creditValue),
      credit_account = creditItem[0].account,
      chart_id = creditItem[0]["chart-id"],
      debit_account = debitItem[0].account;

    const postAccountData = {
      user: userName,
      "user-id": userId,
      "chart-id": chart_id,
      "credit-account": credit_account,
      "debit-account": debit_account,
      "credit-account-id": creditValue,
      "debit-account-id": debitValue,
      narration: narration,
      amount: amount,
      "product-id": productId,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/account/account-post.php`, postAccountData)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          let title = "Transaction Posted Successfully",
            text = res.data.message,
            link = `<a href="/accountlist">View Account List</a>`;
          successAlert(title, text, link);
          setLoading(false);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  };

  /** Retrive post account form data for client validation */
  const getPostAccountFormData = (userName, userId) => {
    const amount = document.getElementById("amount").value;
    const narration = document.getElementById("narration").value;
    const debitValue = parseInt(document.getElementById("debit-id").value);
    const creditValue = parseInt(document.getElementById("credit-id").value);
    const productId = parseInt(document.getElementById("product-id").value);

    const debitItem = debitAccount?.filter(({ id }) => id === debitValue),
      creditItem = creditAccount?.filter(({ id }) => id === creditValue),
      productItem = products?.filter(({ id }) => id == productId);

    if (
      creditAccount === null ||
      creditAccount === undefined ||
      debitAccount === null ||
      debitAccount === undefined ||
      products === null ||
      products === undefined ||
      creditAccount[0] === undefined ||
      debitAccount[0] === undefined ||
      products[0] === undefined
    ) {
      errorAlert("Network Error", "Refresh Page");
    } else {
      const credit_account = creditItem[0].account,
        chart_id = creditItem[0]["chart-id"],
        debit_account = debitItem[0].account;

      const postAccountData = {
        user: userName,
        "user-id": userId,
        "product-id": productId,
        "chart-id": chart_id,
        "credit-account": credit_account,
        "debit-account": debit_account,
        "credit-account-id": creditValue,
        "debit-account-id": debitValue,
        narration: narration,
        amount: amount,
        validation:
          debitItem[0].validation ||
          creditItem[0].validation ||
          productItem[0].validation,
      };
      return postAccountData;
    }
  };

  /** Multipurpose success, error and warning pop-ups for handling and displaying errors, success and warning alerts */
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
  const postAccountFormData = [
    {
      id: "product-id",
      type: "select",
      name: "product",
      className: "form-control",
      options: products,
      required: true,
    },
    {
      id: "narration",
      type: "text",
      name: "narration",
      holder: "Transaction narration",
      className: "form-control",
      required: true,
    },
    {
      id: "credit-id",
      type: "select",
      name: "account",
      holder: "",
      className: "form-control",
      options: creditAccount,
      required: true,
    },
    {
      id: "debit-id",
      type: "select",
      name: "account",
      holder: "",
      className: "form-control",
      options: debitAccount,
      required: true,
    },
    {
      id: "amount",
      type: "text",
      name: "amount",
      holder: "Amount to post",
      className: "form-control",
      required: true,
    },
  ];

  /** Machine Component */
  const PostAccountComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Add new expenses" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <PostAccountForm
              content={postAccountFormData}
              loading={loading}
              subtitle="Post expense information"
              btnText="Post Transaction"
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getPostAccountFormData(userName, userId)
                );
                if (validation === true) {
                  setLoading(true);
                  handlePostAccount(userName, userId);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  return <PostAccountComponent />;
};
export default PostAccount;
