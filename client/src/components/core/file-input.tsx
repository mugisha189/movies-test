/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ChangeEvent, useRef, useState } from "react";
import { FaImage} from "react-icons/fa6";
import { IFile } from "../../utils/types/core";

interface FileInputProps {
  onFileSelect: (logo: IFile) => void;
  initialFileUrl?: string;
  label?: string;
  error?:string
}

const FileInput: React.FC<FileInputProps> = ({
  onFileSelect,
  initialFileUrl,
  label,
  error
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<IFile | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (): void => {
        setFile({
          name: selectedFile.name,
          result: reader.result as any,
          type: selectedFile.type,
        });
        console.log({
          name: selectedFile.name,
          result: reader.result as any,
          type: selectedFile.type,
        });
        onFileSelect({
          name: selectedFile.name,
          result: reader.result as any,
          type: selectedFile.type,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      {label && <p className="text-xs text-myText mb-1">{label}</p>}
      <div className="flex items-center justify-center w-full">
        <div
          className="w-full bg-inputColor     rounded-xl overflow-hidden flex items-center justify-center cursor-pointer "
          onClick={handleClick}
        >
          {initialFileUrl || file ? (
            <img
              src={initialFileUrl || file?.result as any}
              alt="File Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-sm py-20 flex items-center justify-center flex-col">
              <FaImage className="w-20 h-20 text-[#3E3232] opacity-35" />
              <p className="text-base font-medium">Choose File</p>
              <p>Click to Browse your files</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple={false}
            onChange={handleFileSelect}
            accept="image/*"
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileInput;
