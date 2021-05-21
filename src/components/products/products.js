import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import AddUpdateProduct from "./add-update-product";

import "./product.css";
import { functionUtils, useGetUserDetails } from "../../hooks/function-utils";

const Products = () => {
  const [productsList, setProductsList] = useState(["loading"]);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let productsListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/product/list.php`)
          .then((res) => {
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const productsListItems = res.data.data;
              productsListItems.map((item) => {
                const product = item.product,
                  product_id = item.id,
                  description = item.description,
                  price = item.price,
                  unit = item.unit,
                  measurement = item.measurement;

                const productItemData = {
                  user: userName,
                  user_id: userId,
                  product: product,
                  product_id: product_id,
                  description: description,
                  price: price,
                  unit: unit,
                  measurement: measurement,
                };

                const deleteProductItemData = {
                  user: userName,
                  "user-id": userId,
                  product: product,
                  "product-id": product_id,
                };

                const currentProductItem = {
                  id: product_id,
                  fields: [
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: product,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: price,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: unit,
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      item: measurement,
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
                        setShowUpdateProduct(true);
                        setTimeout(
                          () => handleUpdateFormFields(productItemData),
                          500
                        );
                      },
                    },
                    {
                      class: "text-left",
                      itemClass: "text-center",
                      delete: true,
                      onClick: () =>
                        warningAlert(
                          `Are you sure you want to delete this product: ${product}`,
                          deleteProductItemData
                        ),
                    },
                  ],
                };

                return (productsListBody =
                  productsListBody.concat(currentProductItem));
              });
              setProductsList(productsListBody);
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
  }, [userName, userId, refreshData]);

  useEffect(() => {}, [showUpdateProduct]);

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
        handleDeleteProductItem(deleteItem);
      }
    });
  };

  const handleDeleteProductItem = (deleteItem) => {
    axios
      .post(`${BASE_API_URL}/api/v1/product/delete.php`, deleteItem)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Product Deleted Successfully",
            text = res.data.message,
            link = `<a href="/products">View Product List</a>`;
          successAlert(title, text, link);
          reloadServerData();
        }
      });
  };
  const handleAddProduct = () => {
    const product_name = document.getElementById("product").value;
    const product_unit = document.getElementById("product-unit").value;
    const product_price = document.getElementById("product-price").value;
    const product_measurement = document.getElementById(
      "product-measurement"
    ).value;
    const product_description = document.getElementById(
      "product-description"
    ).value;
    const addProductData = {
      product: product_name,
      unit: product_unit,
      price: product_price,
      measurement: product_measurement,
      description: product_description,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/product/add.php`, addProductData)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          let title = "Product Added Successfully",
            text = res.data.message,
            link = `<a href="/products">View Product List</a>`;
          successAlert(title, text, link);
          reloadServerData();
          setShowUpdateProduct(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
      });
  };
  const handleUpdateProduct = () => {
    const user = document.getElementById("user").value;
    const user_id = document.getElementById("user-id").value;
    const product_id = document.getElementById("product-id").value;
    const product_name = document.getElementById("product").value;
    const product_unit = document.getElementById("product-unit").value;
    const product_price = document.getElementById("product-price").value;
    const product_measurement = document.getElementById(
      "product-measurement"
    ).value;
    const product_description = document.getElementById(
      "product-description"
    ).value;
    const updateProductData = {
      user: user,
      "user-id": user_id,
      "product-id": product_id,
      product: product_name,
      unit: product_unit,
      price: product_price,
      measurement: product_measurement,
      description: product_description,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/product/update.php`, updateProductData)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          let title = "Product Updated Successfully",
            text = res.data.message,
            link = `<a href="/products">View Product List</a>`;
          successAlert(title, text, link);
          reloadServerData();
          setShowUpdateProduct(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
      });
  };
  const handleUpdateFormFields = (productItemData) => {
    if (document.getElementById("add-form-btn") !== null) {
      document.getElementById("user").value = productItemData.user;
      document.getElementById("user-id").value = productItemData.user_id;
      document.getElementById("product-id").value = productItemData.product_id;
      document.getElementById("product").value = productItemData.product;
      document.getElementById("product-unit").value = productItemData.unit;
      document.getElementById("product-price").value = productItemData.price;
      document.getElementById("product-measurement").value =
        productItemData.measurement;
      document.getElementById("product-description").value =
        productItemData.description;
    }
  };

  /** Retrive add products form data for client validation */
  const getAddProductsFormData = () => {
    const product_name = document.getElementById("product").value;
    const product_unit = document.getElementById("product-unit").value;
    const product_price = document.getElementById("product-price").value;
    const product_measurement = document.getElementById(
      "product-measurement"
    ).value;
    const product_description = document.getElementById(
      "product-description"
    ).value;
    const addProductData = {
      product: product_name,
      unit: product_unit,
      price: product_price,
      measurement: product_measurement,
      description: product_description,
    };
    return addProductData;
  };
  /** Retrive update products form data for client validation */
  const getUpdateProductsFormData = () => {
    const user = document.getElementById("user").value;
    const user_id = document.getElementById("user-id").value;
    const product_id = document.getElementById("product-id").value;
    const product_name = document.getElementById("product").value;
    const product_unit = document.getElementById("product-unit").value;
    const product_price = document.getElementById("product-price").value;
    const product_measurement = document.getElementById(
      "product-measurement"
    ).value;
    const product_description = document.getElementById(
      "product-description"
    ).value;
    const updateProductData = {
      user: user,
      "user-id": user_id,
      "product-id": product_id,
      product: product_name,
      unit: product_unit,
      price: product_price,
      measurement: product_measurement,
      description: product_description,
    };
    return updateProductData;
  };
  /** Product List Table Data */
  const productListTableData = {
    tableTitle: "",
    header: [
      { class: "", title: "Product" },
      { class: "", title: "Price" },
      { class: "", title: "Unit" },
      { class: "", title: "Measurement" },
      { class: "", title: "Description" },
      { class: "", title: "" },
      { class: "", title: "" },
    ],

    body: productsList,
  };
  const addUpdateProductformData = [
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
      id: "product-id",
      type: "text",
      name: "product-id",
      holder: "",
      className: "form-control",
      hidden: true,
      required: false,
    },
    {
      id: "product",
      type: "text",
      name: "product",
      holder: "Product Name",
      className: "form-control",
      required: true,
    },
    {
      id: "product-price",
      type: "text",
      name: "price",
      holder: "Product's Price",
      className: "form-control",
      required: true,
    },
    {
      id: "product-unit",
      type: "text",
      name: "unit",
      holder: "Product's Unit",
      className: "form-control",
      required: true,
    },
    {
      id: "product-measurement",
      type: "text",
      name: "measurement",
      holder: "Product's Measurement",
      className: "form-control",
      required: true,
    },
    {
      id: "product-description",
      type: "textarea",
      name: "description",
      holder: "Product Description",
      className: "form-control",
      required: false,
    },
  ];

  /** Products Component */
  const ProductsComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <Element id="update-form" name="update-form" />
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Set Product Values" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <AddUpdateProduct
              onClick={() => setShowUpdateProduct(false)}
              showUpdateProduct={showUpdateProduct}
              content={addUpdateProductformData}
              loading={loading}
              handleAddSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getAddProductsFormData()
                );
                if (validation === true) {
                  setLoading(true);
                  handleAddProduct();
                }
              }}
              handleUpdateSubmit={() => {
                const validation = functionUtils.validateFormInputs(
                  getUpdateProductsFormData()
                );
                if (validation === true) {
                  setLoading(true);
                  handleUpdateProduct();
                }
              }}
            />
            <CustomTableList
              content={productListTableData}
              filler="No Product added"
            />
          </div>
        </div>
      </div>
    );
  };
  return <ProductsComponent />;
};

export default Products;
