import "../../assets/scss/NavigationDesktop.scss"

import React, { useEffect } from "react"

import { Link } from "react-router-dom"
import { ShoppingCartOutlined } from "@material-ui/icons"
import { countItemInCart } from "./../../containers/functions"
import { navigations } from "../../router/navigations"
import { useSelector } from "react-redux"

const NavBarDesktop = ({ setIsShowMenu }) => {
  const cart = useSelector((store) => store.cart)

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
        <Link to="/payment" style={{ display: "flex", alignContent: "center" }}>
          <div className="navbar__cart__icon">
            <ShoppingCartOutlined
              style={{ color: "#acf57c", marginTop: "10px" }}
            />
            <div hidden={cart.length === 0} className="navbar__cart__badge">
              {countItemInCart(cart)}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default NavBarDesktop
