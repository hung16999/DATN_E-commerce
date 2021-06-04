import React, { useState } from "react"
import { Form, Input, Button } from "antd"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions"
import HeaderLogin from "../header/HeaderLogin"
import { setUserToLocalStorage } from "../../utils/localStorage"

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const store = useSelector((store) => store)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(false)

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
      setUserToLocalStorage(findUser)

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
    } else {
      setErrorMessage(true)
    }
  }

  const handleOnChangeUsername = (e) => {
    setUsername(e.target.value)
    setErrorMessage(false)
  }

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value)
    setErrorMessage(false)
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
            <Input value={username} onChange={handleOnChangeUsername} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Input.Password
              value={password}
              onChange={handleOnChangePassword}
            />
          </Form.Item>

          {errorMessage && (
            <p style={{ color: "red" }}>
              Bạn đã nhập sai tên đăng nhập hoặc mật khẩu
            </p>
          )}

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
