import dashboardIcon from "../../assets/dashboard.svg";
import adminIcon from "../../assets/admin.svg";
import accountantIcon from "../../assets/accountant.svg";
import productionIcon from "../../assets/production.svg";
import ordersIcon from "../../assets/orders.svg";
import dropdownIcon from "../../assets/dropdownIcon.svg";

// TOP NAV BAR DATA

export const topNavBarData = [
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: dashboardIcon,
      menuItem: "Dashboard",
      dropdown: dropdownIcon,
      link: "/dashboard",
      class: "dashboard",
    },
    subMenuItems: [{ link: "#", text: "Dashboard" }],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: adminIcon,
      menuItem: "Admin",
      dropdown: dropdownIcon,
      link: "#",
      class: "admin",
    },
    subMenuItems: [
      { link: "/users", text: "Users" },
      { link: "/products", text: "Set Products" },
      {
        link: "#",
        text: "Operations",
        class: "sub-sub-submenu-list",
        subItem: [
          { link: "/operations", text: "Set Machinery Items" },
          { link: "/addfuel", text: "Add Fuel" },
          { link: "/fuelissue", text: "Dispense Fuel" },
          { link: "/fuelissuelist", text: "Fuel issue List" },
          { link: "/fuelupdatelist", text: "Fuel Update List" },
        ],
      },
    ],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: accountantIcon,
      menuItem: "Account",
      dropdown: dropdownIcon,
      link: "#",
      class: "accountant",
    },
    subMenuItems: [
      { link: "/postexpense", text: "Post Expenses" },
      { link: "/expensereport", text: "Expense Report" },
      { link: "/revenuereport", text: "Revenue Report" },
      {
        link: "#",
        text: "Account",
        class: "sub-sub-submenu-list",
        subItem: [
          { link: "/addaccount", text: "Add Account" },
          { link: "/postaccount", text: "Post Account" },
          { link: "/accountlist", text: "Account List" },
        ],
      },
      {
        link: "/chartlist",
        text: "Chart List",
        class: "sub-sub-submenu-list",
        subItem: [
          { link: "/addaccount", text: "Add Account" },
          { link: "/accountlist", text: "Account List" },
        ],
      },
    ],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: productionIcon,
      menuItem: "Production",
      dropdown: dropdownIcon,
      link: "#",
      class: "production",
    },
    subMenuItems: [
      { link: "/production", text: "Start Production" },
      { link: "/productionlist", text: "Production List" },
      { link: "/wetsand", text: "Wet Sand" },
      { link: "/stockpile", text: "Stockpiled sand" },
      { link: "/stock", text: "Stock List" },
      { link: "/stockupdate", text: "Stock Update" },
    ],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: ordersIcon,
      menuItem: "Orders",
      dropdown: dropdownIcon,
      link: "#",
      class: "orders",
    },
    subMenuItems: [
      { link: "/placeorder", text: "Place Order" },
      { link: "/vieworders", text: "View Orders" },
      { link: "/dispatchlist", text: "View Dispatch List" },
    ],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: ordersIcon,
      menuItem: "Loader",
      dropdown: dropdownIcon,
      link: "#",
      class: "loader",
    },
    subMenuItems: [{ link: "/loader", text: "Load Orders" }],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: ordersIcon,
      menuItem: "Inspect",
      dropdown: dropdownIcon,
      link: "#",
      class: "inspect",
    },
    subMenuItems: [{ link: "/inspect", text: "Inspect Orders" }],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: ordersIcon,
      menuItem: "Clearance",
      dropdown: dropdownIcon,
      link: "#",
      class: "clearance",
    },
    subMenuItems: [{ link: "/security", text: "Clear Orders" }],
  },
  // END OF SINGLE MENU ITEM DATA
];
