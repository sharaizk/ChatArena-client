import React from "react";
import "./styles.css";
import { Divider, Avatar } from "antd";
import {ArrowRightOutlined} from '@ant-design/icons'
const ChatList = () => {
  return (
    <div className="chatlistcontainer">
      <label className="chat-list">Chat List</label>
      <Divider />
      <div className="chatcontainer">
        <div className="chat">
          <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }} />
          <label unselectable="on" className="chat-title">
            Sharaiz_k
          </label>
          <ArrowRightOutlined />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
