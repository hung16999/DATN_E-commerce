import React, { useState } from "react"
import { Form, Input, Button } from "antd"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions"

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
      dispatch(login(findUser))
      history.goBack()
    }
  }

  return (
    <div className="login">
      <Form {...layout} name="basic">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
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
  )
}

export default Login
