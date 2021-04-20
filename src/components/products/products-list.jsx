import React from "react";

const deleteUnit = (content) => {
  console.log("Unit deleted: ", content);
};
const UnitListHeader = ({ content }) => (
  <div className="items items-header-section">
    <div className="item-content">
      <div className="">
        <div className="n-chk align-self-center text-center">
          {/* <label className="new-control new-checkbox checkbox-primary">
            <input
              type="checkbox"
              className="new-control-input"
              id="contact-check-all"
            />
            <span className="new-control-indicator"></span>
          </label> */}
        </div>
        <h4>{content.name}</h4>
      </div>
      <div className="user-email">
        <h4>{content.desc}</h4>
      </div>
      <div className="user-location">
        <h4 style={{ marginLeft: "0" }}>{content.unit}</h4>
      </div>
      <div className="user-phone">
        <h4 style={{ marginLeft: "3px" }}>{content.measurement}</h4>
      </div>
      <div className="action-btn"></div>
    </div>
  </div>
);

const Unit = ({ content, update }) => (
  <div className="items">
    <div className="item-content">
      <div className="user-profile">
        {/* <div className="n-chk align-self-center text-center">
          <label className="new-control new-checkbox checkbox-primary">
            <input
              type="checkbox"
              className="new-control-input contact-chkbox"
            />
            <span className="new-control-indicator"></span>
          </label>
        </div> */}
        {/* <img src={content.metaInfo.image} alt="avatar" /> */}
        <div className="user-meta-info">
          <p className="user-name" data-name={content.product}>
            {content.product}
          </p>
        </div>
      </div>
      <div className="user-location">
        <p className="info-title">{content.description}: </p>
        <p className="usr-location" data-location={content.description}>
          {content.description}
        </p>
      </div>
      <div className="user-email">
        <p className="info-title">{content.unit}: </p>
        <p className="usr-email-addr" data-email={content.unit}>
          {content.unit}
        </p>
      </div>
      <div className="user-phone">
        <p className="info-title">{content.measurement}: </p>
        <p className="usr-ph-no" data-phone={content.measurement}>
          {content.measurement}
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
          onClick={() => update(true)}
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
          onClick={() => deleteUnit(content.product)}
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      </div>
    </div>
  </div>
);
const UnitsList = ({ unit, header, setDisplayUnit }) => {
  return (
    <div className="searchable-items list">
      {/* BEGIN USER LIST HEADER */}
      <UnitListHeader content={header} />
      {/* END USER LIST HEADER */}

      {/* BEGIN USER */}

      <Unit content={unit} update={setDisplayUnit} />

      {/* END USER*/}
    </div>
  );
};

export default UnitsList;
