import React, { useState } from "react";
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
}) => {
  return (
    <ModalBackdrop
      setLoading={setLoading}
      showModal={showModal}
      setShowModal={setShowModal}
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
        {errorMsg && `An Error occured while updating your order: ${errorMsg}`}
        <LoadingButton
          handleSubmit={handleSubmit}
          loading={loading}
          text="Update Order"
        />
      </form>
    </ModalBackdrop>
  );
};

export default FormModal;
