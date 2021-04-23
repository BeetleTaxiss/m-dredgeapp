import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderNavbar from "./header-navbar";
import TopNavbar from "./top-nav";
import { BASE_API_URL } from "../../hooks/API";
import "./navbar.scss";
import {createUserMenu} from "./../../Menu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const history = useHistory();

  /** the nav bar data. we could also retrieve from store */
  const [topNavBarData, setTopNavBarData]= useState([]);

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

  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  /**this is a sample of the user menu permissions */
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
                {link: "/checkorderstatus", 
                text: "Sub Menu Order"}
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
        },
        wetSand: {
            text: "Wet Sand",
            link: "/wetsand",
        },
        stockUpdate: {
            text: "Production Stock Movements",
            link: "/stockupdate",
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

const userMenuAccess= createUserMenu(userMenu);

  return (
    <div>
      {/* BEGIN HEADER NAVBAR */}
      <HeaderNavbar logUserOut={logUserOut} setShowMenu={setShowMenu} />
      {/* END HEADER NAVBAR */}
      {/* BEGIN TOP NAVBAR */}
      <TopNavbar
        showMenu={showMenu}
        showSubMenu={showSubMenu}
        setShowSubMenu={setShowSubMenu}
        // topNavBarData={topNavBarData}
        topNavBarData={userMenuAccess}
      />
      {/* END TOP NAVBAR */}
      <div
        onClick={() => setShowMenu(false)}
        className={`overlay ${showMenu && "show"}`}
      ></div>
    </div>
  );
};

export default Navbar;
