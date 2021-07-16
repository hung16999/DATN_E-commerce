import React from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { deleteAllItemInCart, logout } from "../../redux/actions"

import ShoppingIcon from "./ShoppingIcon"

import { SearchOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import "./../../assets/scss/NavBarMobile.scss"
import { setUserToLocalStorage } from "../../utils/localStorage"

const NavBarMobile = ({ isShowMenu, setIsShowMenu }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((store) => store.currentUser)

  const handleLogout = () => {
    dispatch(deleteAllItemInCart())
    setUserToLocalStorage(null)
    dispatch(logout())
  }

  const handleHistory = () => {
    history.push("/history")
  }

  const handleInfo = () => {
    history.push("/info")
  }

  return (
    <header>
      <div className="navbar--mobile">
        <div className="menu" onClick={() => setIsShowMenu(!isShowMenu)}>
          <hr className={isShowMenu ? "hr1" : ""} />
          <hr className={isShowMenu ? "hr2" : ""} />
        </div>

        <div className="logo">
          <Link to="/">
            <span>Nông sản sạch</span>
          </Link>
        </div>

        <SearchOutlined className="search" />
        <ShoppingIcon />

        {currentUser ? (
          <div className="item">
            <span
              title="Xem thông tin"
              onClick={handleInfo}
              style={{ paddingRight: "25px", cursor: "pointer" }}
            >
              {currentUser.role === 4 && <UserOutlined />}
              {currentUser.role === 1 && <>Admin</>}
              {currentUser.role === 2 && <>Salesman</>}
              {currentUser.role === 3 && <>Shipper</>} {currentUser.name}
            </span>

            <span
              title="Xem lịch sử mua hàng của bạn"
              onClick={handleHistory}
              style={{ marginRight: "20px", cursor: "pointer" }}
            >
              Lịch sử mua hàng
            </span>
            <LogoutOutlined onClick={handleLogout} />
          </div>
        ) : (
          <Link to="/login" className="item">
            <span className="item__login">Đăng nhập</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export default NavBarMobile
