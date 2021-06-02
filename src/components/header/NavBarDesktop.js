import "../../assets/scss/NavBarDesktop.scss"

import { Link, NavLink } from "react-router-dom"
import React, { useState } from "react"
import { SearchOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import ShoppingIcon from "./ShoppingIcon"
import { navigations } from "../../router/navigations"
import { useEffect } from "react"
import "./../../assets/scss/login.scss"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/actions"

const NavBarDesktop = ({ setIsShowMenu }) => {
  const currentUser = useSelector((store) => store.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsShowMenu(false)
  })

  const handleLogout = () => {
    dispatch(logout())
  }

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
    </>
  )
}

export default NavBarDesktop
