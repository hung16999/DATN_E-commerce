import React from "react"
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

  return (
    <div className="login">
      <Form {...layout} name="basic">
        <Form.Item
          label="Nhập tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nhập mật khẩu"
          name="password"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="password"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button htmlType="button">Đăng ký</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
