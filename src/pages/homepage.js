import React from "react";
import Navbar from "../components/navbar/navbar";
import { Dashboard } from "./dashboard";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <>
        <Dashboard />
      </>
    </>
  );
};

export default Homepage;
