import React, {useEffect, useState} from "react";
import { Switch } from "react-router";
import { getUserStoreInstance} from "./hooks/function-utils";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login-page";

export default function AppRouter() {
    
    /** hold the current screen in view */
    const [appScreen, setAppScreen]= useState([]);

    /** always assume user is not log in */
    const [loginStatus, setLoginStatus]= useState(false);

    const UserStore= getUserStoreInstance();

    UserStore.useStateAsync("login").then(login=>setLoginStatus(login));

    /**
     * use this to create the appropriate screen user can see based 
     * on login status
     */
    const createAppScreen=(loginStatus)=>{

            if(loginStatus===false) {
                /** user is logged in. Take user to the dashboard  */
                 setAppScreen(<LoginPage/>)

            } else if(loginStatus===true) {
                /** show the user the login page */
                 setAppScreen(<Dashboard/>)
            }
    }

    /** refresh page when appScreen value changes */
    useEffect(()=>{
        createAppScreen(loginStatus)
    }, [loginStatus]);

    //return (<> {appScreen}</> )
    return (
    <div className="App">
    <Switch>
        {appScreen}
    </Switch>
    </div> )
}