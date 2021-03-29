import React from "react";
import HeaderNavbar from "./headerNavbar";
import TopNavbar from "./topNav";

const Navbar = () => {
  return (
    <div>
      {/* BEGIN HEADER NAVBAR */}
      <HeaderNavbar />
      {/* END HEADER NAVBAR */}
      {/* BEGIN TOP NAVBAR */}
      <TopNavbar />
      {/* END TOP NAVBAR */}
    </div>
  );
};

export default Navbar;
