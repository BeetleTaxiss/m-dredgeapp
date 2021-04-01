import React from "react";

const useHandleInputChange = (formState) => {
  const [formInput, setFormInput] = React.useState(formState);

  const handleChange = ({ currentTarget: { name, value } }) =>
    setFormInput((state) => ({
      ...state,
      [name]: value,
    }));

  return {
    formInput,
    handleChange,
    setFormInput,
  };
};

export default useHandleInputChange;
