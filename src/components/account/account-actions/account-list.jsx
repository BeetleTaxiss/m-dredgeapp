import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import UpdateAccountForm from "../../fuel-issues/add-Fuel-Form";
import WidgetHeader from "../../general/widget-header";
import {
  functionUtils,
  useGetUserDetails,
} from "../../../hooks/function-utils";

const AccountList = () => {
  const [accountList, setAccountList] = useState(["loading"]);
  const [chartList, setChartList] = useState();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

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
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** Account list to be appended to */
        let accountListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/account/account-list.php`)
          .then((res) => {
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const accountItems = res.data.data;
              accountItems.map((item) => {
                /** Get required response data values */
                const account_name = item.account;
                const account_id = item.id;
                const chart_id = item.chart_id;
                const description = item.description;

                const updateData = {
                  account_name: account_name,
                  account_id: account_id,
                  description: item.description,
                };

                const currentAccountItem = {
                  id: account_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: chart_id,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: account_name,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: description,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      editScroll: true,
                      scrollLocation: "update-form",
                      onClick: () => {
                        setShowUpdateForm(true);
                        setTimeout(() => handleUpdateForm(updateData), 500);
                      },
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      delete: true,
                      onClick: () => {
                        warningAlert(
                          `Are you sure you want to delete this account: ${account_name}`,
                          account_id,
                          userName,
                          userId
                        );
                      },
                    },
                  ],
                };

                return (accountListBody =
                  accountListBody.concat(currentAccountItem));
              });
              setAccountList(accountListBody);
            }
          })
          .catch((error) => {
            let title = "Network Error",
              text = error;
            errorAlert(title, text);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Axios error: ", error);
        } else {
          throw error;
        }
      }
    };

    response();
    return () => {
      source.cancel();
    };
  }, [userName, userId, showUpdateForm, refreshData]);

  /**
   * Chart API call for the select dropdown
   *  */
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
  const warningAlert = (title, account_id, userName, userId) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        handleDeleteAccount(account_id, userName, userId);
      }
    });
  };
  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

  const handleUpdateAccount = (userName, userId) => {
    const account = document.getElementById("account-name").value;
    const account_id = document.getElementById("account-id").value;
    const description = document.getElementById("account-description").value;
    const chartValue = parseInt(document.getElementById("chart-id").value);
    const chartItem = chartList.filter(({ id }) => id === chartValue);

    const updateAccountData = {
      user: userName,
      "user-id": userId,
      "account-id": account_id,
      account: account,
      "chart-id": chartValue,
      description: description,
    };

    axios
      .post(
        `${BASE_API_URL}/api/v1/account/account-update.php`,
        updateAccountData
      )
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Account updated Successfully",
            text = res.data.message,
            link = `<a href="/accountlist">View Account List</a>`;
          successAlert(title, text, link);
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  };

  /** Get update form data for client validation  */
  const getUpdateBusinessAccountFormData = (userName, userId) => {
    const account = document.getElementById("account-name").value;
    const account_id = document.getElementById("account-id").value;
    const description = document.getElementById("account-description").value;
    const chartValue = parseInt(document.getElementById("chart-id").value);
    const chartItem = chartList.filter(({ id }) => id === chartValue);

    const updateAccountData = {
      user: userName,
      "user-id": userId,
      "account-id": account_id,
      account: account,
      "chart-id": chartValue,
      description: description,
      validation: chartItem[0].validation,
    };

    return updateAccountData;
  };
  const handleDeleteAccount = (id, userName, userId) => {
    axios
      .post(`${BASE_API_URL}/api/v1/account/account-delete.php`, {
        user: userName,
        "user-id": userId,
        "account-id": id,
      })
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Account deleted Successfully",
            text = res.data.message,
            link = `<a href="/accountlist">View Account List</a>`;
          successAlert(title, text, link);
          reloadServerData();
        }
      });
  };

  const handleUpdateForm = (updateData) => {
    if (document.getElementById("account-id") !== null) {
      document.getElementById("account-id").value = updateData.account_id;
      document.getElementById("account-name").value = updateData.account_name;
      document.getElementById("account-description").value =
        updateData.description;
    }
  };

  /** Account List Table Data */
  const accountListTableData = {
    tableTitle: "Account List",
    header: [
      { class: "", title: "Chart Id" },
      { class: "", title: "Account" },
      { class: "", title: "Description" },
      { class: "", title: "" },
      { class: "", title: "" },
    ],

    body: accountList,
  };
  const updateAccountFormData = [
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
      id: "account-id",
      type: "text",
      name: "account-id",
      holder: "Account ID",
      className: "form-control",
      hidden: true,
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

  /** Account list component display */
  const AccountListComponent = () => (
    <div id="basic" className="col-lg-12 layout-spacing">
      <Element className="update-form" id="update-form" />
      <div className="statbox widget box box-shadow">
        {/* HEADER TITLE FOR THE FORM */}

        {showUpdateForm && <WidgetHeader title="Update account" />}
        <div
          className="widget-content widget-content-area searchable-container list"
          style={{ display: "grid", padding: "2rem", gap: "2rem" }}
        >
          {showUpdateForm && (
            <UpdateAccountForm
              content={updateAccountFormData}
              // loading={loading}
              setShowUpdateForm={() => setShowUpdateForm(false)}
              subtitle="Update account information"
              btnText="Update account"
              handleAddSubmit={() => {
                let validationStatus = functionUtils.validateFormInputs(
                  getUpdateBusinessAccountFormData(userName, userId)
                );

                if (validationStatus === true) {
                  handleUpdateAccount(userName, userId);
                }
              }}
            />
          )}
          <CustomTableList
            content={accountListTableData}
            filler="No business accounts added"
          />
        </div>
      </div>
    </div>
  );
  return <AccountListComponent />;
};

export default AccountList;
