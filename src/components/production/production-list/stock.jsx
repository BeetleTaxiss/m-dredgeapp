import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";

const Stock = () => {
  const [stockList, setStockList] = useState(["loading"]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** stock list to be appended to */
        let stockListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/production/list-stock-entry.php`)
          .then((res) => {
            console.log("stock response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const stockItems = res.data.data;
              stockItems.reverse().map((item) => {
                /** Get required response data values */

                const user_name = item.user;
                const product = item.product;
                const production_id = item.id;
                const batch = item.batch;
                const total_qty_stocked = item.total_qty_stocked;
                const stocked_date = item.date_in;
                const stocked_time = item.time_in;
                const product_unit = item.unit;

                const currentstockItem = {
                  id: production_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: stocked_date,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: batch,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: stocked_time,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: user_name,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: product,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: total_qty_stocked,
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: product_unit,
                    },
                  ],
                };

                return (stockListBody = stockListBody.concat(currentstockItem));
              });
              setStockList(stockListBody);
              console.log("stock Sand List Body: ", stockList);
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

  /** stock List Table Data */
  const stockListTableData = {
    tableTitle: "Stock List",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Batch No" },
      { class: "", title: "Start Time" },
      { class: "", title: "User Name" },
      { class: "", title: "Product" },
      { class: "", title: "Qty pumped(cm³)" },
      { class: "", title: "Product Unit" },
    ],

    body: stockList,
  };
  console.log(stockListTableData);
  /** stock list component display */
  const StockListComponent = () => (
    <CustomTableList content={stockListTableData} filler="No product stocked" />
  );
  return <StockListComponent />;
};

export default Stock;
