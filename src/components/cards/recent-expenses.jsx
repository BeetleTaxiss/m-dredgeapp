import React, { useState, useEffect } from "react";
import { recentExpensesData } from "./recent-summary-data";
import RecentSummary from "./recent-summary";
const RecentExpenses = () => {
  const [reacentExpensesList, setRecentExpensesList] = useState(["loading"]);
  useEffect(() => {
    setTimeout(() => setRecentExpensesList(recentExpensesData), 2000);
    return () => {};
  }, []);
  return <RecentSummary data={reacentExpensesList} />;
};

export default RecentExpenses;
