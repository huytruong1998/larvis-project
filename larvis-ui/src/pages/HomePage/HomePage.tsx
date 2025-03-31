import { Col, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import AcquisitionsChart from './AcquisitionsChart/AcquisitionsChart';
import UserList from './UserList/UserList';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <Content className={styles.homeContainer}>
      <Row
        justify="space-between"
        gutter={[16, 32]}
        style={{
          maxWidth: 1440,
          margin: '0 auto', // centers the inner div horizontally
          width: '100%',
        }}
      >
        <Col xs={24} md={24} lg={8} style={{ margin: 0 }}>
          {/* <ProfileCard /> */}
          <UserList />
        </Col>
        <Col xs={24} md={24} lg={16} style={{ margin: 0 }}>
          <AcquisitionsChart />
        </Col>
      </Row>
    </Content>
  );
}

export default HomePage;
