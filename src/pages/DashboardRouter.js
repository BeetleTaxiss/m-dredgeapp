/* eslint-disable no-unreachable */
import React, { useState, useEffect } from "react";
import {
  createUserAllowedRoutes,
  functionUtils,
  getUserStoreInstance,
} from "./../hooks/function-utils";
import { Switch } from "react-router";
import { useLocation } from "react-router";

export default function DashboardRouter() {
  const { state } = useLocation();

  const [dashboardRouter, setDashboardRouter] = useState([]);

  const [userPermission, setUserPermission] = useState([]);

  const Store = getUserStoreInstance();

  /** get uer permissions */
  Store.useStateAsync("permission").then((permission) => {
    setUserPermission(permission);
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

  return (dashboardRouter);
}
