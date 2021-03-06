import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import AddUpdateMachinery from "./add-update-machinery";

import "./machinery.css";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";

const Machinery = () => {
  const [machineryList, setMachineryList] = useState(["loading"]);
  const [showUpdateMachinery, setShowUpdateMachinery] = useState(false);
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
  console.log("Product Id: ", productId);
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
            console.log(
              "Table dropdown: ",
              tableDropdown,
              validatedProductData
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
        const loadTableList = async () => {
          await axios
            .get(`${BASE_API_URL}/api/v1/operations/machinery-list.php`, {
              params: {
                // "select-all": 1,
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
                    user: userName,
                    "user-id": userId,
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
                          setShowUpdateMachinery(true);
                          setTimeout(() => {
                            handleUpdateFormFields(machineryItemData);
                          }, 500);
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

                  return (machineryListBody =
                    machineryListBody.concat(currentMachineryItem));
                });
                setMachineryList(machineryListBody);
              }
            })
            .catch((error) => {
              console.log("API error: ", error);
              let title = "Network Error",
                text = error;
              errorAlert(title, text);
            });
        };

        /**
         * Run axios call when product Id is valid and retrived
         */
        userPermissions !== undefined && loadTableList();
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
  }, [userName, userId, userProductPermission, refreshData]);

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
    axios
      .post(
        `${BASE_API_URL}/api/v1/operations/machinery-delete.php`,
        deleteItem
      )
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Machinery Deleted Successfully",
            text = res.data.message,
            link = `<a href="/operations">View Machinery List</a>`;
          successAlert(title, text, link);
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
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
    const productId = parseInt(document.getElementById("product-id").value);

    const addMachineryData = {
      name: machinery_name,
      "identification-no": machinery_identification,
      description: machinery_description,
      "product-id": productId,
    };

    axios
      .post(
        `${BASE_API_URL}/api/v1/operations/machinery-add.php`,
        addMachineryData
      )
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          let title = "Machinery Added Successfully",
            text = res.data.message,
            link = `<a href="/operations">View Machinery List</a>`;
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
  const handleUpdateMachinery = () => {
    const machinery_id = document.getElementById("machinery-id").value;
    const machinery_name = document.getElementById("machinery").value;
    const machinery_description = document.getElementById(
      "machinery-description"
    ).value;
    const machinery_identification = document.getElementById(
      "machinery-identification"
    ).value;
    const productId = parseInt(document.getElementById("product-id").value);

    const updateMachineryData = {
      "machinery-id": machinery_id,
      name: machinery_name,
      description: machinery_description,
      "identification-no": machinery_identification,
      "product-id": productId,
    };

    axios
      .post(
        `${BASE_API_URL}/api/v1/operations/machinery-update.php`,
        updateMachineryData
      )
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          let title = "Machinery Updated Successfully",
            text = res.data.message,
            link = `<a href="/operations">View Machinery List</a>`;
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
  const handleUpdateFormFields = (machineryItemData) => {
    if (document.getElementById("add-form-btn") !== null) {
      document.getElementById("machinery-id").value = machineryItemData.id;
      document.getElementById("machinery").value =
        machineryItemData.machinery_name;
      document.getElementById("machinery-description").value =
        machineryItemData.description;
      document.getElementById("machinery-identification").value =
        machineryItemData.identification_no;
      document.getElementById("machinery-identification").hidden = true;
    }
  };

  /** Retrive form data for client validation */
  const getAddMachineFormDataWrapper = () => {
    const machinery_name = document.getElementById("machinery").value;
    const machinery_description = document.getElementById(
      "machinery-description"
    ).value;
    const machinery_identification = document.getElementById(
      "machinery-identification"
    ).value;
    const productId = parseInt(document.getElementById("product-id").value);
    const productItem = products?.filter(({ id }) => id == productId);

    if (
      products === null ||
      products === undefined ||
      products[0] === undefined
    ) {
      errorAlert("Network Error", "Refresh Page");
    } else {
      const addMachineryData = {
        name: machinery_name,
        "identification-no": machinery_identification,
        description: machinery_description,
        "product-id": productId,
        validation: productItem[0].validation,
      };
      return addMachineryData;
    }
  };

  /** Retrive update form data for client validation */
  const getUpdateMachineFormDataWrapper = () => {
    const machinery_id = document.getElementById("machinery-id").value;
    const machinery_name = document.getElementById("machinery").value;
    const machinery_description = document.getElementById(
      "machinery-description"
    ).value;
    const machinery_identification = document.getElementById(
      "machinery-identification"
    ).value;
    const productId = parseInt(document.getElementById("product-id").value);
    const productItem = products?.filter(({ id }) => id == productId);

    if (
      products === null ||
      products === undefined ||
      products[0] === undefined
    ) {
      errorAlert("Network Error", "Refresh Page");
    } else {
      const updateMachineryData = {
        "machinery-id": machinery_id,
        name: machinery_name,
        description: machinery_description,
        "identification-no": machinery_identification,
        "product-id": productId,
        validation: productItem[0].validation,
      };
      return updateMachineryData;
    }
  };
  /**
   * handles location/product changes in the table
   */
  // const handleTableChange = (e) => {
  //   console.log("Table changed");
  //   console.log(e, "target");

  //   // reloadServerData()
  // };

  const hideIdentificationField = () => {};
  /** machinery List Table Data */
  const machineryListTableData = {
    tableTitle: "Machinery List",
    links: userProductPermission,

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
      id: "product-id",
      type: "select",
      name: "product",
      className: "form-control",
      options: products,
      required: true,
    },
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
                setShowUpdateMachinery(false);
                hideIdentificationField();
              }}
              showUpdateMachinery={showUpdateMachinery}
              content={addUpdateMachineryformData}
              loading={loading}
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getAddMachineFormDataWrapper()
                );
                if (validation === true) {
                  setLoading(true);
                  handleAddMachinery();
                }
              }}
              handleUpdateSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getUpdateMachineFormDataWrapper()
                );
                if (validation === true) {
                  setLoading(true);
                  handleUpdateMachinery();
                }
              }}
            />
            <CustomTableList
              content={machineryListTableData}
              filler="No machines added"
              dropdown
              change
            />
          </div>
        </div>
      </div>
    );
  };
  return <MachineryComponent />;
};

export default Machinery;
