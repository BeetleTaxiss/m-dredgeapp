import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import WidgetHeader from "../../general/widget-header";
import { BASE_API_URL } from "../../../hooks/API";
import CustomTableList from "../../general/custom-table-list/custom-table-list";

import ImpoundTruckForm from "./ImpoundTruckForm";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../../hooks/function-utils";

const ImpoundTruck = () => {
  const [impoundTruckList, setImpoundTruckList] = useState(["loading"]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
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
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, [userPermissions, productId]);

  /**
   * Fetch Impounded list from DB
   */
  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let impoundTruckListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/order/truck-impounded-list.php`, {
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

    /**
     * Run axios call when product Id is valid and retrived
     */
    userPermissions !== undefined && response();

    return () => {
      source.cancel();
    };
  }, [userName, userId, userProductPermission, refreshData]);

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
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  };
  const handleAddImpoundedTruck = (userName, userId) => {
    const truck_no = document.getElementById("truck-no").value;
    const truck_description =
      document.getElementById("truck-description").value;
    const impounded_comment = document.getElementById("comment").value;

    const addImpoundedTruckData = {
      "user-id": userId,
      user: userName,
      "truck-no": truck_no,
      "truck-description": truck_description,
      comment: impounded_comment,
      "product-id":
        productId === undefined && userProductPermission !== undefined
          ? userProductPermission[0]?.id
          : productId,
    };

    axios
      .post(
        `${BASE_API_URL}/api/v1/order/truck-impound.php`,
        addImpoundedTruckData
      )
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          document.getElementById("truck-no").value = "";
          document.getElementById("truck-description").value = "";
          document.getElementById("comment").value = "";

          let title = "Impounded Truck Successfully",
            text = res.data.message;
          successAlert(title, text);
          reloadServerData();
          setLoading(false);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
      });
  };

  /** Retrive form data for client validation */
  const getAddImpoundedTruckFormDataWrapper = () => {
    const truck_no = document.getElementById("truck-no").value;
    const truck_description =
      document.getElementById("truck-description").value;
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
          <WidgetHeader
            title="Impound Truck Information"
            links={userProductPermission}
            dropdown
            change
          />

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
                  setLoading(true);
                  handleAddImpoundedTruck(userName, userId);
                }
              }}
            />
            <CustomTableList
              content={impoundTruckListTableData}
              filler="No Truck impounded"
            />
          </div>
        </div>
      </div>
    );
  };
  return <ImpoundedTruckComponent />;
};

export default ImpoundTruck;
