import React, { useState, useEffect } from "react";
import md5 from "md5";
import Swal from "sweetalert2";
import WidgetHeader from "../general/widget-header";
import { useUserChangePasswordFormData } from "../../hooks/useFormData";
import { FormDetails } from "../orders/order-form/order-form-details";
import LoadingButton from "../general/loading-button";
import axios from "axios";
import { BASE_API_URL } from "../../hooks/API";
import { useGetUserDetails } from "../../hooks/function-utils";
const Profile = () => {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

  useEffect(() => {}, [userName, userId]);

  console.log("UserDetails: ", userName, userId);

  const handleSubmit = () => {
    let oldPassword = md5(
      document.getElementById("password-update-user").value
    );
    // let oldPassword = (document.getElementById("password-update-user").value =
    //   "2cb114991bd3908f5a0da999fba15fe7");
    let newPassword = md5(
      document.getElementById("new-password-update-user").value
    );
    const changePasswordData = {
      user: userName,
      "user-id": userId,
      password: oldPassword,
      "password-new": newPassword,
    };
    console.log("UserDetails: ", changePasswordData);
    axios
      .put(
        `${BASE_API_URL}/api/v1/user/change-password.php`,
        changePasswordData
      )
      .then((res) => {
        console.log("Change User password Data", res.data);
        if (res.data.error) {
          const title = "Password update failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "Password changed",
            text = res.data.message;
          successAlert(title, text);
        }
      });
  };
  const successAlert = (title, text, link) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      footer: link,
      showConfirmButton: false,
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
  const {
    updatePasswordFormData,
    updatePasswordFormText: { formTitle, formSubtitle, Btntext },
  } = useUserChangePasswordFormData(userName);

  return (
    <div className="statbox widget box box-shadow col-md-12">
      <WidgetHeader title={"Account Settings"} />
      <div
        className="widget-content widget-content-area"
        style={{
          padding: "1.5rem  3rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={titleStyles} id="formModal-title">
          {formTitle}
        </h2>
        <p style={subtitleStyles} id="formModal-subtitle">
          {formSubtitle}
        </p>
        <form id="formModal" onSubmit={(e) => e.preventDefault()}>
          {updatePasswordFormData.map((item, i) => (
            <div key={item.id} className="row">
              <div className="col-md-12">
                <div className="">
                  <i className="flaticon-location-1"></i>
                  <FormDetails item={item} />
                  <span className="validation-text"></span>
                </div>
              </div>
            </div>
          ))}
          <LoadingButton
            handleSubmit={handleSubmit}
            // loading={loading}
            text={Btntext}
          />
        </form>
      </div>
    </div>
  );
};

const titleStyles = {
  alignSelf: "center",
};
const subtitleStyles = {
  alignSelf: "center",
  marginBottom: "2rem",
};

export default Profile;
