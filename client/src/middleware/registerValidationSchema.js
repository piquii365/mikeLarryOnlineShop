import * as Yup from "yup";
const checkPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
export const registerSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/, "write full name as John Doe")
    .required("Full name should be provided"),
  username: Yup.string()
    .matches(/^[a-zA-Z].{5,}$/, "Username should be at least 5 characters long")
    .required("Username should be provided"),
  email: Yup.string()
    .email("Enter your email as johndoe@gmail.com")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      checkPassword,
      "Password should at least include an uppercase letter, lowercase letter, a number, a special character, and must contain at least 8 characters "
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm password"),
  location: Yup.string().required("Address is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "Enter valid phone number"
    )
    .required("Phone number is required"),
});
