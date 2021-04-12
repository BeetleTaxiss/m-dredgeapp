import React, { useState } from "react";
import HeaderNavbar from "./header-navbar";
import TopNavbar from "./top-nav";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  return (
    <div>
      {/* BEGIN HEADER NAVBAR */}
      <HeaderNavbar setShowMenu={setShowMenu} />
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
