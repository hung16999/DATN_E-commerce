import { Col, Row } from "antd"
import React, { useState } from "react"
import { useSelector } from "react-redux"

const AdminUser = () => {
  const users = useSelector((store) => store.users)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const setFormByAccount = (user) => {
    setName(user.name)
    setUsername(user.username)
    setPassword(user.password)
  }

  return (
    <>
      <h1>Quản lý user</h1>
      <Row style={{ width: "90%", margin: "auto" }}>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <b>Tài khoản salesman</b>
              {users
                .filter((user) => user.role === 2)
                .map((user) => (
                  <div
                    key={user.id}
                    className="admin__user__list"
                    onClick={() => setFormByAccount(user)}
                  >
                    <p>Tên: {user.name}</p>
                    <p>username: {user.username}</p>
                    <p>password: {user.password}</p>
                  </div>
                ))}
            </Col>

            <Col span={12}>
              <b>Tài khoản shipper</b>
              {users
                .filter((user) => user.role === 3)
                .map((user) => (
                  <div>
                    <p>Tên: {user.name}</p>
                    <p>username: {user.username}</p>
                    <p>password: {user.password}</p>
                  </div>
                ))}
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <h3>Form thêm sửa xóa tài khoản</h3>
          <div className="admin__user__form">
            <label>
              Tên
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label>
              password
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AdminUser
