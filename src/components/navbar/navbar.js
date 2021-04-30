import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import HeaderNavbar from "./header-navbar";
import TopNavbar from "./top-nav";
import { BASE_API_URL } from "../../hooks/API";
import "./navbar.scss";
import { createUserMenu } from "./../../Menu";
import { userMenu } from "./../../UserMenuMock";
import { StoreManager } from "react-persistent-store-manager";
import { AppStore, Stores } from "./../../state/store";
import {
  errorAlert,
  functionUtils,
  getUserStoreInstance,
  useGetUserDetails,
} from "../../hooks/function-utils";

const Navbar = () => {
  /** user must be logged in to see this navigation section */
  functionUtils.useValidateLogin("/");

  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const history = useHistory();

  /** this is the permissions allowed for out user */
  const [userPermission, setUserPermission] = useState({});

  /** a state variable to hold our navigation view
   *initially, we will set it to empty
   */
  const [userNavigationBar, setUserNavigationBar] = useState(null);

  const Store = StoreManager(AppStore, Stores, "UserStore");
  /** get get the user permission. We will use this to create
   * menu that user will have access to within the application
   */
  Store.useStateAsync("permission").then((permission) => {
    setUserPermission(permission);
  });

  /** User Details state is passed to useGetUserDetails hook which makes an async call to the store (react persistent store manager) and get single store entries  */
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState();

  const StoreInstance = getUserStoreInstance();
  let userDetails = {};
  StoreInstance.useStateAsync("user").then((user) => {
    // alert(user);
    setUserName(user);
    // userDetails = { ...userDetails, name: userName };
  });
  /** Fetch user Id and set it to state */
  StoreInstance.useStateAsync("userId").then((id) => {
    setUserId(id);
    // userDetails = { ...userDetails, id: userId };
  });
  StoreInstance.useStateAsync("userType").then((type) => {
    setUserType(type);
    // userDetails = { ...userDetails, id: userId };
  });
  console.log("User Details: ", userDetails);
  /** logout function */
  /**
   * Use this function to validate usr login and log them out
   */
  const validateLoginAndLogUserOut = (takeToPage = "/", history) => {
    /*** create a StoreManager instance*/
    const Store = StoreManager(AppStore, Stores, "UserStore");

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
  };
  const setUserTypeName = (userType) => {
    let jobDescription =
      userType === "2"
        ? "Super Admin"
        : userType === "3"
        ? "Admin"
        : userType === "4"
        ? "Loader"
        : userType === "5"
        ? "Production Master"
        : userType === "6"
        ? "Loading Inspector"
        : userType === "7"
        ? "Security"
        : userType === "8"
        ? "Operation Staff"
        : "Staff";
    console.log("job desc", jobDescription);
    return jobDescription;
  };
  const logUserOut = (userName, userId) => {
    const userLogOutData = {
      user: userName,
      "user-id": parseInt(userId),
    };
    console.log("Logout data: ", userLogOutData);
    console.log("Logout data: ", userDetails);
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
          let userCheck = localStorage.getItem("user");
          if (
            userCheck === undefined ||
            userCheck === null ||
            userCheck === []
          ) {
            history.push("/");
          }
          // validateLoginAndLogUserOut("/", history);
        }
      })
      .catch((error) => {
        const title = "Network Error",
          text = error;
        errorAlert(title, text);
      });
  };
  console.log("User Details: ", userName, userId, userType);

  const createUserNavigationBar = () => {
    console.log(userPermission, "passed to function");

    const userAllowedMenus = createUserMenu(userPermission);

    const USerNavBar = (
      <div
      // style={{ overflow: "auto", height: "100%" }}
      >
        <HeaderNavbar
          logUserOut={() => logUserOut(userName, userId)}
          setShowMenu={setShowMenu}
          userName={userName}
          userType={setUserTypeName(userType)}
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

  /** load the navigation bar when the systems loads and when the userPermission change */
  useEffect(() => {
    createUserNavigationBar();
  }, [userPermission, userName, userId, userType]);

  return <>{userNavigationBar}</>;
};

export default Navbar;
