import React from "react";
import { Avatar, Typography, Button } from "antd";
import "./styles.css";
import { connect } from "react-redux";
import Lottie from "react-lottie-player";
import usernotfound from "../../../resources/lottie/usernotfound.json";
import { searchedUserVariant, searchUserChildren } from "../../../Transitions";
import { motion } from "framer-motion";
import { sendRequest } from "../../../redux/actions";
const UserList = ({ users, currentUserId, sendRequest, friendList }) => {
  const onSendRequest = async (userId) => {
    await sendRequest(userId, currentUserId);
  };

  const RenderButton = (userId) => {
    if(currentUserId !== userId.userId){
      if(!friendList.some(friend=> friend._id === userId.userId)){
        return(
          <Button
          onClick={() => onSendRequest(userId.userId)}
          type="primary"
          className="add-btn"
        >
          Add Friend
        </Button>
        )
      }
      else{
        return <Typography.Text type="secondary">Friend</Typography.Text>
      }
    }
    else{
     return <Typography.Text type="secondary">You</Typography.Text>
    }
  };

  const renderUser = () => {
    return users.map((user) => {
      return (
        <motion.div
          variants={searchedUserVariant}
          initial="visible"
          className="row d-flex justify-content-spacebetween align-items-center"
          key={user._id}
        >
          <motion.div
            variants={searchUserChildren}
            initial="hidden"
            animate="visible"
            className="col-12 col-sm-3 col-lg-12 col-xl-3"
          >
            <Avatar className="searched-avatar" src={user.profilepic} />
          </motion.div>
          <motion.div
            variants={searchUserChildren}
            initial="hidden"
            animate="visible"
            className="col-12 col-sm-5 col-lg-12 col-xl-4"
          >
            <Typography.Text>{user.username}</Typography.Text>
          </motion.div>
          <motion.div
            variants={searchUserChildren}
            initial="hidden"
            animate="visible"
            className="col-12 col-sm-4 col-lg-12 col-xl-5"
          >
                      <RenderButton userId ={user._id}/>
          </motion.div>
        </motion.div>
      );
    });
  };

  return (
    <div className="searched-user-container">
      {users.length > 0 ? (
        renderUser()
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <Lottie
            loop
            animationData={usernotfound}
            play
            className="usernotfound-animation"
          />
          <label>USER NOT FOUND</label>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    friendList: state.auth.friends,
  };
};

export default connect(mapStateToProps, { sendRequest })(UserList);
