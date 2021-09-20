import { SIGN_UP, LOG_IN, LOG_OUT, OREQ, IREQ,FRIENDS } from "../types";
import server from "../../api/server";
import { saveState, loadState, deleteState } from "../localStorage/token";
import history from "../../history/history";
import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";

export const signUp = (formValues, profileimage) => {
  const { name, username, email, password, gender, country } = formValues;
  let { dateofbirth } = formValues;
  dateofbirth = dateofbirth._d.toISOString().split("T", 1)[0];
  return async (dispatch) => {
    try {
      const res = await server.post("/api/auth/register", {
        name,
        username,
        email,
        dateofbirth,
        password,
        gender,
        country,
        profileimage,
      });
      if (res.status === 200) {
        dispatch({ type: SIGN_UP });
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
};

export const signIn = (formValues) => {
  const { username, password } = formValues;
  return async (dispatch) => {
    try {
      const res = await server.post("/api/auth/login", { username, password });
      if (res.status === 200) {
        saveState(res.data.token);
        dispatch({ type: LOG_IN, payload: res.data.userData });
      }
    } catch (error) {
      return error.response.data.error;
    }
  };
};

export const logOut = () => {
  deleteState();
  history.push("/");
  return { type: LOG_OUT };
};

export const checkToken = () => {
  return async (dispatch) => {
    try {
      const token = loadState();
      if (token) {
        const res = await server.post("/api/auth/authenticate", { token });
        dispatch({ type: LOG_IN, payload: res.data.user });
        if(res.status === 200){
          history.push("/home");
        }
      } else {
        throw new Error("User not Logged In");
      }
    } catch (error) {}
  };
};

export const sendRequest = (userId, sender) => {
  return async (dispatch) => {
    try {
      const res = await server.post("/api/user/sendrequest", {
        userId,
        sender,
      });
      if (res.status === 200) {
        notification.open({
          message: "Friend Request Sent",
          description: "Friend Request Sent successfully",
          icon: <SmileOutlined style={{ color: "#52C41A" }} />,
        });
        dispatch({ type: OREQ });
      }
    } catch (error) {
      notification["error"]({
        message: "Can't process your request",
        description: error.response.data.error,
      });
    }
  };
};

export const getRequests = (currentUserId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/user/getrequests", {
        params: { userId: currentUserId },
      });
      if (res.status === 200) {
        dispatch({type:IREQ, payload: res.data});
      }
    } catch (err) {}
  };
};


export const getFriendList = (currentId) =>{
  return async (dispatch)=>{
    try{
      const res = await server.get('/api/user/getfriends',{params:{userId:currentId}})
      if(res.status === 200){
        dispatch({type:FRIENDS, payload: res.data})
      }
    }
    catch(err){

    }
  }
}
