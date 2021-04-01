export const Orders = ({ order }) => (
  <tr>
    <td>
      <div className="td-content customer-name">
        <img src={order.profileImg} alt={order.imgAlt} />
        <span>{order.customer}</span>
      </div>
    </td>
    <td>
      <div className="td-content product-brand text-primary">
        {order.product}
      </div>
    </td>
    <td>
      <div className="td-content product-invoice">{order.invoice}</div>
    </td>
    <td>
      <div className="td-content pricing">
        <span className="">₦{order.price}</span>
      </div>
    </td>
    <td>
      <div className="td-content">
        <span className={`badge badge-${order.statusColor}`}>
          {order.status}
        </span>
      </div>
    </td>
  </tr>
);

export const TableHeading = () => (
  <thead>
    <tr>
      <th>
        <div className="th-content">Customer</div>
      </th>
      <th>
        <div className="th-content">Product</div>
      </th>
      <th>
        <div className="th-content">Invoice</div>
      </th>
      <th>
        <div className="th-content th-heading">Price</div>
      </th>
      <th>
        <div className="th-content">Status</div>
      </th>
    </tr>
  </thead>
);

export const tableData = [
  {
    profileImg: "assets/img/profile-13.jpeg",
    customer: "Luke Ivory",
    imgAlt: "avatar",
    product: "Stockpile Sand",
    invoice: "#46894",
    price: "56990",
    status: "Paid",
    statusColor: "success",
  },
  {
    profileImg: "assets/img/profile-10.jpeg",
    customer: "Andy King",
    imgAlt: "avatar",
    product: "Stockpile Sand",
    invoice: "#66894",
    price: "126000",
    status: "Shipped",
    statusColor: "info",
  },
  {
    profileImg: "assets/img/profile-6.jpeg",
    customer: "Irene Collins",
    imgAlt: "avatar",
    product: "Stockpile Sand",
    invoice: "#48249",
    price: "20100",
    status: "Pending",
    statusColor: "danger",
  },
  {
    profileImg: "assets/img/profile-7.jpeg",
    customer: "Lauire White",
    imgAlt: "avatar",
    product: "Stockpile Sand",
    invoice: "#49529",
    price: "440100",
    status: "Paid",
    statusColor: "success",
  },
];
