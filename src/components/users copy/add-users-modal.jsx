import React, { useState } from "react";
import ModalBackdrop from "../general/modal/modal-backdrop";

const AddUsersModal = () => {
  const [showModal, setShowModal] = useState(true);
  const addUsersData = [{}];
  return (
    <ModalBackdrop showModal={showModal} setShowModal={setShowModal}>
      <form id="addUsersModal">
        <div className="row">
          <div className="col-md-6">
            <div className="">
              <i className="flaticon-user-11"></i>
              <input
                type="text"
                id=""
                className="form-control"
                placeholder="Name"
              />
              <span className="validation-text"></span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <i className="flaticon-mail-26"></i>
              <input
                type="text"
                id=""
                className="form-control"
                placeholder="Email"
              />
              <span className="validation-text"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="">
              <i className="flaticon-fill-area"></i>
              <input
                type="text"
                id=""
                className="form-control"
                placeholder="Occupation"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <i className="flaticon-telephone"></i>
              <input
                type="text"
                id=""
                className="form-control"
                placeholder="Phone"
              />
              <span className="validation-text"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="">
              <i className="flaticon-location-1"></i>
              <input
                type="text"
                id=""
                className="form-control"
                placeholder="Location"
              />
            </div>
          </div>
        </div>
      </form>
    </ModalBackdrop>
  );
};

export default AddUsersModal;
