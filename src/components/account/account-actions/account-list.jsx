import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";

const AccountList = () => {
  const [accountList, setAccountList] = useState();
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** Account list to be appended to */
        let accountListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/account/account-list.php`)
          .then((res) => {
            console.log("Account response data: ", res.data);
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

                const currentAccountItem = {
                  id: account_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: account_name,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: chart_id,
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
                        // handleUpdateFormFields(productItemData);
                      },
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      delete: true,
                      onClick: () => {
                        warningAlert(
                          `Are you sure you want to delete this account: ${account_name}`,
                          account_id
                        );
                      },
                    },
                  ],
                };

                return (accountListBody = accountListBody.concat(
                  currentAccountItem
                ));
              });
              setAccountList(accountListBody);
              console.log("Account Sand List Body: ", accountList);
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
  const warningAlert = (title, account_id) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        handleDeleteAccount(account_id);
      }
    });
  };

  const handleDeleteAccount = (id) => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    axios
      .post(`${BASE_API_URL}/api/v1/account/account-delete.php`, {
        user: user_name,
        "user-id": user_id,
        "account-id": id,
      })
      .then((res) => {
        console.log("Delete response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Account deleted Successfully",
            text = res.data.message,
            link = `<a href="/accountlist">View Account List</a>`;
          successAlert(title, text, link);
        }
      });
  };

  /** Account List Table Data */
  const accountListTableData = {
    tableTitle: "Account List",
    header: [
      { class: "", title: "Account" },
      { class: "", title: "Chart Id" },
      { class: "", title: "Description" },
      { class: "", title: "" },
      { class: "", title: "" },
    ],

    body: accountList,
  };
  console.log(accountListTableData);
  /** Account list component display */
  const AccountListComponent = () => (
    <CustomTableList content={accountListTableData} />
  );
  return <AccountListComponent />;
};

export default AccountList;
