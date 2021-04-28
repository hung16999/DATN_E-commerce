import "./../../assets/scss/NavBarMobile.scss"

import React from "react"
import { SearchOutlined } from "@ant-design/icons"
import ShoppingIcon from "./ShoppingIcon"

const NavBarMobile = ({ isShowMenu, setIsShowMenu }) => {
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
      </div>
    </header>
  )
}

export default NavBarMobile
