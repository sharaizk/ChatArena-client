import React,{useState} from "react";
import { motion } from "framer-motion";
import { pageTransition, pageVariants } from "../../Transitions";
import { Link } from "react-router-dom";
import "./styles.css";
import { Divider,  notification, } from "antd";
import SignUpForm from "../../Components/LayoutComponenets/SignUpForm";
import { connect } from "react-redux";
import { signUp } from "../../redux/actions";
import history from "../../history/history";

const SignUpScreen = ({signUp}) => {

  const [isLoading,setLoading] = useState(false)

  const errorNotification = (res) =>{
    notification['error']({
      message: res,
      description:
        "Something is wrong with the form. Please, type correct information or change",
      placement:'topRight',
      duration:'4'
    });
  }
  const successNotification = (res) =>{
    notification['success']({
      message: "Success",
      description:'Account created successfully, pushing you to loading screen in a while',
      placement:'topRight',
      duration:'3'
    })
  }
  const onSignUp = async (values,profileImage) =>{
      setLoading(true)
      const res= await signUp(values,profileImage)
      setLoading(false)
      if(res){
        errorNotification(res)
      }
      else{
        successNotification()
        setTimeout(()=>{
          history.push('/')
        },4000)
      }
  }

  return (
    <motion.div
      className="signmainContainer"
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="signformContainer">
        <h4 className="signformheader">Welcome to Chat App</h4>
        <Divider />

        <SignUpForm onSignUp={onSignUp} isLoading={isLoading}/>

        <Divider />
        <div className="d-flex justify-content-center align-items-center">
          <Link className="toLoginPage" exact to={"/"}>
            Already one of us?
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default connect(null, { signUp })(SignUpScreen);
