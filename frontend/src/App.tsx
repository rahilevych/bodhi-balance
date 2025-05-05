import './App.css';
import './styles/null.css';
import './styles/global.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Landing from './pages/LandingPage/Landing';
import Booking from './pages/BookingPage/Booking';
import Header from './components/Header/Header';
import Login from './pages/LoginPage/Login';
import Registration from './pages/RegistrationPage/Registration';
import Profile from './pages/ProfilePage/Profile';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider, useAppContext } from './context/AppContext';

function App() {
  const { isAuthenticated } = useAppContext();
  return (
    <AppProvider>
      <BrowserRouter>
        <div className='wrapper'>
          <Header />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
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
    </AppProvider>
  );
}

export default App;
