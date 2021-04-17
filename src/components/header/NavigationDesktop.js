import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCartOutlined } from "@material-ui/icons"
import { navigations } from "../../router/navigations"
import "../../assets/scss/NavigationDesktop.scss"
const NavBarDesktop = ({ setIsShowMenu }) => {
  useEffect(() => {
    setIsShowMenu(false)
  })

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <span>Nông sản sạch</span>
        </Link>
      </div>

      <div className="navbar__search">
        <input type="text" placeholder="Tìm kiếm" />
      </div>

      {navigations.map((item, index) => (
        <div className="navbar__item" key={index}>
          <Link to={item.to}>
            <span>{item.lable}</span>
          </Link>
        </div>
      ))}

      <div className="navbar__cart">
        <Link style={{ display: "flex", alignContent: "center" }}>
          <ShoppingCartOutlined style={{ color: "#9ede73" }} />
        </Link>
      </div>
    </div>
  )
}

export default NavBarDesktop
