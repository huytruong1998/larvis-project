import { useEffect } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useLoginUser from 'src/api/hooks/auth';
import styles from './LoginPage.module.css';

const { Title } = Typography;

type FormInputs = {
  userId: string;
  password: string;
};

function LoginPage() {
  const { mutate: loginUser, isPending, isError, error } = useLoginUser();

  const [loginForm] = Form.useForm();
  const onFinish = (inputs: FormInputs) => {
    loginUser({ user_id: inputs.userId, password: inputs.password });
  };

  useEffect(() => {
    if (isError && error.status === 401) {
      const invalidInputError = 'Invalid username and password';
      loginForm.setFields([
        {
          name: 'userId',
          errors: [invalidInputError],
        },
        {
          name: 'password',
          errors: [invalidInputError],
        },
      ]);
    }
  }, [error, isError, loginForm]);

  return (
    <div className={styles.loginPageContainer}>
      <Card className={styles.loginPageCard}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form
          form={loginForm}
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="User ID"
            name="userId"
            rules={[{ required: true, message: 'Enter your User ID' }]}
          >
            <Input
              data-testid="user-id-input"
              prefix={<UserOutlined />}
              placeholder="Enter User ID"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Enter your password' }]}
          >
            <Input.Password
              data-testid="password-input"
              prefix={<LockOutlined />}
              placeholder="Enter password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              data-testid="login-button"
              type="primary"
              htmlType="submit"
              block
              loading={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
