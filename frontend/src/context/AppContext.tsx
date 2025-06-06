import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../types/Types';
import { getMe } from '../services/authService';
import { NotificationWindow } from '../components/modal/NotificationWindow';

interface AppContextType {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  notification: string | null;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  color: string;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#5d6d5c');
  const [user, setUser] = useState<User | null>(null);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        console.log(res);
        setUser(res);
        setIsAuthenticated(true);
        console.log(user);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        setIsAuthenticated,
        openModal,
        closeModal,
        isModalOpen,
        isAuthenticated,
        notification,
        setNotification,
        color,
        loading,
      }}>
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
