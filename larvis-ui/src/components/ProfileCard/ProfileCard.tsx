import { Avatar, Typography, Input, Button, Spin, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './ProfileCard.css';
import { useGetUserById, useUpdateUser } from '@/api/hooks/user';
import { useAuthContext } from '@/contexts/authContext';
import { useEffect, useState } from 'react';
import { User } from '@/type/user';

const { Text } = Typography;

export const ProfileCard = ({ userId }: { userId: string }) => {
  const { data: userData, isPending, isError, error } = useGetUserById(userId);
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const { currentUserId } = useAuthContext();

  const [formData, setFormData] = useState<User>({
    user_id: userId,
    name: '' as string,
    password: '' as string,
  });

  const handleUpdate = () => {
    if (JSON.stringify(formData) !== JSON.stringify(userData)) {
      updateUser(formData);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        name: userData.name || '',
        password: userData.password || '',
      });
    }
  }, [userData]);

  const isCurrentUser = currentUserId === userData?.user_id;
  return (
    <div className="profile-container">
      {isPending && <Spin spinning={isPending} />}

      {isError && (
        <Alert
          message={'Error loading Profile data: ' + (error?.message || 'Undefined')}
          type="error"
          showIcon
        />
      )}

      {!isPending && !isError && (
        <div className="profile-content">
          {/* Avatar */}
          <div className="profile-avatar">
            <Avatar size={80} icon={<UserOutlined />} />
          </div>

          {/* User Data display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <Text strong>User ID</Text>
              <Input value={formData.user_id} disabled />
            </div>

            <div>
              <Text strong>Name</Text>
              <Input
                value={formData.name}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {isCurrentUser && (
              <div>
                <Text strong>Password</Text>
                <Input.Password
                  value={formData.password}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            )}
          </div>

          {isCurrentUser && (
            <div className="responsive-buttons">
              <Button type="primary" disabled={isEditing} onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button
                type="primary"
                disabled={!isEditing || isUpdatingUser}
                onClick={handleUpdate}
                loading={isUpdatingUser}
              >
                Update
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
