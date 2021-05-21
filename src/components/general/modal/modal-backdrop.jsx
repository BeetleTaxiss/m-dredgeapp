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
      id="main-modal-backdrop"
      style={{ display: showModal ? "block" : "none " }}
    >
      {noClickOutside ? (
        <div
          onClick={() => {
            setShowModal(true);
            setLoading(false);
            document.getElementById("loading-btn").disabled = false;
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
            if (document.getElementById("span-comment-dispatcher") !== null) {
              document.getElementById(
                "span-comment-dispatcher"
              ).innerHTML = `Dispatcher comment: No comment from dispatcher`;
            }

            if (document.getElementById("span-comment-dispatcher") !== null) {
              document.getElementById(
                "span-comment-loader"
              ).innerHTML = `Loader comment: No comment from loader`;
            }

            if (document.getElementById("span-comment-inspector") !== null) {
              document.getElementById(
                "span-comment-loader"
              ).innerHTML = `Inspector comment: No comment from inspector`;
            }
            if (document.getElementById("comment") !== null) {
              document.getElementById("comment").value = "";
            }
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
