import { useAuthContext } from '@/contexts/authContext';
import { Button, Modal } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

import styles from './NavBar.module.css';
import { useState } from 'react';
import { ProfileCard } from '@/components/ProfileCard/ProfileCard';

export const NavBar = () => {
  const { logout, currentUserId } = useAuthContext();
  const [openMyProfile, setOpenMyProfile] = useState<boolean>(false);
  return (
    <>
      <Header className={styles.navbarHeader}>
        <Title level={2} style={{ color: 'rgb(24, 144, 255)' }}>
          Larvis
        </Title>

        <div className={styles.navbarActions}>
          <Button
            icon={<UserOutlined />}
            onClick={() => setOpenMyProfile(true)}
            style={{ marginRight: 8 }}
          >
            My Profile
          </Button>

          <Button type="primary" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        </div>
      </Header>
      <Modal
        open={!!openMyProfile}
        onCancel={() => setOpenMyProfile(false)}
        destroyOnClose
        footer={null}
        centered
        className="custom-ant-modal"
      >
        {currentUserId && <ProfileCard userId={currentUserId} />}
      </Modal>
    </>
  );
};
