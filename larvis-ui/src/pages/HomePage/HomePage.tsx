import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { AcquisitionsChart } from './AcquisitionsChart/AcquisitionsChart';
import { UserList } from './UserList/UserList';

export const HomePage: React.FC = () => {
  return (
    <Content
      style={{ padding: '24px', minHeight: '100vh', background: 'rgba(200, 200, 200, 0.03)' }}
    >
      <Row
        justify="space-between"
        gutter={[16, 32]}
        style={{
          maxWidth: 1440,
          margin: '0 auto', // centers the inner div horizontally
          width: '100%',
        }}
      >
        <Col xs={24} md={24} lg={8}>
          {/* <ProfileCard /> */}
          <UserList />
        </Col>
        <Col xs={24} md={24} lg={16}>
          <AcquisitionsChart />
        </Col>
      </Row>
    </Content>
  );
};
