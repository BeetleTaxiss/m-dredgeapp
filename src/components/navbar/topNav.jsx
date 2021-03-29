import React from "react";
import { MenuItem, MobileLogo } from "./menuItem";
import { topNavBarData } from "./menuItem-data";

const TopNavbar = () => {
  return (
    <div className="topbar-nav header navbar" role="banner">
      <nav id="topbar">
        {/* BEGINNING OF MOBILE LOGO */}
        <MobileLogo />
        {/* END OF MOBILE LOGO */}
        {/* BEGINNING OF MENU BAR */}
        <ul className="list-unstyled menu-categories" id="topAccordion">
          {topNavBarData &&
            topNavBarData.map((item, i) => <MenuItem key={i} item={item} />)}
        </ul>
        {/* END OF MENU BAR */}
      </nav>
    </div>
  );
};

export default TopNavbar;
