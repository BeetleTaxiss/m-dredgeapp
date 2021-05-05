import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormData } from "../../../hooks/useFormData";
import { FormDetails } from "./order-form-details";
import WidgetHeader from "../../general/widget-header";
import { BASE_API_URL } from "../../../hooks/API";
import LoadingButton from "../../general/loading-button";
import {
  errorAlert,
  functionUtils,
  successAlertWithFunction,
  useGetUserDetails,
} from "../../../hooks/function-utils";

const OrderForm = () => {
  const [order, setOrder] = useState();
  const [products, setProducts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  /** User Details state is passed to useGetUserDetails hook which makes an async call to the store (react persistent store manager) and get single store entries  */
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/product/list.php`)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log("Products Erro: ", res.data.error);
        } else {
          const data = res.data.data;
          data.unshift({
            id: "0",
            product: "Select Product",
            price: 0,
            validation: "Can't select this option",
          });
          setProducts(data);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, []);

  /** Get user Details from Store */
  useGetUserDetails(setUserName, setUserId);

  const handleOrderChange = () => {
    // Get form values with document,getById
    const qtyValue = document.getElementById("qty").value;
    console.log("Qty Value: ", qtyValue);
    const truckNoValue = document.getElementById("truckNo").value;
    console.log("truckNo Value: ", truckNoValue);
    const selectValue = document.getElementById("select").value;
    console.log("Select Value: ", selectValue);

    // Filter Products Array to get single product
    const product = products?.filter((product) => product.id === selectValue);
    console.log("Product: ", product);
    // Calculate the cost of an order
    const orderCost = qtyValue * product[0].price;
    console.log("Order Cost: ", orderCost);
    // Set the value of an order to the UI
    setTotalPrice(orderCost);

    return {
      product,
    };
  };

  const handleOrderSubmit = () => {
    const qtyValue = parseInt(document.getElementById("qty").value);
    const truckNoValue = document.getElementById("truckNo").value;
    const selectValue = parseInt(document.getElementById("select").value);
    // const commentValue = document.getElementById("comment").value;
    const { product } = handleOrderChange();
    console.log("Submitted Product", product);

    const addOrderData = {
      "product-id": selectValue,
      product: product[0].product,
      user: userName,
      "user-id": parseInt(userId),
      qty: qtyValue,
      unit: product[0].unit,
      "unit-price": product[0].price,
      measurement: product[0].measurement,
      "total-price": totalPrice,
      "truck-no": truckNoValue,
      description: product[0].description,
      comment: "",
    };
    console.log("Add Order Data: ", addOrderData);
    if (error || !error) {
      setLoading(true);
      document.getElementById("loading-btn").disabled = true;
    }
    axios
      .post(`${BASE_API_URL}/api/v1/order/add.php`, addOrderData)
      .then((res) => {
        console.log("ADD ORDER: ", res.data);
        if (res.data.error) {
          setError(true);
          errorAlert("Order not completed", res.data.message);
        } else {
          setError(false);
          /** Handle order on successful confirmation */
          const handleConfirmed = () =>
            document.getElementById("order-success").click();

          successAlertWithFunction(
            "Order completed successfully",
            res.data.message,
            false,
            "View Order ->",
            handleConfirmed
          );

          setOrder(res.data.data);
          document.getElementById("qty").value = "";
          document.getElementById("truckNo").value = "";
          document.getElementById("select").value = 0;
          // document.getElementById("comment").value = "";
          setTotalPrice(0);
        }
      });
  };

  /** wrapper to get form data for validation */
  const getFormDataWrapper = () => {
    const qtyValue = /^\d+$/.test(document.getElementById("qty").value)
      ? parseInt(document.getElementById("qty").value)
      : NaN;
    const truckNoValue = document.getElementById("truckNo").value;
    const selectValue = /^\d+$/.test(document.getElementById("select").value)
      ? parseInt(document.getElementById("select").value)
      : NaN;
    const { product } = handleOrderChange();
    const userid = /^\d+$/.test(userId) ? parseInt(userId) : NaN;
    const addOrderData = {
      "product-id": selectValue,
      product: product[0].product,
      validation: product[0].validation,
      user: userName,
      "user-id": userid,
      qty: qtyValue,
      unit: product[0].unit,
      "unit-price": product[0].price,
      measurement: product[0].measurement,
      "total-price": totalPrice,
      "truck-no": truckNoValue,
      description: product[0].description,
    };
    console.log("Get form data: ", addOrderData);
    return addOrderData;
  };

  /** Validate total price before sendind */
  let validatedTotalPrice = isNaN(totalPrice)
    ? "Input a Number"
    : `${functionUtils.naira}${functionUtils.addCommaToNumbers(totalPrice)}`;

  /** Form data needed to populate the order form */
  const { formData } = useFormData(products, validatedTotalPrice);

  return (
    <div id="basic" className="col-lg-12 layout-spacing">
      <div className="statbox widget box box-shadow">
        {/* HEADER TITLE FOR THE FORM */}
        <WidgetHeader title="Make an order" />
        <div
          className="widget-content widget-content-area"
          style={{ padding: "3rem" }}
        >
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  {/* SUB-TITLE FOR THE FORM */}
                  <p>Fill in order details</p>

                  {formData?.map((item, i) => (
                    <FormDetails
                      key={i}
                      item={item}
                      handleChange={handleOrderChange}
                    />
                  ))}
                  <LoadingButton
                    handleSubmit={() => {
                      const validate = functionUtils.validateFormInputs(
                        getFormDataWrapper()
                      );
                      console.log("Validate status: ", validate);
                      if (validate === true) {
                        return handleOrderSubmit();
                      }
                    }}
                    loading={loading}
                    text="Place Order"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Link
          id="order-success"
          style={{ visibility: "hidden" }}
          to={{
            pathname: "/orderreceipt",
            state: order,
          }}
        />
      </div>
    </div>
  );
};

export default OrderForm;
