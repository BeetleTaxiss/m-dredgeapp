import React, { useEffect, useState } from "react";
import { createUserRoutes } from "./Menu";
import { Route, Switch } from "react-router";
import NavBar from "./components/navbar/navbar";
import PageWrapper from "./components/general/page-wrapper";
import { getUserStoreInstance } from "./hooks/function-utils";

export default function App() {
  /** hold user permission. This is retrieve from our StoreManager */
  const [userPermission, setUserPermission] = useState([]);

  /**
   * contain state contains allowed routes for our user
   * This will be created from the user permission
   * */
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  /** get the `UserStore` instance */
  const Store = getUserStoreInstance();
  const permissionString = `{"dashboard":{"dashboardHome":{"text":"Dashboard Content","link":"/dashboard"},"totalOrders":{"text":"Total Orders","link":"dashboard"},"recentOrders":{"text":"Recent Orders","link":"#"},"totalRevenue":{"text":"Total Revenue","link":"#"},"summary":{"text":"Summary","link":"#"},"detailedStatistics":{"text":"Detailed Statistics"},"activitiesSummary":{"text":"Activities Summary","link":"#"},"totalStockpile":{"text":"Total Stockpile","link":"#"},"recentSummary":{"text":"Recent Summary","link":"#"},"currentActivity":{"text":"Current Activity","link":"#"},"usersActivitiesSummary":{"text":"Users Activities Summary","link":"#"}},"order":{"placeOrder":{"text":"Place Order","link":"/placeorder"},"viewOrder":{"text":"View Orders","link":"/vieworders"},"orderReceipt":{"text":"Order Receipt","link":"/orderreceipt"},"orderDispatchList":{"text":"Orders Dispatch","link":"/dispatchlist"}},"production":{"production":{"text":"Start Pumping","link":"/production"},"productionList":{"text":"Production List","link":"/productionlist"},"wetSand":{"text":"Wet Sand","link":"/wetsand"},"stockpile":{"text":"Production Stockpile","link":"/stockpile"},"stock":{"text":"Stock Production","link":"/stock"},"stockUpdate":{"text":"Stock Movements","link":"/stockupdate"}}, "account":{"postExpenses":{"text":"Post Expenses","link":"/postexpense"},"expenseReport":{"text":"Expenses Report","link":"/expensereport"},"chartOfAccount":{"text":"Chart of Account","link":"/chartlist"},"addBusinessAccount":{"text":"Add Business Account","link":"/accountlist"},"postToAccount":{"text":"Post Entry","link":"/postaccount"}},"admin":{"addUsers":{"text":"Add User","link":"/users"},"product":{"text":"Add Products","link":"/products"},"userActivitiesLog":{"text":"Users Activity","link":"/useractivity"}},"storeOperations":{"addMachinery":{"text":"Add Machinery","link":"/operations"},"addFuel":{"text":"Add Fuel Stock","link":"/addfuel"},"issueFuel":{"text":"Issue Fuel","link":"/fuelissue"},"fuelIssued":{"text":"Issued Fuel","link":"/fuelissuelist"},"fuelStockEntry":{"text":"Fuel Stock Entry","link":"/fuelupdatelist"}},"loader":{"placeOrder":{"text":"Load Order","link":"/loader"}},"Inspect":{"text":"Clear Order","link":"/inspect"}, "security":{"text":"Security","link":"/security"}}`;
  //Store.update("permission", JSON.parse(permissionString));
  /** get uer permissions */
  Store.useStateAsync("permission").then((permission) => {
    setUserPermission(permission);
  });

  /**
   * Create allowed routes for this user based on their provided permission level
   * Get user permission once the page load, or userPermission changed
   * */
  useEffect(() => {
    /**
     * These are the valid routes this user can have access to within the application
     * Pass the `userMenu` provided during user setup
     */
    let UserAllowedRoutes = createUserRoutes(userPermission).map((page, k) => {
      const { link, component, hideNavBar, usePageWrapper } = page;
      const Component = component;

      /**
       * process route component and hide navigation bar if `hideNavBar=false`
       * In the login menu definition, we will pass `usePageWrapper=false` property to be false
       * so that we can hide `PageWrapper` around the login page
       */
      const PageComponent = () => {
        const NavigationBar =
          hideNavBar && hideNavBar === true ? () => null : () => <NavBar />;

        /** Create an helper component for pageWrapper
         */
        const PageWrapperContainer = (props) => {
          if (usePageWrapper === false) {
            /** no page wrapper needed */
            return <>{props.children}</>;
          }
          /** return pages with wrapper */
          return <PageWrapper>{props.children}</PageWrapper>;
        };
        return (
          <>
            <NavigationBar />
            <PageWrapperContainer>
              <Component />
            </PageWrapperContainer>
          </>
        );
      };
      /** return the custom page component created based on our routes */
      return <Route key={k} path={link} component={PageComponent} />;
    });

    /** assign allowedRoutes to state so that we can view app */
    setAllowedRoutes(UserAllowedRoutes);
  }, [userPermission]);

  return (
    <div className="App">
      <Switch>{allowedRoutes}</Switch>
    </div>
  );
}
