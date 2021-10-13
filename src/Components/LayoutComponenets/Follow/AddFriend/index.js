import React, { useState, useRef } from "react";
import { Input, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserList from "../../../customComponent/UserList";
import "./styles.css";
import InRequests from "./InRequests";
import server from "../../../../api/server";
const AddFriend = ({setNoti, socket}) => {
  const [searchedusers, setSearchedUsers] = useState([]);
  const inputRef = useRef();
  const searchUsers = async (e) => {
    try {
      const res = await server.get("/api/user/search", {
        params: { username: e.target.value },
      });
      setSearchedUsers(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="add-friend-container">
      <Input
        autoComplete="off"
        ref={inputRef}
        id="search"
        placeholder="Username"
        prefix={<UserOutlined />}
        onChange={searchUsers}
        allowClear
        className="search-bar"
      />
      <Divider />
      {inputRef.current && inputRef.current.state.value.length > 0 ? (
        <UserList users={searchedusers} />
      ) : (
        <>
          <Divider style={{'fontSize':'1.6859852476290833vh'}}>Incomming Requests</Divider>
          <InRequests setNoti={setNoti} socket={socket}/>
        </>
      )}
    </div>
  );
};

export default AddFriend;
