import React from "react";
import { Switch, useRouteMatch } from "react-router";
import Account from "../components/account/account";
import AdminDashboard from "../components/admin/admin-dashboard";
import { CountdownTimer } from "../components/countdownTimer/countdown-timer";
import Navbar from "../components/navbar/navbar";
import OrderDashboard from "../components/orders/order-dashboard";

const Pages = () => {
  const { url } = useRouteMatch();
  return (
    <>
      <Navbar />
      <Switch>
        {url === "/production" ? (
          <CountdownTimer />
        ) : url === "/postexpense" ? (
          <Account />
        ) : url === "/singleexpensereport" ? (
          <Account />
        ) : url === "/expensereport" ? (
          <Account />
        ) : url === "/placeorder" ? (
          <OrderDashboard />
        ) : url === "/vieworders" ? (
          <OrderDashboard />
        ) : url === "/orderreceipt" ? (
          <OrderDashboard />
        ) : url === "/users" ? (
          <AdminDashboard />
        ) : url === "/units" ? (
          <AdminDashboard />
        ) : null}
      </Switch>
    </>
  );
};

export default Pages;
