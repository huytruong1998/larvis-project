import { Card, Avatar, Typography, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuthContext } from '@/contexts/authContext';

const { Text } = Typography;

export const ProfileCard = () => {
  //   const { userId } = useAuthContext;
  return (
    <Card
      style={{
        height: 400,
        minWidth: 200,
        margin: 'auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
      bordered={false}
    >
      <Button
        type="primary"
        size="small"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        My Profile
      </Button>
      {/* Profile Picture */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar size={80} icon={<UserOutlined />} />
      </div>

      {/* Form-style Display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text strong>User ID</Text>
          <Input value={'user id'} disabled />
        </div>

        <div>
          <Text strong>Name</Text>
          <Input value={'user name'} disabled />
        </div>

        <div>
          <Text strong>Password</Text>
          <Input.Password value={'password'} disabled />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // or 'center' if you prefer
          gap: 12,
          marginTop: 24,
        }}
      >
        <Button type="default">Edit</Button>
        <Button type="primary">Update</Button>
      </div>
    </Card>
  );
};
