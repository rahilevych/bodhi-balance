import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../../layouts/header/components/header/Header';
import Landing from '../../pages/landing/Landing';
import { NotFound } from '../../pages/404/NotFound';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../../pages/profile/Profile';
import { Success } from '../../pages/success/Success';
import { Cancel } from '../../pages/cancel/Cancel';
import DetailedPage from '../../pages/detailed-info/DetailedPage';
import Footer from '../../layouts/footer/components/footer/Footer';
import { AuthPage } from '../../pages/auth/AuthPage';

export const AppRoutes = () => {
  const location = useLocation();

  const hideLayout = ['/success', '/cancel', '/auth'].includes(
    location.pathname,
  );
  return (
    <>
      {!hideLayout && <Header />}
      <main>
        {' '}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route
            path='/profile'
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path='/success'
            element={<ProtectedRoute element={<Success />} />}
          />
          <Route
            path='/cancel'
            element={<ProtectedRoute element={<Cancel />} />}
          />

          <Route
            path='/detailed/training/:id'
            element={<ProtectedRoute element={<DetailedPage />} />}
          />
          <Route
            path='/detailed/plan/:id'
            element={<ProtectedRoute element={<DetailedPage />} />}
          />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
};
