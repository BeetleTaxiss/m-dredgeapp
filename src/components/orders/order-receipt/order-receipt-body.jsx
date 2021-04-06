import React from "react";

const OrderReceiptBody = ({ product, qty, price, amount }) => {
  return (
    <div className="inv--product-table-section">
      <div className="table-responsive">
        <table className="table">
          <thead className="">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Items</th>
              <th className="text-right" scope="col">
                Qty
              </th>
              <th className="text-right" scope="col">
                Price
              </th>
              <th className="text-right" scope="col">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{product}</td>
              <td className="text-right">{qty}</td>
              <td className="text-right">₦{price}</td>
              <td className="text-right">₦{amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderReceiptBody;
