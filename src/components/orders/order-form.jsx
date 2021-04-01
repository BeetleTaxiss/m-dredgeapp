import React from "react";
import useHandleInputChange from "../../hooks/useHandleInputChange";
import { useFormData } from "../../hooks/useFormData";
import { FormDetails } from "./order-form-details";
import { orderUtils } from "./orders-utils";
import WidgetHeader from "../general/widget-header";

const OrderForm = () => {
  // FORM STATE TO BE INPUTTED IN USEHANDLEINPUTCHANGE HOOK
  const formState = {
    buckets: "",
    truckRegNo: "",
    truckSize: "",
  };
  // USEHANDLEINPUTCHANGE HOOK FOR HANDLING INPUT CHANGES
  const { formInput, handleChange } = useHandleInputChange(formState);
  console.log("form state ", formInput);

  // USEFORMDATA HOOK FOR RETRIVING FORMDATA BASED ON VARIABLES FROM THE FORM INPUT STATE
  const { formData } = useFormData(formInput);

  return (
    <div id="basic" className="col-lg-12 layout-spacing">
      <div className="statbox widget box box-shadow">
        {/* HEADER TITLE FOR THE FORM */}
        <WidgetHeader title="Make an order" />
        <div
          className="widget-content widget-content-area"
          style={{ padding: "3rem" }}
        >
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  {/* SUB-TITLE FOR THE FORM */}
                  <p>Fill in order details</p>
                  {formData?.map((item, i) => (
                    <FormDetails
                      key={i}
                      item={item}
                      handleChange={handleChange}
                    />
                  ))}
                  <button
                    onClick={() => orderUtils.handleFormSubmit(formInput)}
                    className="mt-4 btn btn-primary"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
