import React from "react";
import { Switch, useRouteMatch } from "react-router";
import Account from "../components/account/account";
import AdminDashboard from "../components/admin/admin-dashboard";
import InspectorDashboard from "../components/inspector/inspector-dashboard";
import LoaderDashboard from "../components/loader/loader-dashboard";
import Navbar from "../components/navbar/navbar";
import OrderDashboard from "../components/orders/order-dashboard";
import Profile from "../components/profile/profile";
import Revenue from "../components/revenue/revenue";
import SecurityDashboard from "../components/security/security-dashboard";
import ProductionDashboard from "../components/production/production-dashboard";

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
          <ProductionDashboard />
        ) : url === "/productionlist" ? (
          <ProductionDashboard />
        ) : url === "/wetsand" ? (
          <ProductionDashboard />
        ) : url === "/stockpile" ? (
          <ProductionDashboard />
        ) : url === "/stock" ? (
          <ProductionDashboard />
        ) : url === "/stockupdate" ? (
          <ProductionDashboard />
        ) : url === "/singlerevenuereport" ? (
          <Revenue />
        ) : url === "/revenuereport" ? (
          <Revenue />
        ) : url === "/accountlist" ? (
          <Account />
        ) : url === "/postaccount" ? (
          <Account />
        ) : url === "/addaccount" ? (
          <Account />
        ) : url === "/chartlist" ? (
          <Account />
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
        ) : url === "/products" ? (
          <AdminDashboard />
        ) : url === "/operations" ? (
          <AdminDashboard />
        ) : url === "/addfuel" ? (
          <AdminDashboard />
        ) : url === "/fuelissue" ? (
          <AdminDashboard />
        ) : url === "/fuelissuelist" ? (
          <AdminDashboard />
        ) : url === "/fuelupdatelist" ? (
          <AdminDashboard />
        ) : null}
      </Switch>
    </>
  );
};

export default Pages;
