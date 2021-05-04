import "../../assets/scss/NavBarDesktop.scss"

import { Link, NavLink } from "react-router-dom"

import React from "react"
import { SearchOutlined } from "@ant-design/icons"
import ShoppingIcon from "./ShoppingIcon"
import { navigations } from "../../router/navigations"
import { useEffect } from "react"

const NavBarDesktop = ({ setIsShowMenu }) => {
  useEffect(() => {
    setIsShowMenu(false)
  })

  return (
    <header>
      <div className="navbar--desktop">
        <Link to="/" className="logo">
          Nông sản sạch
        </Link>

        <div className="search">
          <label>
            <input type="text" placeholder="Tìm kiếm" />
            <SearchOutlined />
          </label>
        </div>

        {navigations.map((nav) => (
          <NavLink to={nav.to} className="navlink" activeClassName="active">
            {nav.label}
          </NavLink>
        ))}

        <ShoppingIcon />
      </div>
    </header>
  )
}

export default NavBarDesktop
