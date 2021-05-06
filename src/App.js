import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router";
import { getUserStoreInstance } from "./hooks/function-utils";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardRouter from "./pages/DashboardRouter";
import LoginPage from "./pages/login-page";

export default function App({ loginStatus }) {
  const UserStore = getUserStoreInstance();

  /** old the current view user will see */
  const [appView, setAppView] = useState([]);

  /** the default login view  */
  const LoginView = () => (
    <div className="App">
      <Router forceRefresh>
        <Switch>
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );

  /**
   * create appView based on if user s logged in or not
   * the `loginStatus` is passed as property from `AppRouter` comp
   * */
  const createAppView = (loginStatus = false) => {
    if (loginStatus) {
      setAppView(
        <div className="App">
          <Router>
            <Switch>
              <DashboardRouter />
            </Switch>
          </Router>
        </div>
      );
    } else {
      /**
       * This user is not log in yet, or the user refresh and we are
       * still trying to get the login status from our async store.
       * what we will do is to wait a little while before setting `appView`
       * so that if user is eventually found to have logged in, we wont show
       * the login page before moving to the dashboard
       */
      //setTimeout(()=>{
      setAppView(<LoginView />);
      //}, 1000);
    }
  };

  useEffect(() => {
    createAppView(loginStatus);
  }, [loginStatus]);

  return <>{appView}</>;
}
