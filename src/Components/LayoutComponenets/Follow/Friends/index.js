import React, { useEffect} from "react";
import "./styles.css";
import { Avatar, Typography, Image, notification } from "antd";
import Lottie from "react-lottie-player";
import friendnotfounnd from "../../../../resources/lottie/nofriends.json";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import {
  searchedUserVariant,
  searchUserChildren,
} from "../../../../Transitions";
import { getFriendList, getRequests } from "../../../../redux/actions";
const Friends = ({ friendList, userId, getRequests, getFriendList,socket }) => {
  useEffect(() => {
    if(userId && socket){
      socket.on("requestAccepted", async () => {
        await getRequests(userId);
        await getFriendList(userId);
        console.log('s')
        notification.success({
          message: "Yayyyyy",
          description: "A new friend just joined you",
        });
      });
    }
  }, [socket,userId, getRequests, getFriendList]);

  const renderFriends = () => {
    return friendList.map((friend) => {
      return (
        <motion.div
          variants={searchedUserVariant}
          initial="visible"
          className="row d-flex justify-content-spacebetween align-items-center pb-2"
          key={friend._id}
        >
          <motion.div
            variants={searchUserChildren}
            initial="hidden"
            animate="visible"
            className="col-4 col-sm-3 col-xl-5 col-xxl-4"
          >
            <Avatar size={{ xs: 70, sm: 70, md: 70, lg: 70, xl: 70, xxl: 80 }} src={<Image src={friend.profilepic} />} />
          </motion.div>
          <motion.div
            variants={searchUserChildren}
            initial="hidden"
            animate="visible"
            className="d-flex flex-column col-4 col-sm-5 col-lg-12 col-xl-6"
          >
            <Typography.Text>{friend.name}</Typography.Text>
            <Typography.Text style={{ fontSize: 14 }} type="secondary">
              {friend.username}
            </Typography.Text>
          </motion.div>
        </motion.div>
      );
    });
  };

  return (
    <div className="friends-container">
      {friendList ? (
        <>
          {friendList.length > 0 ? (
            <div className="friend-list">{ renderFriends()}</div>
          ) : (
            <>
              <Lottie
                loop
                animationData={friendnotfounnd}
                play
                className="usernotfound-animation"
              />
              <label>No Friends</label>
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    friendList: state.auth.friends,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { getFriendList, getRequests })(
  Friends
);
