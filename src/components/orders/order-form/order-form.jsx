import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormData } from "../../../hooks/useFormData";
import { FormDetails } from "./order-form-details";
import WidgetHeader from "../../general/widget-header";
import { BASE_API_URL } from "../../../hooks/API";
import LoadingButton from "../../general/loading-button";
import Chat from "../../../assets/container.svg";
import {
  errorAlert,
  functionUtils,
  productDropdownForTable,
  successAlertWithFunction,
  useGetUserDetails,
  useProductLocationPermission,
  validateProductLocationPermission,
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
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

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
        .get(`${BASE_API_URL}/api/v1/production/summary.php`, {
          params: {
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let detailedStatsResponseList;
          let detailedStatsResponse = res.data;
          const stock = detailedStatsResponse?.stock.stock;
          detailedStatsResponseList = [{ stock }];

          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            detailedStatsResponseList.map((item, id) => {
              const total_stock = Math.round(item.stock);
              const detailedStatsSchema = {
                icon: Chat,
                stats: total_stock,
                legend: total_stock ? "Total stock" : null,
                array: true,
              };

              return (detailedStatsList =
                detailedStatsList.concat(detailedStatsSchema));
            });
            setDetailedStats(detailedStatsList);
          }
        })
        .catch((error) => {
          errorAlert("Network Error", error);
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

  const handleOrderChange = () => {
    // Get form values with document,getById
    const qtyValue = document.getElementById("qty").value;

    const truckNoValue = document.getElementById("truckNo").value;
    const selectValue = document.getElementById("select").value;

    // Filter Products Array to get single product
    let product = products?.filter((product) => product.id === selectValue);

    if (product === null || product === undefined) {
      errorAlert("Network Error", "Refresh Page");
    } else {
      // Calculate the cost of an order
      const orderCost = qtyValue * product[0].price;
      // Set the value of an order to the UI
      setTotalPrice(orderCost);
      return {
        product,
      };
    }
  };

  const handleOrderSubmit = () => {
    const qtyValue = parseInt(document.getElementById("qty").value);
    const truckNoValue = document.getElementById("truckNo").value;
    const selectValue = parseInt(document.getElementById("select").value);
    // const commentValue = document.getElementById("comment").value;
    const { product } = handleOrderChange();

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

    // if (error || !error) {
    //   setLoading(true);
    //   document.getElementById("loading-btn").disabled = true;
    // }
    axios
      .post(`${BASE_API_URL}/api/v1/order/add.php`, addOrderData)
      .then((res) => {
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
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
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
    const userid = /^\d+$/.test(userId) ? parseInt(userId) : NaN;

    //let { product } = handleOrderChange();
    let productData = handleOrderChange() ?? {};

    let { product } = productData;

    /** Error handler for product value */
    if (
      product === null ||
      product === undefined ||
      products[0] === undefined
    ) {
      errorAlert("Network Error", "Refresh Page");
    } else {
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
      return addOrderData;
    }
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
        <WidgetHeader
          title="Make an order"
          links={userProductPermission}
          dropdown
          change
        />
        <div
          className="widget-content widget-content-area"
          style={{ padding: "3rem", display: "grid" }}
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
