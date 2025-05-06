import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: ReactNode;
  isAuthenticated: boolean;
}
const ProtectedRoute = ({ element, isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? element : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
