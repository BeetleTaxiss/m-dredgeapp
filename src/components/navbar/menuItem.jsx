import React from "react";
import { Link } from "react-router-dom";

//MOBILE LOGO COMPONENT
export const MobileLogo = () => (
  <ul className="navbar-nav theme-brand flex-row  text-center">
    <li className="nav-item theme-logo">
      <Link to="#">
        <img src="assets/img/logo2.svg" className="navbar-logo" alt="logo" />
      </Link>
    </li>
    <li className="nav-item theme-text">
      <Link to="index.html" className="nav-link">
        {" "}
        Atup{" "}
      </Link>
    </li>
  </ul>
);

// TOP NAV BAR MENU ITEM COMPONENT
export const MenuItem = ({ item, showSubMenu }) => {
  //const { icon, menuItem, dropdown, link } = item.menuItem;
  const { icon, menuItem, dropdown, link } = item;

  const offsetSubMenu = () => {
    const topNavBar = document.getElementById("topbar");
    const topNavBarPosition = topNavBar.scrollLeft;
    const subMenu = document.getElementById(`dashboard-${menuItem}`);
    if (topNavBarPosition !== 0) {
      subMenu.style.transform = `translateX(-${topNavBarPosition / 2}%)`;
    }
    if (topNavBarPosition !== 0 && menuItem === "Security") {
      subMenu.style.transform = `translateX(-${topNavBarPosition / 2}%)`;
    }
  };
  return (
    <li className="menu single-menu active">
      <Link
        to={link}
        data-toggle="collapse"
        aria-expanded="true"
        className="dropdown-toggle autodroprown"
        style={{ alignItems: "center" }}
        onClick={(e) => {
          e.preventDefault();
          offsetSubMenu();
        }}
        onMouseEnter={() => offsetSubMenu()}
      >
        {/* MENU ITEM CONTAINER */}
        <div
          className="menuItem-container"
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          {/* MENU ITEM ICON */}
          <ion-icon id="svg" src={icon} />
          {/* MENU ITEM TEXT */}
          <span>{menuItem}</span>
        </div>
        {/* MENU ITEM DROPDOWN */}
        <ion-icon className="feather feather-chevron-down" src={dropdown} />
      </Link>
      {item.subMenuItems && (
        // MENU ITEM SUB-MENU ITEM
        <ul
          className={`${item.menuItem.class} submenu list-unstyled ${
            showSubMenu && "show"
          }`}
          id={`dashboard-${menuItem}`}
          data-parent="#topAccordion"
        >
          {item.subMenuItems.map((subItem, i) => {
            return (
              <li key={i} className={subItem.class}>
                <Link to={subItem.link}>
                  {subItem.text}

                  {subItem.subItem && (
                    <ion-icon
                      className="feather feather-chevron-down"
                      src={dropdown}
                    />
                  )}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="datatable"
                  data-parent="#data-parent"
                >
                  {subItem.subItem &&
                    subItem.subItem.map((item, i) => (
                      <li key={i} className={item.class}>
                        <Link to={item.link}> {item.text} </Link>
                      </li>
                    ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};
