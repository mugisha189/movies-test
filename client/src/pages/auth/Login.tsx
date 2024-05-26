/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "../../components/core/button";
import { useUser } from "../../hooks/useUser";
import InputField from "../../components/core/input";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const { login } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex (example: at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate({ email, password, rememberMe });
    if (validationErrors.email) {
      setEmailError(validationErrors.email);
    }
    if (validationErrors.password) {
      setPasswordError(validationErrors.password);
    }
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await login({ email, password, rememberMe });
    setIsSubmitting(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center text-white">
      <div className="w-full px-[5vw] md:w-[80%] lg:w-[40%] transition-all duration-200">
        <div className="mb-5 text-center space-y-3">
          <p className="text-3xl font-extrabold text-white">Sign In</p>
          <p className="text-xs text-left text-gray-200">
            Welcome back! Please enter your credentials to access your account.
            If you encounter any issues, feel free to reach out to our support
            team for assistance. Your privacy and security are our top
            priorities.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <InputField
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Email"
              error={emailError}
            />
          </div>
          <div className="my-3">
            <InputField
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Password"
              error={passwordError}
            />
          </div>
          <div className="my-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="bg-inputColor"
            />
            <label htmlFor="rememberMe" className="text-sm">
              Remember Me
            </label>
          </div>
          <div className="mt-5">
            <Button
              variant="primary"
              type="submit"
              className="w-full "
              loading={isSubmitting}
            >
              <p className="px-10 font-bold">Log In</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
