import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface ProtectedRouteProps {
  element: ReactNode;
}
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuth } = useAppContext();

  return isAuth ? element : <Navigate to='/auth' replace />;
};

export default ProtectedRoute;
