import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import HeaderNavbar from "./header-navbar";
import TopNavbar from "./top-nav";
import { BASE_API_URL } from "../../hooks/API";
import "./navbar.scss";
import {createUserMenu} from "./../../Menu";
import { StoreManager } from "react-persistent-store-manager";
import { AppStore, Stores } from "./../../state/store";
import { errorAlert, functionUtils } from "../../hooks/function-utils";

const Navbar = ({userPermission}) => {
  
  /** user must be logged in to see this navigation section */
  // functionUtils.useValidateLogin("/");

  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const history = useHistory();
  
  /** this is the permissions allowed for out user */
  // const [userPermission, setUserPermission] = useState({});

  /** a state variable to hold our navigation view
   *initially, we will set it to empty
   */
  const [userNavigationBar, setUserNavigationBar] = useState(null);


  // const Store= StoreManager(AppStore, Stores, "UserStore");
  // /** get get the user permission. We will use this to create
  //  * menu that user will have access to within the application
  //  */
  // Store.useStateAsync("permission").then(permission=>{
  //   setUserPermission(permission);
  // });

  
  /** ue logout function */
  const logUserOut = () => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      userName = userDetails.username,
      userId = userDetails.id;
    const userLogOutData = {
      user: userName,
      "user-id": userId,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/user/logout.php`, userLogOutData)
      .then((res) => {
        console.log("Logged out User Data", res.data);
        if (res.data.error) {
          const title = "Log Out failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          localStorage.clear();
          history.push("/");
        }
      });
  };

  const createUserNavigationBar=()=>{

    console.log(userPermission, "passed to function");

    const userAllowedMenus= createUserMenu(userPermission);

    const USerNavBar=
      <div>
      <HeaderNavbar logUserOut={logUserOut} setShowMenu={setShowMenu} />
      <TopNavbar
        showMenu={showMenu}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
        topNavBarData={userAllowedMenus} />
      <div
        onClick={() => setShowMenu(false)}
        className={`overlay ${showMenu && "show"}`}> 
      </div>
    </div>;

    setUserNavigationBar(USerNavBar);
  }

  /** load the navigation bar when the systems loads and when the userPermission change */
  useEffect(()=>{
    createUserNavigationBar();
  }, [userPermission]);

  return (<>{userNavigationBar}</>);
};

export default Navbar;
