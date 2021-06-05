import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { changePickUp, logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"

import "../../assets/scss/salesman.scss"
import {
  checkoutCart,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"
import { Col, Row } from "antd"

const Salesman = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser, orders, products } = useSelector((store) => store)

  console.log(orders)

  const findProduct = (productDetail) => {
    return products.find((product) => product.id === productDetail.productID)
  }

  if (currentUser) {
    if (currentUser.role !== 2) {
      if (currentUser.role === 1) {
        history.push("/admin")
      } else if (currentUser.role === 3) {
        history.push("/shipper")
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
    <div className="salesman">
      <div className="salesman__header">
        <h2>Trang của người bán hàng</h2>
        <span>{currentUser && currentUser.name}</span>
        <button onClick={handleLogout}>Log out</button>
      </div>

      <Row>
        <Col span={12}>
          <h2>
            Đang chờ xử lý{" "}
            <span style={{ color: "red" }}>{counterOrderByStatus(1)} đơn</span>
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

                <button onClick={() => dispatch(changePickUp(order.id))}>
                  Đã lấy hàng
                </button>
              </div>
            ))}
        </Col>

        <Col span={12}>
          <h2>Đã lấy hàng</h2>
          {orders
            .filter((order) => order.status === 2)
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
  )
}

export default Salesman
