import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import {RightCircleFilled } from '@ant-design/icons'
const InputSection = () => {
  const [message, setMessage] = useState("");
  function handleOnEnter() {
    console.log("enter", message);
    setMessage('')
  }
  return (
    <div className='input-field-container'>
      <InputEmoji
        value={message}
        onChange={setMessage}
        onEnter={handleOnEnter}
        placeholder="What's on your mind?"
      />
      <RightCircleFilled onClick={handleOnEnter} className="enter-button"/>
    </div>
  );
};

export default InputSection;
