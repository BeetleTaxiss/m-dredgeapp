import React from "react";
import Skeleton from "react-loading-skeleton";
const CustomTableListBody = ({ content }) => {
  return (
    <tbody>
      {content ? (
        content.map((item) => (
          <tr key={item.id}>
            {item.fields.map((field, id) => (
              <td key={id} className={field.class}>
                <span className={field.itemClass}>
                  {field.item && field.item}
                </span>
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
