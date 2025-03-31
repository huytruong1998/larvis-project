import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'src/pages/HomePage/HomePage';
import LoginPage from 'src/pages/LoginPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from './MainLayout';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>

      {/* Catch-all: redirect to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
