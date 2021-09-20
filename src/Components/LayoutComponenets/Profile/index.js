import React from "react";
import "./styles.css";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { Button, Avatar, Image, Typography, Spin, Divider } from "antd";
import CountryFlags from "../../customComponent/CountryFlags";
import { logOut } from "../../../redux/actions";
import { cardItemVariant, cardVariant } from "../../../Transitions";
import { LoadingOutlined } from "@ant-design/icons";
const Profile = ({
  name,
  username,
  email,
  gender,
  country,
  logOut,
  profilepic,
  socket
}) => {


  const onLogout=()=>{
      socket.disconnect()
      logOut()
  }

  const InfoRender = ({ head }) => {
    return (
      <>
        <Typography.Text className="default-about">{head}</Typography.Text>
      </>
    );
  };

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      className="profile-container"
    >
      <div className="card-top"></div>
      {name && username && email && gender && country && profilepic ? (
        <>
          <motion.div variants={cardItemVariant} className="about-container">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <Avatar size={100} src={<Image src={profilepic} />} />
              <div className="personal-info-container d-flex flex-column ">
                <Divider>About</Divider>
                <InfoRender head={name} />
                <InfoRender head={username} />
                <InfoRender head={email} />
                <InfoRender head={gender} />
                <CountryFlags country={country} />
              </div>
            </div>
            <div>
              <Button onClick={onLogout}>Log Out</Button>
            </div>
          </motion.div>
        </>
      ) : (
        <div className="about-container d-flex justify-content-center align-items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      )}
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.auth.name,
    username: state.auth.username,
    email: state.auth.email,
    gender: state.auth.gender,
    country: state.auth.country,
    profilepic: state.auth.profilepic,
  };
};

export default connect(mapStateToProps, { logOut })(Profile);
