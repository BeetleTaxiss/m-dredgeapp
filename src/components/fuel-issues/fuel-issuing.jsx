import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import IssueFuelForm from "./add-Fuel-Form";
import "./machinery.css";
import { functionUtils } from "../../hooks/function-utils";

const FuelIssuing = () => {
  const [machineryList, setMachineryList] = useState();
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

                // const machineryItemData = {
                //   id: machinery_id,
                //   machinery_name: machinery_name,
                //   identification_no: identification_no,
                //   description: description,
                // };

                const currentMachineryItem = {
                  id: machinery_id,
                  machinery_name: machinery_name,
                  identification_no: identification_no,
                  description: description,
                };

                return (machineryListBody = machineryListBody.concat(
                  currentMachineryItem
                ));
              });
              machineryListBody.unshift({
                id: 0,
                machinery_name: "Select a machine",
                validation: "Can't select this option",
              });
            }
            setMachineryList(machineryListBody);
            console.log("Machinery List Body: ", machineryList);
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
  const handleIssueFuel = () => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    const fuel_quanity = document.getElementById("fuel-quantity").value;
    const machineValue = parseInt(
      document.getElementById("machine-type").value
    );

    const machineItem = machineryList.filter(({ id }) => id === machineValue);

    console.log("machine item: ", machineItem);
    const issueFuelData = {
      user: user_name,
      "user-id": user_id,
      qty: fuel_quanity,
      name: machineItem[0].machinery_name,
      "identification-no": machineItem[0].identification_no,
      "machinery-id": 0,
      description: machineItem[0].description,
    };
    console.log("issue machinery API values: ", issueFuelData);
    axios
      .post(`${BASE_API_URL}/api/v1/operations/fuel-issue.php`, issueFuelData)
      .then((res) => {
        console.log("Issue Machinery response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Fuel issued Successfully",
            text = res.data.message,
            link = `<a href="/fuelissuelist">View Fuel Issue List</a>`;
          successAlert(title, text, link);
        }
      });
  };

  /** Retrive fuel issuing form data for client validation */
  const getFuelIssueFormData = () => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    const fuel_quanity = document.getElementById("fuel-quantity").value;
    const machineValue = parseInt(
      document.getElementById("machine-type").value
    );

    const machineItem = machineryList.filter(({ id }) => id === machineValue);

    console.log("machine item: ", machineItem);
    const issueFuelData = {
      user: user_name,
      "user-id": user_id,
      qty: fuel_quanity,
      name: machineItem[0].machinery_name,
      "identification-no": machineItem[0].identification_no,
      "machinery-id": 0,
      description: machineItem[0].description,
      validation: machineItem[0].validation,
    };
    return issueFuelData;
  };
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
  const issueFuelFormData = [
    {
      id: "machine-type",
      type: "select",
      name: "machine",
      holder: "",
      className: "form-control",
      options: machineryList,
      required: true,
    },
    // wfegfsdafge
    {
      id: "fuel-quantity",
      type: "text",
      name: "qty",
      holder: "Fuel quantity to dispense",
      className: "form-control",
      required: true,
    },
  ];

  /** Machinerys Component */
  const FuelIssueComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Give Fuel to staff" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <IssueFuelForm
              content={issueFuelFormData}
              // loading={loading}
              subtitle="Add new fuel information"
              btnText="Dispense Fuel"
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getFuelIssueFormData()
                );

                if (validation === true) {
                  handleIssueFuel();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  return <FuelIssueComponent />;
};
export default FuelIssuing;
