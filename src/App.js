import { useEffect, useState } from "react";
import { Switch, Route} from "react-router";
import DashboardRouter from "./pages/DashboardRouter";
import LoginPage from "./pages/login-page";
import {functionUtils, getUserStoreInstance, getLoginStatus} from "./hooks/function-utils";
import {MemoryRouter, BrowserRouter} from "react-router-dom";
import { render } from "react-dom";

export default function App() {

  /** 
   * If we are within electron enviroment, we will use `MemoryRouter`
   * but within the web, we will `BrowserRouter`
   * The memory router is to avoid the blank screen error in electron
   *  */
  const Router = functionUtils.isElectronApp()? MemoryRouter : BrowserRouter;
  
  /** 
   * Check login status every five seconds to know when user login is valid.
   * This is just reading the loginStatus variable defined in the   `Login` method 
   * of `function-utils.js` file. What this does is ensure that we can cap[ture login status once 
   * it's successful
   * 
   * A variable to hold our login checker interval calls
   * 
   */
  let loginChecker;
  /** first clear the interval incase this is a refresh */
  clearInterval(loginChecker);
  loginChecker= setInterval(()=>{
    const login = getLoginStatus();
    if(login) {
      renderAppView(createAppView(login))
      clearInterval(loginChecker);
    }
  }, 5000);
  

  /** 
   * render the dashboard or a normal app view. This will change our view from login page 
   * to the application dashboard once user login is successful.
   */
  const renderAppView=(component, layer="root")=>{

    const layerElement= document.getElementById(layer);
    
    if (!layerElement || layerElement === null || layerElement === undefined) {
        return console.warn(`Layer ${layer} not loaded  or found in DOM tree`)
    } else {
      //const renderString= reactDomServer.renderToString(component);
      try{
        render(component, layerElement)
      } catch(e) {
        /** do nothing */
        console.log(e.message, "error rendering")
      }
    }
  }

  /** 
   * the default login view. We will always show this when user open app
   *  */
  const LoginView = () => (
    <div className="App" id="app-view">
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );

  /**
   * create appView based on if user is logged in or not
   * the `loginStatus` is passed as property from `AppRouter` comp
   * */
  const createAppView = (loginStatus = false, saveToState=true) => {

    const DashboardView=()=>
      <div className="App" id="app-view">
      <Router>
        <Switch>
          <DashboardRouter />
        </Switch>
      </Router>
    </div>;

if (loginStatus) {;
      return <DashboardView/>
    } else {
       return <LoginView/>
      }
  };

/** always show the `LoginView` by default  */
  return <><LoginView/></>;
}
