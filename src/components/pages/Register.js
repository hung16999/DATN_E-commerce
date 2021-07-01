import React from "react"
import { useHistory, Link } from "react-router-dom"
import { v4 } from "uuid"
import { useDispatch } from "react-redux"

import HeaderLogin from "../header/HeaderLogin"
import { login } from "../../redux/actions"

import { SmileOutlined } from "@ant-design/icons"
import { Form, Input, Button, notification } from "antd"
import api from "../../env/api"
import { setUserToLocalStorage } from "../../utils/localStorage"

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const RegistrationForm = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = (values) => {
    const formData = new FormData()
    const id = v4()

    formData.append("id_account", id)
    formData.append("username", values.username)
    formData.append("password", values.password)
    formData.append("role", 4)
    formData.append("name", values.name)
    formData.append("phone", values.phone)

    api.post(`push_account.php`, formData).then((response) => {
      if (response.data === 1) {
        api.post(`login.php`, formData).then((response) => {
          const user = response.data[0]

          if (user) {
            dispatch(login(response.data[0]))
            setUserToLocalStorage(user)

            openNotification()
            history.push("/")
          }
        })
      } else {
        alert(response.data)
      }
    })
  }

  const openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Đăng ký tài khoản thành công!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    })
  }

  return (
    <>
      <HeaderLogin />
      <div className="login">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleRegister}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            tooltip="Nhập họ và tên của bạn"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            tooltip="Nhập số điện thoại của bạn"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Không được để trống",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(new Error("Xác thực lại mật khẩu"))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <span>Bạn đã có tài khoản? </span>
            <Link to="/login" htmlType="button">
              Đăng nhập ngay
            </Link>
          </div>
        </Form>
      </div>
    </>
  )
}

export default RegistrationForm
