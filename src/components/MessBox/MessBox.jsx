import React from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { MessBoxWrapper, CircleButton } from './style';

const MessBox = () => {
  const handleClick = () => {
    alert('Bạn đã nhấn vào MessBox!');
  };

  return (
    <MessBoxWrapper>
      <CircleButton onClick={handleClick}>
        <MessageOutlined />
      </CircleButton>
    </MessBoxWrapper>
  );
};

export default MessBox;