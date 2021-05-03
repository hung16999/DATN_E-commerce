import "../../assets/scss/DrawerMenu.scss"

import { Link } from "react-router-dom"
import React from "react"
import { navigations } from "../../router/navigations"

const DrawerMenu = ({ isShowMenu, setIsShowMenu, routes }) => {
  return (
    <div className={!isShowMenu ? "drawer__menu" : "drawer__menu active"}>
      <div className="drawer__menu__list">
        {navigations.map((nav) => (
          <Link to={nav.to} key={`nav-${nav.to}`}>
            <div
              className="drawer__menu__item"
              key={`nav-${nav.to}`}
              onClick={() => setIsShowMenu(!isShowMenu)}
            >
              {nav.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DrawerMenu
