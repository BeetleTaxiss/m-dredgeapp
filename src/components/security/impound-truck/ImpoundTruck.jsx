import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import WidgetHeader from "../../general/widget-header";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";

// import "./machinery.css";
import ImpoundTruckForm from "./ImpoundTruckForm";
import {
  functionUtils,
  useGetUserDetails,
} from "../../../hooks/function-utils";

const ImpoundTruck = () => {
  const [impoundTruckList, setImpoundTruckList] = useState(["loading"]);
  const [loading, setloading] = useState(false);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let impoundTruckListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/order/truck-impounded-list.php`)
          .then((res) => {
            console.log("Impound Truck list response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const impoundTruckListItems = res.data.data;
              impoundTruckListItems.map((item) => {
                const comment = item.comment,
                  user_name = item.user;

                const truck_no = item.truck_no,
                  impound_id = parseInt(item.id),
                  truck_description = item.truck_description;

                const impoundTruckItemData = {
                  user: userName,
                  "user-id": parseInt(userId),
                  "impound-id": impound_id,
                  "truck-no": truck_no,
                };

                const currentImpoundTruckItem = {
                  id: impound_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: truck_no,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: truck_description,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: user_name,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: comment,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      release: true,
                      onClick: () =>
                        warningAlert(
                          `Are you sure you want to release this impounded truck: ${truck_no}`,
                          impoundTruckItemData
                        ),
                    },
                  ],
                };

                return (impoundTruckListBody = impoundTruckListBody.concat(
                  currentImpoundTruckItem
                ));
              });
              setImpoundTruckList(impoundTruckListBody);
              console.log("Impound Truck List Body: ", impoundTruckList);
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
  }, [userName, userId]);

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

  const warningAlert = (title, releaseItem) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        handleReleaseImpoundedTruck(releaseItem);
      }
    });
  };

  const handleReleaseImpoundedTruck = (releaseItem) => {
    axios
      .post(
        `${BASE_API_URL}/api/v1/order/truck-release-impound.php`,
        releaseItem
      )
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Truck Released Successfully",
            text = res.data.message;
          // link = `<a href="/operationss">View Machinery List</a>`;
          successAlert(title, text);
        }
      });
  };
  const handleAddImpoundedTruck = (userName, userId) => {
    const truck_no = document.getElementById("truck-no").value;
    const truck_description = document.getElementById("truck-description")
      .value;
    const impounded_comment = document.getElementById("comment").value;

    const addImpoundedTruckData = {
      "user-id": userId,
      user: userName,
      "truck-no": truck_no,
      "truck-description": truck_description,
      comment: impounded_comment,
    };
    console.log("Add Impound truck API values: ", addImpoundedTruckData);
    axios
      .post(
        `${BASE_API_URL}/api/v1/order/truck-impound.php`,
        addImpoundedTruckData
      )
      .then((res) => {
        console.log("Add impounded response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          document.getElementById("truck-no").value = "";
          document.getElementById("truck-description").value = "";
          document.getElementById("comment").value = "";

          let title = "Impounded Truck Successfully",
            text = res.data.message;
          successAlert(title, text);
        }
      });
  };

  /** Retrive form data for client validation */
  const getAddImpoundedTruckFormDataWrapper = () => {
    const truck_no = document.getElementById("truck-no").value;
    const truck_description = document.getElementById("truck-description")
      .value;
    const comment = document.getElementById("comment").value;

    const addImpoundedData = {
      "truck-no": truck_no,
      "truck-description": truck_description,
      comment: comment,
    };

    return addImpoundedData;
  };
  /** machinery List Table Data */
  const impoundTruckListTableData = {
    tableTitle: "",
    header: [
      { class: "", title: "Truck" },
      { class: "", title: "Description" },
      { class: "", title: "Impounded by" },
      { class: "", title: "Comment" },
      { class: "", title: "" },
    ],

    body: impoundTruckList,
  };
  const addImpoundedTruckformData = [
    {
      id: "truck-no",
      type: "text",
      name: "truck-no",
      holder: "Truck Registeration Number",
      className: "form-control",
      required: false,
    },
    {
      id: "truck-description",
      type: "text",
      name: "truck-description",
      holder: "Truck Description",
      className: "form-control",
      required: true,
    },
    {
      id: "comment",
      type: "textarea",
      name: "comment",
      holder: "Impounded Comment",
      className: "form-control",
      required: true,
    },
  ];

  /** Machinerys Component */
  const ImpoundedTruckComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <Element id="update-form" name="update-form" />
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Impound Truck Information" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <ImpoundTruckForm
              content={addImpoundedTruckformData}
              loading={loading}
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getAddImpoundedTruckFormDataWrapper()
                );
                if (validation === true) {
                  handleAddImpoundedTruck();
                }
              }}
            />
            <CustomTableList content={impoundTruckListTableData} />
          </div>
        </div>
      </div>
    );
  };
  return <ImpoundedTruckComponent />;
};

export default ImpoundTruck;
