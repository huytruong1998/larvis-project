import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/NavBar/NavBar';
import { Layout } from 'antd';

export const MainLayout = () => {
  return (
    <Layout>
      <NavBar />
      <Outlet />
    </Layout>
  );
};
