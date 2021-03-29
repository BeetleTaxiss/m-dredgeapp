import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Navbar from "../components/navbar/navbar";
import { Dashboard } from "./dashboard";

const Homepage = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        {/* <Dashboard /> */}
      </Switch>
    </>
  );
};

export default Homepage;
