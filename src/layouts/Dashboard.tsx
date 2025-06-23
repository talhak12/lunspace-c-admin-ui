import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';

import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';

import Sider from 'antd/es/layout/Sider';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Menu, theme } from 'antd';
import { useState } from 'react';
import Logo from '../components/icons/Logo';

const items = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: <NavLink to="/users">User</NavLink>,
  },
  {
    key: '/restaurants',
    icon: <UserOutlined />,
    label: <NavLink to="/restaurants">Restaurants</NavLink>,
  },
  {
    key: '/products',
    icon: <UserOutlined />,
    label: <NavLink to="/products">Products</NavLink>,
  },
  {
    key: '/promos',
    icon: <UserOutlined />,
    label: <NavLink to="/promos">Promos</NavLink>,
  },
];

const Dashboard = () => {
  const { user } = useAuthStore();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  if (user == null) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh', background: colorBgContainer }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <Logo />
          </div>

          <Menu
            theme="light"
            defaultSelectedKeys={['/']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#FFFF' }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[{ title: 'User' }, { title: 'Bill' }]}
            />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                //borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
