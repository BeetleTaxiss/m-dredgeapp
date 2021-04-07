export const useFormData = (formInput, select) => {
  const formData = [
    {
      id: "select",
      type: "select",
      name: "product",
      className: "form-control",
      value: formInput.product,
      options: formInput?.products,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "qty",
      holder: "Number of sand buckets",
      className: "form-control",
      value: formInput?.qty,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "truck-no",
      holder: "Truck registration number",
      className: "form-control",
      value: formInput["truck-no"],
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "total-price",
      holder: "Order Cost",
      className: "form-control",
      value: formInput["total-price"],
      disabled: "disabled",
      required: true,
    },
  ];

  return { formData };
};
