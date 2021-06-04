import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { BASE_API_URL } from "../../hooks/API";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";
const TotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState({});
  const [userPermissions, setUserPermissions] = useState();
  const [userProductPermission, setUserProductPermission] = useState();
  const [productId, setProductId] = useState();

  /**
   * Optional paramaters not needed in the useGetUserDetails hook
   */
  const optionalParams = ["d", "7", "d", "7", "s", "w"];

  /*
   * Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure   * delayed async fetch is accounted for
   */
  useGetUserDetails(...optionalParams, setUserPermissions);

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
          }
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
      });
  }, [userPermissions, productId]);

  /**
   *  Get orders from DB
   */

  useEffect(() => {
    const source = axios.CancelToken.source();
    let totalRevenueSchema;
    const response = async () => {
      await axios
        .get(`${BASE_API_URL}/api/v1/order/summary.php`, {
          params: {
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let totalRevenueResponse = res.data;
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            const total_revenue = totalRevenueResponse.orders.total_price;
            const orders_completed_price =
              totalRevenueResponse.orders_completed.total_price;
            totalRevenueSchema = {
              title: "Total Revenue",
              value: total_revenue,
              orders_completed_price: orders_completed_price,
            };

            setTotalRevenue(totalRevenueSchema);
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
  }, [userProductPermission]);

  /** Multipurpose success, error and warning pop-ups for handling and displaying errors, success and warning alerts */
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  const { title, value, orders_completed_price } = totalRevenue;
  const price_difference = value - orders_completed_price;
  const TotalRevenueComponent = () => (
    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
      <div
        className="widget widget-account-invoice-two"
        style={widgetInvoice.invoiceTwo}
      >
        <div className="widget-content">
          <div className="account-box">
            <div
              className="info"
              style={{
                flexDirection: "column",
                gap: "1.5rem",
                marginBottom: "1.4rem",
              }}
            >
              <div className="inv-title">
                <WidgetHeader
                  title={title ? title : "Total Revenue"}
                  links={userProductPermission}
                  dropdown
                  change
                />
              </div>
              <div className="inv-balance-info" style={{ textAlign: "center" }}>
                <p className="inv-balance" style={{ fontSize: "45px" }}>
                  {`₦${
                    value === undefined || NaN
                      ? functionUtils.addCommaToNumbers("00000000")
                      : functionUtils.addCommaToNumbers(value)
                  }`}
                </p>

                <span
                  className="inv-stats balance-credited"
                  style={{ fontSize: "18px" }}
                >
                  {" "}
                  {`+${
                    price_difference === undefined || isNaN(price_difference)
                      ? "0000"
                      : price_difference
                  }`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return <TotalRevenueComponent />;
};
const widgetInvoice = {
  invoiceTwo: {
    padding: "22px 19px",
    border: "none",
    boxShadow:
      "0 0.1px 0px rgba(0, 0, 0, 0.002), 0 0.2px 0px rgba(0, 0, 0, 0.003), 0 0.4px 0px rgba(0, 0, 0, 0.004), 0 0.6px 0px rgba(0, 0, 0, 0.004), 0 0.9px 0px rgba(0, 0, 0, 0.005), 0 1.2px 0px rgba(0, 0, 0, 0.006), 0 1.8px 0px rgba(0, 0, 0, 0.006), 0 2.6px 0px rgba(0, 0, 0, 0.007), 0 3.9px 0px rgba(0, 0, 0, 0.008), 0 7px 0px rgba(0, 0, 0, 0.01)",
    background: "#3b3f5c",
    backgroundImage: "linear-gradient(to top, #09203f 0%, #537895 100%)",
    backgroundBlendMode: "multiply",
  },
};

export default TotalRevenue;
