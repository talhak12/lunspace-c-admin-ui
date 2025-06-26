import { Card, Col, Form, Input, Row, Select } from 'antd';
import { getTenants } from '../../../http/api';
import { useQuery } from '@tanstack/react-query';
import { Tenant } from '../../../types';

const UserForm = () => {
  const getTenants1 = async () => {
    const { data } = await getTenants();
    console.log('Tenant data:', data);
    return data;
  };

  const { data } = useQuery<Tenant[]>({
    queryKey: ['tenants'],
    queryFn: getTenants1,
  });

  return (
    <Row>
      <Col span={24}>
        <Card title="Basic Info" bordered={false}>
          {/* User form content goes here */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastName">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        //
        <Card title="Security Info" bordered={false}>
          {/* User form content goes here */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Password" name="password">
                <Input size="large" type="password" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        //
        <Card title="Role" bordered={false}>
          {/* User form content goes here */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Role" name="role">
                <Select
                  allowClear={true}
                  onChange={() => {}}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'role', label: 'Role' },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Tenant" name="tenant">
                <Select
                  allowClear={true}
                  onChange={() => {}}
                  style={{ width: '100%' }}
                  options={
                    data?.map((tenant: Tenant) => ({
                      value: tenant.id,
                      label: tenant.name,
                    })) || []
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserForm;
// This component can be used to create or edit user details.
