import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {HomePage} from '@/pages/HomePage/HomePage'
import { LoginPage } from '@/pages/LoginPage/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;