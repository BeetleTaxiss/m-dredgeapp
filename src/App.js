import React, {useEffect, useState} from "react";
import {createUserRoutes} from "./Menu";
import {Route, Switch} from "react-router";
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
    const Store= getUserStoreInstance();

    /** get uer permissions */
    Store.useStateAsync("permission").then(permission=>{
        setUserPermission(permission)
    });

    /** 
     * Create allowed routes for this user based on their provided permission level
     * Get user permission once the page load, or userPermission changed
     * */
    useEffect(()=>{  
    /**
     * These are the valid routes this user can have access to within the application
     * Pass the `userMenu` provided during user setup
     */
    let UserAllowedRoutes = createUserRoutes(userPermission).map((page, k) => {

        const {link, component, hideNavBar, usePageWrapper} = page;
        const Component = component;

        /**
         * process route component and hide navigation bar if `hideNavBar=false`
         * In the login menu definition, we will pass `usePageWrapper=false` property to be false
         * so that we can hide `PageWrapper` around the login page
         */
        const PageComponent = () => {

            const NavigationBar = hideNavBar && hideNavBar === true ? () => null : () => <NavBar/>;

            /** Create an helper component for pageWrapper
             */
            const PageWrapperContainer = (props)=> {
                if(usePageWrapper === false) {
                    /** no page wrapper needed */
                    return (
                        <>{props.children}</>
                    )
                }
                /** return pages with wrapper */
                return (
                    <PageWrapper>
                        {props.children}
                    </PageWrapper>
                )
            }
            return (
                <>
                    <NavigationBar/>
                    <PageWrapperContainer>
                        <Component/>
                    </PageWrapperContainer>
                </>
            )
        }
        /** return the custom page component created based on our routes */
        return <Route key={k} path={link} component={PageComponent}/>
    });

    /** assign allowedRoutes to state so that we can view app */
    setAllowedRoutes(UserAllowedRoutes);

    }, [userPermission]);

    return (
        <div className="App">
        <Switch>
            {allowedRoutes}
        </Switch>
        </div>
    )
}