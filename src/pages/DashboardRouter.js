/* eslint-disable no-unreachable */
import React, { useState, useEffect } from "react";

import {
  createUserAllowedRoutes,
  functionUtils,
  getUserStoreInstance,
} from "./../hooks/function-utils";
import { useLocation, useHistory } from "react-router";

export default function DashboardRouter() {

  const { state } = useLocation();

  const history= useHistory();

  const [dashboardRouter, setDashboardRouter] = useState([]);

  const [userPermission, setUserPermission] = useState([]);

  const [loads, setLoads] = useState(0);

  const Store = getUserStoreInstance();

    Store.useStateAsync("permission").then((permission) => {
      console.log(permission, "permission collected");
      console.log(history, "history");
        if (permission) {
          setUserPermission(permission)
        }
    });

  /**
   * Create allowed routes for this user based on their provided permission level
   * Get user permission once the page load, or userPermission changed
   * */
  useEffect(() => {
    /**
     * create route for user based on the existing permission
     *  */
    const userRoutes = createUserAllowedRoutes(userPermission, true);

    setDashboardRouter(userRoutes);
  }, [userPermission]);

  return (<>{dashboardRouter}</>);

}
