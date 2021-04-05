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
    },
    subMenuItems: [
      { link: "/users", text: "Users" },
      { link: "/units", text: "Set Units" },
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
    },
    subMenuItems: [
      { link: "/postexpense", text: "Post Expenses" },
      { link: "/expensereport", text: "Expense Report" },
      { link: "/placeorder", text: "Place Order" },
      { link: "/vieworders", text: "View Orders" },
      { link: "/revenuereport", text: "Revenue Report" },
    ],
  },
  // END OF SINGLE MENU ITEM DATA
  // BEGINNING OF SINGLE MENU ITEM DATA
  {
    menuItem: {
      icon: productionIcon,
      menuItem: "Production",
      dropdown: dropdownIcon,
      link: "/production",
    },
    subMenuItems: [
      { link: "#", text: "Notes" },
      { link: "#", text: "Chat" },
      { link: "#", text: "Mailbox" },
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
    },
    subMenuItems: [
      { link: "/placeorder", text: "Place Order" },
      { link: "/vieworders", text: "View Orders" },
      // { link: "#", text: "M" },
    ],
  },
  // END OF SINGLE MENU ITEM DATA
];
