import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useProfile } from '../../features/auth/hooks/useProfile';
import { Loader } from '../../shared/ui/loader/Loader';

interface ProtectedRouteProps {
  element: ReactNode;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { data: user, isPending } = useProfile();
  if (isPending) return <Loader />;
  return user ? element : <Navigate to='/auth' replace />;
};

export default ProtectedRoute;
