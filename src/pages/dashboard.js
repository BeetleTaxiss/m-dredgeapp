import React, { useState, useEffect } from "react";
import PageWrapper from "../components/general/page-wrapper";
import { createUserDashboard } from "./../Menu";
import { StoreManager } from "react-persistent-store-manager";
import { Stores, AppStore } from "./../state/store";
import { functionUtils } from "./../hooks/function-utils";

export const Dashboard = () => {
  /** use this function to always validate if a user is logged in */
  functionUtils.useValidateLogin("/");

  /** hold user permission. This is retrieve from our StoreManager */
  const [userPermission, setUserPermission] = useState([]);

  /** contains  the dashboard view */
  const [dashboardViews, setDashboardViews] = useState([]);

  /*** a StoreManager instance. 
   * Now you must pass the three parameters to locate our actual menu location
   * see `state/store.js` for sample definition
   */
  const Store = StoreManager(AppStore, Stores, "UserStore");

  /** set get the user permission and set */
  Store.useStateAsync("permission").then((permission) => {
    setUserPermission(permission);
  });

  /**
   * This function create appropriate view for user based on the dashboard contents
   * that this user can see. We will assign the return value to our `dashboardViews` state variable.
   */
  const createDashboardViews = (assignToState = true) => {
    const UserDashboard = createUserDashboard(userPermission);

    const View = <PageWrapper>{UserDashboard}</PageWrapper>;

    /** automatically assign to state variable */
    if (assignToState) setDashboardViews(View);

    /** always return in case caller needs value */
    return View;
  };

  /** When the `userPermission` changes, refresh the page */
  useEffect(() => {
    /** load the user dashboard */
    createDashboardViews();
  }, [userPermission]);

  return <>{dashboardViews}</>;
};
