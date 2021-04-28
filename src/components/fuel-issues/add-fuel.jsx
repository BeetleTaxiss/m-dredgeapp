import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import AddFuelForm from "./add-Fuel-Form";
import "./machinery.css";
import { functionUtils } from "../../hooks/function-utils";

const AddFuel = () => {
  const handleAddFuel = () => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    const fuel_amount = document.getElementById("fuel-amount").value;
    const fuel_quanity = document.getElementById("fuel-quantity").value;

    const addFuelData = {
      user: user_name,
      "user-id": user_id,
      qty: fuel_quanity,
      amount: fuel_amount,
    };
    console.log("Add machinery API values: ", addFuelData);
    axios
      .post(`${BASE_API_URL}/api/v1/operations/fuel-add.php`, addFuelData)
      .then((res) => {
        console.log("Add Machinery response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Fuel Added Successfully",
            text = res.data.message,
            link = `<a href="/fuelupdatelist">View Fuel Update List</a>`;
          successAlert(title, text, link);
        }
      });
  };

  /** Retrive add fuel to fuel stock form data for client validation  */
  const getAddFuelStockFormData = () => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    const fuel_amount = document.getElementById("fuel-amount").value;
    const fuel_quanity = document.getElementById("fuel-quantity").value;

    const addFuelData = {
      user: user_name,
      "user-id": user_id,
      qty: fuel_quanity,
      amount: fuel_amount,
    };
    return addFuelData;
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
  const addFuelformData = [
    {
      id: "fuel-amount",
      type: "text",
      name: "amount",
      holder: "Cost of fuel bought",
      className: "form-control",
      required: true,
    },
    {
      id: "fuel-quantity",
      type: "text",
      name: "qty",
      holder: "Fuel quantity bought",
      className: "form-control",
      required: true,
    },
  ];

  /** Machinerys Component */
  const FuelAddComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Add Fuel to Tank" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <AddFuelForm
              content={addFuelformData}
              // loading={loading}
              subtitle="Add new fuel information"
              btnText="Add Fuel"
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getAddFuelStockFormData()
                );
                console.log("Validation: ", validation);
                if (validation === true) {
                  handleAddFuel();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  return <FuelAddComponent />;
};

export default AddFuel;
