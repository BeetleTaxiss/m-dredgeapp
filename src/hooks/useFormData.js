export const useFormData = (formInput) => {
  const formData = [
    {
      id: "t-text",
      type: "select",
      name: "products",
      holder: "Select Product",
      className: "form-control",
      value: formInput.products,
      options: [
        {
          text: "Sand",
          value: {
            "product-id": "322442",
            product: "Sand",
            user: "demo2",
            "user-id": 11976,
            unit: "cm³",
            "unit-price": 4000,
            measurement: "Bucket",
            description:
              "High quality stockpiled sand used in construction and farming",
          },
        },
        { text: "Wood", value: "wood" },
      ],
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "buckets",
      holder: "Number of sand buckets",
      className: "form-control",
      value: formInput.buckets,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "truckRegNo",
      holder: "Truck registration number",
      className: "form-control",
      value: formInput.truckRegNo,
      required: true,
    },
    {
      id: "t-text",
      type: "text",
      name: "truckSize",
      holder: "Order Cost",
      className: "form-control",
      value: formInput.truckSize,
      disabled: "disabled",
      required: true,
    },
  ];

  return { formData };
};
