import React, { createContext, useContext, useState } from 'react';

interface ImageContextType {
  images: string[];
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC = ({ children }) => {
  const [images, setImages] = useState<string[]>([]);

  const addImage = (image: string) => {
    setImages([...images, image]);
  };

  const removeImage = (image: string) => {
    setImages(images.filter(img => img !== image));
  };

  return (
    <ImageContext.Provider value={{ images, addImage, removeImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};