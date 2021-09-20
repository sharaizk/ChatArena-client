import React,{useEffect} from "react";
import { Tabs } from "antd";
import "./styles.css";
import { UserOutlined, UsergroupAddOutlined,SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import Friends from "./Friends";
import AddFriend from "./AddFriend";
import { connect } from 'react-redux';
import { getRequests } from "../../../redux/actions";
const FollowTabs = ({socket,getRequests,currentUserId}) => {

  useEffect(() => {
    getRequests(currentUserId);
    socket.on('requestArrived', async () => {
      notification.open({
        message: "Yayyyyyyyy",
        description: "You have received a new request, go check it out",
        icon: <SmileOutlined style={{ color: "#52C41A" }} />,
      });
      getRequests(currentUserId);
    });
  }, [currentUserId,getRequests,socket])

  const { TabPane } = Tabs;
  return (
    <div className="follow-tab-container">
      <Tabs
        defaultActiveKey="1"
        centered
        style={{ height: "fit-content", width: "100%" }}
      >
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Friends
            </span>
          }
          key="1"
        >
          <Friends socket={socket}/>
        </TabPane>
        <TabPane
          tab={
            <span>
                <UsergroupAddOutlined />
                Add Friend
            </span>
          }
          key="2"
        >
          <AddFriend />
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
  };
};

export default connect(mapStateToProps,{getRequests})(FollowTabs);
