import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import UpdateAccountForm from "../../fuel-issues/add-Fuel-Form";
import WidgetHeader from "../../general/widget-header";

const ChartList = () => {
  const [chartList, setChartList] = useState(["loading"]);
  const [statementTypes, setStatementTypes] = useState();
  const [accountTypes, setAccountTypes] = useState();
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** Account list to be appended to */
        let chartListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/account/chart-list.php`)
          .then((res) => {
            console.log("Chart List data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const chartItems = res.data.data;
              chartItems.map((item) => {
                /** Get required response data values */
                const chart_id = parseInt(item.id),
                  account_type = item.account_type,
                  statement = item.statement,
                  statement_id = item.statement_id,
                  description = item.description;

                const currentAccountItem = {
                  id: chart_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: account_type,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: statement,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: description,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      delete: true,
                      onClick: () => {
                        warningAlert(
                          `Are you sure you want to delete this account: ${statement}`,
                          chart_id
                        );
                      },
                    },
                  ],
                };

                return (chartListBody = chartListBody.concat(
                  currentAccountItem
                ));
              });
              setChartList(chartListBody);
              console.log("Account Sand List Body: ", chartList);
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
  }, []);

  /**
   * Account types API call for the select dropdown
   *  */
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let accountTypeBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/account/account-types.php`)
          .then((res) => {
            console.log("Account types response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const accountTypeItems = res.data.data;
              accountTypeItems.map((item) => {
                const account_id = parseInt(item.id),
                  account_type = item.account_type,
                  description = item.account_type;

                const currentAccountTypeItem = {
                  id: account_id,
                  description: description,
                  account_type: account_type,
                };

                return (accountTypeBody = accountTypeBody.concat(
                  currentAccountTypeItem
                ));
              });
              accountTypeBody.unshift({
                id: 0,
                description: "Select an account type",
              });
              setAccountTypes(accountTypeBody);
              console.log("Account types Body: ", accountTypes);
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
  /**
   * Statement List API call for the select dropdown
   *  */
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let statementTypeBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/account/account-statement-types.php`)
          .then((res) => {
            console.log("Statement types response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const statementTypeItems = res.data.data;
              statementTypeItems.map((item) => {
                const statement_id = parseInt(item.id),
                  description = item.description;

                const currentStatementTypeItem = {
                  id: statement_id,
                  description: description,
                };

                return (statementTypeBody = statementTypeBody.concat(
                  currentStatementTypeItem
                ));
              });
              statementTypeBody.unshift({
                id: 0,
                description: "Select an statement type",
              });
              setStatementTypes(statementTypeBody);
              console.log("statement types Body: ", statementTypes);
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
  const warningAlert = (title, chart_id) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        handleDeleteChartItem(chart_id);
      }
    });
  };
  const handleAddToChart = () => {
    const description = document.getElementById("chart-description").value;
    const account_type_id = parseInt(
      document.getElementById("account-type-id").value
    );
    const accountTypeItem = accountTypes.filter(
      ({ id }) => id === account_type_id
    );
    const account = accountTypeItem[0].account_type;
    const statement_type_id = parseInt(
      document.getElementById("statement-type-id").value
    );
    const statementTypeItem = statementTypes.filter(
      ({ id }) => id === statement_type_id
    );
    const statement = statementTypeItem[0].description;
    console.log("Statement types item hd: ", statementTypeItem);
    console.log("Account types hd : ", accountTypes);
    console.log("Account type ID hd : ", account_type_id);
    console.log("Account types item hd: ", accountTypeItem);

    const chartListData = {
      "account-type": account,
      statement: statement,
      "statement-id": statement_type_id,
      description: description,
    };
    console.log("Update API values: ", chartListData);
    axios
      .post(`${BASE_API_URL}/api/v1/account/chart-add.php`, chartListData)
      .then((res) => {
        console.log("Add Chart response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Chart Added Successfully",
            text = res.data.message,
            link = `<a href="/chartlist">View Chart List</a>`;
          successAlert(title, text, link);
        }
      });
  };
  const handleDeleteChartItem = (id) => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    axios
      .post(`${BASE_API_URL}/api/v1/account/chart-delete.php`, {
        user: user_name,
        "user-id": user_id,
        "chart-id": id,
      })
      .then((res) => {
        console.log("Delete response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Chart deleted Successfully",
            text = res.data.message,
            link = `<a href="/chartlist">View Chart List</a>`;
          successAlert(title, text, link);
        }
      });
  };

  /** Account List Table Data */
  const chartListTableData = {
    tableTitle: "Chart List",
    header: [
      { class: "", title: "Chart" },
      { class: "", title: "Statement" },
      { class: "", title: "Narration" },
      { class: "", title: "" },
    ],

    body: chartList,
  };
  const chartListFormData = [
    {
      id: "account-type-id",
      type: "select",
      name: "account-types",
      holder: "",
      className: "form-control",
      options: accountTypes,
      required: true,
    },
    {
      id: "statement-type-id",
      type: "select",
      name: "statement-types",
      holder: "",
      className: "form-control",
      options: statementTypes,
      required: true,
    },
    {
      id: "chart-description",
      type: "text",
      name: "description",
      holder: "Chart description",
      className: "form-control",
      required: true,
    },
  ];

  console.log(chartListTableData);
  /** Account list component display */
  const ChartListComponent = () => (
    <div id="basic" className="col-lg-12 layout-spacing">
      <Element className="update-form" id="update-form" />
      <div className="statbox widget box box-shadow">
        {/* HEADER TITLE FOR THE FORM */}

        <WidgetHeader title="Add new chart" />
        <div
          className="widget-content widget-content-area searchable-container list"
          style={{ display: "grid", padding: "2rem", gap: "2rem" }}
        >
          (
          <UpdateAccountForm
            content={chartListFormData}
            // loading={loading}
            subtitle="Add new chart information"
            btnText="Add to chart"
            handleAddSubmit={() => handleAddToChart()}
          />
          )
          <CustomTableList content={chartListTableData} />
        </div>
      </div>
    </div>
  );
  return <ChartListComponent />;
};

export default ChartList;
