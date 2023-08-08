import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const AppContext = createContext<IAppContext | null>(null);

interface IAppContext {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

interface IAppProviderProps {
  children: ReactNode;
}

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true';
  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState<string>('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', String(newDarkTheme));
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): IAppContext => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error(`useAppContext must be used within an AppProvider`);
  }
  return context;
};
