import React from "react";
import { useRouteMatch } from "react-router";
import Breadcrumbs from "./breadcrumbs";
import DropdownFilter from "./dropdown-filter";

const PageHeader = () => {
  const { url } = useRouteMatch();
  console.log("Page Header: ", url);
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
      : url === "/units"
      ? "Create Unit"
      : url === "/profile"
      ? "Account settings"
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
