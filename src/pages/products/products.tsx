import React from 'react';

import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb, Flex, Space } from 'antd';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex justify="space-between">
          <Breadcrumb
            separator={<RightOutlined />}
            items={[
              { title: <Link to="/">Dashboard</Link> },
              { title: 'Products' },
            ]}
          />
        </Flex>
      </Space>
    </>
  );
};

export default Products;
