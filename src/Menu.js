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
import Machinery from "./components/operations/machinery";
import Users from "./components/users/users";
import UsersActivitiesSummary from "./components/cards/users-activities-summary";
import Inspector from "./components/inspector/inspector";
import Security from "./components/security/security";
import { Dashboard } from "./pages/dashboard";

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
import FuelUpdateList from "./components/fuel-issues/fuel-update-list";
import ActivityReport from "./components/activity-report/ActivityReport";
import ImpoundTruck from "./components/security/impound-truck/ImpoundTruck";
import ActivityReportList from "./components/activity-report/ActivityReportList";

/**
 * Create a menu route for app user based on user permission level
 * @constructor
 * @param userMenu
 */
export const createUserRoutes = (userMenu) => {
  if (typeof userMenu !== "object") {
    alert("user permission provide must be an object");
    return console.error("user permission provide must be an object");
  }

  /**
   * loop over user menu location and check if there is a corresponding entry in the global menu
   * declaration. The global menu will contain all the menus in our application
   */
  const globalMenu = Menu;

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

  /** add the default route. This are the basic route that all user must have access to
   * This is defined under `default` section of the `Menu` definition
   */
  if (globalMenu["default"] && typeof globalMenu["default"] === "object") {
    Object.keys(globalMenu["default"]).forEach((defaultPage) => {
      let currentPage = globalMenu["default"][defaultPage];
      userAccess = userAccess.concat({ ...currentPage });
    });
  }
  /**
   * to fix a peculiar issue with `react-router-dom` where route definition at the top overrides
   * navigation to route at the bottom even if such a route exist, we will make sure the default
   * route comes first.  In `default` menu definition, we ensure that `dashboard` comes first
   * this is to avoid `login` with the default route showing in /dashboard even when dashboard is also defined
   * @todo: we need to investigate this behaviour
   */
  //const allAccessibleRoutes=[...defaultAllowedAccess, ...userAccess];

  console.log(userAccess, "all routes create");

  /** return the routes created */
  return userAccess;
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

  /**get the dashboard view user is allowed to see*/
  const userDashboardViewsAllowed = userMenu["dashboard"] ?? null;

  /** this user cannot see anything on the dashboard */
  if (userDashboardViewsAllowed === null) {
    const msg = "User has not dashboard view";
    /** we will return an empty array to avoid error */
    console.log(msg);
    return [];
  }

  /** this will hold all the dashboard views user will see */
  let userDashboard = [];

  Object.keys(userDashboardViewsAllowed).forEach((menuLocation) => {
    if (
      globalDashboardMenu[menuLocation] &&
      globalDashboardMenu[menuLocation] !== null &&
      typeof globalDashboardMenu[menuLocation] === "object"
    ) {
      /** check if we are showing this menu entry on the dashboard
       * Please see `Menu` definition under the `dashboard` property for details
       */
      const { showOnDashboard } = globalDashboardMenu[menuLocation];

      /** Assign this dashboard view for this user
       * @todo: in the future, we could perform more function here to assign based on each menu row
       * or we could use a dummy dashboard view for component that user does not have permission to see
       * This is all to help in our display styling.
       */
      //console.log(globalDashboardMenu[menuLocation]["component"], " will assign this now ")
      if (showOnDashboard === true) {
        console.log(showOnDashboard, "will show on dashboard");
        const CurrentDashboardComponent =
          globalDashboardMenu[menuLocation]["component"];
        userDashboard = userDashboard.concat(<CurrentDashboardComponent />);
        // userDashboard = userDashboard.concat(<div><TotalOrders/></div>);
      }
      // userDashboard = userDashboard.concat(<div>Hello From Menu creation</div>);
    }
  });
  /** return the dashboard created */
  return userDashboard;
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
    /** using the `usePageWrapper= false`  will hide the page wrapper for this component*/
    login: {
      text: "Login",
      link: "/",
      component: LoginPage,
      hideNavBar: true,
      usePageWrapper: false,
    },
    profile: {
      text: "Profile",
      link: "/profile",
      component: Profile,
    },
  },

  /** the dashboard page definition */
  dashboard: {
    dashboardHome: {
      text: "Dashboard Content",
      link: "/dashboard",
      component: Dashboard,
      usePageWrapper: false,
    },
    /** The entries below define items to show only on the dashboard
     * @note: `showOnDashboard:true` and `showInMenu:false` property for each entry.
     * Our dashboard creation method will check if `showOnDashboard` property is true before showing on the dashboard
     */
    totalOrders: {
      text: "Total Orders",
      link: "dashboard",
      component: TotalOrders,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    recentOrders: {
      text: "Recent Orders",
      link: "#",
      component: RecentOrders,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    totalRevenue: {
      text: "Total Revenue",
      link: "#",
      component: TotalRevenue,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    summary: {
      text: "Summary",
      link: "#",
      component: Summary,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    detailedStatistics: {
      text: "Detailed Statistics",
      component: DetailedStatistics,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    activitiesSummary: {
      text: "Activities Summary",
      link: "#",
      component: ActivitiesSummary,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    totalStockpile: {
      text: "Total Stockpile",
      link: "#",
      component: TotalStockpile,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    recentSummary: {
      text: "Recent Summary",
      link: "#",
      component: RecentExpenses,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    currentActivity: {
      text: "Current Activity",
      link: "#",
      component: CurrentActivity,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
    },
    usersActivitiesSummary: {
      text: "Users Activities Summary",
      link: "#",
      component: UsersActivitiesSummary,
      usePageWrapper: false,
      showOnDashboard: true,
      showInMenu: false,
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
      link: "/accountlist",
      component: AddAccount,
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
  /** No styling for default menu entry. We will most likely not be
   * showing them on the menu bar */
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
    link: "inspect",
    menuClass: "inspector",
  },
  loader: {
    icon: null,
    text: "Loader",
    dropdownIcon: dropdownIcon,
    link: "/loader",
    menuClass: "loader",
  },
  security: {
    icon: null,
    text: "Security",
    dropdownIcon: dropdownIcon,
    link: "security",
    menuClass: "security",
  },
};
