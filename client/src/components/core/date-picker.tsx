import React, { ChangeEvent, useState } from "react";

interface CustomDateInputProps {
  value?: string;
  onChange: (value: string) => void;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  value,
  onChange,
}) => {
  const [dateValue, setDateValue] = useState<string>(
    value ? value.slice(0, 10) : ""
  );
  const [timeValue, setTimeValue] = useState<string>(
    value ? value.slice(11) : ""
  );

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDateValue(newDate);
    onChange(`${newDate}T${timeValue}`);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTimeValue(newTime);
    onChange(`${dateValue}T${newTime}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="date"
        className="px-4 py-2 border-2 w-2/3 border-blue-900 bg-background text-white rounded-md focus:outline-none focus:border-blue-500 outline-none"
        value={dateValue}
        onChange={handleDateChange}
      />
      <input
        type="time"
        className="px-4 py-2 border-2 w-1/3 border-blue-900 bg-background text-white rounded-md focus:outline-none focus:border-blue-500 outline-none"
        value={timeValue}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default CustomDateInput;
