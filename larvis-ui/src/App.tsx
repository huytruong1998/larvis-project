import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import 'antd/dist/reset.css';
import { AuthContextProvider } from '@/contexts/authContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
