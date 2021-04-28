import React from "react";
//FOR JSON POST/GET
import SearchBar from "./searchbar";
import ContactList from "./contact-list";
import "./contacts.css";

const Contacts = ({
  setShowModal,
  setUserPermissionListView,
  setUserGetPermissionData,
  content: { searchBar, header, contacts, permission },
}) => {
  const contactList = { header, contacts, permission };
  return (
    <div className="col-lg-12">
      <div className="widget-content searchable-container grid">
        {/* BEGIN TOP SEARCH BAR */}
        <SearchBar setShowModal={setShowModal} content={searchBar}  
        />
        {/* END TOP SEARCH BAR */}

        {/* BEGINNING OF USERS LIST */}
        <ContactList content={contactList} 
        setUserPermissionListView={setUserPermissionListView} 
        setUserGetPermissionData={setUserGetPermissionData}
        />
        {/* END OF USERS LIST */}
      </div>
    </div>
  );
};

export default Contacts;
