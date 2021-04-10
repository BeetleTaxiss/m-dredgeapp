import React from "react";
import "./modal.scss";
const ModalBackdrop = ({
  children,
  showModal,
  setShowModal,
  setLoading,
  noClickOutside,
}) => {
  return (
    <div
      className="modal backdrop"
      style={{ display: showModal ? "block" : "none " }}
    >
      {noClickOutside ? (
        <div
          onClick={() => {
            setShowModal(true);
            setLoading(false);
            document.getElementById("loading-btn").disabled = false;
            console.log("Outside Modal Clicked !!!");
          }}
          className="modalBackdrop"
        ></div>
      ) : (
        <div
          className="modalBackdrop"
          onClick={() => {
            setShowModal(false);
            setLoading(false);
            document.getElementById("loading-btn").disabled = false;
          }}
        ></div>
      )}
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        onClick={() => setShowModal(true)}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalBackdrop;
