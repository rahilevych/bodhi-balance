import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface ProtectedRouteProps {
  element: ReactNode;
  isAuthenticated: boolean;
}
const ProtectedRoute = ({ element, isAuthenticated }: ProtectedRouteProps) => {
  const { isLoading } = useAppContext();
  // if (isLoading) return null;
  return isAuthenticated ? element : <Navigate to='/' replace />;
};

export default ProtectedRoute;
