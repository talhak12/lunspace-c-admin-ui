import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Select, Space } from 'antd';

const UsersFilters = () => {
  return (
    <Card>
      <Row justify={'space-between'}>
        <Col>
          <Row gutter={20} align="middle">
            <Col>
              <Input.Search placeholder="Search" />
            </Col>
            <Col>
              <Select
                allowClear={true}
                //defaultValue="Admin"
                style={{ width: 120 }}
                options={[
                  { value: 'Admin', label: 'Admin' },
                  { value: 'Customer', label: 'Customer' },
                  { value: 'Manager', label: 'Manager' },
                ]}
              />
            </Col>
            <Col>
              <Select
                allowClear={true}
                //defaultValue="Active"
                style={{ width: 120 }}
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Banned', label: 'Banned' },
                ]}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Button type="primary" size="large" style={{ width: 150 }}>
            <PlusOutlined />
            Add User
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
export default UsersFilters;
