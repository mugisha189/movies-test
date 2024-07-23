/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../components/core/button";
import { useUser } from "../../hooks/useUser";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useUser();
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!values.email) {
      errors.email = "Username or Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  const onSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    await login(values);
    setSubmitting(false);
  };

  return (
    <div className="w-full  text-black ">
      <div className="mb-5">
        <p className=" text-3xl font-extrabold text-primary">Login</p>
        <p className="text-xs  text-left  text-gray-700">
          Welcome back! Please enter your credentials to access your account. If
          you encounter any issues, feel free to reach out to our support team
          for assistance. Your privacy and security are our top priorities.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="my-3">
              <label htmlFor="email" className="w-full  text-sm mb-2">
                Email
              </label>
              <Field
                type="text"
                name="email"
                className="px-4 py-2 bg-inherit border-myBlue w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-red-500"
              />
            </div>
            <div className="my-3">
              <label htmlFor="password" className="w-full  text-sm mb-2">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="px-4 py-2 bg-inherit border-myBlue w-full border outline-none text-sm  rounded-2xl focus:border-primary transition-colors duration-300 focus:border-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-red-500"
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button variant="primary" type="submit" loading={isSubmitting}>
                <p className="px-10">Log In</p>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
