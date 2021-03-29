import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Account from "../components/account/account";
import { CountdownTimer } from "../components/countdownTimer/countdownTimer";
import Navbar from "../components/navbar/navbar";

const Pages = () => {
  const { path, url } = useRouteMatch();
  return (
    <>
      <Navbar />
      <Switch>
        {url === "/production" ? (
          <CountdownTimer />
        ) : url === "/account" ? (
          <Account />
        ) : null}
      </Switch>
    </>
  );
};

export default Pages;
