import React, { useState } from "react"
import { Form, Input, Button, Modal } from "antd"
import "./../../assets/scss/login.scss"

const Login = () => {
  const [isShowLogin, setIsShowLogin] = useState(false)

  const handleOk = () => {
    setIsShowLogin(false)
  }

  const handleCancel = () => {
    setIsShowLogin(false)
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }

  const onFinish = (values) => {
    console.log("Success:", values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="login">
      <Modal
        title="Basic Modal"
        visible={isShowLogin}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Login
