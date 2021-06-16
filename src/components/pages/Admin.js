import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"
import { LogoutOutlined } from "@ant-design/icons"
import "../../assets/scss/Admin.scss"
import AdminUser from "./AdminUser"
import AdminProducts from "./AdminProducts"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"

const Admin = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((store) => store.currentUser)
  const [directAdmin, setDirectAdmin] = useState(true)

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
    <div className="admin">
      <div className="admin__header">
        <span>Nông sản sạch</span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setDirectAdmin(true)}
        >
          Quản lý nhân viên
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => setDirectAdmin(false)}
        >
          Quản lý sản phẩm
        </span>

        <span>
          {currentUser && currentUser.name}{" "}
          <LogoutOutlined
            style={{ marginLeft: "15px", color: "white" }}
            onClick={handleLogout}
          />
        </span>
      </div>

      <div className="admin__body">
        {directAdmin ? (
          <>
            <AdminUser />
          </>
        ) : (
          <>
            <AdminProducts />
          </>
        )}
      </div>
    </div>
  )
}

export default Admin
