import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useProfile } from '../../features/auth/hooks/useProfile';

interface ProtectedRouteProps {
  element: ReactNode;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { data: user } = useProfile();
  return user ? element : <Navigate to='/auth' replace />;
};

export default ProtectedRoute;
