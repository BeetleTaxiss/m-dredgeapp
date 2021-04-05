import React, { useState } from "react";
import { FormDetails } from "../orders/order-form-details";
import { functionUtils } from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";
import UnitsList from "./unit-list";
import UpdateUnit from "./update-unit";

const Units = () => {
  /**
   * States to conditionally render unit list and either the add unit or update unit components
   */
  const [displayUnitList, setDisplayUnitList] = useState(false);
  const [displayUnit, setDisplayUnit] = useState(false);
  /**
   * Form state to be made avaliable to handle Input Change function
   *  */

  const formState = {
    product: "",
    description: "",
    unit: "",
    measurement: "",
  };
  /**
   *  Handle Input Change function for handling input changes across multiple form if required, in this usecase we are interested in the input values of the product, product description, product unit and it's measurement
   *  */

  const {
    formInput,
    handleChange,
    setFormInput,
  } = functionUtils.HandleInputChange(formState);
  console.log("form state ", formInput);
  /**
   * Form Data for building the form input display
   */

  const unitFormData = [
    {
      id: "t-text",
      type: "text",
      name: "product",
      holder: "Product Name",
      className: "form-control",
      value: formInput.product,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "description",
      holder: "Product Description",
      className: "form-control",
      value: formInput.description,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "unit",
      holder: "Product Unit",
      className: "form-control",
      value: formInput.unit,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "measurement",
      holder: "Product Measurement",
      className: "form-control",
      value: formInput.measurement,
      required: true,
    },
  ];

  const listHeaderData = {
    name: "Name",
    desc: "Description",
    unit: "Unit",
    measurement: "Measurement",
  };

  return (
    <div id="basic" className="col-lg-12 layout-spacing">
      <div className="statbox widget box box-shadow">
        {/* HEADER TITLE FOR THE FORM */}
        <WidgetHeader title="Set Unit Constants" />
        <div
          className="widget-content widget-content-area searchable-container list"
          style={{ display: "grid", padding: "2rem", gap: "2rem" }}
        >
          {displayUnit ? (
            <div className="row">
              <div className="col-lg-6 col-12 mx-auto">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    {/* SUB-TITLE FOR THE FORM */}
                    <p>Fill in unit details</p>
                    {unitFormData?.map((item, i) => (
                      <FormDetails
                        key={i}
                        item={item}
                        handleChange={handleChange}
                      />
                    ))}
                    <button
                      onClick={() =>
                        functionUtils.handleUnitUpdate(
                          formInput,
                          setDisplayUnitList,
                          setFormInput
                        )
                      }
                      className="mt-4 btn btn-primary"
                    >
                      Update Unit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-6 col-12 mx-auto">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    {/* SUB-TITLE FOR THE FORM */}
                    <p>Fill in unit details</p>
                    {unitFormData?.map((item, i) => (
                      <FormDetails
                        key={i}
                        item={item}
                        handleChange={handleChange}
                      />
                    ))}
                    <button
                      onClick={() =>
                        functionUtils.handleUnitFormSubmit(
                          formInput,
                          setDisplayUnitList,
                          setFormInput
                        )
                      }
                      className="mt-4 btn btn-primary"
                    >
                      Set Units
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {displayUnitList && (
            <UnitsList
              setDisplayUnit={setDisplayUnit}
              unit={formInput}
              header={listHeaderData}
            />
          )}
        </div>
      </div>
      {/* {displayUnit && (
        <UpdateUnit
          setState={setDisplayUnit}
          state={displayUnit}
          formState={formState}
        />
      )} */}
    </div>
  );
};

export default Units;
