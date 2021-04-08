import React from "react";
import { FormDetails } from "../orders/order-form/order-form-details";
import { functionUtils } from "../../hooks/function-utils";
import WidgetHeader from "../general/widget-header";
import moment from "moment";

const PostExpense = () => {
  /**
   * Form state to be made avaliable to handle Input Change function
   *  */
  const formState = {
    expenseType: "",
    description: "",
    amount: "",
    date: moment().format("dd/mm/yy hh:mm:ss"),
  };

  /**
   *  Handle Input Change function for handling input changes across multiple form if required, in this case we are retriving the expense type, expense description and expense amount the user inputs. The date is auto generated.
   *  */

  const {
    formInput,
    handleChange,
    setFormInput,
  } = functionUtils.HandleInputChange(formState);

  /**
   * Form Data for building the form input display
   */
  const formData = [
    {
      id: "t-text",
      type: "text",
      name: "expenseType",
      holder: "Type of expense",
      className: "form-control",
      value: formInput.expenseType,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "description",
      holder: "Expense Description",
      className: "form-control",
      value: formInput.description,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "amount",
      holder: "Expense Amount",
      className: "form-control",
      value: formInput.amount,
      required: true,
    },
  ];

  return (
    <div id="basic" className="col-lg-12 layout-spacing">
      <div className="statbox widget box box-shadow">
        {/* HEADER TITLE FOR THE FORM */}
        <WidgetHeader title="Post Expense" />
        <div
          className="widget-content widget-content-area"
          style={{ padding: "3rem" }}
        >
          <div className="row">
            <div className="col-lg-6 col-12 mx-auto">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  {/* SUB-TITLE FOR THE FORM */}
                  <p>Fill in expense details</p>
                  {formData?.map((item, i) => (
                    <FormDetails
                      key={i}
                      item={item}
                      handleChange={handleChange}
                    />
                  ))}
                  <button
                    onClick={() =>
                      functionUtils.handlePostExpense(formInput, setFormInput)
                    }
                    className="mt-4 btn btn-primary"
                  >
                    Post Expense
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

export default PostExpense;
