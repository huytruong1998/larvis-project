import React from 'react';
import { NavBar } from '@/components/NavBar/NavBar';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ProfileCard } from '@/components/ProfileCard/ProfileCard';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: '24px', minHeight: '100vh', background: '#fff' }}>
        <>
          <Row>
            <Col span={8}>
              <ProfileCard />
            </Col>
            <Col span={16}>col-16</Col>
          </Row>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={16}>col-16</Col>
          </Row>
        </>
      </Content>
    </Layout>
  );
};
