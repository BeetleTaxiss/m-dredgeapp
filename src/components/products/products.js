import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Element } from "react-scroll";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import AddUpdateProduct from "./add-update-product";

import "./product.css";

const Products = () => {
  const [productsList, setProductsList] = useState();
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const response = async () => {
      let productsListBody = [];
      try {
        await axios
          .get(`${BASE_API_URL}/api/v1/product/list.php`)
          .then((res) => {
            console.log("Products list response data: ", res.data);
            if (res.data.error) {
              let title = "Server Error Response",
                text = res.data.message;
              errorAlert(title, text);
            } else {
              const productsListItems = res.data.data;
              productsListItems.map((item) => {
                const userDetails = JSON.parse(localStorage.getItem("user")),
                  user_name = userDetails.username,
                  user_id = userDetails.id;
                const product = item.product,
                  product_id = item.id,
                  description = item.description,
                  price = item.price,
                  unit = item.unit,
                  measurement = item.measurement;

                const productItemData = {
                  user: user_name,
                  user_id: user_id,
                  product: product,
                  product_id: product_id,
                  description: description,
                  price: price,
                  unit: unit,
                  measurement: measurement,
                };

                const deleteProductItemData = {
                  user: user_name,
                  "user-id": user_id,
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
                        handleUpdateFormFields(productItemData);
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

                return (productsListBody = productsListBody.concat(
                  currentProductItem
                ));
              });
              setProductsList(productsListBody);
              console.log("Product List Body: ", productsList);
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
  }, []);

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
        console.log("Delete product response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Product Deleted Successfully",
            text = res.data.message,
            link = `<a href="/products">View Product List</a>`;
          successAlert(title, text, link);
        }
      });
  };
  const handleAddProduct = () => {
    const product_name = document.getElementById("product").value;
    const product_unit = document.getElementById("product-unit").value;
    const product_price = document.getElementById("product-price").value;
    const product_measurement = document.getElementById("product-measurement")
      .value;
    const product_description = document.getElementById("product-description")
      .value;
    const addProductData = {
      product: product_name,
      unit: product_unit,
      price: product_price,
      measurement: product_measurement,
      description: product_description,
    };
    console.log("Add product API values: ", addProductData);
    axios
      .post(`${BASE_API_URL}/api/v1/product/add.php`, addProductData)
      .then((res) => {
        console.log("Add product response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Product Added Successfully",
            text = res.data.message,
            link = `<a href="/products">View Product List</a>`;
          successAlert(title, text, link);
        }
      });
  };
  const handleUpdateProduct = () => {
    const user = document.getElementById("user").value;
    const user_id = document.getElementById("user-id").value;
    const product_id = document.getElementById("product-id").value;
    const product_name = document.getElementById("product").value;
    const product_unit = document.getElementById("product-unit").value;
    const product_price = document.getElementById("product-price").value;
    const product_measurement = document.getElementById("product-measurement")
      .value;
    const product_description = document.getElementById("product-description")
      .value;
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
    console.log("Update product API values: ", updateProductData);
    axios
      .put(`${BASE_API_URL}/api/v1/product/update.php`, updateProductData)
      .then((res) => {
        console.log("Add product response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          let title = "Product Updated Successfully",
            text = res.data.message,
            link = `<a href="/products">View Product List</a>`;
          successAlert(title, text, link);
        }
      });
  };
  const handleUpdateFormFields = (productItemData) => {
    if (
      document.getElementById("add-form-btn") !== null &&
      document.getElementById("edit-btn-icon") !== null
    ) {
      document.getElementsByClassName("edit-btn-icon").disabled = true;
      console.log(document.getElementById("add-form-btn"));
    } else {
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
    console.log("Update State", showUpdateProduct);
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
              onClick={() => setShowUpdateProduct((prev) => !prev)}
              showUpdateProduct={showUpdateProduct}
              content={addUpdateProductformData}
              loading={loading}
              handleAddSubmit={handleAddProduct}
              handleUpdateSubmit={handleUpdateProduct}
            />
            <CustomTableList content={productListTableData} />
          </div>
        </div>
      </div>
    );
  };
  return <ProductsComponent />;
};

export default Products;