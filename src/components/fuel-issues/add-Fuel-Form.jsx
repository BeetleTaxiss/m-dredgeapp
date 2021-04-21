import React from "react";
import LoadingButton from "../general/loading-button";
import { FormDetails } from "../orders/order-form/order-form-details";
const AddUpdateProduct = ({
  content,
  handleAddSubmit,
  loading,
  subtitle,
  btnText,
}) => {
  return (
    <div className="row">
      <div className="col-lg-6 col-12 mx-auto">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            {/* SUB-TITLE FOR THE FORM */}

            <p>{subtitle}</p>

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
