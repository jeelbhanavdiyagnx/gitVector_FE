
"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MetadataContextType {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('Git Vector');
  const [description, setDescription] = useState('Git vector, gives analytics of Github organizations, repositories and users');

  return (
    <MetadataContext.Provider value={{ title, description, setTitle, setDescription }}>
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error('useMetadata must be used within a MetadataProvider');
  }
  return context;
};
