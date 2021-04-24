import React from "react";
import { Link } from "react-router-dom";
import { FormDetails } from "../../orders/order-form/order-form-details";
import ListSingleViewCard from "../list-single-view-card/list-single-view-card";
import LoadingButton from "../loading-button";
import ModalBackdrop from "./modal-backdrop";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const FormModal = ({
  formTitle,
  formSubtitle,
  formData,
  accordionData,
  loading,
  setLoading,
  errorMsg,
  status,
  showModal,
  setShowModal,
  handleSubmit,
  handleChange,
  Btntext,
  noClickOutside,
  closeBtn,
  listItems,
  cols,
  rows,
}) => {
  return (
    <ModalBackdrop
      setLoading={setLoading}
      showModal={showModal}
      setShowModal={setShowModal}
      noClickOutside={noClickOutside}
    >
      {formTitle && <h2 id="formModal-title">{formTitle}</h2>}
      {formSubtitle && <p id="formModal-subtitle">{formSubtitle}</p>}
      {listItems && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem 1.5rem 0",
          }}
        >
          <ListSingleViewCard />
        </div>
      )}
      <form id="formModal" onSubmit={(e) => e.preventDefault()}>
        {formData &&
          formData.map((item, i) => (
            <div key={item.id} className="row">
              <div className="col-md-12">
                <div className="">
                  <i className="flaticon-location-1"></i>
                  <FormDetails
                    item={item}
                    handleChange={handleChange}
                    rows={rows}
                    cols={cols}
                  />
                  <span className="validation-text"></span>
                </div>
              </div>
            </div>
          ))}
        {accordionData && (
          <Accordion allowZeroExpanded>
            {accordionData.map((item) => (
              <AccordionItem key={item.uuid}>
                <AccordionItemHeading>
                  <AccordionItemButton>{item.heading}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>{item.content}</AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <LoadingButton
            handleSubmit={handleSubmit}
            loading={loading}
            text={Btntext}
          />
          {closeBtn && (
            <Link
              to="#"
              onClick={() => {
                setShowModal((prev) => !prev);
                console.log("Modal State: ", showModal);
                alert("Close btn clicked");
              }}
              className="mt-4 btn btn-danger"
            >
              Close
            </Link>
          )}
        </div>
      </form>
      {/* {errorMsg} */}
    </ModalBackdrop>
  );
};

export default FormModal;
