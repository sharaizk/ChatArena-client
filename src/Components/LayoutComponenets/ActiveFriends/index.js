import React, { useState, useEffect } from "react";
import "./styles.css";
import { Divider, Avatar, Badge } from "antd";
import { connect } from "react-redux";
import Lottie from "react-lottie-player";
import NoOnline from "../../../resources/lottie/OnlineFriends.json";
import { motion } from "framer-motion";
import { searchedUserVariant, searchUserChildren } from "../../../Transitions";
const ActiveFriends = ({ socket, friends }) => {
  const [onlineFriends, setOnlineFriends] = useState([]);
  
  useEffect(() => {
    socket.on("getOnlineUser", (users) => {
      setOnlineFriends(
        friends.filter((friend) => users.some((u) => u.userId === friend._id))
      );
    });
  }, [socket, friends]);


  const OnlineUsersMap = () => {
    return onlineFriends.map((oFriend) => {
      return (
        <motion.div variants={searchUserChildren} initial="hidden" animate="visible"  className="info-container" key={oFriend._id}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }}
            src={oFriend.profilepic}
          />
          <label>{oFriend.username}</label>
          <Badge dot status="success"></Badge>
        </motion.div>
      );
    });
  };

  return (
    <div className="activeContainer">
      <label className="online-friends">Online Friends</label>
      <Divider />
      {onlineFriends.length > 0 ? (
        <motion.div
          variants={searchedUserVariant}
          initial="visible"
          className="friend-container"
        >
          <OnlineUsersMap />
        </motion.div>
      ) : (
        <>
          <Lottie
            loop
            animationData={NoOnline}
            play
            className="nofriendonline-animation"
          ></Lottie>
          <label className="pb-lg-5 pb-xl-0">Waiting for friends to come online</label>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    friends: state.auth.friends,
  };
};

export default connect(mapStateToProps, null)(ActiveFriends);
