import React from "react";
import { useRouteMatch } from "react-router";
import PieChart from "../cards/pie-chart";
import RecentOrders from "../cards/recent-orders";
import Summary from "../cards/summary";
import PageWrapper from "../general/page-wrapper";
import AccountList from "./account-actions/account-list";
import PostAccount from "./account-actions/account-post";
import AddAccount from "./account-actions/add-account";
import ChartList from "./charts/chart-list";
import ExpenseReport from "./expense-report/expense-report";
import SingleExpenseReport from "./single-expense-report/single-expense-report";

const Account = () => {
  /**
   * Conditional page display to set which sub page is shown and this is made possible with the url property from useRouteMatch
   */
  const { url } = useRouteMatch();
  return (
    <PageWrapper>
      {url === "/expensereport" ? (
        <ExpenseReport />
      ) : url === "/singleexpensereport" ? (
        <SingleExpenseReport />
      ) : url === "/chartlist" ? (
        <ChartList />
      ) : url === "/accountlist" ? (
        <AccountList />
      ) : url === "/addaccount" ? (
        <AddAccount />
      ) : url === "/postaccount" ? (
        <PostAccount />
      ) : null}
      {/* <RecentOrders />
      <PieChart />
      <Summary /> */}
    </PageWrapper>
  );
};

export default Account;
