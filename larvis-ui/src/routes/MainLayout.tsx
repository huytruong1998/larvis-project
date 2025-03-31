import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from 'src/components/NavBar/NavBar';

function MainLayout() {
  return (
    <Layout>
      <NavBar />
      <Outlet />
    </Layout>
  );
}

export default MainLayout;
