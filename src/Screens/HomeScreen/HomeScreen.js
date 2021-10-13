import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { checkToken, logOut } from "../../redux/actions";
import { Row, Col } from "antd";
import "./styles.css";
import ActiveFriends from "../../Components/LayoutComponenets/ActiveFriends";
import ChatList from "../../Components/LayoutComponenets/ChatList";
import Conversation from "../../Components/LayoutComponenets/Coversation";
import FollowTabs from "../../Components/LayoutComponenets/Follow";
import Profile from "../../Components/LayoutComponenets/Profile";
import {io} from 'socket.io-client'
import { Spin } from "antd";
const MemoHomeScreen = ({ checkToken, userId }) => {

  const [socket,setSocket] = useState(null)

  useEffect(()=>{
    if(userId){
      setSocket(io('https://chatarena-server.herokuapp.com'))
    }
  },[userId])
 
  useEffect(() => {
    if (userId && socket) {
      socket.emit("onlineUser", userId);
    }
  }, [socket,userId]);

  useEffect(() => {
    if(!userId){
      checkToken();
    }
  }, [userId,checkToken]);
  return (
    <div className=" homemaincontainer">
      {userId && socket ? (
        <Row className="secondcontainer" gutter={16}>
          <Col
            xs={24}
            sm={24}
            md={24}
            xxl={6}
            lg={6}
            className="height-handler d-flex flex-column justify-content-center align-items-center"
          >
            <ActiveFriends socket={socket}/>
            <ChatList />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            xxl={13}
            lg={13}
            className="height-handler d-flex justify-content-center align-items-center"
          >
            <Conversation />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={5}
            xxl={5}
            className="height-handler flex-column d-flex justify-content-center align-items-center"
          >
            <FollowTabs socket={socket}/>
            <Profile socket={socket}/>
          </Col>
        </Row>
      ) : (
        <Spin size="large"/>
      )}
    </div>
  );
};

function routerPropsChange (prevProps,nextProps){
  return (prevProps.location !== nextProps.location || prevProps.match !== nextProps.match)
}

const HomeScreen = React.memo(MemoHomeScreen, routerPropsChange)

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};
export default connect(mapStateToProps, { checkToken, logOut })(HomeScreen);
