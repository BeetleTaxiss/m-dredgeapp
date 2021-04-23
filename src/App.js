import React from "react";
import {createUserRoutes, createUserMenu} from "./Menu";
import {Route, Switch} from "react-router";
import NavBar from "./components/navbar/navbar";
import OrderReceipt from "./components/orders/order-receipt/order-receipt";
import {Production} from "./components/production/production";
import WetSand from "./components/production/production-list/wet-sand";
import StockUpdate from "./components/production/production-list/stock-update";
import PageWrapper from "./components/general/page-wrapper";


export default function App() {

    const userMenu = {

        dashboard:{
            dashboard: {
                text: "Dashboard",
                link: "/dashboard",
            },
        },    

        order: {
            placeOrder: {
                label: "Place Order",
                route: "/placeorder",
                link: "./components/orders/order-form",
                subItem: [
                    {link: "/checkorderstatus", text: "Sub Menu Order"}
                ]
            },
            orderReceipt: {
                text: "Order Receipt",
                link: "/orderreceipt",
            },
        },
        production: {
            production: {
                text: "Start Pumping",
                link: "/production",
                component: Production,
            },
            wetSand: {
                text: "Wet Sand",
                link: "/wetsand",
                component: WetSand,
            },
            stockUpdate: {
                text: "Production Stock Movements",
                link: "/stockupdate",
                component: StockUpdate,
            },
        },
        account :{
            postExpenses: {
                text: "Post Expenses",
                link: "/postexpense",
            },
            expenseReport: {
                text: "Expenses Report",
                link: "/expensereport",
            },
            chartOfAccount: {
                text: "Chart of Account",
                link: "/chartlist",
            },
            addBusinessAccount: {
                text: "Add Business Account",
                link: "/accountlist",
            },
            postToAccount: {
                text: "Post Entry",
                link: "/postaccount",
            },
        },

        admin :{
            addUsers: {
                text: "Add User",
                link: "/users",
            },
            product: {
                text: "Add Products",
                link: "/products",
            },
            addMachinery: {
                text: "Add Machinery",
                link: "/operations",
            },
            addFuel: {
                text: "Add Fuel Stock",
                link: "/addfuel",
            },
            issueFuel: {
                text: "Issue Fuel",
                link: "/fuelissue",
            },
            fuelIssued: {
                text: "Issued Fuel",
                link: "/fuelissuelist",
            },
            fuelStockEntry: {
                text: "Fuel Stock Entry",
                link: "/fuelupdatelist",
            },
        },

        inspector:{
            inspect: {
                text: "Inspect Order",
                link: "/inspect",
            },
        },
        security:{
            inspect: {
                text: "Clear Order",
                link: "/security",
            },
        },
    revenue : {
        revenueReport: {
            text: "Revenue Report",
            link: "/revenuereport",
        },
        singleRevenueReport: {
            text: "Single Revenue Report",
            link: "/singlerevenuereport",
        },
    },
    }
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