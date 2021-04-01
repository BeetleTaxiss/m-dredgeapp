import React from "react";
import useHandleInputChange from "../../hooks/useHandleInputChange";

const AddUser = (name, email, image, jobDesc, phone) => {
  console.log("User Added Twice", name, email, image, jobDesc, phone);
};

const UpdateUser = (name, email, image, jobDesc, phone) => {
  console.log("User Updated", name, email, image, jobDesc, phone);
};

const Modal = ({ formState }) => {
  const { handleChange, formInput } = useHandleInputChange(formState);
  console.log(formInput);
  const { name, email, image, jobDesc, phone } = formInput;
  return (
    <div
      className="modal fade"
      id="addContactModal"
      tabIndex="-1"
      aria-labelledby="addContactModalTitle"
      style={{ display: "none" }}
      aria-hidden="true"
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
                          onChange={handleChange}
                          value={name}
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
                          onChange={handleChange}
                          value={email}
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
                          onChange={handleChange}
                          value={jobDesc}
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
                          onChange={handleChange}
                          value={phone}
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
              onClick={() => UpdateUser(name, email, image, jobDesc, phone)}
            >
              Save
            </button>

            <button className="btn" data-dismiss="modal">
              {" "}
              <i className="flaticon-delete-1"></i> Discard
            </button>

            <button
              id="btn-add"
              className="btn"
              style={{}}
              onClick={() => AddUser(name, email, image, jobDesc, phone)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ state }) => {
  return (
    <div className="row">
      <div className="col-xl-4 col-lg-5 col-md-5 col-sm-7 filtered-list-search layout-spacing align-self-center">
        <form className="form-inline my-2 my-lg-0">
          <div className="">
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
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="form-control product-search"
              id="input-search"
              placeholder="Search Users..."
            />
          </div>
        </form>
      </div>

      <div className="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-right text-center layout-spacing align-self-center">
        <div className="d-flex justify-content-sm-end justify-content-center">
          <svg
            id="btn-add-contact"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>

          <div
            className="switch align-self-center"
            style={{
              display: "flex",
              minWidth: "100px",
              alignSelf: "flex-start!important",
            }}
          >
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
              className="feather feather-list view-list active-view"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3" y2="6"></line>
              <line x1="3" y1="12" x2="3" y2="12"></line>
              <line x1="3" y1="18" x2="3" y2="18"></line>
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
              className="feather feather-grid view-grid"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
        </div>

        {/* BEGIN Modal */}
        <Modal formState={state} />
        {/* END MODAL */}
      </div>
    </div>
  );
};

export default SearchBar;
