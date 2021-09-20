import React from "react";
import "./styles.css";
import { Avatar, Typography, Button } from "antd";
import { motion } from "framer-motion";
import {
  searchedUserVariant,
  searchUserChildren,
} from "../../../../Transitions";
import {connect} from 'react-redux'
import server from "../../../../api/server";
const RenderRequests = ({ requests,currentUserId }) => {

  const onClick=async (senderId)=>{
    try {
      await server.patch('/api/user/acceptrequest',{sender:senderId,receiver:currentUserId})
    } catch (error) {
      console.log(error)
    }
  }

  const Request = () => {
   return requests.map((request) => {
      const { _id, name, username, profilepic } = request.senderInfo;
      return (
        <motion.div
          variants={searchedUserVariant}
          initial="visible"
          key={_id}
          className="req-div row d-flex justify-content-spacebetween align-items-center pb-2"
        >
          <motion.div variants={searchUserChildren} initial="hidden" animate="visible" className="col-12 col-sm-3 col-lg-12 col-xl-3">
            <Avatar className="searched-avatar" src={profilepic} />
          </motion.div>
          <motion.div variants={searchUserChildren} initial="hidden" animate="visible"  className="req-name-container col-12 col-sm-3 col-lg-12 col-xl-4">
          <Typography.Text>{name}</Typography.Text>
          <Typography.Text style={{fontSize:14}} type="secondary">{username}</Typography.Text>
          </motion.div>
          <motion.div variants={searchUserChildren} initial="hidden" animate="visible"  className="accept-btn-container col-12 col-sm-6 col-lg-12 col-xl-5">
           <Button type="primary" onClick={()=>onClick(_id)} className="add-btn">Accept</Button>
          </motion.div>
        </motion.div>
      );
    });
  };

  return (
    <>
      <Request />
    </>
  );
};

const mapStateToProps=(state)=>{
  return{
    currentUserId: state.auth.userId
  }
}

export default connect(mapStateToProps, null)(RenderRequests);
