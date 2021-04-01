import React, { useState } from "react";
import useHandleInputChange from "../../hooks/useHandleInputChange";
import { FormDetails } from "../orders/order-form-details";
import { orderUtils } from "../orders/orders-utils";
import WidgetHeader from "../general/widget-header";
import UnitsList from "./unit-list";
import UpdateUnit from "./update-unit";

const Units = () => {
  const [displayUnitList, setDisplayUnitList] = useState(false);
  const [displayUnit, setDisplayUnit] = useState(false);
  // FORM STATE TO BE INPUTTED IN USEHANDLEINPUTCHANGE HOOK
  const formState = {
    product: "",
    description: "",
    unit: "",
    measurement: "",
  };
  // USEHANDLEINPUTCHANGE HOOK FOR HANDLING INPUT CHANGES
  const { formInput, handleChange, setFormInput } = useHandleInputChange(
    formState
  );
  console.log("form state ", formInput);

  // FORMDATA BASED ON VARIABLES FROM THE FORM INPUT STATE
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
                        orderUtils.handleUnitUpdate(
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
                        orderUtils.handleUnitFormSubmit(
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
