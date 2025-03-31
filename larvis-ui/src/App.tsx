import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import { AuthContextProvider } from 'src/contexts/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from 'src/routes/AppRoutes';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
