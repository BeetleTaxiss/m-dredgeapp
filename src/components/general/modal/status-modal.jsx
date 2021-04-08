import React from "react";
import { Link } from "react-router-dom";
import ModalBackdrop from "./modal-backdrop";

const StatusModalContent = ({
  link,
  errorMsg,
  orderId,
  item: { logo, title, text, linkText, linkPath },
}) => {
  return (
    <div
      className="infobox-2"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "300px",
      }}
    >
      <div className="info-icon">
        {
          <img
            src={logo}
            alt="statusLogo"
            style={{ width: "70px", height: "70px" }}
          />
        }
      </div>
      <h5 className="info-heading">{title}</h5>
      <p className="info-text">
        {text}
        {errorMsg && errorMsg}
      </p>
      {link && (
        <Link
          className="info-link"
          to={{
            pathname: linkPath,
            state: orderId, // your data of arrays or objects
          }}
        >
          {linkText}{" "}
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
            className="feather feather-arrow-right"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      )}
    </div>
  );
};

const StatusModal = ({
  showModal,
  setShowModal,
  setLoading,
  status,
  itemSuccess,
  itemError,
  errorMsg,
  orderId,
}) => {
  return (
    <ModalBackdrop
      showModal={showModal}
      setShowModal={setShowModal}
      setLoading={setLoading}
    >
      {status ? (
        <StatusModalContent item={itemError} errorMsg={errorMsg} />
      ) : (
        <StatusModalContent item={itemSuccess} orderId={orderId} link />
      )}
    </ModalBackdrop>
  );
};

export default StatusModal;
