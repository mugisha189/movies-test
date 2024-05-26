import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  prefixIcon,
  label,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col text-sm">
      {label && <label className="mb-1 text-myText text-xs">{label}</label>}
      <div
        className={`flex items-center ${
          error && "border  border-red-500"
        } rounded-xl p-2 bg-inputColor`}
      >
        {prefixIcon && <div className="pl-2 rounded-l">{prefixIcon}</div>}
        {type === "textarea" ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 p outline-none bg-transparent resize-none"
          />
        ) : (
          <input
            type={type === "password" && isPasswordVisible ? "text" : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 p outline-none bg-transparent"
          />
        )}
        {type === "password" && (
          <div
            className="cursor-pointer pr-2"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
