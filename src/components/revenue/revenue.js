import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import RevenueReport from "./revenue-report/revenue-report";
import SingleRevenueReport from "./single-revenue-report/single-revenue-report";

const Revenue = () => {
  /**
   * Conditional page display to set which sub page is shown and this is made possible with the url property from useRouteMatch
   */
  const { url } = useRouteMatch();
  return (
    <PageWrapper>
      {url === "/revenuereport" ? (
        <RevenueReport />
      ) : url === "/singlerevenuereport" ? (
        <SingleRevenueReport />
      ) : null}
    </PageWrapper>
  );
};

export default Revenue;
