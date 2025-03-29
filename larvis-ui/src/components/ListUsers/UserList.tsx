import { Card, Typography, List } from 'antd';

const { Title, Text } = Typography;

type User = {
  name: string;
  userId: string;
};

const users: User[] = [
  { name: 'Alice Johnson', userId: 'U00123' },
  { name: 'Bob Smith', userId: 'U00456' },
  { name: 'Charlie Davis', userId: 'U00789' },
];

export const UserList = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        User List
      </Title>
      <List
        grid={{
          gutter: 16,
          column: 1,
        }}
        split={false}
        dataSource={users}
        renderItem={(user) => (
          <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '100%', maxWidth: 400 }} bodyStyle={{ padding: '12px 16px' }}>
              <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                {user.name}
              </Title>
              <Text type="secondary" style={{ margin: 0 }}>
                ID: {user.userId}
              </Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
