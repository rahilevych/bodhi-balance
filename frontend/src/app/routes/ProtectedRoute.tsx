import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: ReactNode;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');

  return token ? element : <Navigate to='/auth' replace />;
};

export default ProtectedRoute;
