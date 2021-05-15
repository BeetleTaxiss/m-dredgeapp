import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";
import { functionUtils } from "../../../hooks/function-utils";
const ProductionList = () => {
  const [productionList, setProductionList] = useState(["loading"]);

  /** Axios call to fetch Production list and assign to productionList variable */
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      try {
        let productionListBody = [];
        await axios
          .get(`${BASE_API_URL}/api/v1/production/list.php`)
          .then((res) => {
            console.log("Production List response: ", res.data);
            if (res.data.error) {
              alert("Error from Axios block");
              let title = "Network Error",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const productionListItems = res.data.data;
              /** Required single response object to be concatenated to the production list array */
              productionListItems.map((item) => {
                /** Get required response data values */
                const production_id = item.id;
                const batch = item.batch;
                const total_qty_pumped = item.total_qty_pumped;
                const production_date = item.production_date;
                const production_start_time = item.start_time;
                const production_end_time = item.end_time;
                const production_capacity = item.production_capacity;
                const pumping_distance_in_meters =
                  item.pumping_distance_in_meters;
                const production_completed = item.completed;
                const duration_pumped_in_seconds =
                  item.duration_pumped_in_seconds;
                const currentProductionResponseData = {
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
                      itemClass: "text-center ",
                      item: production_capacity,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: functionUtils.addCommaToNumbers(
                        pumping_distance_in_meters
                      ),
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: duration_pumped_in_seconds,
                    },

                    {
                      class: "text-center",
                      itemClass:
                        production_completed === "0"
                          ? "shadow-none badge badge-warning"
                          : "shadow-none badge badge-success",
                      item:
                        production_completed === "0"
                          ? "In Progress"
                          : "Completed",
                    },
                  ],
                };
                return (productionListBody = productionListBody.concat(
                  currentProductionResponseData
                ));
              });
              setProductionList(productionListBody);
              console.log("Production List Body: ", productionList);
            }
          })
          .catch((error) => {
            let title = "Network Error",
              text = error;
            errorAlert(title, text);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
          alert("Error from catch block");
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
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
  /** Multipurpose error pop-up for handling and displaying errors */
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };
  /** Production List Table Data */
  const productionListTableData = {
    tableTitle: "Production List",
    header: [
      { class: "", title: "Date" },
      { class: "", title: "Batch No" },
      { class: "", title: "Start Time" },
      { class: "", title: "End Time" },
      { class: "", title: "Qty pumped(cm³)" },
      { class: "", title: "Capacity(%)" },
      { class: "", title: "Distance(m)" },
      { class: "", title: "Duration(secs)" },
      { class: "text-center", title: "Status" },
    ],

    body: productionList,
  };
  /** Production list component display */
  const ProductionListComponent = () => (
    <CustomTableList
      content={productionListTableData}
      filler="No production sessions to report"
    />
  );

  return <ProductionListComponent />;
};

export default ProductionList;
