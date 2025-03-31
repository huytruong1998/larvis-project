import { Avatar, Typography, Input, Button, Spin, Alert, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './ProfileCard.module.css';
import { useGetUserById, useUpdateUser } from '@/api/hooks/user';
import { useAuthContext } from '@/contexts/authContext';
import { useEffect, useState } from 'react';
import { User } from '@/type/user';

export const ProfileCard = ({ userId }: { userId: string }) => {
  const { data: userData, isPending, isError, error } = useGetUserById(userId);
  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const { currentUserId } = useAuthContext();

  const [userForm] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUpdate = (formData: User) => {
    if (JSON.stringify(formData) !== JSON.stringify(userData)) {
      updateUser(formData);
    }
    setIsEditing(false);
    setPasswordVisible(false);
  };

  useEffect(() => {
    if (userData) {
      userForm.setFieldsValue({
        user_id: userData.user_id,
        name: userData.name || '',
        password: userData.password || '',
      });
    }
  }, [userData]);

  const isCurrentUser = currentUserId === userData?.user_id;
  return (
    <div className={styles.profileContainer}>
      {isPending && <Spin spinning={isPending} />}

      {isError && (
        <Alert
          message={'Error loading Profile data: ' + (error?.message || 'Undefined')}
          type="error"
          showIcon
        />
      )}

      {!isPending && !isError && (
        <div className={styles.profileContent}>
          {/* Avatar */}
          <div className={styles.profileAvatar}>
            <Avatar size={80} icon={<UserOutlined />} />
          </div>

          {/* User Data display */}
          <Form form={userForm} layout="vertical" onFinish={handleUpdate}>
            <Form.Item label="User ID" name="user_id">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input disabled={!isEditing} />
            </Form.Item>

            {isCurrentUser && (
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  disabled={!isEditing}
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
            )}

            {isCurrentUser && (
              <div className={styles.responsiveButtons}>
                <Button type="primary" disabled={isEditing} onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdatingUser}
                  disabled={!isEditing || isUpdatingUser}
                >
                  Update
                </Button>
              </div>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};
