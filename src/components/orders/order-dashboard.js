import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import OrderForm from "./order-form";
import OrderReceipt from "./order-receipt";
import ViewOrders from "./vieworders";

const OrderDashboard = () => {
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
      ) : null}
    </PageWrapper>
  );
};

export default OrderDashboard;
