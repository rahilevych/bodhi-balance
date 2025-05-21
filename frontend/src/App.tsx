import './App.css';
import './styles/null.css';
import './styles/global.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Landing from './pages/landing/Landing';
import Booking from './pages/booking/Booking';
import Header from './components/header/Header';
import Profile from './pages/profile/Profile';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppContext } from './context/AppContext';

function App() {
  const { isAuthenticated } = useAppContext();
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
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
            path='/booking'
            element={
              <ProtectedRoute
                element={<Booking />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
