import React from "react";
import "./styles.css";
import { Avatar, Typography } from "antd";
import { motion } from "framer-motion";
import {
  searchedUserVariant,
  searchUserChildren,
} from "../../../../Transitions";
import {connect} from 'react-redux'
import AcceptRequest from "./AcceptRequest";
const RenderRequests = ({ requests,currentUserId }) => {


  const Request = () => {
   return requests.map((request,index) => {
     
      const { _id, name, username, profilepic } = request.senderInfo;
      return (
        <motion.div
          variants={searchedUserVariant}
          initial="visible"
          key={username}
          className="req-div row align-items-center justify-content-center w-100  pb-2"
        >
          <motion.div variants={searchUserChildren} initial="hidden" animate="visible" className="col-12 col-sm-3 col-md-4 col-lg-12 col-xl-3">
            <Avatar size={{ xs: 50, sm: 50, md: 60, lg: 60, xl: 50, xxl: 50 }} src={profilepic} />
          </motion.div>
          <motion.div variants={searchUserChildren} initial="hidden" animate="visible"  className="req-name-container col-12 col-sm-3 col-md-4 col-lg-12 col-xl-5">
          <Typography.Text>{name}</Typography.Text>
          <Typography.Text style={{fontSize:14}} type="secondary">{username}</Typography.Text>
          </motion.div>
          <motion.div variants={searchUserChildren} initial="hidden" animate="visible"  className=" col-12 col-sm-3 col-md-4 col-lg-12 col-xl-4">
           <AcceptRequest index={index} senderId={_id} currentUserId={currentUserId}/>
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
