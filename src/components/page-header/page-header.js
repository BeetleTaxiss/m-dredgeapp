import React from "react";
import { useRouteMatch } from "react-router";
import Breadcrumbs from "./breadcrumbs";
import DropdownFilter from "./dropdown-filter";

const PageHeader = () => {
  const { url } = useRouteMatch();

  const page =
    url === "/vieworders"
      ? "View Orders"
      : url === "/orderreceipt"
      ? "Order Invoice"
      : url === "/dispatchlist"
      ? "Dispatch List"
      : url === "/loader"
      ? "Load Orders"
      : url === "/inspect"
      ? "Inspect Orders"
      : url === "/security"
      ? "Clear Orders"
      : url === "/placeorder"
      ? "Make Order"
      : url === "/production"
      ? "Production"
      : url === "/productionlist"
      ? "Production List"
      : url === "/wetsand"
      ? "Wet Sand"
      : url === "/stockpile"
      ? "Stockpiled Sand"
      : url === "/stock"
      ? "Stock List"
      : url === "/stockupdate"
      ? "Stock Update"
      : url === "/accountlist"
      ? "Account List"
      : url === "/addaccount"
      ? "Add Account"
      : url === "/postaccount"
      ? "Post Account"
      : url === "/chartlist"
      ? "Chart List"
      : url === "/expensereport"
      ? "Expense Report"
      : url === "/postexpense"
      ? "Create Expense"
      : url === "/singleexpensereport"
      ? "Single Expense Report"
      : url === "/revenuereport"
      ? "Revenue Report"
      : url === "/singlerevenuereport"
      ? "Single Revenue Report"
      : url === "/users"
      ? "Users"
      : url === "/products"
      ? "Add products"
      : url === "/operations"
      ? "Operations"
      : url === "/addfuel"
      ? "Fuel Issue List"
      : url === "/fuelissue"
      ? "Fuel Issue List"
      : url === "/fuelissuelist"
      ? "Fuel Issue List"
      : url === "/fuelupdatelist"
      ? "Fuel Update List"
      : url === "/profile"
      ? "Account settings"
      : url === "/activityreport"
      ? "Activity Report"
      : url === "/impoundtruck"
      ? "Impound Truck"
      : null;
  const breadCrumbsData = [
    { text: "Dashboard", link: "/dashboard" },
    { text: page, link: "#", active: true },
  ];
  return (
    <div className="page-header">
      <Breadcrumbs items={breadCrumbsData} />
      {/* <DropdownFilter /> */}
    </div>
  );
};

export default PageHeader;
