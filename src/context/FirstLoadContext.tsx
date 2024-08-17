// src/context/FirstLoadContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  use,
} from 'react';

interface FirstLoadContextType {
  firstLoad: boolean;
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstLoadContext = createContext<FirstLoadContextType | undefined>(
  undefined
);

export const useFirstLoad = () => {
  const context = useContext(FirstLoadContext);
  if (context === undefined) {
    throw new Error('useFirstLoad must be used within a FirstLoadProvider');
  }
  return context;
};

export const FirstLoadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
    }
  }, [firstLoad]);

  return (
    <FirstLoadContext.Provider value={{ firstLoad, setFirstLoad }}>
      {children}
    </FirstLoadContext.Provider>
  );
};
