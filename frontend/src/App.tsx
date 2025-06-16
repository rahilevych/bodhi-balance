import './styles/null.css';
import './styles/global.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import DetailedPage from './pages/detailed-info/DetailedPage';
import Header from './components/Header/Header';
import Profile from './pages/profile/Profile';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppContext } from './context/AppContext';

function App() {
  const { isAuthenticated } = useAppContext();
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <main>
          {' '}
          <Routes>
            <Route path='/' element={<Landing />} />
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
