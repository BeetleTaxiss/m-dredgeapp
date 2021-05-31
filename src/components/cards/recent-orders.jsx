import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { Orders, TableHeading } from "../general/table-components";
import { BASE_API_URL } from "../../hooks/API";
import {
  productDropdownForTable,
  useGetUserDetails,
  validateProductLocationPermission,
} from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";
const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);
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

    const response = async () => {
      let recentOrdersList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/order/list.php`, {
          params: {
            count: "5",
            "product-id":
              productId === undefined && userProductPermission !== undefined
                ? userProductPermission[0]?.id
                : productId,
          },
        })
        .then((res) => {
          let recentOrdersResponse = res.data.data;

          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            recentOrdersResponse.map((item, id) => {
              const order_paid_status = item.paid;
              const order_dispatched_status = item.dispatched;

              const currentOrderSchema = {
                customer: item.truck_no,
                product: item.product,
                invoice: item.order_ref,
                price: item.total_price,
                status:
                  order_paid_status === "1"
                    ? "Paid"
                    : order_dispatched_status === "1"
                    ? "Dispatched"
                    : "Pending",
                statusColor:
                  order_paid_status === "1"
                    ? "success"
                    : order_dispatched_status === "1"
                    ? "info"
                    : "warning",
              };

              return (recentOrdersList =
                recentOrdersList.concat(currentOrderSchema));
            });
            setRecentOrders(recentOrdersList);
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

  const RecentOrdersComponent = () => (
    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-table-two">
        <div className="widget-heading">
          <WidgetHeader
            title="Recent Orders"
            links={userProductPermission}
            dropdown
            change
          />
        </div>

        <div className="widget-content">
          <div className="table-responsive">
            {/* Recent Orders */}
            <table className="table">
              {recentOrders.length <= 0 ? (
                <>
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </>
              ) : (
                <>
                  {/* TABLE HEADING */}
                  <TableHeading />
                  <tbody>
                    {/* Table Information */}

                    {recentOrders.map((order, i) => (
                      <Orders key={i} order={order} />
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  return <RecentOrdersComponent />;
};

export default RecentOrders;
