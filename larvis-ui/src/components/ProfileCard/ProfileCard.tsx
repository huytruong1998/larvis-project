import { Card, Avatar, Typography, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './ProfileCard.css';

const { Text } = Typography;

export const ProfileCard = () => {
  //   const { userId } = useAuthContext;
  return (
    <Card
      style={{
        minWidth: 200,
        margin: 'auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
      variant="borderless"
    >
      <div className="profile-button-wrapper">
        <Button type="primary" size="small">
          My Profile
        </Button>
      </div>

      {/* Profile Picture */}
      <div className="profile-avatar">
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

      <div className="responsive-buttons">
        <Button type="default">Edit</Button>
        <Button type="primary">Update</Button>
      </div>
    </Card>
  );
};
