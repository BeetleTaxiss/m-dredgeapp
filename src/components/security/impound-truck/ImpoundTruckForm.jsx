import React from "react";
import LoadingButton from "../../general/loading-button";
import { FormDetails } from "../../orders/order-form/order-form-details";

const ImpoundTruckForm = ({ content, handleAddSubmit, loading }) => {
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
              <p>Add impounded truck information</p>
            </div>

            {content?.map((item, i) => (
              <FormDetails key={i} item={item} />
            ))}
            <LoadingButton
              handleSubmit={handleAddSubmit}
              loading={loading}
              text="Impound Truck"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImpoundTruckForm;
