import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Select } from 'antd';

type UsersFiltersProps = {
  children?: React.ReactNode;
  onFilterChange?: (filterName: string, filterValue: string) => void;
};

const UsersFilters = ({ onFilterChange, children }: UsersFiltersProps) => {
  return (
    <Card>
      <Row justify={'space-between'}>
        <Col>
          <Row gutter={20} align="middle">
            <Col>
              <Input.Search
                allowClear={true}
                placeholder="Search"
                onChange={(e) => onFilterChange('statusFilter', e.target.value)}
              />
            </Col>
            <Col>
              <Select
                allowClear={true}
                //defaultValue="Admin"
                style={{ width: 120 }}
                onChange={(selectedItem) =>
                  onFilterChange('roleFilter', selectedItem)
                }
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
                onChange={(selectedItem) =>
                  onFilterChange('statusFilter', selectedItem)
                }
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Banned', label: 'Banned' },
                ]}
              />
            </Col>
          </Row>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
};
export default UsersFilters;
