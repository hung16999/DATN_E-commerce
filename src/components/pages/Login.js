import React, { useState } from "react"
import { Form, Input, Button } from "antd"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions"
import HeaderLogin from "../header/HeaderLogin"

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const store = useSelector((store) => store)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const handleLogin = () => {
    const findUser = store.users.find(
      (item) => item.username === username && item.password === password
    )

    if (findUser) {
      switch (findUser.role) {
        case 1:
          dispatch(login(findUser))
          history.push("/admin")
          return
        case 2:
          dispatch(login(findUser))
          history.push("/salesman")
          return
        case 3:
          dispatch(login(findUser))
          history.push("/shipper")
          return
        case 4:
          dispatch(login(findUser))
          history.goBack()
          return
        default:
      }
    }
  }

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
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/register" htmlType="button">
              Đăng ký
            </Link>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login
