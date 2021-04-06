import React from "react";
import { functionUtils } from "../../hooks/function-utils";
const UpdateUser = (name, email, image, jobDesc, phone) => {
  console.log("User Updated", name, email, image, jobDesc, phone);
};
export const UpdateModal = ({ formState, updateUser, setUpdateUser }) => {
  /**
   *  Handle Input Change function for handling input changes across multiple form if required, in this case we are interested in the values of the user name, email, job description and phone number for the purpose of updating an existing user or the addition of a new user
   *  */
  const { handleChange, formInput } = functionUtils.HandleInputChange(
    formState
  );
  console.log(formInput);
  console.log("Update User", updateUser);
  const {
    name,
    email,
    image,
    jobDesc,
    phone,
    password,
    passwordConfirm,
  } = formInput;
  return (
    <div
      className={`modal fade ${updateUser && "show"}`}
      id="addContactModal"
      tabIndex="-1"
      aria-labelledby="addContactModalTitle"
      style={{ display: "none" }}
      aria-hidden="true"
      onClick={() => setUpdateUser(false)}
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
                          name="name"
                          type="text"
                          id="c-name"
                          className="form-control"
                          placeholder="Name"
                          // onChange={handleChange}
                          // value={name}
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
                          name="email"
                          type="text"
                          id="c-email"
                          className="form-control"
                          placeholder="Email"
                          // onChange={handleChange}
                          // value={email}
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
                          name="jobDesc"
                          type="text"
                          id="c-location"
                          className="form-control"
                          placeholder="Job Description"
                          // onChange={handleChange}
                          // value={jobDesc}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="contact-phone">
                        <i className="flaticon-telephone"></i>
                        <input
                          name="phone"
                          type="text"
                          id="c-phone"
                          className="form-control"
                          placeholder="Phone"
                          // onChange={handleChange}
                          // value={phone}
                        />
                        <span
                          className="validation-text"
                          style={{ display: " none" }}
                        ></span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="contact-location">
                        <i className="flaticon-location-1"></i>
                        <input
                          type="text"
                          id="c-location"
                          className="form-control"
                          placeholder="Password"
                          // onChange={handleChange}
                          // value={password}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="contact-location">
                        <i className="flaticon-location-1"></i>
                        <input
                          type="text"
                          id="c-location"
                          className="form-control"
                          placeholder="Confirm Password"
                          // onChange={handleChange}
                          // value={passwordConfirm}
                        />
                      </div>
                    </div>
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
              // style={{ display: "none" }}
              onClick={() => UpdateUser(name, email, image, jobDesc, phone)}
            >
              Update User
            </button>

            <button className="btn" data-dismiss="modal">
              {" "}
              <i className="flaticon-delete-1"></i> Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
