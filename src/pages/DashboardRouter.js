/* eslint-disable no-unreachable */
import React, { useState, useEffect } from "react";

import {
  createUserAllowedRoutes,
  functionUtils,
  getUserStoreInstance,
} from "./../hooks/function-utils";
import { useLocation, useHistory } from "react-router";

/**
 * Create the allowed routes and pages that users can see. It is the actual component 
 * that handles the creation of the menu bar links that user can have access to base
 * on their permission level. 
 * 
 * For the actual dashboard content creation, see the `Dashboard` (`dashboard.js`) component . 
 * @returns 
 */
export default function DashboardRouter() {

  const { state } = useLocation();

  const history= useHistory();

  const [dashboardRouter, setDashboardRouter] = useState([]);

  const [userPermission, setUserPermission] = useState([]);

  const Store = getUserStoreInstance();

    Store.useStateAsync("permission").then((permission) => {
      // console.log(permission, "permission collected");
      // console.log(history, "history");
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
