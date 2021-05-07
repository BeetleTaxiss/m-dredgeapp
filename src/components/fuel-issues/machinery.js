import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import AddUpdateMachinery from "./add-update-machinery";

import "./machinery.css";
import { useGetUserDetails } from "../../hooks/function-utils";

const Machinery = () => {
  const [machineryList, setMachineryList] = useState(["loading"]);
  const [showUpdateMachinery, setShowUpdateMachinery] = useState(false);
  const [loading, setloading] = useState(false);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let machineryListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/operations/machinery-list.php`)
          .then((res) => {
            console.log("Machinery list response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const machineryListItems = res.data.data;
              machineryListItems.map((item) => {
                const machinery_id = parseInt(item.id),
                  machinery_name = item.machinery_name,
                  identification_no = item.identification_no,
                  description = item.description;

                const machineryItemData = {
                  user: userName,
                  user_id: userId,
                  id: machinery_id,
                  machinery_name: machinery_name,
                  identification_no: identification_no,
                  description: description,
                };

                const deleteMachineryItemData = {
                  "machinery-id": machinery_id,
                };

                const currentMachineryItem = {
                  id: machinery_id,
                  fields: [
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
                      item: description,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      editScroll: true,
                      scrollLocation: "update-form",
                      onClick: () => {
                        handleUpdateFormFields(machineryItemData);
                      },
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      delete: true,
                      onClick: () =>
                        warningAlert(
                          `Are you sure you want to delete this machinery: ${machinery_name}`,
                          deleteMachineryItemData
                        ),
                    },
                  ],
                };

                return (machineryListBody = machineryListBody.concat(
                  currentMachineryItem
                ));
              });
              setMachineryList(machineryListBody);
              console.log("Machinery List Body: ", machineryList);
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

  useEffect(() => {}, [showUpdateMachinery]);

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

  const warningAlert = (title, deleteItem) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then((value) => {
      if (value.isConfirmed) {
        handleDeleteMachineryItem(deleteItem);
      }
    });
  };

  const handleDeleteMachineryItem = (deleteItem) => {
    console.log("Delete data: ", deleteItem);
    axios
      .post(
        `${BASE_API_URL}/api/v1/operations/machinery-delete.php`,
        deleteItem
      )
      .then((res) => {
        console.log("Delete Machinery response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Machinery Deleted Successfully",
            text = res.data.message,
            link = `<a href="/operationss">View Machinery List</a>`;
          successAlert(title, text, link);
        }
      });
  };
  const handleAddMachinery = () => {
    const machinery_name = document.getElementById("machinery").value;
    const machinery_description = document.getElementById(
      "machinery-description"
    ).value;
    const machinery_identification = document.getElementById(
      "machinery-identification"
    ).value;

    const addMachineryData = {
      name: machinery_name,
      "identification-no": machinery_identification,
      description: machinery_description,
    };
    console.log("Add machinery API values: ", addMachineryData);
    axios
      .post(
        `${BASE_API_URL}/api/v1/operations/machinery-add.php`,
        addMachineryData
      )
      .then((res) => {
        console.log("Add Machinery response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Machinery Added Successfully",
            text = res.data.message,
            link = `<a href="/operations">View Machinery List</a>`;
          successAlert(title, text, link);
        }
      });
  };
  const handleUpdateMachinery = () => {
    const machinery_id = document.getElementById("machinery-id").value;
    const machinery_name = document.getElementById("machinery").value;
    const machinery_description = document.getElementById(
      "machinery-description"
    ).value;
    const machinery_identification = document.getElementById(
      "machinery-identification"
    ).value;

    const updateMachineryData = {
      "machinery-id": machinery_id,
      name: machinery_name,
      description: machinery_description,
      "identification-no": machinery_identification,
    };
    console.log("Update machinery API values: ", updateMachineryData);
    axios
      .put(
        `${BASE_API_URL}/api/v1/operations/machinery-update.php`,
        updateMachineryData
      )
      .then((res) => {
        console.log("Add Machinery response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Machinery Updated Successfully",
            text = res.data.message,
            link = `<a href="/operations">View Machinery List</a>`;
          successAlert(title, text, link);
        }
      });
  };
  const handleUpdateFormFields = (machineryItemData) => {
    if (
      document.getElementById("add-form-btn") !== null &&
      document.getElementById("edit-btn-icon") !== null
    ) {
      document.getElementsByClassName("edit-btn-icon").disabled = true;
      console.log(document.getElementById("add-form-btn"));
    } else {
      document.getElementById("machinery-id").value = machineryItemData.id;
      document.getElementById("machinery").value =
        machineryItemData.machinery_name;
      document.getElementById("machinery-description").value =
        machineryItemData.description;
      document.getElementById("machinery-identification").value =
        machineryItemData.identification_no;
      document.getElementById("machinery-identification").hidden = true;
    }
    console.log("Update State", showUpdateMachinery);
  };

  const hideIdentificationField = () => {};
  /** machinery List Table Data */
  const machineryListTableData = {
    tableTitle: "",
    header: [
      { class: "", title: "Machinery" },
      { class: "", title: "Identification" },
      { class: "", title: "Description" },
      { class: "", title: "" },
      { class: "", title: "" },
    ],

    body: machineryList,
  };
  const addUpdateMachineryformData = [
    {
      id: "user",
      type: "text",
      name: "user",
      holder: "",
      className: "form-control",
      hidden: true,
      required: false,
    },
    {
      id: "user-id",
      type: "text",
      name: "user-id",
      holder: "",
      className: "form-control",
      hidden: true,
      required: false,
    },
    {
      id: "machinery-id",
      type: "text",
      name: "machinery-id",
      holder: "",
      className: "form-control",
      hidden: true,
      required: false,
    },
    {
      id: "machinery",
      type: "text",
      name: "machinery",
      holder: "Machinery Name",
      className: "form-control",
      required: true,
    },
    {
      id: "machinery-identification",
      type: "text",
      name: "Identification Number",
      holder: "Machinery Identification",
      className: "form-control",
      required: true,
    },
    {
      id: "machinery-description",
      type: "textarea",
      name: "description",
      holder: "Machinery Description",
      className: "form-control",
      required: true,
    },
  ];

  /** Machinerys Component */
  const MachineryComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <Element id="update-form" name="update-form" />
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Set Machinery Values" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <AddUpdateMachinery
              onClick={() => {
                setShowUpdateMachinery((prev) => !prev);
                hideIdentificationField();
              }}
              showUpdateMachinery={showUpdateMachinery}
              content={addUpdateMachineryformData}
              loading={loading}
              handleAddSubmit={handleAddMachinery}
              handleUpdateSubmit={handleUpdateMachinery}
            />
            <CustomTableList content={machineryListTableData} />
          </div>
        </div>
      </div>
    );
  };
  return <MachineryComponent />;
};

export default Machinery;
