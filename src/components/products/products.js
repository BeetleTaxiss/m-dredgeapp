import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import AddUpdateProduct from "./add-update-product";

const Units = () => {
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
                const product = item.product,
                  product_id = item.id,
                  description = item.description,
                  price = item.price,
                  unit = item.unit,
                  measurement = item.measurement;
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
                      class: "text-center",
                      itemClass: "btn btn-primary",
                      // toStockpile: toStockpileData,
                      // warningAlert: warningAlert,
                      link: true,
                      linkText: "Stockpile",
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

  // const warningAlert = (title, toStockpile) => {
  //   Swal.fire({
  //     icon: "warning",
  //     title: title,
  //   }).then((value) => {
  //     if (value.isConfirmed) {
  //       handleStockpile(toStockpile);
  //     }
  //   });
  // };
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
  const handleUpdateProduct = () => {};
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
    ],

    body: productsList,
  };
  const addUpdateFormData = {
    addProductformData: [
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
    ],
    updateProductformData: [
      {
        id: "update-product",
        type: "text",
        name: "product",
        holder: "Product Name",
        className: "form-control",
        required: true,
      },
      {
        id: "update-product-price",
        type: "text",
        name: "price",
        holder: "Product's Price",
        className: "form-control",
        required: true,
      },
      {
        id: "update-product-unit",
        type: "text",
        name: "unit",
        holder: "Product's Unit",
        className: "form-control",
        required: true,
      },
      {
        id: "update-product-measurement",
        type: "text",
        name: "measurement",
        holder: "Product's Measurement",
        className: "form-control",
        required: true,
      },
      {
        id: "update-product-description",
        type: "textarea",
        name: "description",
        holder: "Product Description",
        className: "form-control",
        required: false,
      },
    ],
  };

  /** Products Component */
  const ProductsComponent = () => {
    return (
      <div id="basic" className="col-lg-12 layout-spacing">
        <div className="statbox widget box box-shadow">
          {/* HEADER TITLE FOR THE FORM */}
          <WidgetHeader title="Set Product Values" />
          <div
            className="widget-content widget-content-area searchable-container list"
            style={{ display: "grid", padding: "2rem", gap: "2rem" }}
          >
            <AddUpdateProduct
              showUpdateProduct={showUpdateProduct}
              content={addUpdateFormData}
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

export default Units;
