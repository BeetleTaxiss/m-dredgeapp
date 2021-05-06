import React, {useEffect, useState} from "react";
import {Switch} from "react-router";
import { getUserStoreInstance, createUserAllowedRoutes } from "./hooks/function-utils";

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
         * create route for user based on the existing permission
         * At this stage, this will most likely be the default route `login` `approuter`, and `dashboard`
         *  */
        const userRoutes=  createUserAllowedRoutes(userPermission);
        setAllowedRoutes(userRoutes);
    }, [userPermission]);

    return (
        <div className="App">
        <Switch>
            {allowedRoutes}
        </Switch>
        </div>
    )
}