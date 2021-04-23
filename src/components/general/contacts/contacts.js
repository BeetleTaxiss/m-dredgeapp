import React from "react";
//FOR JSON POST/GET
import SearchBar from "./searchbar";
import ContactList from "./contact-list";
import "./contacts.css";

const Contacts = ({
  setShowModal,
  content: { searchBar, header, contacts },
}) => {
  const contactList = { header, contacts };
  return (
    <div className="col-lg-12">
      <div className="widget-content searchable-container grid">
        {/* BEGIN TOP SEARCH BAR */}
        <SearchBar setShowModal={setShowModal} content={searchBar} />
        {/* END TOP SEARCH BAR */}

        {/* BEGINNING OF USERS LIST */}
        <ContactList content={contactList} />
        {/* END OF USERS LIST */}
      </div>
    </div>
  );
};

export default Contacts;
