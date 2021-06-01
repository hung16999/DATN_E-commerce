import "../../assets/scss/Payment.scss"

import {
  checkoutCart,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"

import { Form, Input, Button, Checkbox } from "antd"

import { Helmet } from "react-helmet"
import React from "react"
import { useSelector } from "react-redux"
import { useState } from "react"

const Payment = () => {
  const cart = useSelector((store) => store.cart)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  return (
    <div className="payment">
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>

      <div className="wrapper">
        <div className="wrapper__customerInfo">
          <h2>Điền thông tin đặt hàng</h2>
          <label>
            Họ và tên
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Số điện thoại
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <label>
            Địa chỉ nhận hàng
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>

        <div className="wrapper__shoppingCart">
          <h2>Đơn hàng</h2>
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
              <button>Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
