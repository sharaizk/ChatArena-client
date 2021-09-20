import React, { useEffect } from "react";
import "./styles.css";
import LoginForm from "../../Components/LayoutComponenets/LoginForm";
import Lottie from "react-lottie-player";
import loginAnimation from "../../resources/lottie/LOGIN.json";
import { motion } from "framer-motion";
import { pageTransition, pageVariants } from "../../Transitions";
import { notification } from "antd";
import { connect } from "react-redux";
import { signIn, checkToken } from "../../redux/actions/index";
import history from "../../history/history";
const LoginScreen = ({ signIn, checkToken }) => {
  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const errorNotification = (res) => {
    notification["error"]({
      message: res,
      description:
        "Something is wrong with the form. Please, type correct credentials",
      placement: "topRight",
      duration: "4",
    });
  };
  const successNotification = (res) => {
    notification["success"]({
      message: "Signed In successfully",
      description: "Welcome to chat arena",
      placement: "topRight",
      duration: "3",
    });
  };

  const onSignIn = async (values) => {
    const res = await signIn(values);
    if (res) {
      errorNotification(res);
    } else {
      successNotification();
      history.push("/home");
    }
  };
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="loginmainContainer"
    >
      <div className="section-container row">
        <div className="col-12 col-md-7 formContainer">
          <h4 className="formheader">Please Login</h4>
          <LoginForm onSignIn={onSignIn} />
        </div>
        <div className="col-12 col-md-5 infoContainer">
          <Lottie
            loop
            animationData={loginAnimation}
            play
            style={{ width: 400, height: 400 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default connect(null, { signIn, checkToken })(LoginScreen);
