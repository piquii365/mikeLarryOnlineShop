import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string().required("Email is cannot be empty"),
  password: Yup.string().required("Password field cannot be empty"),
});
