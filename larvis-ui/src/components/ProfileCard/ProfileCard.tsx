import { Card, Avatar, Typography, Input, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './ProfileCard.css';

const { Text } = Typography;

export const ProfileCard = ({ userId }: { userId: string }) => {
  //   const { userId } = useAuthContext;
  return (
    <div className="profile-container">
      <div className="profile-content">
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
      </div>
    </div>
  );
};
