import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";

const StockUpdate = () => {
  const [stockUpdateList, setStockUpdateList] = useState(["loading"]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** stock list to be appended to */
        let stockUpdateListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/production/list-stock-update.php`)
          .then((res) => {
            console.log("stock response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const stockUpdateItems = res.data.data;
              stockUpdateItems.reverse().map((item) => {
                /** Get required response data values */
                const product = item.product;
                const production_id = item.id;
                const order_ref = item.order_ref;
                const direction = item.direction;
                const stocked_date = item.date_in;
                const stocked_time = item.time_in;
                const after_order = item.qty_after_update;
                const before_order = item.qty_before_update;
                const qty_updated = item.qty_update;

                const currentstockUpdateItem = {
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
                      item: order_ref,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: stocked_time,
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: product,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: direction,
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: before_order,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: after_order,
                    },
                    {
                      class: "text-left",
                      itemClass: `text-center ${
                        direction === "down"
                          ? "shadow-none badge badge-warning"
                          : "shadow-none badge badge-success"
                      }`,
                      item: qty_updated,
                    },
                  ],
                };

                return (stockUpdateListBody = stockUpdateListBody.concat(
                  currentstockUpdateItem
                ));
              });
              setStockUpdateList(stockUpdateListBody);
              console.log("stock Sand List Body: ", stockUpdateList);
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
  const stockUpdateListTableData = {
    tableTitle: "Stock Update List",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Order Ref" },
      { class: "", title: "Start Time" },
      { class: "", title: "Product" },
      { class: "", title: "Trend" },
      { class: "", title: "Product Qty Before" },
      { class: "", title: "Product Qty After" },
      { class: "", title: "Product Qty Updated" },
    ],

    body: stockUpdateList,
  };
  console.log(stockUpdateListTableData);
  /** stock list component display */
  const StockListComponent = () => (
    <CustomTableList
      content={stockUpdateListTableData}
      filler="Stock Trends Not Avaliable Yet"
    />
  );
  return <StockListComponent />;
};

export default StockUpdate;
