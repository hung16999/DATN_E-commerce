import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { deleteAllItemInCart, logout } from "../../redux/actions"

import ShoppingIcon from "./ShoppingIcon"

import { SearchOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import "./../../assets/scss/NavBarMobile.scss"
import { setUserToLocalStorage } from "../../utils/localStorage"

const NavBarMobile = ({ isShowMenu, setIsShowMenu }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector((store) => store.currentUser)

  const handleLogout = () => {
    dispatch(deleteAllItemInCart())
    setUserToLocalStorage(null)
    dispatch(logout())
  }

  return (
    <header>
      <div className="navbar--mobile">
        <div className="menu" onClick={() => setIsShowMenu(!isShowMenu)}>
          <hr className={isShowMenu ? "hr1" : ""} />
          <hr className={isShowMenu ? "hr2" : ""} />
        </div>

        <div>
          <span className="logo">Nông sản sạch</span>
        </div>
        <SearchOutlined className="search" />
        <ShoppingIcon />

        {currentUser ? (
          <div className="item">
            <span style={{ paddingRight: "25px" }}>
              {currentUser.role === 4 && <UserOutlined />}
              {currentUser.role === 1 && <>Admin</>}
              {currentUser.role === 2 && <>Salesman</>}
              {currentUser.role === 3 && <>Shipper</>} {currentUser.name}
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
