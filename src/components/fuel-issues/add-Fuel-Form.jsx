import React from "react";
import LoadingButton from "../general/loading-button";
import { FormDetails } from "../orders/order-form/order-form-details";
const AddUpdateProduct = ({
  content,
  handleAddSubmit,
  loading,
  subtitle,
  btnText,
  setShowUpdateForm,
}) => {
  return (
    <div className="row">
      <div className="col-lg-6 col-12 mx-auto">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            {/* SUB-TITLE FOR THE FORM */}
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <p>{subtitle}</p>
              {setShowUpdateForm ? (
                <button
                  // style={}
                  className="btn btn-warning mb-3"
                  onClick={() => setShowUpdateForm()}
                >
                  Close
                </button>
              ) : null}
            </span>

            {content?.map((item, i) => (
              <FormDetails key={i} item={item} />
            ))}
            <LoadingButton
              handleSubmit={handleAddSubmit}
              loading={loading}
              text={btnText}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;
