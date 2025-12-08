import '../styles/null.css';
import '../styles/global.css';
import { AppRoutes } from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='wrapper'>
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
