import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import Loader from "./loader";

const LoaderDashboard = () => {
  const { url } = useRouteMatch();
  console.log("Loader Dashboard: ", url);

  return <PageWrapper>{url === "/loader" ? <Loader /> : null}</PageWrapper>;
};

export default LoaderDashboard;
