import React from "react";
import LoadingButton from "../general/loading-button";
import { FormDetails } from "../orders/order-form/order-form-details";
const AddUpdateProduct = ({
  content: { addProductformData, updateProductformData },
  showUpdateProduct,
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
            <p>Fill in order details</p>

            {showUpdateProduct
              ? updateProductformData?.map((item, i) => (
                  <FormDetails
                    key={i}
                    item={item}
                    // handleChange={handleOrderChange}
                  />
                ))
              : addProductformData?.map((item, i) => (
                  <FormDetails
                    key={i}
                    item={item}
                    // handleChange={handleOrderChange}
                  />
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
