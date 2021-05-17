import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import md5 from "md5";
import "./users.css";
import { BASE_API_URL } from "../../hooks/API";
import {
  useAddContactFormData,
  useUpdateContactFormData,
  useUpdateUserDetailsFormData,
} from "../../hooks/useFormData";
import Contacts from "../general/contacts/contacts";
import FormModal from "../general/modal/form-modal";
import {
  createPermissionList,
  createUserPermissionListComponent,
  getPermissionData,
} from "./PermissionList";
import {
  errorAlert,
  functionUtils,
  successAlert,
  useGetAppSettings,
  useGetUserDetails,
} from "../../hooks/function-utils";
import { enUs as language } from "../../Language";

/** in the future we can create a language file to handle this */

const Users = () => {
  const [userList, setUserList] = useState(null);
  const [user, setUser] = useState(null);
  const [userTypesList, setUserTypesList] = useState([
    {
      user_type: "Select Job Description",
      id: "0",
      validation: "Can't select this option",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUserDetailsUpdate, setShowUserDetailsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId);

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
   * use this state value to check when we have addeed or updated data and need to refresh
   * it work by concatenating  `true` to the array when we need to refresh
   * */
  const [refreshData, setRefreshData] = useState([]);

  /**
   *  an helper function to always refresh the page
   * */
  const reloadServerData = () => {
    /** refresh the page so we can newly added users */
    setRefreshData(refreshData.concat(true));
  };

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

  console.log("User List Data: ", userListData);

  const changePassword = () => {
    let userName = document.getElementById("user-add-user").value,
      userId = document.getElementById("user-id-add-user").value,
      userPassword = document.getElementById("password-add-user").value;
    let newUserPassword = document.getElementById(
      "new-password-add-user"
    ).value;

    const encNewUserPassword = md5(newUserPassword);

    /** Validate Username Length */
    if (userName.length < 5) {
      return errorAlert(
        "Username not long enough",
        "Make sure your password is longer than five (5) characters"
      );
    }

    /** Validate Password Length */
    if (newUserPassword.length < 6) {
      return errorAlert(
        "Password not strong enough",
        "Make sure your password is longer than six (6) characters"
      );
    }

    const changePasswordData = {
      user: userName,
      "user-id": userId,
      password: userPassword,
      "password-new": encNewUserPassword,
    };

    axios
      .post(
        `${BASE_API_URL}/api/v1/user/change-password.php`,
        changePasswordData
      )
      .then((res) => {
        //console.log("Change User password Data", res.data);
        if (res.data.error) {
          const title = "Password update failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "Password changed",
            text = res.data.message;
          successAlert(title, text);
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert(
          error.message,
          language.popUps.checkYourInternetConnectionMsg
        );
      });
  };

  const updateUserPermission = () => {
    const userId = document.getElementById("user-add-user-id").value;
    const userName = document.getElementById("user-add-user").value;
    const phone = document.getElementById("phone-add-user").value;
    const email = document.getElementById("email-add-user").value;
    const userType = document.getElementById("select-add-user").value;

    /** ensure user select userType */
    if (parseInt(userType) === 0) {
      return errorAlert("Update Alert", "Please select job description");
    }

    /** Validate Email address */
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegex.test(email)) {
      return errorAlert(
        "Wrong Email Address",
        "You must give a correct email address"
      );
    }

    /** Validate Username Length */
    if (userName.length < 5) {
      return errorAlert(
        "Username not long enough",
        "Make sure your password is longer than five (5) characters"
      );
    }

    if (!userId || !userName || !phone || !email || !userType) {
      return errorAlert("Update Alert", "Please all form fields are required");
    }

    /** get the permission updates for this user */
    const permission = getPermissionData();
    //console.log(JSON.parse(permission), "UPdATED permission");

    const userUpdateData = {
      user: userName,
      "user-id": userId,
      phone: phone,
      email: email,
      "user-type": userType,
      permission: permission,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/user/update.php`, userUpdateData)
      .then((res) => {
        if (res.data.error) {
          const title = "Update Alert",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "Update Alert",
            text = res.data.message;
          successAlert(title, text);
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert(
          error.message,
          language.popUps.checkYourInternetConnectionMsg
        );
      });
  };

  const addContact = () => {
    let newUserName = document.getElementById("user-add-user").value,
      newUserType = document.getElementById("select-add-user").value,
      newUserEmail = document.getElementById("email-add-user").value,
      newUserPhoneNo = document.getElementById("phone-add-user").value,
      newUserPassword = md5(document.getElementById("password-add-user").value),
      newUserConfirmPassword = md5(
        document.getElementById("confirm-password-add-user").value
      );

    /** get the userPermissionList data */
    const permission = getPermissionData();

    if (!permission) {
      return errorAlert(
        "Permission Error",
        "You must give new user at least one permission"
      );
    }
    const addUserData = {
      user: newUserName,
      "user-type": newUserType,
      email: newUserEmail,
      phone: newUserPhoneNo,
      password: newUserPassword,
      "password-confirm": newUserConfirmPassword,
      permission: permission,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/user/add.php`, addUserData)
      .then((res) => {
        //console.log("Add User Data", res.data);
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
          /** refresh the page so we can newly added users */
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert(
          error.message,
          language.popUps.checkYourInternetConnectionMsg
        );
      });
  };

  /** Retrive add user form data for client validation */
  const getAddUserFormData = () => {
    let newUserName = document.getElementById("user-add-user").value,
      newUserType = document.getElementById("select-add-user").value,
      newUserEmail = document.getElementById("email-add-user").value,
      newUserPhoneNo = document.getElementById("phone-add-user").value,
      newUserPassword = md5(document.getElementById("password-add-user").value),
      passwordWithoutEncryption =
        document.getElementById("password-add-user").value,
      newUserConfirmPassword = md5(
        document.getElementById("confirm-password-add-user").value
      ),
      jobDesc = userTypesList.filter(({ id }) => id === newUserType);

    console.log(" Single User Type: ", jobDesc);

    /** Validate Email address */
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegex.test(newUserEmail)) {
      return errorAlert(
        "Wrong Email Address",
        "You must give a correct email address"
      );
    }

    /** Validate Username Length */
    if (newUserName.length < 5) {
      return errorAlert(
        "Username not long enough",
        "Make sure your password is longer than five (5) characters"
      );
    }

    /** Validate Password Length */
    if (passwordWithoutEncryption.length < 6) {
      return errorAlert(
        "Password not strong enough",
        "Make sure your password is longer than six (6) characters"
      );
    }

    /** Validate Passwords */
    if (newUserPassword !== newUserConfirmPassword) {
      return errorAlert(
        "Password does not match",
        "Confirm your password by giving exactly the same password"
      );
    }

    /** get the userPermissionList data */
    const permission = getPermissionData();

    if (!permission) {
      return errorAlert(
        "Permission Error",
        "You must give new user at least one permission"
      );
    }

    const addUserData = {
      user: newUserName,
      "user-type": newUserType,
      email: newUserEmail,
      phone: newUserPhoneNo,
      password: newUserPassword,
      "password-confirm": newUserConfirmPassword,
      permission: permission,
      validation: jobDesc[0].validation,
    };

    return addUserData;
  };
  /** Retrive update user form data for client validation */
  const getUpdateUserFormData = () => {
    let userName = document.getElementById("user-add-user").value,
      userId = document.getElementById("user-id-add-user").value,
      userPassword = document.getElementById("password-add-user").value;
    let newUserPassword = document.getElementById(
      "new-password-add-user"
    ).value;

    // const encNewUserPassword = newUserPassword;

    // if (!userId || !userPassword || !newUserPassword) {
    //   return errorAlert(
    //     language.popUps.updateErrorTitle,
    //     language.popUps.allFormFieldsRequiredMsg
    //   );
    // }

    const changePasswordData = {
      user: userName,
      "user-id": userId,
      password: userPassword,
      "password-new": newUserPassword,
    };

    return changePasswordData;
  };

  // Delete User Function
  const deleteContact = (deleteUserData) => {
    axios
      .post(`${BASE_API_URL}/api/v1/user/delete.php`, deleteUserData)
      .then((res) => {
        //console.log("Delete User Data", res.data);
        if (res.data.error) {
          const title = "Delete User Failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "User Deleted",
            text = res.data.message;
          successAlert(title, text);
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert(
          error.message,
          language.popUps.checkYourInternetConnectionMsg
        );
      });
  };

  // Suspend User Function
  const suspendContact = (suspendUserData) => {
    axios
      .post(`${BASE_API_URL}/api/v1/user/suspend.php`, suspendUserData)
      .then((res) => {
        //console.log("Suspend User Data", res.data);
        if (res.data.error) {
          const title = "Suspension Failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "User Suspended",
            text = res.data.message;
          successAlert(title, text);
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert(
          error.message,
          language.popUps.checkYourInternetConnectionMsg
        );
      });
  };
  const enableContact = (enableUserData) => {
    axios
      .post(`${BASE_API_URL}/api/v1/user/enable.php`, enableUserData)
      .then((res) => {
        //console.log("Enable User Data", res.data);
        if (res.data.error) {
          const title = "Enablement Failed",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          const title = "User Enabled",
            text = res.data.message;
          successAlert(title, text);
          reloadServerData();
        }
      })
      .catch((error) => {
        errorAlert(
          error.message,
          "Cannot enable. Please check internet connection"
        );
      });
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
      //console.log("Sweet Alert: ", value);
      if (value.isConfirmed) {
        enableContact(enableUserData);
      }
    });
  };
  const warningAlert3 = (
    title,
    deleteUserName,
    deleteUserId,
    userName,
    userId
  ) => {
    Swal.fire({
      icon: "warning",
      title: title,
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((value) => {
      const loggedInUser = userName;
      const loggedInUserId = userId;
      const deleteUserData = {
        user: loggedInUser,
        "user-id": loggedInUserId,
        "delete-user": deleteUserName,
        "delete-id": deleteUserId,
      };
      console.log("Sweet Alert: ", deleteUserData);
      if (value.isConfirmed) {
        deleteContact(deleteUserData);
      }
    });
  };

  /** Fetch job description/usertypes from app settings store and subscribe it's state to a useEffect to get the async value on page load  */
  useGetAppSettings(setUserTypesList);
  console.log("Users types list: ", userTypesList);
  useEffect(() => {
    console.log("Use Effect Types List 1: ", userTypesList);
    // alert("Fired");
    let typesList = [
      {
        user_type: "Select Job Description",
        id: "0",
        validation: "Can't select this option",
      },
    ].concat(userTypesList);

    setUserTypesList(typesList);

    // alert("Fired twice");
    console.log("Use Effect Types List 2: ", userTypesList);
  }, [showModal]);

  useEffect(() => {
    console.log("Use Effect Types List 3: ", userTypesList);
  }, [userTypesList]);

  const { formData } = useAddContactFormData(userTypesList);
  const { updateUserDetailsFormData } =
    useUpdateUserDetailsFormData(userTypesList);
  const { updateFormData } = useUpdateContactFormData();

  /**
   * This component will return both the permissionListAccordion and the
   * method to getPermissionData to get the updated permission data before
   * we update them
   */
  const BlankPermissionListForNewUser = (props) => {
    const permissionListData = createPermissionList({});

    const [PermissionList] =
      createUserPermissionListComponent(permissionListData);
    return <>{PermissionList}</>;
  };

  /** load the user list on page open */
  useEffect(() => {
    axios.get(`${BASE_API_URL}/api/v1/user/list.php`).then((res) => {
      //console.log("User List Data: ", res.data);
      const data = res.data.data;
      let body = [];
      data.map((item, i) => {
        const gottenUserName = item.user;
        const gottenUserId = item.id;
        const userImage = "assets/img/profile-5.jpeg";
        const userType = item.user_type;
        const userEmail = item.email;
        const userPhoneNo = item.phone;
        const userPassword = item.password;
        const permission = item.permission;

        const currentUser = {
          metaInfo: { name: gottenUserName, image: userImage },
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
          delete: () =>
            warningAlert3(
              `Are you sure you want to delete ${gottenUserName} ?`,
              gottenUserName,
              gottenUserId,
              userName,
              userId
            ),
          // setShowUpdateModal: setShowUpdateModal,
        };
        return (body = body.concat(currentUser));
      });
      setUserList(body);
      ////console.log("Users Main data: ", body);
      console.log("Users Main DATA: ", userList);
    });
    ////console.log("Show modal: ", showModal);
  }, [refreshData, userName, userId]);

  return (
    <>
      <Contacts
        setShowModal={setShowModal}
        setUserGetPermissionData={setUserGetPermissionData}
        content={userListData}
        setShowUpdateModal={setShowUpdateModal}
        setShowUserDetailsUpdate={setShowUserDetailsUpdate}
        setUserPermissionListView={setUserPermissionListView}
      />

      {/** add new user with this section */}
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
          handleSubmit={() => {
            const validation = functionUtils.validateFormInputs(
              getAddUserFormData()
            );
            if (validation === true) {
              addContact();
            }
          }}
          Btntext="Add User"
          // closeBtn
        />
      )}

      {
        /** use this to update user permissions */
        //console.log(updateUserDetailsFormData, "update details form data")
      }
      <FormModal
        formTitle="Update User Permission"
        formSubtitle="Add or remove permissions for users"
        formData={updateUserDetailsFormData}
        PermissionListComponent={() => userPermissionListView}
        setUserGetPermissionData={setUserGetPermissionData}
        showModal={showUserDetailsUpdate}
        setShowModal={setShowUserDetailsUpdate}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={updateUserPermission}
        Btntext="Update Permission"
        // closeBtn
      />
      {/** Update user password with this section */}
      <FormModal
        formTitle="Update Password"
        formSubtitle="Wrong password? Change it here"
        formData={updateFormData}
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        loading={loading}
        setLoading={setLoading}
        errorMsg={errorMsg}
        status={error}
        handleSubmit={() => {
          const validation = functionUtils.validateFormInputs(
            getUpdateUserFormData()
          );
          if (validation === true) {
            changePassword();
          }
        }}
        Btntext="Update Password"
        // closeBtn
      />
    </>
  );
};

export default Users;
