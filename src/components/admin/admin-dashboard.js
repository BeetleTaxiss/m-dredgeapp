import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import Units from "../units/units";
import Users from "../users/users";

const AdminDashboard = () => {
  /**
   * Conditional page display to set which sub page is shown and this is made possible with the url property from useRouteMatch
   */
  const { url } = useRouteMatch();
  return (
    <PageWrapper classs="row layout-spacing layout-top-spacing" id="cancel-row">
      {url === "/users" ? <Users /> : url === "/units" ? <Units /> : null}
    </PageWrapper>
  );
};

export default AdminDashboard;
