import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageWrapper from "../components/general/page-wrapper";
import { createUserDashboard } from "./../Menu";
import { userMenu } from "./../UserMenuMock";

export const Dashboard = () => {
  const [userPermission, setUserPermission] = useState(userMenu);

  /**
   * This function create appropriate view for user based on the dashboard contents
   * that this user can see. We will assign the return value to our `dashboardViews` state variable.
   */
  const createDashboardViews = (assignToState = true) => {
    const UserDashboard = createUserDashboard(userPermission);

    const View = <>{UserDashboard}</>;

    /** automatically assign to state variable */
    if (assignToState)
      // setDashboardViews(View);

      /** always return in case caller needs value */
      return View;
  };

  /** assign the dashboard view to a state so that we can refresh when variable changes */
  const [dashboardViews, setDashboardViews] = useState(createDashboardViews());

  //const { state } = useLocation();

  /** When the `dashboardViews` changes, refresh the page */
  useEffect(() => {}, [dashboardViews, userPermission]);

  return <PageWrapper>{dashboardViews}</PageWrapper>;
};
