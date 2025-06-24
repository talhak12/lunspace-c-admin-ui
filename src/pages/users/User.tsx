import { Breadcrumb } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { data, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../http/api';
import type { User } from '../../types';

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
  return (
    <>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Users' }]}
      />

      {data && data.user && (
        <div>
          <h2>Users</h2>
          <ul>
            {data.user.map((user: User) => (
              <li key={user.id}>
                {user.fistName} {user.lastName} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Users;
