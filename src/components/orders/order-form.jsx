import React from "react";
import { useFormData } from "../../hooks/useFormData";
import { FormDetails } from "./order-form-details";
import { functionUtils } from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";

const OrderForm = () => {
  /**
   * Form state to be made avaliable to handle Input Change function
   *  */
  const formState = {
    products: {},
    buckets: "",
    truckRegNo: "",
    truckSize: "",
  };
  /**
   *  Handle Input Change function for handling input changes across multiple form if required, in this case we are retriving the number of buckets, truck registration number and truck size the user inputs
   *  */
  const { formInput, handleChange } = functionUtils.HandleInputChange(
    formState
  );
  console.log("form state ", formInput);

  /**
   * useFormData hook for retriving form data based on variables from the form input state
   *  */
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
                    onClick={() => functionUtils.handleFormSubmit(formInput)}
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
