import { useGetUsers } from '@/api/hooks/user';
import { ProfileCard } from '@/components/ProfileCard/ProfileCard';
import { Card, Typography, List, Spin, Alert, Modal } from 'antd';
import { useState } from 'react';
import './UserList.css';

const { Title, Text } = Typography;

export const UserList = () => {
  const { data: userData, isPending, isError, error } = useGetUsers();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  return (
    <div className="user-list-container">
      <Title level={2} className="user-list-title">
        User List
      </Title>
      {isPending && <Spin spinning={isPending} />}

      {isError && (
        <Alert
          message={'Error loading Acquisitions data: ' + (error?.message || 'Undefined')}
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
            <List.Item className="user-list-item" onClick={() => setSelectedUserId(user.user_id)}>
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
        footer={null}
        centered
        className="custom-modal"
      >
        {selectedUserId && <ProfileCard userId={selectedUserId} />}
      </Modal>
    </div>
  );
};
