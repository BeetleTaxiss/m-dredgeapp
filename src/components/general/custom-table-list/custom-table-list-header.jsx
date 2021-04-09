import React from "react";

const CustomTableListHeader = ({ content }) => {
  return (
    <thead>
      <tr>
        {content.map((item, id) => (
          <th key={id} className={item.class}>
            {item.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CustomTableListHeader;
