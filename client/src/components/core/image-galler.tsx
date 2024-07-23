/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

interface ImageGalleryProps {
  images: any[]; 
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentValues, setCurrentValues] = useState<number[]>([1, 4]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValues((prevValues) => {
        const newValue1 = (prevValues[0] + 1) % images.length; // Ensure restart if goes beyond array length
        const newValue2 = (newValue1 + 3) % images.length; // Ensure restart if goes beyond array length
        return [newValue1, newValue2];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="flex w-screen overflow-x-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className="h-[300px] transition-all ease-in-out duration-700 rounded-3xl"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: !currentValues.includes(index) ? "20%" : "100%",
          }}
        ></div>
      ))}
    </div>
  );
};

export default ImageGallery;
