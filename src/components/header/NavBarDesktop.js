import "../../assets/scss/NavBarDesktop.scss"

import { Link } from "react-router-dom"
import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import { ShoppingCartOutlined } from "@material-ui/icons"
import { countItemInCart } from "../../containers/functions"
import { navigations } from "../../router/navigations"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const NavBarDesktop = ({ setIsShowMenu }) => {
  const cart = useSelector((store) => store.cart)

  useEffect(() => {
    setIsShowMenu(false)
  })

  return (
    <header className="navbar__desktop">
      <div className="navbar">
        <div className="navbar__logo">
          <Link to="/">
            <span>Nông sản sạch</span>
          </Link>
        </div>

        <div className="navbar__search">
          <label>
            <input type="text" placeholder="Tìm kiếm" />
            <SearchIcon style={{ color: "gray" }} />
          </label>
        </div>

        {navigations.map((item, index) => (
          <div className="navbar__item" key={index}>
            <Link to={item.to}>
              <span>{item.label}</span>
            </Link>
          </div>
        ))}

        <div className="navbar__cart">
          <Link
            to="/payment"
            style={{ display: "flex", alignContent: "center" }}
          >
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
    </header>
  )
}

export default NavBarDesktop
