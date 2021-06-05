import "../../assets/scss/NavBarDesktop.scss"

import { Link, NavLink } from "react-router-dom"
import React from "react"
import { SearchOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import ShoppingIcon from "./ShoppingIcon"
import { useEffect } from "react"
import "./../../assets/scss/login.scss"
import { useDispatch, useSelector } from "react-redux"
import { deleteAllItemInCart, logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"

const NavBarDesktop = ({ setIsShowMenu }) => {
  const currentUser = useSelector((store) => store.currentUser)

  const navigations = [
    { label: "Rau củ", to: "/vegetable" },
    { label: "Gạo", to: "/rice" },
    { label: "Trái cây", to: "/fruit" },
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    setIsShowMenu(false)
  })

  const handleLogout = () => {
    dispatch(logout())
    setUserToLocalStorage(null)
    dispatch(deleteAllItemInCart())
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
