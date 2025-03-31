import { useGetUsers } from '@/api/hooks/user';
import { ProfileCard } from '@/components/ProfileCard/ProfileCard';
import { Card, Typography, List, Spin, Alert, Modal } from 'antd';
import { useState } from 'react';
import styles from './UserList.module.css';

const { Title, Text } = Typography;

export const UserList = () => {
  const { data: userData, isPending, isError, error } = useGetUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  return (
    <div className={styles.userListContainer}>
      <Title level={2} className={styles.userListTitle}>
        User List
      </Title>
      {isPending && <Spin spinning={isPending} />}

      {isError && (
        <Alert
          message={'Error loading Users data: ' + (error?.message || 'Undefined')}
          type="error"
          showIcon
        />
      )}

      {!isPending && !isError && (
        <List
          grid={{
            gutter: 16,
            column: 1,
          }}
          split={false}
          dataSource={userData}
          renderItem={(user) => (
            <List.Item
              className={styles.userListItem}
              onClick={() => setSelectedUserId(user.user_id)}
            >
              <Card
                hoverable
                style={{
                  width: '100%',
                  maxWidth: 800,
                }}
                styles={{
                  body: {
                    padding: '12px 16px',
                  },
                }}
              >
                <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                  {user.name}
                </Title>
                <Text type="secondary" style={{ margin: 0 }}>
                  ID: {user.user_id}
                </Text>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        open={!!selectedUserId}
        onCancel={() => setSelectedUserId(null)}
        destroyOnClose
        footer={null}
        centered
      >
        {selectedUserId && <ProfileCard userId={selectedUserId} />}
      </Modal>
    </div>
  );
};
