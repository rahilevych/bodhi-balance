import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isAuthenticated: boolean;
  token: string | null;
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem('token'))
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        token,
        openModal,
        closeModal,
        isModalOpen,
        login,
        logout,
      }}>
      {children}
    </AppContext.Provider>
  );
};
