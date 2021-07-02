import "../../assets/scss/ShoppingIcon.scss"

import { Link } from "react-router-dom"
import React from "react"
import { countItemInCart } from "../../containers/functions"
import { useSelector } from "react-redux"

import { ShoppingFilled } from "@ant-design/icons"

const ShoppingIcon = () => {
  const cart = useSelector((store) => store.cart)

  return (
    <div className="shopping">
      <div className="cart">
        <Link to="/shoppingcart">
          <div className="cart__icon">
            <ShoppingFilled className="cart__icon__shopping" />
            <div hidden={cart.length === 0} className="cart__badge">
              {countItemInCart(cart)}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ShoppingIcon
