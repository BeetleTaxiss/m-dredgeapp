import React from "react";
import Skeleton from "react-loading-skeleton";
import { createPermissionList, 
  createUserPermissionListComponent,
  getPermissionData
 } from "../../users/PermissionList";

const currentUserPermission=[];

const ContactListHeader = ({ content }) => (
  <div className="items items-header-section">
    <div className="item-content">
      {content.map((field, id) => (
        <div key={id} className={field.class}>
          <h4>{field.field}</h4>
        </div>
      ))}
      <div className="action-btn"></div>
    </div>
  </div>
);

/**
   * This component will return both the permissionListAccordion and the 
   * method to getPermissionData to get the updated permission data before 
   * update
   */
 const PermissionListForExistingUser = ({permission, setUserGetPermissionData }) => {
  const permissionListData = createPermissionList(permission);
  /** 
   * assign our `getPermissionData` function from `PermissionList` library to 
   * `setUserGetPermissionData` state value so that we can call this on the main component when we 
   * are ready to save and still have access to the updated userPermissionData
    */
  //setUserGetPermissionData(getPermissionData);
  
  /** return our initial userPermissionList component */
  return createUserPermissionListComponent(permissionListData)
};

const Contact = ({ content, setUserPermissionListView, setUserGetPermissionData, setShowUpdateModal}) => (
  <>
    {content ? (
      <div className="items">
        <div className="item-content">
          <div className="user-profile" style={{ minWidth: "150px" }}>
            {/* <img src={content.metaInfo.image} alt=" avatar" /> */}
            <div
              className="user-meta-info"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <p className="user-name">{content.metaInfo.name}</p>
            </div>
          </div>
          {content.fields.map((field, id) =>
            field.fieldName === "Password" ||
            field.fieldName === "Confirm Password" ? null : (
              <div
                key={id}
                className={field.fieldClass}
                style={{ minWidth: "100px" }}
              >
                <p className="info-title">{field.fieldName}: </p>
                <p className="usr-location">{field.fieldInfo}</p>
              </div>
            )
          )}

          <div className="action-btn" style={{ display: "flex", gap: "1rem" }}>

          <button onClick={()=>{
              /** to show permission on the modal, we will pass it as a parameter */
              console.log(JSON.parse(content.permission), "user prov. permission");

              const PermissionListForUser= <PermissionListForExistingUser 
              setUserGetPermissionData={setUserGetPermissionData}
              permission={content.permission} />

              /** set this state variable so that the popup open, the permission list for this user is shown */
              setUserPermissionListView(PermissionListForUser);

              console.log(PermissionListForUser, "permission List created");

              /** open the update window */
              setShowUpdateModal(true);
              
            }}>Edit Permission</button>

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
              onClick={() => {
                content.setUser(content.user);
                document.getElementById("user-add-user").value = content.user.user;
                document.getElementById("user-id-add-user").value = content.user.id;
                document.getElementById("password-add-user").value = content.user.password;
                content.setShowUpdateModal(true);
              }}
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
              onClick={() => {
                console.log("Individual User Data: ", content.user);
                content.setUser(content.user);
                content.delete(
                  `Are you sure you want to delete ${content.metaInfo.name} ?`,
                  content.user.user,
                  content.user.id
                );
              }}
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            {content.user.status === "0" ? (
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
                className="feather feather-users delete"
                onClick={() => {
                  console.log("Individual User Data: ", content.user);
                  content.setUser(content.user);
                  content.enable(
                    `Are you sure you want to enable ${content.metaInfo.name} from suspension ?`,
                    content.user.user,
                    content.user.id
                  );
                }}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            ) : (
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
                className="feather feather-user-x delete"
                onClick={() => {
                  console.log("Individual User Data: ", content.user);
                  content.setUser(content.user);
                  content.suspend(
                    `Are you sure you want to Suspend ${content.metaInfo.name}  ?`,
                    content.user.user,
                    content.user.id
                  );
                }}
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="18" y1="8" x2="23" y2="13"></line>
                <line x1="23" y1="8" x2="18" y2="13"></line>
              </svg>
            )}
          </div>
        </div>
      </div>
    ) : (
      <>
        <Skeleton count={3} height={55} />
        <Skeleton count={3} height={55} />
        <Skeleton count={3} height={55} />
        <Skeleton count={3} height={55} />
        <Skeleton count={3} height={55} />
      </>
    )}
  </>
);
const ContactList = ({ content, setUserPermissionListView, setUserGetPermissionData }) => {
  return (
    <div className="searchable-items grid">
      {/* BEGIN USER LIST HEADER */}
      <ContactListHeader content={content.header} />
      {/* END USER LIST HEADER */}

      {/* BEGIN USER */}
      {content.contacts ? (
        content.contacts.map((user, i) => 
        <Contact key={i} content={user} setUserPermissionListView={setUserPermissionListView} 
        setUserGetPermissionData={setUserGetPermissionData} />)
      ) : (
        <>
          <Skeleton count={3} height={55} />
          <Skeleton count={3} height={55} />
          <Skeleton count={3} height={55} />
          <Skeleton count={3} height={55} />
          <Skeleton count={3} height={55} />
        </>
      )}
      {/* END USER*/}
    </div>
  );
};

export default ContactList;
