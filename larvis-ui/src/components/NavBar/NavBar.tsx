import { useAuthContext } from '@/contexts/authContext';
import { Button, Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { LogoutOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import './NavBar.css';

export const NavBar = () => {
  const { logout } = useAuthContext();
  return (
    <Layout>
      <Header className="navbar-header">
        <Title level={2}>Larvis</Title>

        <Button type="primary" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Button>
      </Header>
    </Layout>
  );
};
