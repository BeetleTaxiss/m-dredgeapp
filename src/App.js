import React from "react";
import {createUserRoutes, createUserMenu} from "./Menu";
import {Route, Switch} from "react-router";
import NavBar from "./components/navbar/navbar";
import {Production} from "./components/production/production";
import WetSand from "./components/production/production-list/wet-sand";
import StockUpdate from "./components/production/production-list/stock-update";
import PageWrapper from "./components/general/page-wrapper";
import {userMenu} from "./UserMenuMock";



export default function App() {

    /**
     * These are the valid routes this user can have access to within the application
     * Pass the `userMenu` provided during user setup
     */
    let UserAllowedRoutes = createUserRoutes(userMenu).map((page, k) => {

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
        return <Route key={k} path={link} component={PageComponent}/>
    });

    return (
        <div className="App">
        <Switch>
            {UserAllowedRoutes}
        </Switch>
        </div>
    )
}