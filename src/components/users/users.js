import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import md5 from "md5";
import "./users.css";
import { BASE_API_URL } from "../../hooks/API";
import {
  useAddContactFormData,
  useUpdateContactFormData,
} from "../../hooks/useFormData";
import Contacts from "../general/contacts/contacts";
import FormModal from "../general/modal/form-modal";
import {
  createPermissionList,
  createUserPermissionListComponent,
  getPermissionData
} from "./PermissionList";
import { errorAlert, successAlert} from "../../hooks/function-utils";

const Users = () => {

  const [userList, setUserList] = useState(null);
  const [user, setUser] = useState(null);
  const [userTypes, setUserTypes] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUserDetailsUpdate, setShowUserDetailsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  /** 
   * This is the userPermissionListView that we will display when we attempt to update
   * This value will change based on the user account we are updating.
   * For us to be able to track changes happening in the `Contacts` and `Contact` component
   * we will pass the function `setUserPermissionListView` and call whenever a user is to be updated
   *  */
  const [userPermissionListView, setUserPermissionListView] = useState([]);

  /** this state variable will allow  us to get the data */
  const [userGetPermissionData, setUserGetPermissionData] = useState([]);



  /**
   * create a state to hold our function to get permission data
   * from our external component
   * */
  // const [getPermissionData, setGetPermissionData] = useState(null);

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

  const changePassword = () => {
    let userName = document.getElementById("user-add-user").value,
      userId = document.getElementById("user-id-add-user").value,
      userPassword = document.getElementById("password-add-user").value,
      newUserPassword = md5(
        document.getElementById("new-password-add-user").value
      );
      /** get the permission updates for this user */
      const permission=getPermissionData();
      console.log(JSON.parse(permission), "UPdATED permission");

    const changePasswordData = {
      user: userName,
      "user-id": userId,
      password: userPassword,
      "password-new": newUserPassword,
    };

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

  
  /**
   * This component will return both the permissionListAccordion and the 
   * method to getPermissionData to get the updated permission data before 
   * update
   */
   const BlankPermissionListForNewUser = (props) => {
    const permissionListData = createPermissionList({});

    const [
      PermissionList
    ] = createUserPermissionListComponent(permissionListData);

    return <>{PermissionList}</>;
  };


  const addContact = () => {

    let newUserName = document.getElementById("user-add-user").value,
      newUserType = document.getElementById("select-add-user").value,
      newUserEmail = document.getElementById("email-add-user").value,
      newUserPhoneNo = document.getElementById("phone-add-user").value,
      newUserPassword = md5(document.getElementById("password-add-user").value),
      newUserConfirmPassword = md5(document.getElementById("confirm-password-add-user").value);
    
    /** get the userPermissionList data */
    const permission= getPermissionData();
    
    if(!permission) {
      return errorAlert("Permission Error", "You must give new user at least one permission");
    }
  
    const addUserData = {
      user: newUserName,
      "user-type": newUserType,
      email: newUserEmail,
      phone: newUserPhoneNo,
      password: newUserPassword,
      "password-confirm": newUserConfirmPassword,
      "permission": permission,
    };
    axios
      .post(`${BASE_API_URL}/api/v1/user/add.php`, addUserData)
      .then((res) => {
        console.log("Add User Data", res.data);
        if (res.data.error) {
          const title = "Add User Failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "User Added",
            text = res.data.message;
          successAlert(title, text);
          newUserName = "";
          newUserType = "";
          newUserEmail = "";
          newUserPhoneNo = "";
          newUserPassword = "";
          newUserConfirmPassword = "";
        }
      }).catch(error=>{
        errorAlert(error.message, "Please check internet connection")
      })
  };

  // Delete User Function
  const deleteContact = (deleteUserData) => {
    axios
      .post(`${BASE_API_URL}/api/v1/user/delete.php`, deleteUserData)
      .then((res) => {
        console.log("Delete User Data", res.data);
        if (res.data.error) {
          const title = "Delete User Failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "User Deleted",
            text = res.data.message;
          successAlert(title, text);
        }
      }).catch(error=>{
        errorAlert(error.message, "Please check internet connection")
      })
  };

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
      }).catch(error=>{
        errorAlert(error.message, "Cannot suspend.Please check internet connection")
      })
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
      }).catch(error=>{
        errorAlert(error.message, "Cannot enable. Please check internet connection")
      })
  };

  const warningAlert1 = (title, userName, userId) => {
    Swal.fire({
      icon: "warning",
      title: title,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((value) => {
      const suspendUserData = {
        user: userName,
        "user-id": userId,
      };
      if (value.isConfirmed) {
        suspendContact(suspendUserData);
      }
    });
  };
  const warningAlert2 = (title, userName, userId) => {
    Swal.fire({
      icon: "warning",
      title: title,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((value) => {
      const enableUserData = {
        user: userName,
        "user-id": userId,
      };
      console.log("Sweet Alert: ", value);
      if (value.isConfirmed) {
        enableContact(enableUserData);
      }
    });
  };
  const warningAlert3 = (title, userName, userId) => {
    Swal.fire({
      icon: "warning",
      title: title,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((value) => {
      const loggedInUserDetails = JSON.parse(localStorage.getItem("user"));
      const loggedInUser = loggedInUserDetails.username;
      const loggedInUserId = loggedInUserDetails.id;
      const deleteUserData = {
        user: loggedInUser,
        "user-id": loggedInUserId,
        "delete-user": userName,
        "delete-id": userId,
      };
      console.log("Sweet Alert: ", value);
      if (value.isConfirmed) {
        deleteContact(deleteUserData);
      }
    });
  };

  console.log("Individual User State", user);

  const selectOptions = [
    { user_type: "Select Job Description", id: "0" },
    { user_type: "Super Admin", id: "2" },
    { user_type: "Admin", id: "3" },
    { user_type: "Loader", id: "4" },
    { user_type: "Production Master", id: "5" },
    { user_type: "Loading Inspector", id: "6" },
    { user_type: "Security", id: "7" },
    { user_type: "Operation Staff", id: "8" },
  ];
  console.log("Individual User Type: ", userTypes);
  const { formData } = useAddContactFormData(selectOptions);
  const { updateFormData } = useUpdateContactFormData();

  /** load the user list on page open */
  useEffect(() => {
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
        const permission = item.permission;

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
          permission: permission,
          setUser: setUser,
          suspend: warningAlert1,
          enable: warningAlert2,
          delete: warningAlert3,
          setShowUpdateModal: setShowUpdateModal,
        };
        return (body = body.concat(currentUser));
      });
      setUserList(body);
      //console.log("Users Main data: ", body);
      //console.log("Users Main DATA: ", userList);
    });
    //console.log("Show modal: ", showModal);
  }, []);

  return (
    <>
      <Contacts setShowModal={setShowModal} 
      setUserGetPermissionData={setUserGetPermissionData} 
      content={userListData} 
      setShowUpdateModal={setShowUpdateModal}
      setUserPermissionListView={setUserPermissionListView} 
      />
      {showModal && (
        <FormModal
          formTitle="Add a new staff"
          formSubtitle="Onboard a new staff member into your organization"
          formData={formData}
          PermissionListComponent={BlankPermissionListForNewUser}
          showModal={showModal}
          setShowModal={setShowModal}
          loading={loading}
          setLoading={setLoading}
          errorMsg={errorMsg}
          status={error}
          handleSubmit={addContact}
          Btntext="Add User"
          closeBtn
        />
      )}

    <FormModal
        formTitle="Update User"
        formSubtitle="Update user details"
        formData={updateFormData}
        PermissionListComponent={()=>userPermissionListView}
        setUserGetPermissionData={setUserGetPermissionData}
        showModal={showUpdateModal}
        setShowModal={setShowUserDetailsUpdate}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={changePassword}
        Btntext="Update Password"
        closeBtn
      />

      <FormModal
        formTitle="Update Password"
        formSubtitle="Wrong password? Change it here"
        formData={updateFormData}
        PermissionListComponent={()=>userPermissionListView}
        setUserGetPermissionData={setUserGetPermissionData}
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={changePassword}
        Btntext="Update Password"
        closeBtn
      />
    </>
  );
};

export default Users;
