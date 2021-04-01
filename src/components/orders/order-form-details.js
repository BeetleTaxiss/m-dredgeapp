export const FormDetails = ({
  item: {
    id,
    type,
    name,
    holder,
    value,
    classname,

    ...otherProps
  },
  handleChange,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={holder}
      className={classname}
      onChange={handleChange}
      value={value}
      {...otherProps}
      style={{ marginBottom: "2rem" }}
    />
  );
};
