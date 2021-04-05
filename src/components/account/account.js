import React from "react";
import { useRouteMatch } from "react-router";
import PieChart from "../cards/pie-chart";
import RecentOrders from "../cards/recent-orders";
import Summary from "../cards/summary";
import PageWrapper from "../general/page-wrapper";
import ExpenseReport from "./expense-report/expense-report";
import PostExpense from "./post-expense";
import SingleExpenseReport from "./single-expense-report/single-expense-report";

const Account = () => {
  /**
   * Conditional page display to set which sub page is shown and this is made possible with the url property from useRouteMatch
   */
  const { url } = useRouteMatch();
  return (
    <PageWrapper>
      {url === "/postexpense" ? (
        <PostExpense />
      ) : url === "/expensereport" ? (
        <ExpenseReport />
      ) : url === "/singleexpensereport" ? (
        <SingleExpenseReport />
      ) : null}
      {/* <RecentOrders />
      <PieChart />
      <Summary /> */}
    </PageWrapper>
  );
};

export default Account;
