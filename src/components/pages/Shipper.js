import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { changePaid, changeStartShip, logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"

import {
  checkoutCart,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"

import { Col, Row } from "antd"

const Shipper = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser, orders } = useSelector((store) => store)

  if (currentUser) {
    if (currentUser.role !== 3) {
      if (currentUser.role === 2) {
        history.push("/salesman")
      } else if (currentUser.role === 1) {
        history.push("/admin")
      } else {
        history.push("/")
      }
    }
  } else {
    history.push("/")
  }

  const handleLogout = () => {
    dispatch(logout())
    setUserToLocalStorage(null)
    history.push("/")
  }

  const counterOrderByStatus = (status) => {
    let count = 0
    orders.forEach((element) => {
      if (element.status === status) {
        count++
      }
    })

    return count
  }

  return (
    <>
      <div className="salesman">
        <div className="salesman__header">
          <h2>Trang của shipper</h2>
          <span>{currentUser && currentUser.name}</span>
          <button onClick={handleLogout}>Log out</button>
        </div>

        <Row>
          <Col span={8}>
            <h2>
              Đang chờ giao hàng{" "}
              <span style={{ color: "red" }}>
                {counterOrderByStatus(2)} đơn
              </span>
            </h2>

            {orders
              .filter((orderFilter) => orderFilter.status === 1)
              .map((order) => (
                <div key={order.id} className="order__item">
                  <p>id đơn hàng: {order.id}</p>
                  <p>Tên khách: {order.customerName}</p>
                  <p>Số điện thoại: {order.phone}</p>
                  <p>Địa chỉ: {order.address}</p>

                  <div>
                    {order.products.map((item) => (
                      <p>
                        Mã sản phẩm: {item.id} -- {item.name}{" "}
                        {formatMoney(priceByDiscount(item))} x {item.quantity} ={" "}
                        {formatMoney(
                          priceByQuantity(priceByDiscount(item), item.quantity)
                        )}
                      </p>
                    ))}
                  </div>

                  <p>Tổng tiền: {formatMoney(checkoutCart(order.products))}</p>
                  <button onClick={() => dispatch(changeStartShip(order.id))}>
                    Bắt đầu giao hàng
                  </button>
                </div>
              ))}
          </Col>

          <Col span={8}>
            <h2>
              Đang vận chuyển{" "}
              <span style={{ color: "red" }}>
                {counterOrderByStatus(3)} đơn
              </span>
            </h2>
            {orders
              .filter((order) => order.status === 3)
              .map((order) => (
                <div key={order.id} className="order__item">
                  <p>id đơn hàng: {order.id}</p>
                  <p>Tên khách: {order.customerName}</p>
                  <p>Số điện thoại: {order.phone}</p>
                  <p>Địa chỉ: {order.address}</p>

                  <div>
                    {order.products.map((item) => (
                      <p>
                        Mã sản phẩm: {item.id} -- {item.name}{" "}
                        {formatMoney(priceByDiscount(item))} x {item.quantity} ={" "}
                        {formatMoney(
                          priceByQuantity(priceByDiscount(item), item.quantity)
                        )}
                      </p>
                    ))}
                  </div>

                  <p>Tổng tiền: {formatMoney(checkoutCart(order.products))}</p>
                  <button onClick={() => dispatch(changePaid(order.id))}>
                    Xác nhận thanh toán
                  </button>
                </div>
              ))}
          </Col>

          <Col span={8}>
            <h2>Đã thanh toán</h2>
            {orders
              .filter((order) => order.status === 4)
              .map((order) => (
                <div key={order.id} className="order__item">
                  <p>id đơn hàng: {order.id}</p>
                  <p>Tên khách: {order.customerName}</p>
                  <p>Số điện thoại: {order.phone}</p>
                  <p>Địa chỉ: {order.address}</p>

                  <div>
                    {order.products.map((item) => (
                      <p>
                        Mã sản phẩm: {item.id} -- {item.name}{" "}
                        {formatMoney(priceByDiscount(item))} x {item.quantity} ={" "}
                        {formatMoney(
                          priceByQuantity(priceByDiscount(item), item.quantity)
                        )}
                      </p>
                    ))}
                  </div>

                  <p>Tổng tiền: {formatMoney(checkoutCart(order.products))}</p>
                </div>
              ))}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Shipper
