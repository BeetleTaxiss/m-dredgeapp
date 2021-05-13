import React from "react";
import OrderForm from "./components/orders/order-form/order-form";
import LoginPage from "./pages/login-page";
import Profile from "./components/profile/profile";
import { Production } from "./components/production/production";
import ProductionList from "./components/production/production-list/production-list";
import WetSand from "./components/production/production-list/wet-sand";
import StockpiledSand from "./components/production/production-list/stockpiled-sand";
import Stock from "./components/production/production-list/stock";
import StockUpdate from "./components/production/production-list/stock-update";
import ViewOrders from "./components/orders/vieworder-reciept/vieworders";
import OrderReceipt from "./components/orders/order-receipt/order-receipt";
import DispatchOrderList from "./components/orders/dispatch-orders-list/dispatch-order-list";

import RevenueReport from "./components/revenue/revenue-report/revenue-report";
import SingleRevenueReport from "./components/revenue/single-revenue-report/single-revenue-report";
import PostExpense from "./components/account/post-expense";
import ExpenseReport from "./components/account/expense-report/expense-report";
import ChartList from "./components/account/charts/chart-list";
import AddAccount from "./components/account/account-actions/add-account";
import PostAccount from "./components/account/account-actions/account-post";
import Products from "./components/products/products";
import AddFuel from "./components/fuel-issues/add-fuel";
import FuelIssueList from "./components/fuel-issues/fuel-issue-list";
import FuelIssuing from "./components/fuel-issues/fuel-issuing";
import FuelUpdateList from "./components/fuel-issues/fuel-update-list";
import Machinery from "./components/operations/machinery";
import Users from "./components/users/users";
import UsersActivitiesSummary from "./components/cards/users-activities-summary";
import Inspector from "./components/inspector/inspector";
import Security from "./components/security/security";
import Dashboard from "./pages/dashboard";

/** import all the dashboard items here  */
import RecentOrders from "./components/cards/recent-orders";
import Summary from "./components/cards/summary";
import TotalOrders from "./components/cards/total-orders";
import TotalRevenue from "./components/cards/total-revenue";
import TotalStockpile from "./components/cards/total-stockpile";
import RecentSummary from "./components/cards/recent-summary";

/** import menu Icons */
import dashboardIcon from "./assets/dashboard.svg";
import adminIcon from "./assets/admin.svg";
import accountantIcon from "./assets/accountant.svg";
import productionIcon from "./assets/production.svg";
import ordersIcon from "./assets/orders.svg";
import dropdownIcon from "./assets/dropdownIcon.svg";
import DetailedStatistics from "./components/cards/detailed-statistics";
import Loader from "./components/loader/loader";
import ActivitiesSummary from "./components/cards/activities-summary";
import RecentExpenses from "./components/cards/recent-expenses";
import CurrentActivity from "./components/cards/current-activity";
import UserActivitiesLog from "./components/admin/UserActivitiesLog";
import TimeKeeper from "react-timekeeper";
import ActivityReport from "./components/activity-report/ActivityReport";
import ImpoundTruck from "./components/security/impound-truck/ImpoundTruck";
import ActivityReportList from "./components/activity-report/ActivityReportList";
import AccountList from "./components/account/account-actions/account-list";

/** import dashboard dummies  */
import MenuGroupOneDummy from "./components/cards/menu-group-one-dummy";
import MenuGroupTwoDummy from "./components/cards/menu-group-two-dummy";
import MenuGroupThreeDummy from "./components/cards/menu-group-three-dummy";
import MenuGroupFourDummy from "./components/cards/menu-group-four-dummy";

/**
 * Create a menu route for app user based on user permission level
 * @constructor
 * @param userMenu
 */
export const createUserRoutes = (userMenu, addDefaultRoutes = true) => {
  if (typeof userMenu !== "object") {
    alert("user permission provide must be an object");
    return console.error("user permission provide must be an object");
  }

  /**
   * loop over user menu location and check if there is a corresponding entry in the global menu
   * declaration. The global menu will contain all the menus in our application
   */
  const globalMenu = Menu;

  /** this is the default allowed routes for users irrespective of the permission they have */
  let defaultAllowedAccess = [];

  /** add the default route. This are the basic route that all user must have access to
   * This is defined under `default` section of the `Menu` definition
   * @Note: by default we will not add this route
   */
  if (addDefaultRoutes) {
    if (globalMenu["default"] && typeof globalMenu["default"] === "object") {
      Object.keys(globalMenu["default"]).forEach((defaultPage) => {
        let currentPage = globalMenu["default"][defaultPage];
        defaultAllowedAccess = defaultAllowedAccess.concat({ ...currentPage });
      });
    }
  }

  /**
   * When userMenu i.e user permission is empty, there could be 3 reason for that
   * 1. this user has not logged in before and is using application for the first time
   * 2. user has cleared their browser cache so our `StorageManager` could not fetch the
   * previously saved permission for this user
   * 3. we enforce clearing of user permission once application closes so that once user
   * opens app, they must login before we save their permission level.
   * @Note: in any case, we will return the `defaultAllowedAccess` so that they can login afresh
   */
  if (userMenu === null) {
    /** return  */
    return defaultAllowedAccess;
  }

  /** this is an array that holds all the permitted routes for our user */
  let userAccess = [];

  if (userMenu === null) {
    return userAccess;
  }

  /**
   * loop over the user menu, and menu if found in the globalMenu definition, we will also loop
   * through the menuLocationPages defined and create the appropriate route for this user
   */
  Object.keys(userMenu).forEach((menuLocation) => {
    if (
      globalMenu[menuLocation] &&
      globalMenu[menuLocation] !== null &&
      typeof globalMenu[menuLocation] === "object"
    ) {
      /** get the pages allowed for this user within this menu location */
      let userAllowedPages = userMenu[menuLocation];

      /** loop over each pages in the userAllowPages and create a route */
      Object.keys(userAllowedPages).forEach((page) => {
        if (
          globalMenu[menuLocation][page] &&
          globalMenu[menuLocation][page] !== null &&
          typeof globalMenu[menuLocation][page] === "object"
        ) {
          /** get the current page we are allowing user to view **/
          let currentPage = globalMenu[menuLocation][page];

          /** if we are only showing this menu on the dashboard
           * we will not bother to create a route for it as
           * this will
           */
          const { showOnDashboard } = globalMenu[menuLocation][page];

          /** concat to userAccess  list if not meant for dashboard view*/
          if (showOnDashboard !== true)
            userAccess = userAccess.concat({ ...currentPage });
        }
      });
    }
  });

  /** this is all the routes user can see, including the default ones*/
  const allAccessibleRoutes = [...userAccess, ...defaultAllowedAccess];

  console.log(allAccessibleRoutes, "All routes cretedd");

  /** return the routes created */
  return allAccessibleRoutes;
};

/**
 * The default route that create when it starts
 */
export const createDefaultRoutes = () => {
  const globalMenu = Menu;

  let defaultAllowedAccess = [];

  /** This are the basic route that all user must have access to
   * This is defined under `default` section of the `Menu` definition
   */
  if (globalMenu["default"] && typeof globalMenu["default"] === "object") {
    Object.keys(globalMenu["default"]).forEach((defaultPage) => {
      let currentPage = globalMenu["default"][defaultPage];
      defaultAllowedAccess = defaultAllowedAccess.concat({ ...currentPage });
    });
  }
  return defaultAllowedAccess;
};

export const createUserMenu = (userMenu) => {
  if (typeof userMenu !== "object") {
    alert("user permission provide must be an object");
    return console.error("user permission provide must be an object");
  }
  /** get global Menu definition */
  const globalMenu = Menu;

  /** get the global menu styling options */
  const globalMenuStyle = MenuStyles;

  /** this is an array that holds all the permitted menu for user */
  let userMenuAccess = [];

  Object.keys(userMenu).forEach((menuLocation) => {
    /** create a parent menu that houses all the sub menus
     * This is the main menu that user sees on the menu bar
     * clicking this menu may show submenu or not depending on configurations
     * */

    /** check the global menuStyle for a definition for this menu entry
     * if there is a definition, we will use this and if not, we will use default
     */
    const menuStyle =
      globalMenuStyle && globalMenuStyle[menuLocation]
        ? globalMenuStyle[menuLocation]
        : {};
    const { text, icon, dropdownIcon, link, menuClass } = menuStyle;

    let menuObject = {
      menuItem: text ?? menuLocation,
      icon: icon,
      dropdown: dropdownIcon,
      link: link,
      class: menuClass,
    };

    /** this will hold all our submenu items */
    let subMenuItems = [];

    if (
      globalMenu[menuLocation] &&
      typeof globalMenu[menuLocation] === "object"
    ) {
      let userAllowedPages = userMenu[menuLocation];

      /** create as submenu for each page user has access to */
      Object.keys(userAllowedPages).forEach((page) => {
        /** this will hold the current submenu item */
        let currentSubMenuItem = null;

        if (
          globalMenu[menuLocation][page] &&
          globalMenu[menuLocation][page] !== null &&
          typeof globalMenu[menuLocation][page] === "object"
        ) {
          /** get the current page we are allowing user to view **/
          let currentPage = globalMenu[menuLocation][page];

          /** assign this current page as a subMenu */
          const { subItem } = currentPage;

          currentSubMenuItem = { ...currentPage };

          /** get the user subMenu permissions for this entry */
          const userAllowedSubMenu =
            userMenu[menuLocation][page]["subItem"] ?? null;

          /** if this user has subMenu item permission we will give it
           * **/
          let userAllowedSubMenuItems = null;

          if (userAllowedSubMenu && Array.isArray(userAllowedSubMenu)) {
            userAllowedSubMenuItems = userAllowedSubMenu.map(
              ({ link, text }) => {
                /** we will check and filter the subItem of our menu location
                 * return submenu items only if they are also defined for the user
                 *  */
                return subItem.filter((item) => {
                  if (item.link === link && item.text === text) {
                    // alert("here");
                    return item;
                  }
                });
              }
            );
            /** If there are subMenu items, we will list them*/
            if (
              userAllowedSubMenuItems !== null &&
              userAllowedSubMenuItems !== undefined
            ) {
              currentSubMenuItem = {
                ...currentSubMenuItem,
                subItem: userAllowedSubMenuItems,
              };
            }
          }
        }

        /**
         * assign the `currentSubMenuItem` to the `subMenuItems` array
         * check for `showInMenu` property of the `currentSubMenuItem` and if its false
         * we will hide this menu from the menu bar.
         * @Note: this menu will still be part of the route define for this user
         * but it will simply not be available on the menu bar.. This option is mostly use
         * for populating our dashboard items, but it can also be use for any menu item
         */
        if (
          globalMenu[menuLocation][page] &&
          globalMenu[menuLocation][page]["showInMenu"] !== false
        ) {
          subMenuItems = subMenuItems.concat(currentSubMenuItem);
        }
      });
    }

    /**
     * for each menuObject we create, if there is an entry in the main menuObject, but the link is empty or #
     * we will add the first element in the subMenuItems as the link for this menu location
     * This implementation is to make the menu fully based on the user permission
     * */
    if ((menuObject["link"] === "#" || menuObject["link"] === "/") && subMenuItems && subMenuItems[0]) {
        //menuObject["link"] = subMenuItems[0]  && subMenuItems[0]["link"] ? subMenuItems[0]["link"]: null;
        menuObject["link"] = subMenuItems[0]["link"];
    }

    /** assign the submenu Items created to the subMenuObject **/
    menuObject = { ...menuObject, subMenuItems };

    /** concat to the global  userMenuAccess array before we move to the next menu location */
    userMenuAccess = userMenuAccess.concat(menuObject);
  });

  /** return the menu created */
  return userMenuAccess;
};

/**
 * Create the dashboard view for user based on user permission
 * @param {*} userMenu
 * @returns
 */
export const createUserDashboardOld = (userMenu) => {
  if (typeof userMenu !== "object") {
    const msg = "user permission provide must be an object";
    alert(msg);
    return console.error(msg);
  }
  /** get the global dashboard menu  definition
   * to use this feature, we must have `dashboard` property
   * as part of our menu definition
   */
  const globalDashboardMenu = Menu["dashboard"] ?? null;

  if (globalDashboardMenu === null) {
    const msg =
      "Dashboard menu not defined. There must be an entry called dashboard in our menu definition";
    alert(msg);
    return console.error(msg);
  }

  /** this user cannot see anything on the dashboard */
  if (!userMenu === null) {
    const msg = "User  menu empty";
    /** we will return an empty array to avoid error */
    console.log(msg);
    return [];
  }

  /**get the dashboard view user is allowed to see*/
  const userDashboardViewsAllowed =
    userMenu && userMenu["dashboard"] ? userMenu["dashboard"] : null;

  /** this user cannot see anything on the dashboard */
  if (userDashboardViewsAllowed === null) {
    const msg = "User has not dashboard view";
    /** we will return an empty array to avoid error */
    console.log(msg);
    return [];
  }

  /** this will hold all the dashboard views user will see */
  let userDashboard = [];

  /**
   * for menu arrangement, we will put our dashboard items inside menu groups
   * */
  let userDashboardGroup = [];

  Object.keys(userDashboardViewsAllowed).forEach((menuLocation, k) => {
    if (
      globalDashboardMenu[menuLocation] &&
      globalDashboardMenu[menuLocation] !== null &&
      typeof globalDashboardMenu[menuLocation] === "object"
    ) {
      /** check if we are showing this menu entry on the dashboard
       * Please see `Menu` definition under the `dashboard` property for details
       */
      const { showOnDashboard, menuGroup } = globalDashboardMenu[menuLocation];

      /** Assign this dashboard view for this user
       * @todo: in the future, we could perform more function here to assign based on each menu row
       * or we could use a dummy dashboard view for component that user does not have permission to see
       * This is all to help in our display styling.
       */
      //console.log(globalDashboardMenu[menuLocation]["component"], " will assign this now ")
      if (showOnDashboard === true) {
        const CurrentDashboardComponent =
          globalDashboardMenu[menuLocation]["component"];
        const menuId = `${menuLocation}-${k}`;

        if (!userDashboardGroup[menuGroup]) {
          /** add dashboard as an array */
          userDashboardGroup[menuGroup] = [
            <CurrentDashboardComponent key={menuId} />,
          ];
        } else {
          /** there is an existing entry for this menuGroup. Concat this dashboard content to it */
          userDashboardGroup[menuGroup] = userDashboardGroup[menuGroup].concat(
            <CurrentDashboardComponent key={menuId} />
          );
        }
      }
    }
  });

  console.log(userDashboardGroup, "user menu group");

  // /** finally, to ensure that we force each menuGroup to its own row */
  // for (let k=0 ; k < userDashboardGroup.length; k++) {
  //   const menuRow= userDashboardGroup[k];
  //   console.log(menuRow, "menu Group");
  //   userDashboard=userDashboard.concat(<div key={k} style={{width:"100vw"}}>{menuRow}</div>);
  // }

  /** return the dashboard created */
  //return userDashboard;
  return userDashboardGroup;
};


export const createUserDashboard = (userMenu) => {
  if (typeof userMenu !== "object") {
    const msg = "user permission provide must be an object";
    alert(msg);
    return console.error(msg);
  }
  /** get the global dashboard menu  definition
   * to use this feature, we must have `dashboard` property
   * as part of our menu definition
   */
  const globalDashboardMenu = Menu["dashboard"] ?? null;

  if (globalDashboardMenu === null) {
    const msg =
      "Dashboard menu not defined. There must be an entry called dashboard in our menu definition";
    alert(msg);
    return console.error(msg);
  }

  /** this user cannot see anything on the dashboard */
  if (!userMenu === null) {
    const msg = "User menu empty";
    /** we will return an empty array to avoid error */
    console.log(msg);
    return [];
  }

  /**get the dashboard view user is allowed to see*/
  const userDashboardViewsAllowed =
    userMenu && userMenu["dashboard"] ? userMenu["dashboard"] : null;

  /** this user cannot see anything on the dashboard */
  if (userDashboardViewsAllowed === null) {
    const msg = "User has not dashboard view";
    /** we will return an empty array to avoid error */
    console.log(msg);
    return [];
  }

  /** this will hold all the dashboard views user will see */
  let userDashboard = [];

  /**
   * for menu arrangement, we will put our dashboard items inside menu groups
   * */
  let userDashboardGroup = [];

  Object.keys(globalDashboardMenu).forEach((menuLocation, k) => {
    if (
      globalDashboardMenu[menuLocation] &&
      globalDashboardMenu[menuLocation] !== null &&
      typeof globalDashboardMenu[menuLocation] === "object"
    ) {
      /** check if we are showing this menu entry on the dashboard
       * Please see `Menu` definition under the `dashboard` property for details
       */
      const { showOnDashboard, menuGroup} = globalDashboardMenu[menuLocation];

      /** Assign this dashboard view for this user
       * @todo: in the future, we could perform more function here to assign based on each menu row
       * or we could use a dummy dashboard view for component that user does not have permission to see
       * This is all to help in our display styling.
       */
      if (showOnDashboard === true) {

        /** the dashboard component to display */
        let CurrentDashboardComponent =globalDashboardMenu[menuLocation]["component"];

        /** 
         * This is the dummy component to use in case the user does not have  
         * permission to seee the dashboard content
        */
       const CurrentDummyComponent=globalDashboardMenu[menuLocation]["dummy"]? 
       globalDashboardMenu[menuLocation]["dummy"] :
       ()=><div>DUMMY COMPONENT</div>;
       
       console.log(CurrentDummyComponent, "current dummy  location");
        const menuId = `${menuLocation}-${k}`;

        /** 
         * check if this user has the permission to see this dashboard content 
         * if yes, we will add the dashboard content for user, but if not, we will 
         * add a dummy content for the `menuGroup` this dashboard content belongs to
         * by seetting the `CurrentDashboardComponent` to `CurrentDummyComponent`
         * */
        if(!userDashboardViewsAllowed[menuLocation]) {
          /** use a dummy dashboard content*/
          CurrentDashboardComponent= ()=><CurrentDummyComponent/>;
        } 

        if (!userDashboardGroup[menuGroup]) {
          /** add dashboard as an array */
          userDashboardGroup[menuGroup] = [
            <CurrentDashboardComponent key={menuId} />,
          ];
        } else {
          /** there is an existing entry for this menuGroup. Concat this dashboard content to it */
          userDashboardGroup[menuGroup] = userDashboardGroup[menuGroup].concat(
            <CurrentDashboardComponent key={menuId} />
          );
        }
      }
    }
  });

  console.log(userDashboardGroup, "user menu group");

  // /** finally, to ensure that we force each menuGroup to its own row */
  // for (let k=0 ; k < userDashboardGroup.length; k++) {
  //   const menuRow= userDashboardGroup[k];
  //   console.log(menuRow, "menu Group");
  //   userDashboard=userDashboard.concat(<div key={k} style={{width:"100vw"}}>{menuRow}</div>);
  // }

  /** return the dashboard created */
  //return userDashboard;
  return userDashboardGroup;
};

/**
 * This is the central menu definition within our application
 * @note: the user permission will also follow this format
 * to assign permissions to users within the application
 */

export const Menu = {
  /**
   * default menu are the menus that are constant and available
   * to all users irrespective of their user type and permission settings
   */
  default: {
    /**
     * this entry is process new valid route creation after user has successfully log in
     * This also add a second level of validation and ensure that user will not see the dashboard
     * until they are fully created based on permission
     * */
    login: {
      text: "Login",
      link: "/login",
      component: LoginPage,
      hideNavBar: true,
      usePageWrapper: false,
    },
    profile: {
      text: "Profile",
      link: "/profile",
      component: Profile,
    },
    dashboardHome: {
      text: "Dashboard Home",
      link: "/",
      component: Dashboard,
      usePageWrapper: false,
    },
  },

  /** the dashboard page definition */
  dashboard: {
    /** using the `usePageWrapper= false`  will hide the page wrapper for this component*/
    dashboardHome: {
      text: "Dashboard Home",
      link: "/",
      component: Dashboard,
      usePageWrapper: false,
    },

    /** The entries below define items to show only on the dashboard
     * @note: `showOnDashboard:true` and `showInMenu:false` property for each entry.
     * Our dashboard creation method will check if `showOnDashboard` property is true before showing on the dashboard
     * Also, we have added `menuGroup` option which will check which menu group to assign this dashboard iem
     */
    totalOrders: {
      text: "Total Orders",
      link: "#",
      component: TotalOrders,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 1,
      dummy: MenuGroupOneDummy,
    },
    totalRevenue: {
      text: "Total Revenue",
      link: "#",
      component: TotalRevenue,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 1,
      dummy: MenuGroupOneDummy,
    },
    totalStockpile: {
      text: "Total Stockpile",
      link: "#",
      component: TotalStockpile,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 1,
      dummy: MenuGroupOneDummy,
    },
    recentOrders: {
      text: "Recent Orders",
      link: "#",
      component: RecentOrders,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 2,
      dummy: MenuGroupTwoDummy,
    },
    recentSummary: {
      text: "Recent Summary",
      link: "#",
      component: RecentExpenses,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 2,
      dummy: MenuGroupTwoDummy,
    },
    detailedStatistics: {
      text: "Detailed Statistics",
      link: "#",
      component: DetailedStatistics,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 3,
      dummy: MenuGroupThreeDummy,
    },
    activitiesSummary: {
      text: "Activities Summary",
      link: "#",
      component: ActivitiesSummary,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 3,
      dummy: MenuGroupThreeDummy,
    },
    currentActivity: {
      text: "Current Activity",
      link: "#",
      component: CurrentActivity,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 4,
      dummy: MenuGroupFourDummy,
    },
    summary: {
      text: "Summary",
      link: "#",
      component: Summary,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 4,
      dummy: MenuGroupFourDummy,
    },
    usersActivitiesSummary: {
      text: "Users Activities Summary",
      link: "#",
      component: UsersActivitiesSummary,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
      menuGroup: 4,
      dummy: MenuGroupFourDummy,
    },
  },

  /**
   * Everything that relates to order goes here
   * */
  order: {
    placeOrder: {
      text: "Place Order",
      link: "/placeorder",
      component: OrderForm,
      /** use this entry if this sub menu will also have its own subMenu**/
      subItem: [{ link: "/checkorderstatus", text: "Sub Menu Order" }],
    },
    viewOrder: {
      text: "View Orders",
      link: "/vieworders",
      component: ViewOrders,
    },
    orderReceipt: {
      text: "Order Receipt",
      link: "/orderreceipt",
      component: OrderReceipt,
      showInMenu: false,
    },
    orderDispatchList: {
      text: "Orders Dispatch",
      link: "/dispatchlist",
      component: DispatchOrderList,
    },
  },

  /**
   * Production related menu goes here
   * */
  production: {
    production: {
      text: "Start Pumping",
      link: "/production",
      component: Production,
    },
    productionList: {
      text: "Production List",
      link: "/productionlist",
      component: ProductionList,
    },
    wetSand: {
      text: "Wet Sand",
      link: "/wetsand",
      component: WetSand,
    },
    stockpile: {
      text: "Production Stockpile",
      link: "/stockpile",
      component: StockpiledSand,
    },
    stock: {
      text: "Stock Production",
      link: "/stock",
      component: Stock,
    },
    stockUpdate: {
      text: "Stock Movements",
      link: "/stockupdate",
      component: StockUpdate,
    },
  },

  /** revenue definition goes here */
  revenue: {
    revenueReport: {
      text: "Revenue Report",
      link: "/revenuereport",
      component: RevenueReport,
    },
    singleRevenueReport: {
      text: "Single Revenue Report",
      link: "/singlerevenuereport",
      component: SingleRevenueReport,
    },
  },

  /** Account menu items goes here */
  account: {
    postExpenses: {
      text: "Post Expenses",
      link: "/postexpense",
      component: PostExpense,
    },
    expenseReport: {
      text: "Expenses Report",
      link: "/expensereport",
      component: ExpenseReport,
    },
    chartOfAccount: {
      text: "Chart of Account",
      link: "/chartlist",
      component: ChartList,
    },
    addBusinessAccount: {
      text: "Add Business Account",
      link: "/addaccount",
      component: AddAccount,
    },
    businessAccountList: {
      text: "Business Accounts",
      link: "/accountlist",
      component: AccountList,
    },
    postToAccount: {
      text: "Post Entry",
      link: "/postaccount",
      component: PostAccount,
    },
  },

  /** Administrative task menu starts here */
  admin: {
    addUsers: {
      text: "Add User",
      link: "/users",
      component: Users,
    },
    product: {
      text: "Add Products",
      link: "/products",
      component: Products,
    },
    userActivitiesLog: {
      text: "Users Activity",
      link: "/useractivity",
      component: UserActivitiesLog,
    },
  },

  /** store operations menu */
  storeOperations: {
    addMachinery: {
      text: "Add Machinery",
      link: "/operations",
      component: Machinery,
    },
    addFuel: {
      text: "Add Fuel Stock",
      link: "/addfuel",
      component: AddFuel,
    },
    issueFuel: {
      text: "Issue Fuel",
      link: "/fuelissue",
      component: FuelIssuing,
    },
    fuelIssued: {
      text: "Issued Fuel",
      link: "/fuelissuelist",
      component: FuelIssueList,
    },
    fuelStockEntry: {
      text: "Fuel Stock Entry",
      link: "/fuelupdatelist",
      component: FuelUpdateList,
    },
  },

  /** loader menu definition */
  loader: {
    placeOrder: {
      text: "Load Order",
      link: "/loader",
      component: Loader,
    },
  },

  /** loading inspector menus */
  inspector: {
    inspect: {
      text: "Inspect Order",
      link: "/inspect",
      component: Inspector,
    },
  },
  /** activity report menu  */
  activityReport: {
    inspect: {
      text: "Activity sheet",
      link: "/activityreport",
      component: ActivityReport,
    },
    reportList: {
      text: "Report List",
      link: "/reportlist",
      component: ActivityReportList,
    },
  },
  /** security menu  */
  security: {
    inspect: {
      text: "Clear Order",
      link: "/security",
      component: Security,
    },
    impound: {
      text: "Impound truck",
      link: "/impoundtruck",
      component: ImpoundTruck,
    },
  },
};

/**
 * This is the menu definition for our individual menu entries
 * This will hold the icons, the main style and the dropdown icon
 */
export const MenuStyles = {
  /** 
   * No styling for default menu entry. We will most likely not be
   * showing them on the menu bar 
   * */
  default: null,

  order: {
    icon: ordersIcon,
    text: "Order",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "order",
  },
  production: {
    icon: productionIcon,
    text: "Production",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "production",
  },
  dashboard: {
    icon: dashboardIcon,
    text: "Dashboard",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "dashboard",
  },
  account: {
    icon: accountantIcon,
    text: "Account",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "account",
  },
  admin: {
    icon: adminIcon,
    text: "Admin",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "Admin",
  },
  storeOperations: {
    icon: null,
    text: "Store Operations",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "store-operations",
  },
  revenue: {
    icon: null,
    text: "Revenue",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "revenue",
  },
  inspector: {
    icon: null,
    text: "Inspector",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "inspector",
  },
  loader: {
    icon: null,
    text: "Loader",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "loader",
  },
  security: {
    icon: null,
    text: "Security",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "security",
  },
  activityReport: {
    icon: null,
    text: "Activity Report",
    dropdownIcon: dropdownIcon,
    link: "#",
    menuClass: "activity-report",
  },
};
