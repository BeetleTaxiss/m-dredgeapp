import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../../general/widget-header";
import { BASE_API_URL } from "../../../hooks/API";
import AddAccountForm from "../../fuel-issues/add-Fuel-Form";
import { functionUtils } from "../../../hooks/function-utils";

const AddAccount = () => {
  const [chartList, setChartList] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let chartListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/account/chart-list.php`)
          .then((res) => {
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
                description: "Select a chart Type",
                validation: "Can't select this option",
              });
              setChartList(chartListBody);
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

  const handleAddAccount = () => {
    const account = document.getElementById("account-name").value;
    const description = document.getElementById("account-description").value;
    const chartValue = parseInt(document.getElementById("chart-id").value);
    const chartItem = chartList.filter(({ id }) => id === chartValue);

    const addAccountData = {
      account: account,
      "chart-id": chartValue,
      description: description,
    };
    axios
      .post(`${BASE_API_URL}/api/v1/account/account-add.php`, addAccountData)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          let title = "Account created Successfully",
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

  /** Retrive add account form data for client validation */

  const getAddAccountFormData = () => {
    const account = document.getElementById("account-name").value;
    const description = document.getElementById("account-description").value;
    const chartValue = parseInt(document.getElementById("chart-id").value);

    if (chartList === undefined || chartList === null) {
      errorAlert("Network Error", "Refresh Page");
    } else {
      const chartItem = chartList?.filter(({ id }) => id === chartValue);

      const addAccountData = {
        account: account,
        "chart-id": chartValue,
        description: description,
        validation: chartItem[0].validation,
      };

      return addAccountData;
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
  const addAccountFormData = [
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
      id: "account-name",
      type: "text",
      name: "account",
      holder: "Account Name",
      className: "form-control",
      required: true,
    },
    {
      id: "account-description",
      type: "text",
      name: "description",
      holder: "Account description",
      className: "form-control",
      required: true,
    },
  ];

  /** Machine Component */
  const AddAccountComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Add new account" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <AddAccountForm
              content={addAccountFormData}
              loading={loading}
              subtitle="Add new account information"
              btnText="Add account"
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getAddAccountFormData()
                );
                if (validation === true) {
                  setLoading(true);
                  handleAddAccount();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  return <AddAccountComponent />;
};
export default AddAccount;
