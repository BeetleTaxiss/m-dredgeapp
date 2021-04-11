import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import Inspector from "./inspector";

const InspectorDashboard = () => {
  const { url } = useRouteMatch();
  console.log("Loader Dashboard: ", url);

  return <PageWrapper>{url === "/inspect" ? <Inspector /> : null}</PageWrapper>;
};

export default InspectorDashboard;
