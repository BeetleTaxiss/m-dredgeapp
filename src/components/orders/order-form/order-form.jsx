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
import CustomDetailedStats from "../../cards/CustomDetailedStats";

const OrderForm = () => {
  const [order, setOrder] = useState();
  const [products, setProducts] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailedStats, setDetailedStats] = useState(["loading"]);

  /** User Details state is passed to useGetUserDetails hook which makes an async call to the store (react persistent store manager) and get single store entries  */
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

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

  /** Fetch total orders statistics */
  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let detailedStatsList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/production/summary.php`)
        .then((res) => {
          let detailedStatsResponseList;
          let detailedStatsResponse = res.data;
          const stock = detailedStatsResponse?.stock[0]?.stock;
          detailedStatsResponseList = [{ stock }];

          console.log("Detailed: ", detailedStatsResponse);
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            detailedStatsResponseList.map((item, id) => {
              const total_stock = Math.round(item.stock);
              const detailedStatsSchema = {
                chat: total_stock ? true : false,
                stats: total_stock,
                legend: total_stock ? "Total stock" : null,
              };

              return (detailedStatsList =
                detailedStatsList.concat(detailedStatsSchema));
            });
            setDetailedStats(detailedStatsList);
            console.log("Recent order list: ", detailedStats);
          }
        })
        .catch((error) => {
          errorAlert("Network Error", error);
        });
    };
    response();

    return () => {
      source.cancel();
    };
  }, [userName, userId, refreshData]);

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/product/list.php`)
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log("Products Error: ", res.data.error);
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

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);
  console.log("User deetails: ", userName, userId);
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
    console.log("User deetails in submit: ", userName, userId);
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
    // if (error || !error) {
    //   setLoading(true);
    //   document.getElementById("loading-btn").disabled = true;
    // }
    axios
      .post(`${BASE_API_URL}/api/v1/order/add.php`, addOrderData)
      .then((res) => {
        console.log("ADD ORDER: ", res.data);
        if (res.data.error) {
          setError(true);
          errorAlert("Order not completed", res.data.message);
          setLoading(false);
        } else {
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
          reloadServerData();
          setOrder(res.data.data);
          document.getElementById("qty").value = "";
          document.getElementById("truckNo").value = "";
          document.getElementById("select").value = 0;
          // document.getElementById("comment").value = "";
          setTotalPrice(0);
          setError(false);
          setLoading(false);
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
          <CustomDetailedStats data={detailedStats} />
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
                        setLoading(true);
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
