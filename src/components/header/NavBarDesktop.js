import "../../assets/scss/NavBarDesktop.scss"

import { Link, NavLink } from "react-router-dom"
import React, { useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import ShoppingIcon from "./ShoppingIcon"
import { navigations } from "../../router/navigations"
import { useEffect } from "react"
import { Form, Input, Button, Modal } from "antd"
import "./../../assets/scss/login.scss"

const NavBarDesktop = ({ setIsShowMenu }) => {
  useEffect(() => {
    setIsShowMenu(false)
  })

  const [isShowLogin, setIsShowLogin] = useState(false)
  const [isShowRegister, setIsShowRegister] = useState(false)

  const handleCancelLogin = () => {
    setIsShowLogin(false)
  }

  const handleCancelRegister = () => {
    setIsShowRegister(false)
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

  const toggleRegister = () => {}

  return (
    <>
      <header>
        <div className="navbar--desktop">
          <div className="logo">
            <Link to="/">
              <span>Nông sản sạch</span>
            </Link>
          </div>

          <div className="search">
            <label>
              <input type="text" placeholder="Tìm kiếm" />
              <SearchOutlined />
            </label>
          </div>

          {navigations.map((nav) => (
            <div className="item" key={`nav-${nav.to}`}>
              <NavLink to={nav.to} activeClassName="selected">
                <span>{nav.label}</span>
              </NavLink>
            </div>
          ))}

          <ShoppingIcon />

          <div className="item">
            <span
              className="item__login"
              onClick={() => setIsShowLogin(!isShowLogin)}
            >
              Đăng nhập
            </span>
          </div>
        </div>
      </header>

      <div className="login">
        <Modal
          title="Đăng nhập"
          visible={isShowLogin}
          centered={true}
          footer={null}
          onCancel={handleCancelLogin}
        >
          {isShowLogin ? (
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

                <Button onClick={toggleRegister} htmlType="button">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <></>
          )}
        </Modal>

        <Modal
          title="Đăng nhập"
          visible={isShowRegister}
          centered={true}
          footer={null}
          onCancel={handleCancelLogin}
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
    </>
  )
}

export default NavBarDesktop
