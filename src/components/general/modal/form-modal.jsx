import React from "react";
import { Link } from "react-router-dom";
import { FormDetails } from "../../orders/order-form/order-form-details";
import LoadingButton from "../loading-button";
import ModalBackdrop from "./modal-backdrop";

const FormModal = ({
  formTitle,
  formSubtitle,
  formData,
  loading,
  setLoading,
  errorMsg,
  status,
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  Btntext,
  noClickOutside,
  closeBtn,
}) => {
  return (
    <ModalBackdrop
      setLoading={setLoading}
      showModal={showModal}
      setShowModal={setShowModal}
      noClickOutside={noClickOutside}
    >
      <h2 id="formModal-title">{formTitle}</h2>
      <p id="formModal-subtitle">{formSubtitle}</p>
      <form id="formModal" onSubmit={(e) => e.preventDefault()}>
        {formData.map((item, i) => (
          <div key={item.id} className="row">
            <div className="col-md-12">
              <div className="">
                <i className="flaticon-location-1"></i>
                <FormDetails item={item} handleChange={handleChange} />
                <span className="validation-text"></span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: "2rem" }}>
          <LoadingButton
            handleSubmit={handleSubmit}
            loading={loading}
            text={Btntext}
          />
          {closeBtn && (
            <Link
              to="#"
              onClick={() => {
                setShowModal((prev) => !prev);
                console.log("Modal State: ", showModal);
              }}
              className="mt-4 btn btn-danger"
            >
              Close
            </Link>
          )}
        </div>
      </form>
      {/* {errorMsg} */}
    </ModalBackdrop>
  );
};

export default FormModal;
