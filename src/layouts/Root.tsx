import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';
import { useQuery } from '@tanstack/react-query';
import { self } from '../http/api';
import { AxiosError } from 'axios';

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status == 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    //return <div>Loading ...</div>;
  }

  return <Outlet />;
};

export default Root;
