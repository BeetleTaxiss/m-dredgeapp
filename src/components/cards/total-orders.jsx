import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { BASE_API_URL } from "../../hooks/API";
import ChartProgress from "../../assets/chartprogressline.svg";
import {
  functionUtils,
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";

const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState(null);
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
    let totalOrdersSchema;
    const response = async () => {
      await axios
        .get(`${BASE_API_URL}/api/v1/order/summary.php`, {
          params: {
            count: "15",
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let totalOrdersResponse = res.data;
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            const orders_count = totalOrdersResponse.orders.count;

            totalOrdersSchema = { title: "Total Orders", value: orders_count };

            setTotalOrders(totalOrdersSchema);
          }
        })
        .catch((error) => {
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
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

  return (
    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-one">
        <WidgetHeader
          title="Orders"
          links={userProductPermission}
          dropdown
          change
        />
        {totalOrders === null ? (
          <Skeleton height={130} />
        ) : (
          <div className="w-chart">
            <div
              className="w-chart-section total-visits-content"
              style={{ width: "100%" }}
            >
              <div className="w-detail">
                <p className="w-title">{totalOrders.title}</p>
                <p className="w-stats">
                  {functionUtils.addCommaToNumbers(totalOrders.value)}
                </p>
              </div>
              <div className="w-chart-render-one">
                <div id="total-users">
                  <div
                    id="apexchartsuxfyuapj"
                    className="apexcharts-canvas apexchartsuxfyuapj light"
                    style={{ width: "312px", height: "58px" }}
                  >
                    {/* BEGINNING OF CHART PROGRESS LINE */}
                    <ion-icon
                      src={ChartProgress}
                      id="SvgjsSvg3145"
                      style={{
                        width: "312px",
                        height: "58px",
                      }}
                    />
                    {/* END OF CHART PROGRESS LINE */}
                    <div className="apexcharts-legend"></div>
                    <div
                      className="apexcharts-tooltip light"
                      style={{ left: "168.641px", top: "23px" }}
                    >
                      <div
                        className="apexcharts-tooltip-series-group active"
                        style={{ display: "flex" }}
                      >
                        <span
                          className="apexcharts-tooltip-marker"
                          style={{ backgroundColor: "rgb(33, 150, 243)" }}
                        ></span>
                        <div
                          className="apexcharts-tooltip-text"
                          style={{
                            fontFamily:
                              "Helvetica, Arial, sans-serif; font-size: 12px",
                          }}
                        >
                          <div className="apexcharts-tooltip-y-group">
                            <span className="apexcharts-tooltip-text-label"></span>
                            <span className="apexcharts-tooltip-text-value">
                              41
                            </span>
                          </div>
                          <div className="apexcharts-tooltip-z-group">
                            <span className="apexcharts-tooltip-text-z-label"></span>
                            <span className="apexcharts-tooltip-text-z-value"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="w-chart-section paid-visits-content">
            <div className="w-detail">
              <p className="w-title">Paid Visits</p>
              <p className="w-stats">7,929</p>
            </div>
            <div className="w-chart-render-one">
              <div id="paid-visits"></div>
            </div>
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalOrders;
