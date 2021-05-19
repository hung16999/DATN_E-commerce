import "../../assets/scss/Payment.scss"

import {
  checkoutCart,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"

import { Helmet } from "react-helmet"
import React from "react"
import { useSelector } from "react-redux"

const Payment = () => {
  const cart = useSelector((store) => store.cart)
  console.log(cart)
  return (
    <div className="payment">
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>

      <h2>payment</h2>
      <div className="wrapper">
        <div className="wrapper__customerInfo">
          <p>Điền thông tin đặt hàng</p>
          <label>
            Họ và tên
            <input type="text" />
          </label>

          <label>
            Số điện thoại
            <input type="number" />
          </label>

          <label>
            Địa chỉ nhận hàng
            <input type="text" />
          </label>
        </div>

        <div className="wrapper__shoppingCart">
          <p>Giỏ hàng</p>
          {cart.map((item) => (
            <div className="wrapper__shoppingCart__item">
              <img src={item.src} alt="" />
              <div className="wrapper__shoppingCart__item--text">
                <span>{item.name}</span>
                <span>
                  {formatMoney(priceByDiscount(item))} x {item.quantity} ={" "}
                  {formatMoney(
                    priceByQuantity(priceByDiscount(item), item.quantity)
                  )}
                </span>
              </div>
            </div>
          ))}

          <div className="wrapper__shoppingCart__checkout">
            <div>
              <span>Tạm tính</span>
              <span>Phí vận chuyển</span>
              <span>Tổng cộng</span>
            </div>

            <div>
              <span>{formatMoney(checkoutCart(cart))}</span>
              <span>{formatMoney(0)}</span>
              <span>{formatMoney(checkoutCart(cart))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
