import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderNavbar from "./header-navbar";
import TopNavbar from "./top-nav";
import { BASE_API_URL } from "../../hooks/API";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const history = useHistory();
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
