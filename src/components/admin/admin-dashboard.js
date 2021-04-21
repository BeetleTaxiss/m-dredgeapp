import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import Products from "../products/products";
import Machinery from "../operations/machinery";
import Users from "../users/users";
import AddFuel from "../fuel-issues/add-fuel";
import FuelIssuing from "../fuel-issues/fuel-issuing";
import FuelIssueList from "../fuel-issues/fuel-issue-list";
import FuelUpdateList from "../fuel-issues/fuel-update-list";

const AdminDashboard = () => {
  /**
   * Conditional page display to set which sub page is shown and this is made possible with the url property from useRouteMatch
   */
  const { url } = useRouteMatch();
  return (
    <PageWrapper classs="row layout-spacing layout-top-spacing" id="cancel-row">
      {url === "/users" ? (
        <Users />
      ) : url === "/products" ? (
        <Products />
      ) : url === "/operations" ? (
        <Machinery />
      ) : url === "/addfuel" ? (
        <AddFuel />
      ) : url === "/fuelissue" ? (
        <FuelIssuing />
      ) : url === "/fuelissuelist" ? (
        <FuelIssueList />
      ) : url === "/fuelupdatelist" ? (
        <FuelUpdateList />
      ) : null}
    </PageWrapper>
  );
};

export default AdminDashboard;
