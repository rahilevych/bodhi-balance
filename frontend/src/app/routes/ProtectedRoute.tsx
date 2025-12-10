import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useProfile } from '../../features/auth/hooks/useProfile';
import { Loader } from '../../shared/ui/loader/Loader';
import { useAppContext } from '../../context/AppContext';

interface ProtectedRouteProps {
  element: ReactNode;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { data: user, isPending } = useProfile();
  const { token } = useAppContext();
  if (isPending) return <Loader />;
  return user && token ? element : <Navigate to='/auth' replace />;
};

export default ProtectedRoute;
