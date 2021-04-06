import React, { useState } from "react";
import { UpdateModal } from "./update-modal";

const deleteUser = (content) => {
  console.log("User deleted: ", content);
};
const UserListHeader = ({ content }) => (
  <div className="items items-header-section">
    <div className="item-content">
      <div className="">
        <div className="n-chk align-self-center text-center">
          <label className="new-control new-checkbox checkbox-primary">
            <input
              type="checkbox"
              className="new-control-input"
              id="contact-check-all"
            />
            <span className="new-control-indicator"></span>
          </label>
        </div>
        <h4>{content.name}</h4>
      </div>
      <div className="user-email">
        <h4>{content.usertype}</h4>
      </div>
      <div className="user-location">
        <h4 style={{ marginLeft: "0" }}>{content.contact1}</h4>
      </div>
      <div className="user-phone">
        <h4 style={{ marginLeft: "3px" }}>{content.contact2}</h4>
      </div>
      <div className="action-btn">
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
          className="feather feather-trash-2  delete-multiple"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
    </div>
  </div>
);

const User = ({ content, setUpdateUser }) => (
  <div className="items">
    <div className="item-content">
      <div className="user-profile">
        <div className="n-chk align-self-center text-center">
          <label className="new-control new-checkbox checkbox-primary">
            <input
              type="checkbox"
              className="new-control-input contact-chkbox"
            />
            <span className="new-control-indicator"></span>
          </label>
        </div>
        <img src="assets/img/profile-5.jpeg" alt="avatar" />
        <div className="user-meta-info">
          <p className="user-name" data-name={content.user}>
            {content.user}
          </p>
        </div>
      </div>
      <div className="user-location">
        <p className="info-title">Job Description: </p>
        <p
          className="usr-location"
          data-location={content.user_type === 1 ? "Admin" : "Regular"}
        >
          {content.user_type === 1 ? "Admin" : "Regular"}
        </p>
      </div>
      <div className="user-email">
        <p className="info-title">Email: </p>
        <p className="usr-email-addr" data-email={content.email}>
          {content.email}
        </p>
      </div>
      <div className="user-phone">
        <p className="info-title">Phone: </p>
        <p className="usr-ph-no" data-phone={content.phone}>
          {content.phone}
        </p>
      </div>
      <div className="action-btn">
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
          className="feather feather-edit-2 edit"
          onClick={() => setUpdateUser(true)}
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>

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
          className="feather feather-user-minus delete"
          onClick={() => deleteUser(content.id)}
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      </div>
    </div>
  </div>
);
const UsersList = ({ userList, userListData, state }) => {
  const [updateUser, setUpdateUser] = useState(false);
  return (
    <div className="searchable-items list">
      {/* BEGIN USER LIST HEADER */}
      <UserListHeader content={userListData.header} />
      {/* END USER LIST HEADER */}

      {/* BEGIN USER */}
      {userList.map((user, i) => (
        <User key={i} content={user} setUpdateUser={setUpdateUser} />
      ))}
      {/* END USER*/}
      <UpdateModal
        updateUser={updateUser}
        setUpdateUser={setUpdateUser}
        formState={state}
      />
    </div>
  );
};

export default UsersList;
