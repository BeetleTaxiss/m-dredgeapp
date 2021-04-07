import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormData } from "../../hooks/useFormData";
import { FormDetails, SelectInput } from "./order-form-details";
import { functionUtils } from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";
import { BASE_API_URL } from "../../hooks/API";

const OrderForm = () => {
  const [product, setProduct] = useState();

  useEffect(() => {
    const request = axios
      .get(`${BASE_API_URL}/api/v1/product/list.php`)
      .then((res) => {
        console.log(res.data);
        const data = res.data.data;
        const newArray = data.unshift({ product: "Select Product", id: 0 });
        console.log("New Array", newArray);
        setFormInput((state) => ({
          ...state,
          products: data,
          "unit-price": data[0],
        }));
        console.log("New Array: ", data);
      });
  }, []);
  console.log("Product2 : ", product);
  // CALCULATE THE COST OF AN ORDER BASED ON GIVEN BUCKET NUMBER VALUE AND BUCKET PRICE

  const [formInput, setFormInput] = React.useState({
    products: [],
    product: "Select Product",
    qty: "",
    "total-price": 0,
    "unit-price": 0,
    "truck-no": "",
  });

  const handleChange = ({ currentTarget: { name, value } }) => {
    setFormInput((state) => ({
      ...state,
      [name]: value,
    }));
    // FILTER
    const data = formInput.products;
    const productItem = data.filter(
      (product) => product.id === formInput.product
    );

    console.log("Product Item: ", productItem[0]);
    // CALCULATION
    const orderCost = formInput?.qty * productItem[0].price;
    console.log("Bucket Qty: ", formInput?.qty);
    console.log("Bucket price: ", productItem[0].price);
    console.log(orderCost);
    setProduct(orderCost);
    setFormInput((state) => ({
      ...state,
      "total-price": product,
    }));
  };

  const { formData } = useFormData(formInput);
  console.log("ADD ORDER PAGE: ", formInput.product);
  console.log("Product : ", product);

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
                      handleChange={handleChange}
                    />
                  ))}
                  <button
                    onClick={() =>
                      functionUtils.handleOrderFormSubmit(formInput)
                    }
                    className="mt-4 btn btn-primary"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
