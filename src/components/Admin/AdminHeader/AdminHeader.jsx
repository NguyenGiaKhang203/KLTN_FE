import React from 'react';
import { Select, Avatar, Badge } from 'antd';
import { HomeFilled, BellOutlined, SearchOutlined } from '@ant-design/icons';
import { HeaderWrapper } from './style';

const { Option } = Select;

const ClassPageHeader = ({ title = "Hệ thống" }) => {
  return (
    <HeaderWrapper>
      <div className="left">
        <HomeFilled className="home-icon" />
        <span className="title">{title}</span>
      </div>

      <div className="right">
        <span className="location-label">
          <HomeFilled className="home-icon-inner" />
          Cơ sở số 1
        </span>

        <Select
          defaultValue="2024-2025"
          className="year-select"
          showSearch={false}
          bordered
        >
          <Option value="2023-2024">2023-2024</Option>
          <Option value="2024-2025">2024-2025</Option>
          <Option value="2025-2026">2025-2026</Option>
        </Select>

        <SearchOutlined className="icon" />
        <Badge count={2} size="small">
          <BellOutlined className="icon" />
        </Badge>
        <Avatar style={{ backgroundColor: '#ccc' }}>A</Avatar>
        <span className="username">admin</span>
      </div>
    </HeaderWrapper>
  );
};

export default ClassPageHeader;
