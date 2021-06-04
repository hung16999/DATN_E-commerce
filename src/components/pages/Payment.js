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
import { useState } from "react"
import { v4 } from "uuid"
import NavBar from "../../containers/NavBar"
import { useHistory } from "react-router"

const Payment = () => {
  const { currentUser, cart } = useSelector((store) => store)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const history = useHistory()

  if (currentUser) {
    if (currentUser.role !== 4) {
      if (currentUser.role === 1) {
        history.push("/admin")
      } else if (currentUser.role === 2) {
        history.push("/salesman")
      } else if (currentUser.role === 3) {
        history.push("/shipper")
      }
    }
  }

  const handleOrder = () => {
    const order = {
      id: v4(),
      customerName: name,
      phone: phone,
      address: address,
      products: cart,
    }
  }

  return (
    <div className="payment">
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>

      <NavBar />

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
              <button onClick={handleOrder}>Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
