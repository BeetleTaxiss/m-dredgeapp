import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumb-one" aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, i) => (
          <li
            key={i}
            className={`breadcrumb-item ${item.active && "active"}`}
            aria-current={item.active && "page"}
          >
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
