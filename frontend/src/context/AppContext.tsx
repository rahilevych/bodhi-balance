import React, { createContext, useContext, useState, ReactNode } from 'react';

import { useWindowSize } from '../hooks/useWindowSize';
import { NotificationWindow } from '../shared/modal/NotificationWindow';

interface AppContextType {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  notification: string | null;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
  isMobile: boolean;
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const { width } = useWindowSize();
  const isMobile = width < 769;

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
        openModal,
        closeModal,
        isModalOpen,
        notification,
        setNotification,
        isMobile,
      }}
    >
      {children}
      {notification && (
        <NotificationWindow
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </AppContext.Provider>
  );
};
