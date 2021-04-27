import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormDetails } from "../components/orders/order-form/order-form-details";
import { BASE_API_URL } from "../hooks/API";
import { functionUtils, errorAlert } from "../hooks/function-utils";

import {StoreManager} from "react-persistent-store-manager"
import {Stores, AppStore} from "./../state/store";

import {userMenu} from "./../UserMenuMock";


const LoginPage = () => {

//console.log(JSON.stringify(userMenu), "menu sample");

  /** create a store  */
  const Store= StoreManager(AppStore, Stores, "AppSettingsStore");


  const [user, setUsername] = useState({
    user: "",
  });
  const [password, setPassword] = useState({
    password: "",
  });
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errors, setErrors] = useState({
    user: "",
    password: "",
  });

  const history = useHistory();
  const location = useLocation();

  const handleChange = functionUtils.SignInFormChange(
    errors,
    setErrors,
    setUsername,
    setPassword
  );
  const handleSubmit = functionUtils.SignInFormSubmit(
    errors,
    user,
    password,
    history,
    location
  );

  const showPassword = () => {
    let passwordType = document.getElementById("password").getAttribute("type");
    document
      .getElementById("password")
      .setAttribute(
        "type",
        `${
          passwordType === "password"
            ? "text"
            : passwordType === "text"
            ? "password"
            : "password"
        }`
      );
  };

  const item1 = {
    id: "username",
    type: "text",
    name: "user",
    value: user.user,
    className: "form-control",
    required: true,
  };
  const item2 = {
    id: "password",
    type: "password",
    name: "password",
    value: password.password,
    required: true,
    className: "form-control",
    holder: "Password",
  };
  
/** get the system settings only once we load */
  useEffect(()=>{

    axios.get(`${BASE_API_URL}/api/v1/system/app-settings.php`).then((response) => {

      const data=response.data.data;

      Store.update("measurements", data['measurement']);    
      Store.update("userTypes", data['user_types']);  

      /** parse permissionList as object
       * @todo the server might need to return a simpler permission list data
       *  **/ 
      const userPermissions=functionUtils.parseUserPermission(data['user_permission'][0]['permission']);
      Store.update("user_permission", userPermissions);  

    }).catch(error=>{
      errorAlert("Oops!","could not load settings. Check Internet connection");
    })
  }, []);


  return (
    <section className="form">
      <div className="form-container outer">
        <div className="form-form">
          <div className="form-form-wrap">
            <div className="form-container">
              <div className="form-content">
                <h1 className="">Sign In</h1>
                <p className="">Log in to your account to continue.</p>

                <form
                  className="text-left"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form">
                    <div id="username-field" className="field-wrapper input">
                      {errors.user !== "" && errorDisplay === true ? (
                        <label style={{ color: "red" }} htmlFor="username">
                          {errors.user}
                        </label>
                      ) : (
                        <label htmlFor="username">USERNAME</label>
                      )}
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
                      </svg>
                      <FormDetails
                        item={item1}
                        handleChange={handleChange}
                        errors={errors.user}
                      />
                    </div>

                    <div
                      id="password-field"
                      className="field-wrapper input mb-2"
                    >
                      <div className="d-flex justify-content-between">
                        {errors.password !== "" && errorDisplay === true ? (
                          <label style={{ color: "red" }} htmlFor="password">
                            {errors.password}
                          </label>
                        ) : (
                          <label htmlFor="password">PASSWORD</label>
                        )}
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
                        className="feather feather-lock"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>

                      <FormDetails
                        item={item2}
                        handleChange={handleChange}
                        errors={errors.password}
                      />
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
                        id="toggle-password"
                        onClick={() => {
                          showPassword();
                        }}
                        className="feather feather-eye"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <div className="d-sm-flex justify-content-between">
                      <div className="field-wrapper">
                        <button
                          onClick={() => {
                            if (errors.user !== "" || errors.password !== "") {
                              setErrorDisplay(true);
                              console.log(errorDisplay);
                            } else if (
                              errors.user === "" ||
                              errors.password === ""
                            ) {
                              setErrorDisplay(false);
                              handleSubmit();
                            }
                          }}
                          // type="submit"
                          className="btn btn-primary"
                          value=""
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                    <p className="signup-link"></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
