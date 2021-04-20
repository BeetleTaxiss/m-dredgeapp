import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import moment from "moment";

const StockpiledSand = () => {
  const [stockpiledSandList, setStockpiledSandList] = useState();
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      try {
        /** stockpiled sand list to be appended to */
        let stockpiledSandListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/production/list.php`, {
            params: {
              completed: "1",
              stockpiled: "1",
              "added-to-stock": "0",
            },
          })
          .then((res) => {
            console.log("stockpiled sand response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const stockpiledSandItems = res.data.data;
              stockpiledSandItems.map((item) => {
                /** Get required response data values */
                const userDetails = JSON.parse(localStorage.getItem("user")),
                  user_id = userDetails.id,
                  user_name = userDetails.username;
                const product_id = item.product_id;
                const production_id = item.id;
                const batch = item.batch;
                const total_qty_pumped = item.total_qty_pumped;
                const production_date = item.production_date;
                const production_start_time = item.start_time;
                const production_end_time = item.end_time;
                const production_capacity = item.production_capacity;
                const pumping_distance_in_meters =
                  item.pumping_distance_in_meters;
                const duration_pumped_in_seconds =
                  item.duration_pumped_in_seconds;

                /** to stockpile API data */
                const addToStockData = {
                  "user-id": user_id,
                  user: user_name,
                  "product-id": product_id,
                  "production-id": production_id,
                  "batch-no": batch,
                };
                const currentstockpiledSandItem = {
                  id: production_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: production_date,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: batch,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: production_start_time,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: production_end_time,
                    },

                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: total_qty_pumped,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: production_capacity,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: pumping_distance_in_meters,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: duration_pumped_in_seconds,
                    },

                    {
                      class: "text-center",
                      itemClass: "btn btn-primary",
                      addToStock: addToStockData,
                      warningAlert: warningAlert,
                      link: true,
                      linkText: "To Stock",
                    },
                  ],
                };

                return (stockpiledSandListBody = stockpiledSandListBody.concat(
                  currentstockpiledSandItem
                ));
              });
              setStockpiledSandList(stockpiledSandListBody);
              console.log("stockpiled Sand List Body: ", stockpiledSandList);
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

  const warningAlert = (title, addToStock) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        handleAddToStock(addToStock);
      }
    });
  };
  /** Handle stockpile function which moves the stockpiled sand over to the stockpile list after drying has taken place */
  const handleAddToStock = (addToStock) => {
    axios
      .post(`${BASE_API_URL}/api/v1/production/stock.php`, addToStock)
      .then((res) => {
        console.log("Stockpile response Data: ", res.data.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "Added to Stock Successfully",
            text = res.data.message,
            link = `<a href="/stockpile"> View stockpiled sand list</a>`;
          successAlert(title, text, link);
        }
      })
      .catch((error) => {
        let title = "Network Error",
          text = error;
        errorAlert(title, text);
      });
  };
  /** stockpiled sand List Table Data */
  const stockpiledSandListTableData = {
    tableTitle: "Stockpiled Sand List",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Batch No" },
      { class: "", title: "Start Time" },
      { class: "", title: "End Time" },
      { class: "", title: "Qty pumped(cm³)" },
      { class: "", title: "Capacity(%)" },
      { class: "", title: "Distance(m)" },
      { class: "", title: "Duration(secs)" },
      { class: "", title: "" },
    ],

    body: stockpiledSandList,
  };
  console.log(stockpiledSandListTableData);
  /** stockpiled sand list component display */
  const StockpiledSandListComponent = () => (
    <CustomTableList content={stockpiledSandListTableData} />
  );
  return <StockpiledSandListComponent />;
};

export default StockpiledSand;
