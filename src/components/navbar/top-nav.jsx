import React, { useState, useEffect } from "react";
import { MenuItem, MobileLogo } from "./menuItem";
// import { topNavBarData } from "./menuItem-data";

const TopNavbar = ({
  showMenu,
  showSubMenu,
  setShowSubMenu,
  topNavBarData,
}) => {
  return (
    <div
      className={`topbar-nav header navbar ${showMenu && "showMenu"}`}
      role="banner"
      // style={{ overflowY: "auto" }}
    >
      <nav id="topbar">
        {/* BEGINNING OF MOBILE LOGO */}
        <MobileLogo />
        {/* END OF MOBILE LOGO */}
        {/* BEGINNING OF MENU BAR */}
        <ul className="list-unstyled menu-categories" id="topAccordion">
          {/* <div className=""> */}
          {topNavBarData &&
            topNavBarData.map((item, i) => (
              <MenuItem
                key={i}
                item={item}
                showSubMenu={showSubMenu}
                setShowSubMenu={setShowSubMenu}
              />
            ))}
          {/* </div> */}
        </ul>
        {/* END OF MENU BAR */}
      </nav>
    </div>
  );
};

export default TopNavbar;
