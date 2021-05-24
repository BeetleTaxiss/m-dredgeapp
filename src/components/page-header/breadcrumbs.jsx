import React from "react";
import { Link, useHistory } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  const history = useHistory();
  return (
    <nav className="breadcrumb-one" aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, i) => (
          <li
            key={i}
            className={`breadcrumb-item ${item.active && "active"}`}
            aria-current={item.active && "page"}
            style={{ display: !item.text && "none" }}
          >
            <Link
              onClick={(e) => {
                e.preventDefault();
                if (item.link) {
                  history.push(item.link);
                }
              }}
              to={item.link}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
