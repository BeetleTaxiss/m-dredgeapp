import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import AddFuelForm from "./add-Fuel-Form";
import "./machinery.css";
import { functionUtils, useGetUserDetails } from "../../hooks/function-utils";
import moment from "moment";

import CustomDetailedStats from "../cards/CustomDetailedStats";
import Followers from "../../assets/reserveIcon.svg";
import Linkk from "../../assets/incomingIcon.svg";
import Chat from "../../assets/outgoingIcon.svg";

const AddFuel = () => {
  const [detailedStats, setDetailedStats] = useState([
    "loading",
    "loading",
    "loading",
  ]);

  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

  /**
   * use this state value to check when we have addeed or updated data and need to refresh
   * it work by concatenating  `true` to the array when we need to refresh
   * */
  const [refreshData, setRefreshData] = useState([]);

  /**
   *  an helper function to always refresh the page
   * */
  const reloadServerData = () => {
    /** refresh the page so we can newly added users */
    setRefreshData(refreshData.concat(true));
  };

  /** Get Fuel Summary data */

  const currentDate = moment().format("DD/MM/YYYY");
  console.log("Current date: ", currentDate);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let detailedStatsList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/operations/fuel-stock-summary.php`, {
          params: { "date-in": currentDate },
        })
        .then((res) => {
          let detailedStatsResponseList;
          let detailedStatsResponse = res.data;
          detailedStatsResponse.fuel_stock["legend"] = "Fuel Reserves";

          detailedStatsResponse.incoming_fuel["legend"] = "Incoming Fuel";

          detailedStatsResponse.outgoing_fuel["legend"] = "Outgoing Fuel";

          detailedStatsResponse.fuel_stock["icon"] = Followers;

          detailedStatsResponse.incoming_fuel["icon"] = Linkk;

          detailedStatsResponse.outgoing_fuel["icon"] = Chat;

          detailedStatsResponseList = [
            detailedStatsResponse.fuel_stock,
            detailedStatsResponse.incoming_fuel,
            detailedStatsResponse.outgoing_fuel,
          ];

          console.log("Detailed: ", detailedStatsResponse);
          console.log("Detailed List: ", detailedStatsResponseList);
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            detailedStatsResponseList.map((item) => {
              const detailedStatsSchema = {
                icon: item.icon,
                stats:
                  item.total_qty === null || item.total_qty === undefined
                    ? 0
                    : Math.round(item.total_qty),
                legend: item.legend,
                array: true,
              };

              return (detailedStatsList =
                detailedStatsList.concat(detailedStatsSchema));
            });
            setDetailedStats(detailedStatsList);
            console.log("Recent order list: ", detailedStats);
          }
        })
        .catch((error) => {
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
        });
    };

    response();

    return () => {
      source.cancel();
    };
  }, [userName, userId, refreshData]);
  const handleAddFuel = (userName, userId) => {
    const fuel_amount = document.getElementById("fuel-amount").value;
    const fuel_quanity = document.getElementById("fuel-quantity").value;

    const addFuelData = {
      user: userName,
      "user-id": userId,
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
          reloadServerData();
        }
      });
  };

  /** Retrive add fuel to fuel stock form data for client validation  */
  const getAddFuelStockFormData = (userName, userId) => {
    const fuel_amount = document.getElementById("fuel-amount").value;
    const fuel_quanity = document.getElementById("fuel-quantity").value;

    const addFuelData = {
      user: userName,
      "user-id": userId,
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
            <CustomDetailedStats data={detailedStats} />
            <AddFuelForm
              content={addFuelformData}
              // loading={loading}
              subtitle="Add new fuel information"
              btnText="Add Fuel"
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getAddFuelStockFormData(userName, userId)
                );
                console.log("Validation: ", validation);
                if (validation === true) {
                  handleAddFuel(userName, userId);
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
