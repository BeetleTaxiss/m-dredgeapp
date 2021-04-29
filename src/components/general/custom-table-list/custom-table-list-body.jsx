import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { ReactComponent as EditIcon } from "../../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/deleteIcon.svg";
const CustomTableListBody = ({ content, setLoad }) => {
  return (
    <tbody>
      {content ? (
        content?.map((item) => (
          <tr key={item.id}>
            {item.fields?.map((field, id) => (
              <td key={id} className={field.class}>
                {field.link ? (
                  <a
                    className={field.itemClass}
                    onClick={() => {
                      /** Wet sand Button function to add wet sand to stockpile */
                      if (field.toStockpile) {
                        const title =
                          "Are you sure you want to Stockpile this wet sand ?";
                        field.warningAlert(title, field.toStockpile);
                      }
                      /** Add stockpile sand to stock list */
                      if (field.addToStock) {
                        const title =
                          "Are you sure you want to add this stockpile to Stock ?";
                        field.warningAlert(title, field.addToStock);
                      }
                      // console.log("Processing Data: ", field.isProcessing);
                      if (field.processing) {
                        field.processing(field.isProcessing);
                      }

                      // Conditionally render dispatcher's comment
                      if (field.loadDisplay?.dispatchComment) {
                        document.getElementById(
                          "wallet-comment"
                        ).style.display =
                          field.loadDisplay.dispatchComment.length >= 1
                            ? "flex"
                            : "none";
                        document.getElementById("span-comment").innerHTML =
                          field.loadDisplay.dispatchComment;
                      }

                      if (field.loadDisplay?.loaderComment) {
                        document.getElementById(
                          "wallet-comment"
                        ).style.display =
                          field.loadDisplay.loaderComment.length >= 1
                            ? "flex"
                            : "none";
                        document.getElementById("span-comment").innerHTML =
                          field.loadDisplay.loaderComment;
                      }

                      if (field.loadDisplay?.inspectorComment) {
                        document.getElementById(
                          "wallet-comment"
                        ).style.display =
                          field.loadDisplay.inspectorComment.length >= 1
                            ? "flex"
                            : "none";
                        document.getElementById("span-comment").innerHTML =
                          field.loadDisplay.inspectorComment;
                      }

                      /** Render Order details to either loader, Inspector or Clearance UI modal on button click  */
                      if (field.load) {
                        document.getElementById("span-product").innerHTML =
                          field.loadDisplay.product;
                        document.getElementById("quantity").innerHTML =
                          field.loadDisplay.qty;
                        document.getElementById("truckNo").innerHTML =
                          field.loadDisplay.truckNo === ""
                            ? "No Truck Number"
                            : field.loadDisplay.truckNo;
                        document.getElementById("cost").innerHTML =
                          field.loadDisplay.price;
                        setLoad(field.load);
                        field.link(true);
                      }
                      /** Render detailed User activities with popup  */
                      if (field.userLog) {
                        // alert("fired");
                        field.link();
                      }
                    }}
                    href="javascript:void(0)"
                  >
                    {field.linkText}
                  </a>
                ) : field.editScroll ? (
                  <ScrollLink
                    id="edit-btn-icon"
                    className="edit-btn-icon"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    to={field.scrollLocation}
                    activeClass="active"
                    smooth={true}
                    duration={500}
                    onClick={() => {
                      return field.onClick ? field.onClick() : null;
                    }}
                  >
                    <EditIcon />
                  </ScrollLink>
                ) : field.edit ? (
                  <button
                    id="edit-btn-icon"
                    className="edit-btn-icon"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => {
                      return field.onClick ? field.onClick() : null;
                    }}
                  >
                    <EditIcon id="edit-btn-icon" />
                  </button>
                ) : field.delete ? (
                  <DeleteIcon
                    onClick={() => {
                      return field.onClick ? field.onClick() : null;
                    }}
                  />
                ) : (
                  <span className={field.itemClass}>
                    {field.item && field.item}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <>
          {/* <tr>
            <Skeleton width={1000} height={25} />
            <Skeleton width={1000} height={25} />
            <Skeleton width={1000} height={25} />
          </tr>
          <tr>
            <Skeleton width={1000} height={25} />
            <Skeleton width={1000} height={25} />
            <Skeleton width={1000} height={25} />
          </tr>
          <tr>
            <Skeleton width={1000} height={25} />
            <Skeleton width={1000} height={25} />
            <Skeleton width={1000} height={25} />
          </tr> */}
        </>
      )}
    </tbody>
  );
};

export default CustomTableListBody;
