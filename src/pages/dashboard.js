import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import RecentOrders from "../components/cards/recent-orders";
import Summary from "../components/cards/summary";
import TotalOrders from "../components/cards/total-orders";
import TotalRevenue from "../components/cards/total-revenue";
import TotalStockpile from "../components/cards/total-stockpile";
import PageHeader from "../components/page-header/page-header";
import RecentSummary from "../components/cards/recent-summary";
import {
  detailedStats,
  recentExpensesData,
  recentPumpingActivitiesData,
  recentRevenueData,
  currentProductionData,
} from "../components/cards/recent-summary-data";
import ActivitiesSummary from "../components/cards/activities-summary";
import DetailedStatistics from "../components/cards/detailed-statistics";
import CurrentActivity from "../components/cards/current-activity";

export const Dashboard = () => {
  const [userState, setUserState] = useState();
  const { state } = useLocation();
  useEffect(() => {
    setUserState(state);
  }, [userState, state]);
  console.log("User State: ", userState);
  return (
    // BEGIN MAIN CONTAINER
    <div className="main-container" id="container">
      <div className="overlay"></div>
      <div className="search-overlay"></div>

      {/* BEGIN CONTENT PART */}
      <div id="content" className="main-content">
        <div className="layout-px-spacing">
          {/* BEGINNING OF PAGE HEADER */}
          <PageHeader />
          {/* END OF PAGE HEADER */}

          <div className="row layout-top-spacing">
            {
              userState?.user_type === "2" ? (
                <>
                  <TotalOrders />
                  <TotalRevenue />
                  <TotalStockpile />
                  <RecentOrders />
                  <Summary />
                  <ActivitiesSummary data={recentPumpingActivitiesData} />
                  <DetailedStatistics data={detailedStats} />
                  <RecentSummary data={recentExpensesData} />
                  <RecentSummary data={recentRevenueData} />
                  <CurrentActivity data={currentProductionData} />
                </>
              ) : null
              // <>
              // </>
            }
          </div>
        </div>

        {/* END CONTENT PART */}
      </div>
      {/* END OF MAIN CONTENT  */}
    </div>
  );
};
