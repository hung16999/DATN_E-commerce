import React from "react"
import { Link } from "react-router-dom"
import HeaderLogin from "../header/HeaderLogin"

import { Form, Input, Button } from "antd"

const Register = () => {
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

  const handleRegister = () => {}

  return (
    <>
      <HeaderLogin />
      <div className="login">
        <Form {...layout} name="basic">
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="enter-password"
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={handleRegister}>
              Đăng ký
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <span>Tôi đã có tài khoản </span>
            <Link to="/login" htmlType="button">
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Register
