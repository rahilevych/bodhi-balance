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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
