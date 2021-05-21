import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { Orders, TableHeading } from "../general/table-components";
import { BASE_API_URL } from "../../hooks/API";
const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let recentOrdersList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/order/list.php`, {
          params: { count: "5" },
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

    response();

    return () => {
      source.cancel();
    };
  }, []);

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
          <h5 className="">Recent Orders</h5>
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
