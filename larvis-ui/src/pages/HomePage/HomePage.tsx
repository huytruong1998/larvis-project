import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { UserList } from '@/components/ListUsers/UserList';
import { AcquisitionsChart } from './AcquisitionsChart/AcquisitionsChart';

export const HomePage: React.FC = () => {
  return (
    <Content style={{ padding: '24px', minHeight: '100vh', background: '#fff' }}>
      <Row align="bottom" justify="space-between" gutter={[16, 32]}>
        <Col xs={24} md={8}>
          {/* <ProfileCard /> */}
          <UserList />
        </Col>
        <Col xs={24} md={16}>
          <AcquisitionsChart />
        </Col>
      </Row>
    </Content>
  );
};
