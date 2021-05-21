import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import HeaderNavbar from "./header-navbar";
import TopNavbar from "./top-nav";
import { BASE_API_URL } from "../../hooks/API";
import "./navbar.scss";
import { createUserMenu } from "./../../Menu";
import {
  errorAlert,
  functionUtils,
  getUserStoreInstance,
  getAppSettingStoreInstance,
} from "../../hooks/function-utils";

const Navbar = ({ userPermission }) => {
  /** user must be logged in to see this navigation section */
  // functionUtils.useValidateLogin("/");

  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const history = useHistory();

  /** this is the permissions allowed for out user */
  const [userName, setUserName] = useState("Loading user...");
  const [userId, setUserId] = useState(null);
  const [userTypeId, setUserTypeId] = useState(0);
  const [userTypes, setUserTypes] = useState(null);

  // useEffect(() => {
  //   console.log("Show Menu: ", showMenu);
  //   alert("Menu opened");
  //   setShowMenu(showMenu);
  // }, [showMenu]);
  /** a state variable to hold our navigation view
   *initially, we will set it to empty
   */
  const [userNavigationBar, setUserNavigationBar] = useState(null);

  const UserStore = getUserStoreInstance();

  UserStore.useStateAsync("user").then((user) => {
    setUserName(functionUtils.firstLetterToUpperCase(user));
  });

  UserStore.useStateAsync("userType").then((userTypeId) => {
    setUserTypeId(userTypeId);
  });

  UserStore.useStateAsync("userId").then((userId) => {
    setUserId(userId);
  });

  const AppSettingsStore = getAppSettingStoreInstance();

  AppSettingsStore.useStateAsync("userTypes").then((userTypes) => {
    setUserTypes(userTypes);
  });

  const createUserNavigationBar = (showMenu, setShowMenu) => {
    const userAllowedMenus = createUserMenu(userPermission);
    const userPosition = functionUtils.getUserPositionFromTypeId(
      userTypes,
      userTypeId
    );

    const USerNavBar = (
      <div>
        <HeaderNavbar
          logUserOut={logUserOut}
          setShowMenu={() => setShowMenu(true)}
          userName={userName}
          userType={userPosition}
        />
        <TopNavbar
          showMenu={showMenu}
          showSubMenu={showSubMenu}
          setShowSubMenu={setShowSubMenu}
          topNavBarData={userAllowedMenus}
        />
        <div
          onClick={() => setShowMenu(false)}
          className={`overlay ${showMenu && "show"}`}
        ></div>
      </div>
    );

    setUserNavigationBar(USerNavBar);
  };

  /** ue logout function */
  const logUserOut = () => {
    const Store = getUserStoreInstance();

    const userLogOutData = {
      user: userName,
      "user-id": userId,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/user/logout.php`, userLogOutData)
      .then((res) => {
        if (res.data.error) {
          const title = "Log Out failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const takeToPage = "/login";

          /** check to see if user is indeed logged in */

          /**  clear out every other user details pertaining to session
           * and  take user back to the login page */
          Store.update("user", null);
          Store.update("userId", null);
          Store.update("email", null);
          Store.update("name", null);
          Store.update("userType", null);
          Store.update("permission", null);
          Store.update("login", false);
          history.push({
            pathname: takeToPage,
          });
        }
      });
  };

  /** load the navigation bar when the systems loads and when the userPermission change */
  useEffect(() => {
    createUserNavigationBar(showMenu, setShowMenu);
  }, [userPermission, userName, userTypeId, userTypes, userId, showMenu]);

  return <>{userNavigationBar}</>;
};

export default Navbar;
