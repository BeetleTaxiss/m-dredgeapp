import React from "react";
import { recentExpensesData } from "./recent-summary-data";
import RecentSummary from "./recent-summary";
const RecentExpenses = () => {
  return <RecentSummary data={recentExpensesData} />;
};

export default RecentExpenses;
