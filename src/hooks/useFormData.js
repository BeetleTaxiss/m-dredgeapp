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
export const useAddContactFormData = (selectOptions) => {
  const formData = [
    {
      id: "user-add-user",
      type: "text",
      name: "user",
      holder: "User name",
      className: "form-control",
      required: true,
    },
    {
      id: "select-add-user",
      type: "select",
      name: "job description",
      className: "form-control",
      options: selectOptions,
      required: true,
    },
    {
      id: "email-add-user",
      type: "email",
      name: "email",
      holder: "User email",
      className: "form-control",
      required: true,
    },
    {
      id: "phone-add-user",
      type: "text",
      name: "phone",
      holder: "User phone number",
      className: "form-control",
      required: true,
    },
    {
      id: "password-add-user",
      type: "password",
      name: "password",
      holder: "Set user password",
      className: "form-control",
      required: true,
    },
    {
      id: "confirm-password-add-user",
      type: "password",
      name: "confirm password",
      holder: "confirm user password",
      className: "form-control",
      required: true,
    },
  ];

  return { formData };
};
export const useUpdateContactFormData = () => {
  const updateFormData = [
    {
      id: "user-add-user",
      type: "text",
      name: "user",
      holder: "User name",
      className: "form-control",
      required: true,
    },
    {
      id: "user-id-add-user",
      type: "text",
      name: "user id",
      holder: "User Identification",
      className: "form-control",
      hidden: "hidden",
      required: true,
    },
    {
      id: "password-add-user",
      type: "password",
      name: "password",
      holder: "Set user password",
      className: "form-control",
      required: true,
    },
    {
      id: "new-password-add-user",
      type: "password",
      name: "new password",
      holder: "Set new user password",
      className: "form-control",
      required: true,
    },
  ];

  return { updateFormData };
};
export const useUserChangePasswordFormData = (userName) => {
  const updatePasswordFormText = {
    formTitle: "Update your password",
    formSubtitle: "Has your password been leaked? Change it here",
    Btntext: "Update Password",
  };
  const updatePasswordFormData = [
    {
      id: "user-update-user",
      type: "text",
      name: "user",
      holder: "User name",
      className: "form-control",
      value: userName,
      required: true,
    },
    {
      id: "password-update-user",
      type: "password",
      name: "password",
      holder: "Your old password",
      className: "form-control",
      required: true,
    },
    {
      id: "new-password-update-user",
      type: "password",
      name: "new password",
      holder: "Set your new password",
      className: "form-control",
      required: true,
    },
  ];

  return { updatePasswordFormData, updatePasswordFormText };
};
