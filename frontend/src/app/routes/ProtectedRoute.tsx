import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useProfile } from '../../features/auth/hooks/useProfile';
import { useAppContext } from '../../context/AppContext';

interface ProtectedRouteProps {
  element: ReactNode;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { data: user } = useProfile();
  const { token } = useAppContext();

  return user && token ? element : <Navigate to='/auth' replace />;
};

export default ProtectedRoute;
