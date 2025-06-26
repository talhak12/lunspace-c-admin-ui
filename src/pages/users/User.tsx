import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createUsers, getUsers } from '../../http/api';

import type { CreateUserData } from '../../types';

import UsersFilters from './UserFilters';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import UserForm from './forms/UserForm';

const Users = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const logoutUser = async () => {
    const { data } = await getUsers();
    console.log('Users data:', data.user);
    return data;
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: logoutUser,
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'firstName' + ' ' + 'lastName',
      render: (text: string, record: User) =>
        `${record.firstName} ${record.lastName}`,
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    form.resetFields();
    setDrawerOpen(false);
    //setOpen(false);
  };

  const createUser = async (userData: CreateUserData) => {
    const { data } = await createUsers(userData);
    return data;
    //console.log('gando' + userData);
  };

  const { mutate: createUserMutate } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return;
    },
  });

  const onHandleSubmit = async () => {
    //await form.validateFields();
    //console.log('Form submitted:', form.getFieldsValue());
    createUserMutate(form.getFieldsValue());
    setDrawerOpen(false);
    form.resetFields();
    //console.log('Form reset');
  };

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Breadcrumb
          separator={<RightOutlined />}
          items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
        />

        <UsersFilters
          onFilterChange={(filterName: string, filterValue: string) => {
            console.log(`Filter changed: ${filterName} = ${filterValue}`);
          }}
        >
          <Button
            onClick={showDrawer}
            type="primary"
            size="large"
            style={{ width: 150 }}
          >
            <PlusOutlined />
            Add User1
          </Button>
        </UsersFilters>

        {data && data.user && (
          <Table dataSource={data.user} columns={columns} rowKey={'id'} />
        )}

        <Drawer
          title="Create User"
          width={720}
          styles={{
            body: { backgroundColor: colorBgLayout },
          }}
          closable={{ 'aria-label': 'Close Button' }}
          onClose={onClose}
          open={drawerOpen}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={onHandleSubmit}>
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form} hideRequiredMark>
            <UserForm />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
