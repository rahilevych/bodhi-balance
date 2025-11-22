import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Header from '../../layouts/header/components/header/Header';
import Landing from '../../pages/landing/Landing';
import { NotFound } from '../../pages/404/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../../pages/profile/Profile';
import { Success } from '../../pages/success/Success';
import { Cancel } from '../../pages/cancel/Cancel';
import DetailedPage from '../../pages/detailed-info/DetailedPage';
import Footer from '../../layouts/footer/components/footer/Footer';

export const AppRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAppContext();

  const hideLayout = ['/success', '/cancel'].includes(location.pathname);
  return (
    <>
      {!hideLayout && <Header />}
      <main>
        {' '}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='*' element={<NotFound />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={<Profile />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path='/success'
            element={
              <ProtectedRoute
                element={<Success />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path='/cancel'
            element={
              <ProtectedRoute
                element={<Cancel />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path='/detailed/training/:id'
            element={
              <ProtectedRoute
                element={<DetailedPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path='/detailed/plan/:id'
            element={
              <ProtectedRoute
                element={<DetailedPage />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};
