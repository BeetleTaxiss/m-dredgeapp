export const FormDetails = ({
  item: {
    id,
    type,
    name,
    holder,
    value,
    className,

    ...otherProps
  },
  handleChange,
  visibility,
  errors,
  cols,
  rows,
  noMargin,
}) => {
  // console.log("Select value: ", value);
  return (
    <>
      {type === "select" ? (
        <div
          style={{
            width: noMargin ? "33%" : "auto",
            marginTop: noMargin ? "1rem" : "",
            marginBottom: noMargin ? "0rem" : "2rem",
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
                {option.product && option.product}
                {option.user_type && option.user_type}
                {option.machinery_name && option.machinery_name}
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
            marginBottom: "2rem",
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
          disabled={otherProps.disabled}
          {...otherProps}
          style={{ marginBottom: "2rem" }}
        />
      )}
    </>
  );
};

export const SelectInput = ({
  item: { id, type, className, name, value, ...otherProps },
  handleChange,
}) => {
  console.log("Select Input: ", value);
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
