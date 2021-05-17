import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import { functionUtils } from "../../hooks/function-utils";

const FuelUpdateList = () => {
  const [fuelUpdateList, setFuelUpdateList] = useState(["loading"]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** Fuel list to be appended to */
        let fuelUpdateListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/operations/fuel-update-list.php`)
          .then((res) => {
            console.log("Fuel response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const fuelUpdateItems = res.data.data;
              fuelUpdateItems.reverse().map((item) => {
                /** Get required response data values */
                const fuel_update_user = item.user;
                const fuel_update_user_id = item.user_id;
                const fuel_update_id = item.id;
                const supplier = item.supplier;
                const supplier_id = item.supplier_id;
                const amount = item.amount;
                const fuel_update_date = item.date_in;
                const fuel_update_time = item.time_in;
                const qty_stocked = item.qty_stocked;

                const currentFuelUpdateItem = {
                  id: fuel_update_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_update_date,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_update_time,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: functionUtils.addCommaToNumbers(amount),
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: fuel_update_user,
                    },

                    // {
                    //   class: "text-left",
                    //   itemClass: "text-center",
                    //   item: supplier,
                    // },
                    {
                      class: "text-left",
                      itemClass: `text-center ${
                        amount === "down"
                          ? "shadow-none badge badge-warning"
                          : "shadow-none badge badge-success"
                      }`,
                      item: functionUtils.addCommaToNumbers(qty_stocked),
                    },
                  ],
                };

                return (fuelUpdateListBody = fuelUpdateListBody.concat(
                  currentFuelUpdateItem
                ));
              });
              setFuelUpdateList(fuelUpdateListBody);
              console.log("Fuel Sand List Body: ", fuelUpdateList);
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
  const fuelUpdateListTableData = {
    tableTitle: "Fuel Update List",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Time" },
      { class: "", title: "Amount" },
      { class: "", title: "Stocker" },
      // { class: "", title: "Supplier" },
      { class: "", title: "Qty Added" },
    ],

    body: fuelUpdateList,
  };
  console.log(fuelUpdateListTableData);
  /** Fuel list component display */
  const FuelListComponent = () => (
    <CustomTableList
      content={fuelUpdateListTableData}
      filler="Your Updated Fuel list is empty"
    />
  );
  return <FuelListComponent />;
};

export default FuelUpdateList;
