import React from "react";
import { Link } from "react-router-dom";
import { FormDetails } from "../../orders/order-form/order-form-details";
import ListSingleViewCard from "../list-single-view-card/list-single-view-card";
import LoadingButton from "../loading-button";
import ModalBackdrop from "./modal-backdrop";
import "react-accessible-accordion/dist/fancy-example.css";

const FormModal = ({
  formTitle,
  formSubtitle,
  formData,
  loading,
  setLoading,
  showUpdateModal,
  errorMsg,
  status,
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  Btntext,
  noClickOutside,
  closeBtn,
  listItems,
  cols,
  rows,
  /** components */
  PermissionListComponent,
  getPermissionData,
}) => {
  return (
    <ModalBackdrop
      setLoading={setLoading}
      showModal={showModal}
      setShowModal={setShowModal}
      noClickOutside={noClickOutside}
    >
      {formTitle && <h2 id="formModal-title">{formTitle}</h2>}
      {formSubtitle && <p id="formModal-subtitle">{formSubtitle}</p>}
      {listItems && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem 1.5rem 0",
          }}
        >
          <ListSingleViewCard />
        </div>
      )}
      <form id="formModal" onSubmit={(e) => e.preventDefault()}>
        {formData &&
          formData.map((item, i) => (
            <div key={item.id} className="row">
              <div className="col-md-12">
                <div className="">
                  <i className="flaticon-location-1"></i>
                  <FormDetails
                    item={item}
                    handleChange={handleChange}
                    rows={rows}
                    cols={cols}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
            </div>
          ))}
        {PermissionListComponent && <PermissionListComponent />}

        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <LoadingButton
            handleSubmit={handleSubmit}
            loading={loading}
            text={Btntext}
          />
          {closeBtn && (
            <a
              href="javascript:void(0)"
              onClick={() => {
                // document.getElementById("main-modal-backdrop").style.display =
                //   "none";
                console.log("Close State: ", showModal);
                setShowModal(false);
                console.log("Close State after click: ", showModal);
              }}
              className="mt-4 btn btn-danger"
            >
              Close
            </a>
          )}
        </div>
      </form>
      {/* {errorMsg} */}
    </ModalBackdrop>
  );
};

export default FormModal;
