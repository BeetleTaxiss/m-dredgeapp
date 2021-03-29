import React from "react";
import { CountdownTimer } from "./countdownTimer/countdownTimer.js";
import PageHeader from "./page-header/page-header";

const FakeComponent = () => {
  return (
    <div>
      <PageHeader />
      <CountdownTimer />
    </div>
  );
};

export default FakeComponent;
