import React from "react";
import { Switch, useRouteMatch } from "react-router";
import Account from "../components/account/account";
import AdminDashboard from "../components/admin/admin-dashboard";
import { CountdownTimer } from "../components/countdownTimer/countdown-timer";
import InspectorDashboard from "../components/inspector/inspector-dashboard";
import LoaderDashboard from "../components/loader/loader-dashboard";
import Navbar from "../components/navbar/navbar";
import OrderDashboard from "../components/orders/order-dashboard";
import Profile from "../components/profile/profile";
import Revenue from "../components/revenue/revenue";
import SecurityDashboard from "../components/security/security-dashboard";

const Pages = () => {
  const { url } = useRouteMatch();
  console.log("Pages: ", url);
  return (
    <>
      <Navbar />
      <Switch>
        {url === "/profile" ? (
          <Profile />
        ) : url === "/production" ? (
          <CountdownTimer />
        ) : url === "/singlerevenuereport" ? (
          <Revenue />
        ) : url === "/revenuereport" ? (
          <Revenue />
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
        ) : url === "/dispatchlist" ? (
          <OrderDashboard />
        ) : url === "/loader" ? (
          <LoaderDashboard />
        ) : url === "/inspect" ? (
          <InspectorDashboard />
        ) : url === "/security" ? (
          <SecurityDashboard />
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
