export const useFormData = (formInput, totalPrice) => {
  const formData = [
    {
      id: "select",
      type: "select",
      name: "product",
      className: "form-control",
      // value: formInput.product,
      options: formInput,
      required: true,
    },
    {
      id: "qty",
      type: "text",
      name: "qty",
      holder: "Number of sand buckets",
      className: "form-control",
      // value: formInput?.qty,
      required: true,
    },
    {
      id: "truckNo",
      type: "text",
      name: "truck-no",
      holder: "Truck registration number",
      className: "form-control",
      // value: formInput["truck-no"],
      required: true,
    },
    {
      id: "totalPrice",
      type: "text",
      name: "total-price",
      holder: "Order Cost",
      className: "form-control",
      value: totalPrice,
      disabled: "disabled",
      required: true,
    },
  ];

  return { formData };
};

export const useUpdateOrderFormData = (totalPrice) => {
  const formData = [
    {
      id: "qty",
      type: "text",
      name: "qty",
      holder: "Number of sand buckets",
      className: "form-control",
      // value: formInput?.qty,
      required: true,
    },
    {
      id: "truckNo",
      type: "text",
      name: "truck-no",
      holder: "Truck registration number",
      className: "form-control",
      // value: formInput["truck-no"],
      required: true,
    },
    {
      id: "totalPrice",
      type: "text",
      name: "total-price",
      holder: "Order Cost",
      className: "form-control",
      value: totalPrice,
      disabled: "disabled",
      required: true,
    },
  ];

  return { formData };
};
