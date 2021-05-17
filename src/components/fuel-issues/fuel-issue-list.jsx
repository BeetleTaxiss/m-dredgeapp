import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import { functionUtils } from "../../hooks/function-utils";

const FuelIssueList = () => {
  const [fuelIssueList, setFuelIssueList] = useState(["loading"]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** Fuel list to be appended to */
        let fuelIssueListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/operations/fuel-issue-list.php`)
          .then((res) => {
            console.log("Fuel response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const fuelIssueItems = res.data.data;
              fuelIssueItems.reverse().map((item) => {
                /** Get required response data values */
                const fuel_issue_user = item?.user;
                const fuel_issue_user_id = item?.user_id;
                const fuel_issue_id = item?.id;
                const machinery_name = item?.machinery_name;
                const fuel_issue_date = item?.date_in;
                const fuel_issue_time = item?.time_in;
                const qty_issued = item?.qty_issued;
                const identification_no = item?.identification_no;
                const description = item?.description;

                const currentFuelIssueItem = {
                  id: fuel_issue_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_issue_date,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_issue_time,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: machinery_name,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: identification_no,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_issue_user,
                    },
                    {
                      class: "text-left",
                      itemClass: `text-center ${
                        machinery_name === "down"
                          ? "shadow-none badge badge-warning"
                          : "shadow-none badge badge-success"
                      }`,
                      item: functionUtils.addCommaToNumbers(qty_issued),
                    },
                  ],
                };

                return (fuelIssueListBody =
                  fuelIssueListBody.concat(currentFuelIssueItem));
              });
              setFuelIssueList(fuelIssueListBody);
              console.log("Fuel Sand List Body: ", fuelIssueList);
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
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  /** Fuel List Table Data */
  const fuelIssueListTableData = {
    tableTitle: "Fuel Issue List",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Time" },
      { class: "", title: "Machinery" },
      { class: "", title: "Identification No" },
      { class: "", title: "Issuer" },
      { class: "", title: "Qty Issued" },
    ],

    body: fuelIssueList,
  };
  console.log(fuelIssueListTableData);
  /** Fuel list component display */
  const FuelListComponent = () => (
    <CustomTableList
      content={fuelIssueListTableData}
      filler="Your Fuel list is empty"
    />
  );
  return <FuelListComponent />;
};

export default FuelIssueList;
