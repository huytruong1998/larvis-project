import React from 'react';
import { NavBar } from '@/components/NavBar/NavBar';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ProfileCard } from '@/components/ProfileCard/ProfileCard';
import { TimeSeriesChart } from '@/components/TimeSeriesChart/TimeSeriesChart';

export const HomePage: React.FC = () => {
  return (
    <Content style={{ padding: '24px', minHeight: '100vh', background: '#fff' }}>
      <Row align="bottom" justify="space-between" gutter={[16, 32]}>
        <Col xs={24} md={8}>
          <ProfileCard />
        </Col>
        <Col xs={24} md={16}>
          <TimeSeriesChart />
        </Col>
      </Row>
    </Content>
  );
};
