import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./users.css";
import { BASE_API_URL } from "../../hooks/API";
import Contacts from "../general/contacts/contacts";

const Users = () => {
  const [userList, setUserList] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() =>
    axios.get(`${BASE_API_URL}/api/v1/user/list.php`).then((res) => {
      console.log("User List Data: ", res.data);
      const data = res.data.data;
      let body = [];
      data.map((item, i) => {
        const userName = item.user;
        const userImage = "assets/img/profile-5.jpeg";
        const userType = item.user_type;
        const userEmail = item.email;
        const userPhoneNo = item.phone;
        const userPassword = item.password;
        const currentUser = {
          metaInfo: { name: userName, image: userImage },
          fields: [
            {
              fieldName: "Job description",
              fieldInfo:
                userType === "2"
                  ? "Super Admin"
                  : userType === "3"
                  ? "Admin"
                  : userType === "4"
                  ? "Loader"
                  : userType === "5"
                  ? "Production Master"
                  : userType === "6"
                  ? "Loading Inspector"
                  : userType === "7"
                  ? "Security"
                  : userType === "8"
                  ? "Operation Staff"
                  : "Select position",
              fieldClass: "user-meta-info",
            },
            {
              fieldName: "Phone",
              fieldInfo: userPhoneNo,
              fieldClass: "user-meta-info",
            },
            {
              fieldName: "Email",
              fieldInfo: userEmail,
              fieldClass: "user-meta-info",
            },
            {
              fieldName: "Password",
              fieldInfo: userPassword,
              fieldClass: "user-meta-info",
            },
            {
              fieldName: "Confirm Password",
              fieldInfo: "",
              fieldClass: "user-meta-info",
            },
          ],
          user: item,
          setUser: setUser,
          suspend: warningAlert1,
          enable: warningAlert2,
        };
        return (body = body.concat(currentUser));
      });
      setUserList(body);
      console.log("Users Main data: ", body);
      console.log("Users Main DATA: ", userList);
    })
  );
  /**
   * Data for building the user list display divided into table header/legend and users information
   */
  const userListData = {
    searchBar: {},
    header: [
      { field: "Name", class: "text-left" },
      { field: "Job Description", class: "text-left" },
      { field: "Phone", class: "text-left" },
      { field: "Email", class: "text-left" },
    ],
    contacts: userList,
  };

  // Delete User Function
  const deleteContact = () => {};

  // Suspend User Function
  const suspendContact = (suspendUserData) => {
    axios
      .put(`${BASE_API_URL}/api/v1/user/suspend.php`, suspendUserData)
      .then((res) => {
        console.log("Suspend User Data", res.data);
        if (res.data.error) {
          const title = "Suspension Failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "User Suspended",
            text = res.data.message;
          successAlert(title, text);
        }
      });
  };
  const enableContact = (enableUserData) => {
    axios
      .put(`${BASE_API_URL}/api/v1/user/enable.php`, enableUserData)
      .then((res) => {
        console.log("Enable User Data", res.data);
        if (res.data.error) {
          const title = "Enablement Failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "User Enabled",
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

  const title = "Are you sure you want to Delete this order ?";

  const warningAlert1 = (title, userName, userId) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then(() => {
      const suspendUserData = {
        user: userName,
        "user-id": userId,
      };
      suspendContact(suspendUserData);
    });
  };
  const warningAlert2 = (title, userName, userId) => {
    Swal.fire({
      icon: "warning",
      title: title,
    }).then(() => {
      const enableUserData = {
        user: userName,
        "user-id": userId,
      };
      enableContact(enableUserData);
    });
  };

  console.log("Individual User State", user);

  return (
    // <h1>Contact List</h1>
    <Contacts content={userListData} />
  );
};

export default Users;
