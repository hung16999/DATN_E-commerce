import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"
import { LogoutOutlined } from "@ant-design/icons"
import "../../assets/scss/Admin.scss"
import AdminUser from "./AdminUser"
import AdminProducts from "./AdminProducts"
import { Tabs } from "antd"

const Admin = () => {
  const { TabPane } = Tabs
  const dispatch = useDispatch()

  const history = useHistory()
  const currentUser = useSelector((store) => store.currentUser)

  if (currentUser) {
    if (currentUser.role !== 1) {
      if (currentUser.role === 2) {
        history.push("/salesman")
      } else if (currentUser.role === 3) {
        history.push("/shipper")
      } else {
        history.push("/")
      }
    }
  } else {
    history.push("/")
  }

  const handleLogout = () => {
    dispatch(logout())
    setUserToLocalStorage(null)
    history.push("/")
  }

  return (
    <>
      <div className="admin">
        <div className="admin__header">
          <span>Nông sản sạch</span>

          <span>Trang của Admin</span>

          <span>
            {currentUser && currentUser.name}{" "}
            <LogoutOutlined
              style={{ marginLeft: "15px", color: "white" }}
              onClick={handleLogout}
            />
          </span>
        </div>

        <Tabs defaultActiveKey="1" style={{ width: "90%", margin: "auto" }}>
          <TabPane tab="Quản lý nhân viên" key="1">
            <AdminUser />
          </TabPane>

          <TabPane tab="Quản lý sản phẩm" key="2">
            <AdminProducts />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default Admin
