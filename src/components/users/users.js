import React, { useEffect, useState } from "react";
//FOR JSON POST/GET
import { RequestHandlerJSON } from "pushmebyx";
import SearchBar from "./searchbar";
import UsersList from "./users-list";
import "./users.css";
import { BASE_API_URL } from "../../hooks/API";

const Users = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fetch(`${BASE_API_URL}/api/v1/user/list.php`)
      .then((res) => res.json())
      .then((data) => setUserList(data.data))
      // .then((data) => console.table("API DATA: ", data.data))
      .catch((err) => console.log("Error occurred: ", err));
    return () => {};
  }, []);
  /**
   * Form state to be made avaliable to handle Input Change function and passed down to the Modal component used in updating a user or adding new user entriees
   *  */
  const formState = {
    name: "",
    image: "",
    jobDesc: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  };
  const addUserState = {
    name: "",
    image: "",
    jobDesc: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  };
  /**
   * Data for building the user list display divided into table header/legend and users information
   */
  const userListData = {
    header: {
      name: "Name",
      usertype: "Job Description",
      contact1: "Email",
      contact2: "Phone",
    },
    users: [
      {
        metaInfo: { name: "Alan Linda", image: "assets/img/profile-5.jpeg" },
        jobDesc: {
          fieldName: "Job description",
          fieldInfo: "Production Master",
        },
        contact1: {
          fieldName: "Email",
          fieldInfo: "alan@gmail.com",
        },
        contact2: {
          fieldName: "Phone",
          fieldInfo: "+23470672428",
        },
        password: {
          fieldName: "Password",
          fieldInfo: "qwerodgnkdg",
        },
        passwordConfirm: {
          fieldName: "Confirm Password",
          fieldInfo: "qwerodgnkdg",
        },
      },
      {
        metaInfo: { name: "Alan Linda", image: "assets/img/profile-5.jpeg" },
        jobDesc: {
          fieldName: "Job description",
          fieldInfo: "Production Master",
        },
        contact1: {
          fieldName: "Email",
          fieldInfo: "alan@gmail.com",
        },
        contact2: {
          fieldName: "Phone",
          fieldInfo: "+23470672428",
        },
        password: {
          fieldName: "Password",
          fieldInfo: "qwerodgnkdg",
        },
        passwordConfirm: {
          fieldName: "Confirm Password",
          fieldInfo: "qwerodgnkdg",
        },
      },
      {
        metaInfo: { name: "Alan Linda", image: "assets/img/profile-5.jpeg" },
        jobDesc: {
          fieldName: "Job description",
          fieldInfo: "Production Master",
        },
        contact1: {
          fieldName: "Email",
          fieldInfo: "alan@gmail.com",
        },
        contact2: {
          fieldName: "Phone",
          fieldInfo: "+23470672428",
        },
        password: {
          fieldName: "Password",
          fieldInfo: "qwerodgnkdg",
        },
        passwordConfirm: {
          fieldName: "Confirm Password",
          fieldInfo: "qwerodgnkdg",
        },
      },
    ],
  };
  return (
    <div className="col-lg-12">
      <div className="widget-content searchable-container list">
        {/* BEGIN TOP SEARCH BAR */}
        <SearchBar state={addUserState} />
        {/* END TOP SEARCH BAR */}

        {/* BEGINNING OF USERS LIST */}
        <UsersList
          state={formState}
          userListData={userListData}
          userList={userList}
        />
        {/* END OF USERS LIST */}
      </div>
    </div>
  );
};

export default Users;
