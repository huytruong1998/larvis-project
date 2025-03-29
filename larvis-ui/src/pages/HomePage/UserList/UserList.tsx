import { useGetUsers } from '@/api/hooks/user';
import { Card, Typography, List, Spin, Alert } from 'antd';

const { Title, Text } = Typography;

type User = {
  name: string;
  user_id: string;
};

export const UserList = () => {
  const { data: userData, isPending, isError, error } = useGetUsers();

  return (
    <div
      style={{
        maxWidth: '1000px',
        minWidth: '300px',
        margin: '0 auto',
        padding: '24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
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
            <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
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
    </div>
  );
};
