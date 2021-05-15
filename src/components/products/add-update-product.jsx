import React from "react";
import LoadingButton from "../general/loading-button";
import { FormDetails } from "../orders/order-form/order-form-details";
const AddUpdateProduct = ({
  content,
  showUpdateProduct,
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
                {showUpdateProduct
                  ? "Update product information"
                  : "Add new product information"}
              </p>
              {showUpdateProduct ? (
                <button
                  id="add-form-btn"
                  className="btn btn-success mb-3"
                  onClick={() => {
                    return onClick ? onClick() : null;
                  }}
                >
                  Go to add Products
                </button>
              ) : null}
            </div>

            {content?.map((item, i) => (
              <FormDetails key={i} item={item} />
            ))}
            <LoadingButton
              handleSubmit={
                showUpdateProduct ? handleUpdateSubmit : handleAddSubmit
              }
              loading={loading}
              text={showUpdateProduct ? "Update Product" : "Add Product"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;
