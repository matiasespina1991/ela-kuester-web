// src/context/PortfolioContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPortfolio } from '../utils/getPortfolio';

interface PortfolioContextProps {
  portfolio: any;
  setPortfolio: React.Dispatch<React.SetStateAction<any>>;
}

const PortfolioContext = createContext<PortfolioContextProps | undefined>(
  undefined
);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const portfolioData = await getPortfolio();
      setPortfolio(portfolioData);
    };

    fetchPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};
