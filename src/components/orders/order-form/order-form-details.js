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
  errors,
}) => {
  // console.log("Select value: ", value);
  return (
    <>
      {type === "select" ? (
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
