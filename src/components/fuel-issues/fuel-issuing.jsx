import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import IssueFuelForm from "./add-Fuel-Form";
import "./machinery.css";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
import CustomDetailedStats from "../cards/CustomDetailedStats";
import Followers from "../../assets/reserveIcon.svg";
import Linkk from "../../assets/incomingIcon.svg";
import Chat from "../../assets/outgoingIcon.svg";
import moment from "moment";

const FuelIssuing = () => {
  const [machineryList, setMachineryList] = useState();
  const [detailedStats, setDetailedStats] = useState([
    "loading",
    "loading",
    "loading",
  ]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [products, setProducts] = useState();
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["d", "7", "s", "w"];

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(
    setUserName,
    setUserId,
    ...optionalParams,
    setUserPermissions
  );

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

  /**
   * Fetch Product list from database and validate per user
   */
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/product/list.php`)
      .then((res) => {
        if (res.data.error) {
          errorAlert("Server Error Response", res.data.message);
        } else {
          let data = res.data.data;
          /**
           * Validated product data that is derived from a user's product permisssion
           */
          let validatedProductData;

          /**
           * This block ensures the validateProductLocationPermission utility is run when the user permission state hasn't be updated with actual data
           */
          if (userPermissions !== undefined || userPermissions !== null) {
            /**
             * utility function takes in a users permission and the product list from the database and validates what product permission the user has
             */
            validatedProductData = validateProductLocationPermission(
              userPermissions?.productPermissions,
              data
            );

            /**
             * Set the validated product to state to make it globally accessiable
             */
            const tableDropdown = productDropdownForTable(
              validatedProductData,
              setProductId
            );

            setUserProductPermission(tableDropdown);

            /**
             * "Select Product" option is added to product list to set it as the initial option a user views
             */
            validatedProductData?.unshift({
              id: "0",
              product: "Select Product",
              price: 0,
              validation: "Can't select this option",
            });

            /**
             * Set the data to state for the product dropdown
             */
            setProducts(validatedProductData);
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, [userPermissions, productId]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let machineryListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/operations/machinery-list.php`, {
            params: {
              "product-id":
                productId === undefined && userProductPermission !== undefined
                  ? userProductPermission[0]?.id
                  : productId,
            },
          })
          .then((res) => {
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

                const currentMachineryItem = {
                  id: machinery_id,
                  machinery_name: machinery_name,
                  identification_no: identification_no,
                  description: description,
                };

                return (machineryListBody =
                  machineryListBody.concat(currentMachineryItem));
              });
              machineryListBody.unshift({
                id: 0,
                machinery_name: "Select a machine",
                validation: "Can't select this option",
              });
            }
            setMachineryList(machineryListBody);
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

    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [userProductPermission]);

  /** Get Fuel Summary data */

  const currentDate = moment().format("DD/MM/YYYY");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let detailedStatsList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/operations/fuel-stock-summary.php`, {
          params: {
            "date-in": currentDate,
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
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
          }
        })
        .catch((error) => {
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
        });
    };

    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [userName, userId, userProductPermission, refreshData]);

  const handleIssueFuel = (userName, userId) => {
    const fuel_quanity = document.getElementById("fuel-quantity").value;
    const machineValue = parseInt(
      document.getElementById("machine-type").value
    );
    const productId = parseInt(document.getElementById("product-id").value);
    const machineItem = machineryList.filter(({ id }) => id === machineValue);

    const issueFuelData = {
      user: userName,
      "user-id": userId,
      qty: fuel_quanity,
      name: machineItem[0].machinery_name,
      "identification-no": machineItem[0].identification_no,
      "machinery-id": 0,
      description: machineItem[0].description,
      "product-id": productId,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/operations/fuel-issue.php`, issueFuelData)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          let title = "Fuel issued Successfully",
            text = res.data.message,
            link = `<a href="/fuelissuelist">View Fuel Issue List</a>`;
          successAlert(title, text, link);
          reloadServerData();
          setLoading(false);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
      });
  };

  /** Retrive fuel issuing form data for client validation */
  const getFuelIssueFormData = (userName, userId) => {
    const fuel_quanity = document.getElementById("fuel-quantity").value;
    const machineValue = parseInt(
      document.getElementById("machine-type").value
    );

    const machineItem = machineryList.filter(({ id }) => id === machineValue);
    const productId = parseInt(document.getElementById("product-id").value);
    const productItem = products?.filter(({ id }) => id == productId);

    if (
      products === null ||
      products === undefined ||
      machineryList === null ||
      machineryList === undefined ||
      machineryList[0] === undefined ||
      products[0] === undefined
    ) {
      errorAlert("Network Error", "Refresh Page");
    } else {
      const issueFuelData = {
        user: userName,
        "user-id": userId,
        qty: fuel_quanity,
        name: machineItem[0].machinery_name,
        "identification-no": machineItem[0].identification_no,
        "machinery-id": 0,
        description: machineItem[0].description,
        "product-id": productId,
        validation: productItem[0].validation || machineItem[0].validation,
      };
      return issueFuelData;
    }
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
      id: "product-id",
      type: "select",
      name: "product",
      className: "form-control",
      options: products,
      required: true,
    },
    {
      id: "machine-type",
      type: "select",
      name: "machine",
      holder: "",
      className: "form-control",
      options: machineryList,
      required: true,
    },
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
          <WidgetHeader
            title="Give Fuel to staff"
            links={userProductPermission}
            dropdown
            change
          />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <CustomDetailedStats data={detailedStats} />
            <IssueFuelForm
              content={issueFuelFormData}
              loading={loading}
              subtitle="Add new fuel information"
              btnText="Dispense Fuel"
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getFuelIssueFormData(userName, userId)
                );

                if (validation === true) {
                  setLoading(true);
                  handleIssueFuel(userName, userId);
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
