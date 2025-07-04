import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  theme,
} from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createUsers, getUsers } from '../../http/api';

import type { CreateUserData, FieldData, User } from '../../types';

import UsersFilters from './UserFilters';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import UserForm from './forms/UserForm';
import { PER_PAGE } from '../../constants';
import { debounce, set } from 'lodash';
import React from 'react';

const Users = () => {
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const queryClient = useQueryClient();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const logoutUser = async () => {
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter((item) => !!item[1])
    );

    const queryString = new URLSearchParams(
      filteredParams as unknown as Record<string, string>
    ).toString();

    console.log('queryString:', queryString);

    const { data } = await getUsers(queryString);
    console.log('data:', data);

    return data;
  };

  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
    sort: 'id',
    order: 'asc',
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setDrawerOpen(true);
      form.setFieldsValue({
        ...currentUser,
        tenant: currentUser.tenant?.id || null,
      });
      //
    } else {
      //form.resetFields();
    }
  }, [currentUser, form]);

  const { data, isFetching } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: logoutUser,
    placeholderData: keepPreviousData,
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

    {
      title: 'Restaurant',
      dataIndex: 'tenant',
      key: 'tenant',
      render: (_text: string, record: User) => {
        return record.tenant ? record.tenant.name : 'N/A';
      },
    },
  ];

  const showDrawer = (p: boolean | null) => {
    if (p) {
      setCurrentUser(null);
    }
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

  const debouncedQUpdate = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({
        ...prev,
        q: value?.toString().toLowerCase(),
        currentPage: 1,
      }));
    }, 1000);
  }, []);

  const onFilterChange = (changedFields: FieldData[]) => {
    console.log('Filter changed:', changedFields);

    const changedFilterFields = changedFields
      .map((item) => ({
        [item.name[0]]: item.value?.toString().toLowerCase(),
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    console.log(changedFilterFields.q);

    if ('q' in changedFilterFields) {
      console.log('d');
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams((prev) => ({
        ...prev,
        ...changedFilterFields,
        currentPage: 1,
      }));
    }
  };

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              { title: <Link to="/">Dashboard</Link> },
              { title: 'Users' },
            ]}
          />

          {isFetching && (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
        </Flex>

        <Form form={filterForm} onFieldsChange={onFilterChange}>
          <UsersFilters>
            <Button
              onClick={() => showDrawer(true)}
              type="primary"
              size="large"
              style={{ width: 150 }}
            >
              <PlusOutlined />
              Add User1
            </Button>
          </UsersFilters>
        </Form>

        {data && data.data && (
          <Table
            pagination={{
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} items`,
              showSizeChanger: true,
              pageSize: queryParams.perPage,
              current: queryParams.currentPage,
              total: data?.total,
              onChange: (page, pageSize) => {
                console.log('Page changed:', page, pageSize);

                setQueryParams({
                  ...queryParams,
                  currentPage: page,
                  perPage: pageSize,
                });
              },
            }}
            dataSource={data?.data}
            columns={[
              ...columns,
              {
                title: 'Actions',
                key: 'actions',
                render: (_text: string, record: User) => (
                  <Space size="middle">
                    <Button
                      type="link"
                      onClick={() => {
                        console.log('record', record);
                        setCurrentUser(record);
                        showDrawer(false);
                      }}
                    >
                      Edit
                    </Button>
                  </Space>
                ),
              },
            ]}
            rowKey={'id'}
          />
        )}

        <Drawer
          title={currentUser != null ? 'Edit User' : 'Current User'}
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
            <UserForm isEdit={currentUser != null ? true : false} />
          </Form>
        </Drawer>
      </Space>
    </>
  );
};

export default Users;
