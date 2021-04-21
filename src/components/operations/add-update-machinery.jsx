import React from "react";
import LoadingButton from "../general/loading-button";
import { FormDetails } from "../orders/order-form/order-form-details";
const AddUpdateProduct = ({
  content,
  showUpdateMachinery,
  onClick,
  handleAddSubmit,
  handleUpdateSubmit,
  loading,
}) => {
  return (
    <div className="row">
      <div className="col-lg-6 col-12 mx-auto">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            {/* SUB-TITLE FOR THE FORM */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>
                {showUpdateMachinery
                  ? "Update machinery item information"
                  : "Add new machinery item information"}
              </p>
              <button
                id={showUpdateMachinery ? "update-form-btn" : "add-form-btn"}
                className="btn btn-success mb-3"
                onClick={() => {
                  return onClick ? onClick() : null;
                }}
              >
                {showUpdateMachinery
                  ? "Go to add Machinery Item"
                  : "Go to update Machinery Item"}
              </button>
            </div>

            {content?.map((item, i) => (
              <FormDetails key={i} item={item} />
            ))}
            <LoadingButton
              handleSubmit={
                showUpdateMachinery ? handleUpdateSubmit : handleAddSubmit
              }
              loading={loading}
              text={
                showUpdateMachinery
                  ? "Update Machinery Item"
                  : "Add Machinery Item"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;
