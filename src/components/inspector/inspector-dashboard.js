import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import Inspector from "./inspector";

const InspectorDashboard = () => {
  const { url } = useRouteMatch();

  return <PageWrapper>{url === "/inspect" ? <Inspector /> : null}</PageWrapper>;
};

export default InspectorDashboard;
