import React from "react";
import useHandleInputChange from "../../hooks/useHandleInputChange";

const updateUnit = (name, email, image, jobDesc, phone) => {
  console.log("Unit Updated", name, email, image, jobDesc, phone);
};
const UpdateUnit = ({ formState, state, setState }) => {
  const { handleChange, formInput } = useHandleInputChange(formState);
  console.log(formInput);
  const { product, description, unit, measurement } = formInput;

  return (
    <div className="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-right text-center layout-spacing align-self-center">
      <div
        className={`modal fade ${state && "show"}`}
        id="addContactModal"
        tabIndex="-1"
        aria-labelledby="addContactModalTitle"
        style={{ display: state ? "block" : "none" }}
        onClick={() => setState(false)}
        aria-hidden="true"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
              <div className="add-contact-box">
                <div className="add-contact-content">
                  {/* BEGIN MOAL FORM */}
                  <form id="addContactModalTitle">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="contact-name">
                          <i className="flaticon-user-11"></i>
                          <input
                            name="product"
                            type="text"
                            id="c-name"
                            className="form-control"
                            placeholder="Name"
                            onChange={handleChange}
                            value={product}
                          />
                          <span
                            className="validation-text"
                            style={{ display: "none" }}
                          ></span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="contact-email">
                          <i className="flaticon-mail-26"></i>
                          <input
                            name="description"
                            type="text"
                            id="c-email"
                            className="form-control"
                            placeholder="Email"
                            onChange={handleChange}
                            value={description}
                          />
                          <span
                            className="validation-text"
                            style={{ display: "none" }}
                          ></span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="contact-occupation">
                          <i className="flaticon-fill-area"></i>
                          <input
                            name="unit"
                            type="text"
                            id="c-location"
                            className="form-control"
                            placeholder="Job Description"
                            onChange={handleChange}
                            value={unit}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="contact-phone">
                          <i className="flaticon-telephone"></i>
                          <input
                            name="measurement"
                            type="text"
                            id="c-phone"
                            className="form-control"
                            placeholder="Phone"
                            onChange={handleChange}
                            value={measurement}
                          />
                          <span
                            className="validation-text"
                            style={{ display: " none" }}
                          ></span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* <div className="col-md-12">
                    <div className="contact-location">
                      <i className="flaticon-location-1"></i>
                      <input
                        type="text"
                        id="c-location"
                        
                        className="form-control"
                        placeholder="Job Description"
                      />
                    </div>
                  </div> */}
                    </div>
                  </form>
                  {/* END MODAL FORM */}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id="btn-edit"
                className="float-left btn"
                style={{ display: "none" }}
                onClick={() =>
                  updateUnit(product, description, unit, measurement)
                }
              >
                Save
              </button>

              <button className="btn" data-dismiss="modal">
                {" "}
                <i className="flaticon-delete-1"></i> Discard
              </button>
              {/* 
            <button
              id="btn-add"
              className="btn"
              style={{}}
              onClick={() => AddUser(name, email, image, jobDesc, phone)}
            >
              Add
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUnit;
