import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import DispatchOrderList from "./dispatch-orders-list/dispatch-order-list";
import OrderForm from "./order-form/order-form";
import OrderReceipt from "./order-receipt/order-receipt";
import ViewOrders from "./vieworder-reciept/vieworders";

const OrderDashboard = () => {
  /**
   * Conditional page display to set which sub page is shown and this is made possible with the url property from useRouteMatch
   */
  const { url } = useRouteMatch();
  console.log(url);
  return (
    <PageWrapper>
      {url === "/placeorder" ? (
        <OrderForm />
      ) : url === "/vieworders" ? (
        <ViewOrders />
      ) : url === "/orderreceipt" ? (
        <OrderReceipt />
      ) : url === "/dispatchlist" ? (
        <DispatchOrderList />
      ) : null}
    </PageWrapper>
  );
};

export default OrderDashboard;
