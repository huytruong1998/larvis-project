import React from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLoginUser } from '@/api/hooks/auth';

const { Title } = Typography;

type FormInputs = {
  username: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const { mutate: loginUser, isPending } = useLoginUser();
  const onFinish = (inputs: FormInputs) => {
    loginUser({ user_id: inputs.username, password: inputs.password });
  };

  return (
    <div style={styles.page}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Enter your username' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
  } as React.CSSProperties,
  card: {
    width: 350,
    padding: 24,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
};
