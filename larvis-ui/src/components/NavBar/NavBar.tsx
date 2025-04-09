import { Button, Modal } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

import { useState } from 'react';
import { useAuthContext } from 'src/contexts/authContext';
import ProfileCard from 'src/components/ProfileCard/ProfileCard';
import styles from './NavBar.module.css';

export default function NavBar() {
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
            data-testid="my-profile-button"
            icon={<UserOutlined />}
            onClick={() => setOpenMyProfile(true)}
            style={{ marginRight: 8 }}
          >
            My Profile
          </Button>

          <Button
            data-testid="logout-button"
            type="primary"
            icon={<LogoutOutlined />}
            onClick={logout}
          >
            Log out
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
}
