import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/blankProfileImg.png";
import {functionUtils} from "./../../hooks/function-utils"

const HeaderNavbar = ({ logUserOut, setShowMenu, userName, userType }) => {

  /** 
   * for our electron app, we will create a custom menu bar
   * by default, this menu bar will be empty   
   * */
  let ElectronWindowBar=()=>null;

  /** set if we are within an electron environment  */
  if (functionUtils.isElectronApp()) {
    ElectronWindowBar=()=><div  id="electron-window" className="electron-window">
      <button id="app-menu-file"  class="electron-window-menu">File</button>
      <button id="app-minimize" class="electron-window-menu">Min</button>
      <button id="app-close" class="electron-window-menu-end">Close</button>
      </div>
  }

  return (
    <>
    <ElectronWindowBar/>
    <div className="header-container">
      <header className="header navbar navbar-expand-sm">
        <Link
          to="javascript:void(0)"
          onClick={(e) => {
            e.preventDefault();
            setShowMenu((prev) => !prev);
          }}
          className="sidebarCollapse"
          data-placement="bottom"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Link>

        <div className="nav-logo align-self-center">
          <Link className="navbar-brand" to="index.html">
            <img alt="logo" src="assets/img/logo.svg" />{" "}
            <span className="navbar-brand-name">Atop</span>
          </Link>
        </div>

        <ul className="navbar-item flex-row mr-auto"></ul>

        <ul className="navbar-item flex-row nav-dropdowns">
          {/* <li className="nav-item dropdown notification-dropdown">
            <Link
              to="javascript:void(0)"
              onClick={(e) => e.preventDefault()}
              className="nav-link dropdown-toggle"
              id="notificationDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="badge badge-success"></span>
            </Link>
            <div
              className="dropdown-menu position-absolute"
              aria-labelledby="notificationDropdown"
            >
              <div className="notification-scroll">
                <div className="dropdown-item">
                  <div className="media server-log">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-server"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="8"
                        rx="2"
                        ry="2"
                      ></rect>
                      <rect
                        x="2"
                        y="14"
                        width="20"
                        height="8"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="6" y1="6" x2="6" y2="6"></line>
                      <line x1="6" y1="18" x2="6" y2="18"></line>
                    </svg>
                    <div className="media-body">
                      <div className="data-info">
                        <h6 className="">Server Rebooted</h6>
                        <p className="">45 min ago</p>
                      </div>

                      <div className="icon-status">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dropdown-item">
                  <div className="media ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-heart"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <div className="media-body">
                      <div className="data-info">
                        <h6 className="">Licence Expiring Soon</h6>
                        <p className="">8 hrs ago</p>
                      </div>

                      <div className="icon-status">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dropdown-item">
                  <div className="media file-upload">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file-text"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <div className="media-body">
                      <div className="data-info">
                        <h6 className="">Kelly Portfolio.pdf</h6>
                        <p className="">670 kb</p>
                      </div>

                      <div className="icon-status">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-check"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li> */}

          <li
            id="nav-item-user-dropdown"
            className="nav-item dropdown user-profile-dropdown order-lg-0 order-1"
            onClick={() => {
              document.getElementById("nav-item-user-dropdown").class =
                "nav-item dropdown user-profile-dropdown order-lg-0 order-1 show";
            }}
          >
            <Link
              to="javascript:void(0)"
              onClick={(e) => e.preventDefault()}
              className="nav-link dropdown-toggle user"
              id="user-profile-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="media">
                <div className="media-body align-self-center">
                  <h6>{userName}</h6>
                  <p>{userType}</p>
                </div>
                <img
                  src={profileImg}
                  className="img-fluid"
                  alt="admin-profile"
                />
                <span className="badge badge-success"></span>
              </div>
            </Link>

            <div
              className="dropdown-menu position-absolute"
              aria-labelledby="userProfileDropdown"
            >
              <div className="dropdown-item">
                <Link to="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-user"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>{" "}
                  <span> Settings</span>
                </Link>
              </div>
              <div className="dropdown-item">
                <Link
                  to="javascript:void(0)"
                  onClick={(e) => {
                    e.preventDefault();
                    logUserOut();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-log-out"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>{" "}
                  <span>Log Out</span>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </header>
    </div>
    </>
  );
};

export default HeaderNavbar;
