import React from "react";
import { useRouteMatch } from "react-router";
import PageWrapper from "../general/page-wrapper";
import { Production } from "./production";
import ProductionList from "./production-list/production-list";
import Stock from "./production-list/stock";
import StockUpdate from "./production-list/stock-update";
import StockpiledSand from "./production-list/stockpiled-sand";
import WetSand from "./production-list/wet-sand";

const ProductionDashboard = () => {
  const { url } = useRouteMatch();
  return (
    <PageWrapper>
      {url === "/production" ? (
        <Production />
      ) : url === "/productionlist" ? (
        <ProductionList />
      ) : url === "/wetsand" ? (
        <WetSand />
      ) : url === "/stockpile" ? (
        <StockpiledSand />
      ) : url === "/stock" ? (
        <Stock />
      ) : url === "/stockupdate" ? (
        <StockUpdate />
      ) : null}
    </PageWrapper>
  );
};

export default ProductionDashboard;
