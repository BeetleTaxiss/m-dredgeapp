import React from "react";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className="topbar-nav header navbar" role="banner">
      <nav id="topbar">
        <ul className="navbar-nav theme-brand flex-row  text-center">
          <li className="nav-item theme-logo">
            <Link to="index.html">
              <img
                src="assets/img/logo2.svg"
                className="navbar-logo"
                alt="logo"
              />
            </Link>
          </li>
          <li className="nav-item theme-text">
            <Link to="index.html" className="nav-link">
              {" "}
              CORK{" "}
            </Link>
          </li>
        </ul>

        <ul className="list-unstyled menu-categories" id="topAccordion">
          <li className="menu single-menu active">
            <Link
              to="#dashboard"
              data-toggle="collapse"
              aria-expanded="true"
              className="dropdown-toggle autodroprown"
            >
              <div className="">
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
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Dashboard</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="dashboard"
              data-parent="#topAccordion"
            >
              <li className="active">
                <Link to="index.html"> Analytics </Link>
              </li>
              <li>
                <Link to="index2.html"> Sales </Link>
              </li>
            </ul>
          </li>

          <li className="menu single-menu">
            <Link
              to="#app"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
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
                  className="feather feather-cpu"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
                <span>Apps</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="app"
              data-parent="#topAccordion"
            >
              <li>
                <Link to="apps_chat.html"> Chat </Link>
              </li>
              <li>
                <Link to="apps_mailbox.html"> Mailbox </Link>
              </li>
              <li>
                <Link to="apps_todoList.html"> Todo List </Link>
              </li>
              <li>
                <Link to="apps_notes.html">Notes</Link>
              </li>
              <li>
                <Link to="apps_scrumboard.html">Task Board</Link>
              </li>
              <li>
                <Link to="apps_contacts.html">Contacts</Link>
              </li>
              <li className="sub-sub-submenu-list">
                <Link
                  to="#appInvoice"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  Invoice{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="appInvoice"
                  data-parent="#app"
                >
                  <li>
                    <Link to="apps_invoice-list.html"> List </Link>
                  </li>
                  <li>
                    <Link to="apps_invoice-preview.html"> Preview </Link>
                  </li>
                  <li>
                    <Link to="apps_invoice-add.html"> Add </Link>
                  </li>
                  <li>
                    <Link to="apps_invoice-edit.html"> Edit </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="apps_calendar.html"> Calendar</Link>
              </li>
            </ul>
          </li>

          <li className="menu single-menu">
            <Link
              to="#components"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
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
                  className="feather feather-box"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>Components</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="components"
              data-parent="#topAccordion"
            >
              <li>
                <Link to="component_tabs.html"> Tabs </Link>
              </li>
              <li>
                <Link to="component_accordion.html"> Accordions </Link>
              </li>
              <li>
                <Link to="component_modal.html"> Modals </Link>
              </li>
              <li>
                <Link to="component_cards.html"> Cards </Link>
              </li>
              <li>
                <Link to="component_bootstrap_carousel.html">Carousel</Link>
              </li>
              <li>
                <Link to="component_blockui.html"> Block UI </Link>
              </li>
              <li>
                <Link to="component_countdown.html"> Countdown </Link>
              </li>
              <li>
                <Link to="component_counter.html"> Counter </Link>
              </li>
              <li>
                <Link to="component_sweetalert.html"> Sweet Alerts </Link>
              </li>
              <li>
                <Link to="component_timeline.html"> Timeline </Link>
              </li>
              <li>
                <Link to="component_snackbar.html"> Notifications </Link>
              </li>
              <li>
                <Link to="component_session_timeout.html">
                  {" "}
                  Session Timeout{" "}
                </Link>
              </li>
              <li>
                <Link to="component_media_object.html"> Media Object </Link>
              </li>
              <li>
                <Link to="component_list_group.html"> List Group </Link>
              </li>
              <li>
                <Link to="component_pricing_table.html"> Pricing Tables </Link>
              </li>
              <li>
                <Link to="component_lightbox.html"> Lightbox </Link>
              </li>
            </ul>
          </li>

          <li className="menu single-menu">
            <Link
              to="#uiKit"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
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
                  className="feather feather-zap"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>UI Kit</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="uiKit"
              data-parent="#topAccordion"
            >
              <li>
                <Link to="ui_alerts.html"> Alerts </Link>
              </li>
              <li>
                <Link to="ui_avatar.html"> Avatar </Link>
              </li>
              <li>
                <Link to="ui_badges.html"> Badges </Link>
              </li>
              <li>
                <Link to="ui_breadcrumbs.html"> Breadcrumbs </Link>
              </li>
              <li>
                <Link to="ui_buttons.html"> Buttons </Link>
              </li>
              <li>
                <Link to="ui_buttons_group.html"> Button Groups </Link>
              </li>
              <li>
                <Link to="ui_color_library.html"> Color Library </Link>
              </li>
              <li>
                <Link to="ui_dropdown.html"> Dropdown </Link>
              </li>
              <li>
                <Link to="ui_infobox.html"> Infobox </Link>
              </li>
              <li>
                <Link to="ui_jumbotron.html"> Jumbotron </Link>
              </li>
              <li>
                <Link to="ui_loader.html"> Loader </Link>
              </li>
              <li>
                <Link to="ui_pagination.html"> Pagination </Link>
              </li>
              <li>
                <Link to="ui_popovers.html"> Popovers </Link>
              </li>
              <li>
                <Link to="ui_progress_bar.html"> Progress Bar </Link>
              </li>
              <li>
                <Link to="ui_search.html"> Search </Link>
              </li>
              <li>
                <Link to="ui_tooltips.html"> Tooltips </Link>
              </li>
              <li>
                <Link to="ui_treeview.html"> Treeview </Link>
              </li>
              <li>
                <Link to="ui_typography.html"> Typography </Link>
              </li>
            </ul>
          </li>

          <li className="menu single-menu">
            <Link
              to="#tables"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
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
                  className="feather feather-layout"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                <span>Tables</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="tables"
              data-parent="#topAccordion"
            >
              <li>
                <Link to="table_basic.html"> Basic </Link>
              </li>
              <li className="sub-sub-submenu-list">
                <Link
                  to="#datatable"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  DataTables{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="datatable"
                  data-parent="#datatable"
                >
                  <li>
                    <Link to="table_dt_basic.html"> Basic </Link>
                  </li>
                  <li>
                    <Link to="table_dt_striped_table.html">
                      {" "}
                      Striped Table{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="table_dt_ordering_sorting.html">
                      {" "}
                      Order Sorting{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="table_dt_multi-column_ordering.html">
                      {" "}
                      Multi-Column{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="table_dt_multiple_tables.html">
                      {" "}
                      Multiple Tables
                    </Link>
                  </li>
                  <li>
                    <Link to="table_dt_alternative_pagination.html">
                      {" "}
                      Alt. Pagination
                    </Link>
                  </li>
                  <li>
                    <Link to="table_dt_custom.html"> Custom </Link>
                  </li>
                  <li>
                    <Link to="table_dt_range_search.html"> Range Search </Link>
                  </li>
                  <li>
                    <Link to="table_dt_html5.html"> HTML5 Export </Link>
                  </li>
                  <li>
                    <Link to="table_dt_live_dom_ordering.html">
                      {" "}
                      Live DOM ordering{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="table_dt_miscellaneous.html">
                      {" "}
                      Miscellaneous{" "}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="menu single-menu">
            <Link
              to="#forms"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
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
                  className="feather feather-clipboard"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <span>Forms</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="forms"
              data-parent="#topAccordion"
            >
              <li>
                <Link to="form_bootstrap_basic.html"> Basic </Link>
              </li>
              <li>
                <Link to="form_input_group_basic.html"> Input Group </Link>
              </li>
              <li>
                <Link to="form_layouts.html"> Layouts </Link>
              </li>
              <li>
                <Link to="form_validation.html"> Validation </Link>
              </li>
              <li>
                <Link to="form_input_mask.html"> Input Mask </Link>
              </li>
              <li>
                <Link to="form_bootstrap_select.html"> Bootstrap Select </Link>
              </li>
              <li>
                <Link to="form_select2.html"> Select2 </Link>
              </li>
              <li>
                <Link to="form_bootstrap_touchspin.html"> TouchSpin </Link>
              </li>
              <li>
                <Link to="form_maxlength.html"> Maxlength </Link>
              </li>
              <li>
                <Link to="form_checkbox_radio.html">
                  {" "}
                  Checkbox &amp; Radio{" "}
                </Link>
              </li>
              <li>
                <Link to="form_switches.html"> Switches </Link>
              </li>
              <li>
                <Link to="form_wizard.html"> Wizards </Link>
              </li>
              <li>
                <Link to="form_fileupload.html"> File Upload </Link>
              </li>
              <li>
                <Link to="form_quill.html"> Quill Editor </Link>
              </li>
              <li>
                <Link to="form_markdown.html"> Markdown Editor </Link>
              </li>
              <li>
                <Link to="form_date_range_picker.html">
                  {" "}
                  Date &amp; Range Picker{" "}
                </Link>
              </li>
              <li>
                <Link to="form_clipboard.html"> Clipboard </Link>
              </li>
              <li>
                <Link to="form_typeahead.html"> Typeahead </Link>
              </li>
            </ul>
          </li>

          <li className="menu single-menu">
            <Link
              to="#page"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
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
                  className="feather feather-file"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span>Pages</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="page"
              data-parent="#topAccordion"
            >
              <li>
                <Link to="pages_helpdesk.html"> Helpdesk </Link>
              </li>
              <li>
                <Link to="pages_contact_us.html"> Contact Form </Link>
              </li>
              <li>
                <Link to="pages_faq.html"> FAQ </Link>
              </li>
              <li>
                <Link to="pages_faq2.html"> FAQ 2 </Link>
              </li>
              <li>
                <Link to="pages_privacy.html"> Privacy Policy </Link>
              </li>
              <li>
                <Link to="pages_coming_soon.html" target="_blank">
                  {" "}
                  Coming Soon{" "}
                </Link>
              </li>
              <li>
                <Link to="user_profile.html"> Profile </Link>
              </li>
              <li>
                <Link to="user_account_setting.html"> Account Settings </Link>
              </li>
              <li className="sub-sub-submenu-list">
                <Link
                  to="#pages-error"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  Error{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="pages-error"
                  data-parent="#more"
                >
                  <li>
                    <Link to="pages_error404.html" target="_blank">
                      {" "}
                      404{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="pages_error500.html" target="_blank">
                      {" "}
                      500{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="pages_error503.html" target="_blank">
                      {" "}
                      503{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="pages_maintenence.html" target="_blank">
                      {" "}
                      Maintanence{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="sub-sub-submenu-list">
                <Link
                  to="#user-login"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  Login{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="user-login"
                  data-parent="#page"
                >
                  <li>
                    <Link target="_blank" to="auth_login.html">
                      {" "}
                      Login{" "}
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="auth_login_boxed.html">
                      {" "}
                      Login Boxed{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="sub-sub-submenu-list">
                <Link
                  to="#user-register"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  Register{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="user-register"
                  data-parent="#page"
                >
                  <li>
                    <Link target="_blank" to="auth_register.html">
                      {" "}
                      Register{" "}
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="auth_register_boxed.html">
                      {" "}
                      Register Boxed{" "}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="sub-sub-submenu-list">
                <Link
                  to="#user-passRecovery"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  Password Recovery{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="user-passRecovery"
                  data-parent="#page"
                >
                  <li>
                    <Link target="_blank" to="auth_pass_recovery.html">
                      {" "}
                      Recover ID{" "}
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="auth_pass_recovery_boxed.html">
                      {" "}
                      Recover ID Boxed{" "}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="sub-sub-submenu-list">
                <Link
                  to="#user-lockscreen"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  Lockscreen{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu"
                  id="user-lockscreen"
                  data-parent="#page"
                >
                  <li>
                    <Link target="_blank" to="auth_lockscreen.html">
                      {" "}
                      Unlock{" "}
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="auth_lockscreen_boxed.html">
                      {" "}
                      Unlock Boxed{" "}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="menu single-menu">
            <Link
              to="#more"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
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
                  className="feather feather-plus-circle"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>More</span>
              </div>
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
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <ul
              className="collapse submenu list-unstyled"
              id="more"
              data-parent="#topAccordion"
            >
              <li>
                <Link to="dragndrop_dragula.html"> Drag and Drop</Link>
              </li>
              <li>
                <Link to="widgets.html"> Widgets </Link>
              </li>
              <li>
                <Link to="map_jvector.html"> Vector Maps</Link>
              </li>
              <li>
                <Link to="charts_apex.html"> Charts </Link>
              </li>
              <li>
                <Link to="fonticons.html"> Font Icons </Link>
              </li>
              <li className="sub-sub-submenu-list">
                <Link
                  to="#starter-kit"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="dropdown-toggle"
                >
                  {" "}
                  Starter Kit{" "}
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
                    className="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>{" "}
                </Link>
                <ul
                  className="collapse list-unstyled sub-submenu eq-animated eq-fadeInUp"
                  id="starter-kit"
                  data-parent="#more"
                >
                  <li>
                    <Link to="starter_kit_blank_page.html"> Blank Page </Link>
                  </li>
                  <li>
                    <Link to="starter_kit_breadcrumb.html"> Breadcrumb </Link>
                  </li>
                  <li>
                    <Link to="starter_kit_alt_menu.html"> Alternate Menu </Link>
                  </li>
                  <li>
                    <Link to="starter_kit_click_menu.html"> Click Menu </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link target="_blank" to="../../documentation/index.html">
                  {" "}
                  Documentation{" "}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopNavbar;
