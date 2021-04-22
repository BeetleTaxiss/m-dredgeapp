import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../../general/widget-header";
import { BASE_API_URL } from "../../../hooks/API";
import PostAccountForm from "../../fuel-issues/add-Fuel-Form";

const PostAccount = () => {
  const [chartList, setChartList] = useState();
  const [accountTypes, setAccountTypes] = useState();
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let chartListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/account/chart-list.php`)
          .then((res) => {
            console.log("Chart list response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const chartListItems = res.data.data;
              chartListItems.map((item) => {
                const account_id = parseInt(item.id),
                  account_type = item.account_type,
                  statement = item.statement,
                  statement_id = item.statement_id,
                  description = item.description;

                const currentChartItem = {
                  id: account_id,
                  description: description,
                  account_type: account_type,
                  statement: statement,
                  statement_id: statement_id,
                };

                return (chartListBody = chartListBody.concat(currentChartItem));
              });
              chartListBody.unshift({
                id: 0,
                account_type: "Select a chart Type",
              });
              setChartList(chartListBody);
              console.log("Chart List Body: ", chartList);
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
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let postAccountBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/account/account-types.php`)
          .then((res) => {
            console.log("Post Account response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const postAccountItems = res.data.data;
              postAccountItems.map((item) => {
                const account_id = parseInt(item.id),
                  account_type = item.account_type;

                const currentPostAccountItem = {
                  id: account_id,
                  account_type: account_type,
                };

                return (postAccountBody = postAccountBody.concat(
                  currentPostAccountItem
                ));
              });
              postAccountBody.unshift({
                id: 0,
                account_type: "Select an account type",
              });
              setAccountTypes(postAccountBody);
              console.log("Account Post Body: ", accountTypes);
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

  const handlePostAccount = () => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    const amount = document.getElementById("amount").value;
    const narration = document.getElementById("narration").value;
    const chartValue = parseInt(document.getElementById("chart-id").value);
    const accountValue = parseInt(
      document.getElementById("account-type").value
    );
    const chartItem = chartList.filter(({ id }) => id === chartValue),
      credit_debit_id = accountTypes.filter(({ id }) => id === accountValue),
      credit_account = credit_debit_id[0].credit_account,
      debit_account = credit_debit_id[0].debit_account;

    console.log("chart item: ", chartItem);
    const postAccountData = {
      user: user_name,
      "user-id": user_id,
      "chart-id": chartValue,
      "credit-account": credit_account,
      "debit-account": debit_account,
      "credit-account-id": credit_debit_id,
      "debit-account-id": credit_debit_id,
      narration: narration,
      amount: amount,
    };
    console.log("Chart API values: ", postAccountData);
    axios
      .post(`${BASE_API_URL}/api/v1/account/account-post.php`, postAccountData)
      .then((res) => {
        console.log("Add account response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Expenses Posted Successfully",
            text = res.data.message,
            link = `<a href="/accountlist">View Account List</a>`;
          successAlert(title, text, link);
        }
      });
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
      id: "chart-id",
      type: "select",
      name: "chart",
      holder: "",
      className: "form-control",
      options: chartList,
      required: true,
    },
    {
      id: "account-type",
      type: "select",
      name: "account-type",
      holder: "",
      className: "form-control",
      options: accountTypes,
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
    {
      id: "narration",
      type: "textarea",
      name: "narration",
      holder: "Transaction narration",
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
              // loading={loading}
              subtitle="Post expense information"
              btnText="Post Expense"
              handleAddSubmit={() => handlePostAccount()}
            />
          </div>
        </div>
      </div>
    );
  };
  return <PostAccountComponent />;
};
export default PostAccount;
