import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/authContext';

function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (location.pathname === '/login') {
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
