import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import Security from "./security";

const SecurityDashboard = () => {
  const { url } = useRouteMatch();
  console.log("Loader Dashboard: ", url);

  return <PageWrapper>{url === "/security" ? <Security /> : null}</PageWrapper>;
};

export default SecurityDashboard;
