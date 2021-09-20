import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
  Upload,
} from "antd";
import ImgCrop from 'antd-img-crop';
import "./styles.css";
import { countrylist } from "../../helpers/data.helper";
import { InboxOutlined } from "@ant-design/icons";
const SignUpForm = ({ onSignUp }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { Dragger } = Upload;
  const { Option } = Select;
  const [form] = Form.useForm();
  const openFormError = () => {
    notification["error"]({
      message: "Can't process your info",
      description:
        "Something is wrong with the form. Please, fill out the form first",
      placement: "bottomRight",
      duration: "4",
    });
  };
  const onFinishFailed = () => {
    openFormError();
  };
  const onSubmit = (values) => {
    if (selectedImage === null) {
      notification["error"]({
        message: "Image not found",
        description:
          "Either you forgot to upload the image or the image is not uploaded yet",
        placement: "bottomRight",
        duration: "4",
      });
    } else {
      onSignUp(values, selectedImage);
    }
  };
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setSelectedImage(e.target.result)
    };
  
    return false;
  };

  const renderCountryList = () => {
    return countrylist.map((country) => {
      return (
        <Option key={country.code} value={country.name}>
          {country.name}
        </Option>
      );
    });
  };

  return (
    <>
      <Form
        form={form}
        style={{ height: "auto" }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <div className="signForm">
          <div className="row ">
            <div className="col-12 col-md-6">
              <Form.Item
                label="Full Name"
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your full name",
                  },
                ]}
              >
                <Input placeholder="John Brunner" type="text"></Input>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                  {
                    type: "email",
                    message: "Not a valid email",
                  },
                ]}
              >
                <Input placeholder="abc@xyz.com" type="email"></Input>
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                  {
                    min: 6,
                    max: 10,
                    message: "Username must be between 6 and 10",
                  },
                ]}
              >
                <Input placeholder="user2052" type="text"></Input>
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dateofbirth"
                hasFeedback
                rules={[{ required: true, message: "When were you born?" }]}
              >
                <DatePicker allowClear className="date-picker" />
              </Form.Item>
            </div>

            <div className="col-12 col-md-6">
              <Form.Item
                label="Password"
                name="password"
                hasFeedback
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
                <Input.Password placeholder="Pass****"></Input.Password>
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Pass****"></Input.Password>
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                hasFeedback
                rules={[{ required: true, message: "What is your gender?" }]}
              >
                <Select placeholder="Male" allowClear>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                hasFeedback
                rules={[{ required: true, message: "What is your country?" }]}
              >
                <Select placeholder="Pakistan" allowClear>
                  {renderCountryList()}
                </Select>
              </Form.Item>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Form.Item
                label="Profile Image"
                rules={[
                  { required: true, message: "Please Upload profile image" },
                ]}
              >
                <ImgCrop  quality={0.5} zoom={true} rotate onModalOk={()=>console.log('s')} >
                  <Dragger
                    className="upload-signup-class"
                    maxCount={1}
                    listType="text"
                    beforeUpload={beforeUpload}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{color:'#25182e'}}/>
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files
                    </p>
                  </Dragger>
                </ImgCrop>
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="signUpBtn" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
