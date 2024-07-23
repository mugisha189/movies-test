import React, { useState, useRef } from "react";
import { DeleteIcon } from "./icons";

interface FileWithPreview {
  result: string;
  type: string;
  url?: string;
  name: string;
}

interface CustomFileInputProps {
  icon?: React.ReactNode;
  title?: string;
  multiple?: boolean;
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  icon,
  title,
  multiple = false,
  files,
  setFiles,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      console.log(selectedFiles);
      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setFiles((prev) => [
              ...prev,
              {
                result: e.target?.result as string,
                type: file.type,
                name: file.name,
              },
            ]);
            console.log(files);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  console.log(files);

  return (
    <div className="border border-gray-700 my-2 rounded-md">
      {files?.length > 0 ? (
        <div
          className={`${
            files?.length === 1 ? "grid grid-cols-1 " : "grid grid-cols-2 gap-1"
          }`}
        >
          <div className="absolute top-2 left-2 z-20">
            <button
              type="button"
              onClick={() => {
                handleButtonClick();
              }}
              className="bg-background px-4 py-2 rounded-md cursor-pointer"
            >
              Add More Pics
            </button>
          </div>
          {files?.map((file, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={file.result ? file.result : file.url}
                alt="File"
                className="w-full h-full object-cover rounded-md"
              />
              {hoveredIndex === index && (
                <div className="absolute bottom-2 right-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) =>
                        prev.filter((fil) => fil.name !== file.name)
                      )
                    }
                    className="text-red-500"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center p-4 py-20">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={handleButtonClick}
            className="text-sm border border-gray-700 px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple={multiple}
      />
    </div>
  );
};

export default CustomFileInput;
