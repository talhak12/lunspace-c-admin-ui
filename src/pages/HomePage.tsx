import { Flex, Space, Statistic, Typography } from 'antd';
import { useAuthStore } from '../store';
import { ArrowUpOutlined, BellOutlined, LikeOutlined } from '@ant-design/icons';

import Card from 'antd/es/card/Card';
import Bhund from '../components/icons/Bhund';

const { Title } = Typography;

function HomePage() {
  const { user } = useAuthStore();
  const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 120,
    borderRadius: 6,
    border: '1px solid #40a9ff',
  };

  return (
    <Flex vertical>
      <div>
        <Title level={2}>Welcome, {user?.lastName} 😊</Title>
      </div>

      <Flex style={{ padding: 1 }}>
        <Flex vertical>
          <Space direction="vertical">
            <Card
              style={{
                width: '256px',
                height: '117px',
                color: '#000',
                fontFamily: 'sans-serif',
              }}
            >
              <Space>
                <Bhund />

                <p>
                  Total Orders <br />
                  240
                </p>
              </Space>
            </Card>
          </Space>

          <Space style={{ display: 'flex', padding: 1 }}>
            <Card
              title="Card title"
              //variant="borderless"

              style={{ width: 600 }}
            ></Card>
          </Space>
        </Flex>

        <Flex vertical>
          <Space direction="horizontal" style={{ display: 'flex', padding: 1 }}>
            <Card title="Card title" style={{ width: 300 }}></Card>
          </Space>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default HomePage;
