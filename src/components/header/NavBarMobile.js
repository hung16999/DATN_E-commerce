import "./../../assets/scss/NavBarMobile.scss"

import React from "react"
import SearchIcon from "@material-ui/icons/Search"

const NavBarMobile = ({ isShowMenu, setIsShowMenu }) => {
  return (
    <header className="navbar__mobile">
      <div className="navbar">
        <div
          className="navbar__menu"
          onClick={() => setIsShowMenu(!isShowMenu)}
        >
          <hr className={isShowMenu ? "hr1" : ""} />
          <hr className={isShowMenu ? "hr2" : ""} />
        </div>

        <div>
          <span className="navbar__logo">Nông sản sạch</span>
        </div>

        <div className="navbar__search">
          <SearchIcon />
        </div>
      </div>
    </header>
  )
}

export default NavBarMobile
