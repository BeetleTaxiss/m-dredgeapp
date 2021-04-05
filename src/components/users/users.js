import React from "react";
import SearchBar from "./searchbar";
import UsersList from "./users-list";
import "./users.css";

const Users = () => {
  /**
   * Form state to be made avaliable to handle Input Change function and passed down to the Modal component used in updating a user or adding new user entriees
   *  */
  const formState = {
    name: "",
    image: "",
    jobDesc: "",
    email: "",
    phone: "",
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
      },
    ],
  };
  return (
    <div className="col-lg-12">
      <div className="widget-content searchable-container list">
        {/* BEGIN TOP SEARCH BAR */}
        <SearchBar state={formState} />
        {/* END TOP SEARCH BAR */}

        {/* BEGINNING OF USERS LIST */}
        <UsersList userListData={userListData} />
        {/* END OF USERS LIST */}
      </div>
    </div>
  );
};

export default Users;
