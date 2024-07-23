/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { BackIcon } from "./icons";

interface Option<T = any> {
  value: T;
}

interface CustomSelectProps<T = any> {
  options?: T[];
  value: T;
  onChange: (selectedValue: T) => void;
  getLabel: (option: T) => React.ReactNode;
  getValue: (option: T) => any;
  label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  getLabel,
  getValue,
  label,
}) => {
  const [selectOptions, setSelectOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState<React.ReactNode>(
    <p className="text-gray-700">Select an option</p>
  );

  useEffect(() => {
    if (options) {
      setSelectOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (value) {
      const selectedOption = options?.find(
        (option) => getValue(option) === getValue(value)
      );
      if (selectedOption) {
        setDisplayValue(getLabel(selectedOption));
      }
    }
  }, [value, options, getLabel, getValue]);

  const handleSelectOption = (option: Option) => {
    onChange(option);
    setDisplayValue(getLabel(option));
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left my-2 w-full"
      onBlur={() => setIsOpen(!isOpen)}
    >
      {label && <p className="text-sm">{label}</p>}
      <span className="rounded-2xl shadow-sm w-full">
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-2xl border-2 border-blue-900 px-4 py-2 text-sm leading-5 font-medium focus:outline-none transition ease-in-out duration-150"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {displayValue}
          <div className={`transform ${!isOpen ? "rotate-180" : "-rotate-90"}`}>
            <BackIcon />
          </div>
        </button>
      </span>
      {isOpen && (
        <div className="origin-top-left absolute z-20 left-0 mt-2 bg-background rounded-md shadow-lg w-full ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {selectOptions.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-900 cursor-pointer"
                onClick={() => handleSelectOption(option)}
              >
                {getLabel(option)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
