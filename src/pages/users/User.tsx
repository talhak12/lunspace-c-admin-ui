import { Breadcrumb, Button, Drawer, Space, Table } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { data, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../http/api';
import type { User } from '../../types';
import UsersFilters from './UserFilters';
import { useState } from 'react';

const Users = () => {
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
    setDrawerOpen(false);
    //setOpen(false);
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
          title="Basic Drawer"
          closable={{ 'aria-label': 'Close Button' }}
          onClose={onClose}
          open={drawerOpen}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary">Submit</Button>
            </Space>
          }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
