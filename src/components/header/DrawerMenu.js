import "./../../assets/scss/DrawerMenu.scss"

import { Link } from "react-router-dom"
import React from "react"

const DrawerMenu = ({ isShowMenu, setIsShowMenu, routes }) => {
  console.log("---drawer menu", routes)
  return (
    <div className={isShowMenu ? "drawerMenu active" : "drawerMenu"}>
      {routes.map((route, index) => (
        <div key={index}>
          <Link to={route.to}>{route.label}</Link>
        </div>
      ))}
    </div>
  )
}

export default DrawerMenu
