import React from "react";
import { Form, Button, Input, notification } from "antd";
import { Divider } from "antd";
import { Link } from "react-router-dom";
const LoginForm = ({ onSignIn,isLoading }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSignIn(values);
    form.resetFields();
  };

  const errorNotification = (error) => {
    notification["error"]({
      message: "Can't process your info",
      description: error,
      placement: "topRight",
      duration: "4",
    });
  };

  const onFinishFailed = (errorInfo) => {
    errorNotification(errorInfo.errorFields[0].errors[0]);
  };
  return (
    <>
      <Form
        form={form}
        className="form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="User Name"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 6,
              max: 10,
              message: "Username must be between 6 and 10",
            },
          ]}
        >
          <Input placeholder="Enter your username" type="text"></Input>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            {
              min: 6,
              message: "Password must be atleast 10 digits",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            type="text"
          ></Input.Password>
        </Form.Item>
        <Button type="text">Forgot Password</Button>
        <Divider />
        <Form.Item>
          <Button type="primary" loading={isLoading} className="signUpBtn" style={{ marginRight: 20 }} htmlType="submit">
            Log In
          </Button>
          <Link style={{color:'#25182e'}} to="/register">Sign Up</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
