import {
  Layout,
  Card,
  Space,
  Form,
  Input,
  Checkbox,
  Button,
  Flex,
  Alert,
} from 'antd';
import { LockFilled, UserOutlined, LockOutlined } from '@ant-design/icons';

import Logo from '../../components/icons/Logo';
import { useMutation } from '@tanstack/react-query';

import type { Credentials } from '../../types';
import { login } from '../../http/api';

const loginUser = async (userData: Credentials) => {
  //console.log(userData.email);
  //console.log(userData.password);
  const { data } = await login(userData);
  return data;
};

const LoginPage = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      console.log('Login successful');
    },
  });

  return (
    <>
      <Layout
        style={{ height: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 300 }}
            title={
              <Space
                style={{
                  width: '100%',
                  fontSize: 16,
                  justifyContent: 'center',
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form
              initialValues={{ remember: true, username: 'test' }}
              onFinish={(values) => {
                mutate({ email: values.username, password: values.password });
                console.log(values);
              }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your user name',
                  },
                  {
                    type: 'email',
                    message: 'Email is not valid',
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="" id="login-form-forgot">
                  Forgot Password
                </a>
              </Flex>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={isPending}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
