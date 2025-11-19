import './styles/null.css';
import './styles/global.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className='wrapper'>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
