import { Breadcrumb, Space, Table } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { data, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../http/api';
import type { User } from '../../types';
import UsersFilters from './UserFilters';

const Users = () => {
  const logoutUser = async () => {
    const { data } = await getUsers();
    console.log('Users data:', data.user);
    return data;
  };

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
        />

        {data && data.user && (
          <Table dataSource={data.user} columns={columns} rowKey={'id'} />
        )}
      </Space>
    </>
  );
};

export default Users;
