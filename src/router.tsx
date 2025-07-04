import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';

import Users from './pages/users/User';
import LoginPage from './pages/login/login';
import Dashboard from './layouts/Dashboard';
import NonAuth from './layouts/NonAuth';
import Root from './layouts/Root';
import Products from './pages/products/products';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/products',
            element: <Products />,
          },
        ],
      },

      {
        path: '/auth',
        element: <NonAuth />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
