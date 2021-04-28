import "../../assets/scss/NavBarDesktop.scss"

import { Link } from "react-router-dom"
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
            <Link to={nav.to}>
              <span>{nav.label}</span>
            </Link>
          </div>
        ))}

        <ShoppingIcon />
      </div>
    </header>
  )
}

export default NavBarDesktop
