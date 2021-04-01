export const useFormData = (formInput) => {
  const formData = [
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
      holder: "Size of truck",
      className: "form-control",
      value: formInput.truckSize,
      required: true,
    },
  ];

  return { formData };
};
