import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const CustomTableListBody = ({ content, setLoad }) => {
  return (
    <tbody>
      {content ? (
        content.map((item) => (
          <tr key={item.id}>
            {item.fields.map((field, id) => (
              <td key={id} className={field.class}>
                {field.link ? (
                  <Link
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
                    }}
                    to="#"
                  >
                    {field.linkText}
                  </Link>
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
          <Skeleton count={3} width={2000} height={25} />
          <Skeleton count={3} width={2000} height={25} />
          <Skeleton count={3} width={2000} height={25} />
          <Skeleton count={3} width={2000} height={25} />
          <Skeleton count={3} width={2000} height={25} />
        </>
      )}
    </tbody>
  );
};

export default CustomTableListBody;
