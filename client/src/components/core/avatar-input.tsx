/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import { EditIcon } from "./icons";

interface AvatarInputProps {
  value?: string | null;
  onChange: (file: string | null) => void;
  noDataChild?: React.ReactNode;
}

const AvatarInput: React.FC<AvatarInputProps> = ({
  value,
  onChange,
  noDataChild,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        onChange(result as string);
        setFile(result as string);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    console.log(fileInputRef);
    if (fileInputRef.current) {
      console.log("clcidfasd");
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      {value ? (
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center ">
          <div className="relative w-fit">
            <img
              src={value}
              alt="Avatar"
              className="w-32 h-32 object-cover rounded-full"
            />
            <button
              type="button"
              onClick={() => handleButtonClick()}
              className={`absolute bottom-2 right-0 bg-background p-2 rounded-full border z-20 border-gray-600 `}
            >
              <EditIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          {file ? (
            <div className=" border rounded-full" onClick={handleButtonClick}>
              <img src={file} className="w-32 h-32 rounded-full" />
            </div>
          ) : (
            <div
              className="border rounded-full p-6  hover:border-2 hover:border-primary transition-all ease-in duration-300"
              onClick={handleButtonClick}
            >
              {noDataChild}
            </div>
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default AvatarInput;
