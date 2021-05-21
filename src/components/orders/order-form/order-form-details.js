export const FormDetails = ({
  item: {
    id,
    type,
    name,
    holder,
    value,
    className,
    min,

    ...otherProps
  },
  handleChange,
  visibility,
  errors,
  cols,
  rows,
  noMargin,
  displayHalf,
  color,
  noMB,
}) => {
  return (
    <>
      {type === "select" ? (
        <div
          style={{
            width: noMargin ? "33%" : displayHalf ? "100%" : "auto",
            marginTop: noMargin ? "1rem" : displayHalf ? "0rem" : "",
            marginBottom: noMargin || displayHalf ? "0rem" : "2rem",
            padding: "0 0 0 0",
          }}
        >
          <select
            id={id}
            type={type}
            className={className}
            name={name}
            onChange={handleChange}
            value={value}
            {...otherProps}
          >
            {otherProps?.options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.product && option.description
                  ? option.product
                  : option.product
                  ? option.product
                  : option.machinery_name && option.description
                  ? option.machinery_name
                  : option.machinery_name
                  ? option.machinery_name
                  : option.description
                  ? option.description
                  : null}

                {option.user_type && option.user_type}
                {/* {option.machinery_name && option.machinery_name} */}
                {option.account && option.account}
              </option>
            ))}
          </select>
        </div>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          type={type}
          name={name}
          placeholder={holder}
          className={className}
          onChange={handleChange}
          value={value}
          disabled={otherProps.disabled}
          {...otherProps}
          style={{
            marginBottom: noMB ? "0rem" : "2rem",
          }}
          cols={cols ? cols : 5}
          rows={rows ? rows : 5}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          placeholder={holder}
          className={className}
          onChange={handleChange}
          value={value}
          min={min}
          disabled={otherProps.disabled}
          {...otherProps}
          style={{
            marginBottom: displayHalf ? "0rem" : "2rem",
            width: noMargin ? "33%" : displayHalf ? "100%" : "100%",
            color: color && color,
            fontSize: color && "1.2rem",
            fontWeight: color && "700",
            textAlign: color && "center",
          }}
        />
      )}
    </>
  );
};

export const SelectInput = ({
  item: { id, type, className, name, value, ...otherProps },
  handleChange,
}) => {
  return (
    <div style={{ marginBottom: "2rem", padding: "0 0 0 0" }}>
      <select
        id={id}
        type={type}
        className={className}
        name={name}
        onChange={handleChange}
        value={value}
        {...otherProps}
      >
        {otherProps?.options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.product}
          </option>
        ))}
      </select>
    </div>
  );
};
