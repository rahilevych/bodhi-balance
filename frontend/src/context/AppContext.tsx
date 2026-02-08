import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

interface AppContextType {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  isMobile: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
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
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [isAuth, setIsAuth] = useState(false);
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
  useEffect(() => {
    if (token !== null) localStorage.setItem('accessToken', token);
    else {
      localStorage.removeItem('accessToken');
    }
  }, [token]);
  return (
    <AppContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
        isMobile,
        token,
        setToken,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
