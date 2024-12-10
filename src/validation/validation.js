import * as Yup from "yup";

// Спільні правила валідації
const nameValidation = Yup.string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters")
  .required("Name is required");

const emailValidation = Yup.string()
  .email("Invalid email address")
  .required("Email is required");

const phoneValidation = Yup.string()
  .matches(
    /^\+[0-9]{10,}$/,
    "Phone must start with '+' and have at least 10 digits"
  )
  .required("Phone is required");

const addressValidation = Yup.string()
  .min(5, "Address must be at least 5 characters")
  .required("Address is required");

const passwordValidation = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .required("Password is required");

// Схеми валідації для різних форм
export const registerValidationSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  address: addressValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const profileValidationSchema = Yup.object().shape({
  name: nameValidation,
  phone: phoneValidation,
  address: addressValidation,
});

export const passwordChangeValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current password is required"),
  newPassword: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
