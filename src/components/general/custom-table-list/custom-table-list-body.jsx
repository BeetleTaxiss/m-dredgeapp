import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { ReactComponent as EditIcon } from "../../../assets/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/deleteIcon.svg";
import { ReactComponent as ReleaseIcon } from "../../../assets/releaseIcon.svg";
import { functionUtils } from "../../../hooks/function-utils";
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
                      if (field.stockpileReady === true) {
                        field.warningAlert();
                      }
                      if (field.stockpileReady === false) {
                        field.warningAlertFalse();
                      }
                      /** Add stockpile sand to stock list */
                      if (field.addToStock) {
                        const title =
                          "Are you sure you want to add this stockpile to Stock ?";
                        field.warningAlert(title, field.addToStock);
                      }

                      /** Render Order details to either loader, Inspector or Clearance UI modal on button click  */
                      if (field.load) {
                        document.getElementById("span-product").innerHTML =
                          field.loadDisplay.product;
                        document.getElementById("quantity").innerHTML =
                          functionUtils.addCommaToNumbers(
                            field.loadDisplay.qty
                          );
                        document.getElementById("truckNo").innerHTML =
                          field.loadDisplay.truckNo === ""
                            ? "No Truck Number"
                            : field.loadDisplay.truckNo;
                        document.getElementById("cost").innerHTML =
                          functionUtils.addCommaToNumbers(
                            field.loadDisplay.price
                          );
                        setLoad(field.load);
                        field.link(true);
                      }

                      if (field.processing) {
                        field.processing(field.isProcessing);
                      }

                      // Conditionally render dispatcher's comment
                      if (field.loadDisplay?.dispatcherComment) {
                        document.getElementById(
                          "wallet-comment"
                        ).style.display =
                          field.loadDisplay.dispatcherComment.length >= 1
                            ? "flex"
                            : "none";
                        if (
                          field.loadDisplay.loaderComment === null ||
                          field.loadDisplay.loaderComment === undefined ||
                          field.loadDisplay.loaderComment === ""
                        ) {
                          document.getElementById(
                            "span-comment-loader"
                          ).style.display = "none";
                          document.getElementById(
                            "span-comment-inspector"
                          ).style.display = "none";
                        }
                        document.getElementById(
                          "span-comment-dispatcher"
                        ).innerHTML = `Dispatcher comment: ${field.loadDisplay.dispatcherComment}`;
                      }

                      if (field.loadDisplay?.loaderComment) {
                        document.getElementById(
                          "wallet-comment"
                        ).style.display =
                          field.loadDisplay.loaderComment.length >= 1
                            ? "flex"
                            : "none";
                        if (
                          field.loadDisplay.inspectorComment === null ||
                          field.loadDisplay.inspectorComment === undefined ||
                          field.loadDisplay.inspectorComment === ""
                        ) {
                          document.getElementById(
                            "span-comment-inspector"
                          ).style.display = "none";
                        }
                        document.getElementById(
                          "span-comment-loader"
                        ).style.display = "block";
                        document.getElementById(
                          "span-comment-dispatcher"
                        ).innerHTML = `Dispatcher comment: ${
                          field.loadDisplay.dispatcherComment === ""
                            ? "No comment from dispatcher"
                            : field.loadDisplay.dispatcherComment
                        }`;
                        document.getElementById(
                          "span-comment-loader"
                        ).innerHTML = `Loader comment: ${
                          field.loadDisplay.loaderComment === ""
                            ? "No comment from loader"
                            : field.loadDisplay.loaderComment
                        }`;
                      }

                      if (field.loadDisplay?.inspectorComment) {
                        document.getElementById(
                          "wallet-comment"
                        ).style.display =
                          field.loadDisplay.inspectorComment.length >= 1
                            ? "flex"
                            : "none";

                        document.getElementById(
                          "span-comment-dispatcher"
                        ).innerHTML = `Dispatcher comment: 
                          ${
                            field.loadDisplay.dispatcherComment === ""
                              ? "No comment from dispatcher"
                              : field.loadDisplay.dispatcherComment
                          }`;

                        document.getElementById(
                          "span-comment-loader"
                        ).innerHTML = `Loader comment: 
                            ${
                              field.loadDisplay.loaderComment === ""
                                ? "No comment from loader"
                                : field.loadDisplay.loaderComment
                            }`;
                        document.getElementById(
                          "span-comment-inspector"
                        ).innerHTML = `Inspector comment: 
                            ${
                              field.loadDisplay.inspectorComment === ""
                                ? "No comment from inspector"
                                : field.loadDisplay.inspectorComment
                            }
                            `;
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
                ) : field.release ? (
                  <ReleaseIcon
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
