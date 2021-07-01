import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"

import API from "../../env/api"

import {
  checkoutCart,
  counterOrderByStatus,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"
import { Col, Row } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import api from "../../env/api"

const Shipper = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { currentUser } = useSelector((store) => store)

  const [orders, setOrders] = useState([])
  const [ordersDetail, setOrdersDetail] = useState([])

  const fetchOrders = () => {
    API.get(`get_all_order.php`).then((response) => setOrders(response.data))
    API.get(`get_all_order_detail.php`).then((response) =>
      setOrdersDetail(response.data)
    )
  }

  useEffect(() => {
    fetchOrders()
  }, [])

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

  const handlePickUp = (id, status) => {
    const formData = new FormData()

    formData.append("id", id)
    formData.append("updateStatus", status)

    api.post(`update_status_order.php`, formData)
    fetchOrders()
  }

  return (
    <>
      <div className="salesman">
        <div className="salesman__header">
          <span>Nông sản sạch</span>
          <span>Trang của shipper</span>
          <span>
            {currentUser && currentUser.name}{" "}
            <LogoutOutlined
              style={{ marginLeft: "15px", color: "white" }}
              onClick={handleLogout}
            />
          </span>
        </div>

        <Row className="salesman__title">
          <Col span={8}>
            <h2>
              Đang chờ giao hàng{" "}
              <span style={{ color: "red" }}>
                {counterOrderByStatus(orders, 2)} đơn
              </span>
            </h2>
          </Col>

          <Col span={8}>
            <h2>
              Đang vận chuyển{" "}
              <span style={{ color: "red" }}>
                {counterOrderByStatus(orders, 3)} đơn
              </span>
            </h2>
          </Col>

          <Col span={8}>
            <h2>Đã thanh toán</h2>
          </Col>
        </Row>

        <div className="salesman__wrapper">
          <Col className="salesman__wrapper__list" span={8}>
            {orders
              .filter((orderFilter) => orderFilter.id_order_status === 2)
              .map((order) => (
                <div key={order.id_order} className="order__item">
                  <p>
                    <b>id đơn hàng:</b> {order.id_order}
                  </p>
                  <p>
                    <b>Tên khách:</b> {order.name}
                  </p>
                  <p>
                    <b>Số điện thoại:</b> {order.phone}
                  </p>
                  <p>
                    <b>Địa chỉ:</b> {order.address}
                  </p>
                  <p>
                    <b>Ngày tạo đơn hàng:</b> {order.create_date}
                  </p>

                  <div>
                    <b>Danh sách sản phẩm</b>
                    {ordersDetail
                      .filter((item) => item.id_order === order.id_order)
                      .map((item) => (
                        <p>
                          {item.id_product} - {item.name}{" "}
                          {formatMoney(
                            priceByDiscount(item.price, item.discount)
                          )}{" "}
                          x {item.quantity} ={" "}
                          {formatMoney(
                            priceByQuantity(
                              priceByDiscount(item.price, item.discount),
                              item.quantity
                            )
                          )}
                        </p>
                      ))}
                  </div>

                  <p>
                    <b>Tổng tiền:</b>{" "}
                    {formatMoney(
                      checkoutCart(
                        ordersDetail.filter(
                          (item) => item.id_order === order.id_order
                        )
                      )
                    )}
                  </p>

                  <button onClick={() => handlePickUp(order.id_order, 3)}>
                    Bắt đầu giao hàng
                  </button>
                </div>
              ))}
          </Col>

          <Col className="salesman__wrapper__list" span={8}>
            {orders
              .filter((orderFilter) => orderFilter.id_order_status === 3)
              .map((order) => (
                <div key={order.id_order} className="order__item">
                  <p>
                    <b>id đơn hàng:</b> {order.id_order}
                  </p>
                  <p>
                    <b>Tên khách:</b> {order.name}
                  </p>
                  <p>
                    <b>Số điện thoại:</b> {order.phone}
                  </p>
                  <p>
                    <b>Địa chỉ:</b> {order.address}
                  </p>
                  <p>
                    <b>Ngày tạo đơn hàng:</b> {order.create_date}
                  </p>

                  <div>
                    <b>Danh sách sản phẩm</b>
                    {ordersDetail
                      .filter((item) => item.id_order === order.id_order)
                      .map((item) => (
                        <p>
                          {item.id_product} - {item.name}{" "}
                          {formatMoney(
                            priceByDiscount(item.price, item.discount)
                          )}{" "}
                          x {item.quantity} ={" "}
                          {formatMoney(
                            priceByQuantity(
                              priceByDiscount(item.price, item.discount),
                              item.quantity
                            )
                          )}
                        </p>
                      ))}
                  </div>

                  <p>
                    <b>Tổng tiền:</b>{" "}
                    {formatMoney(
                      checkoutCart(
                        ordersDetail.filter(
                          (item) => item.id_order === order.id_order
                        )
                      )
                    )}
                  </p>

                  <button onClick={() => handlePickUp(order.id_order, 4)}>
                    Xác nhận thanh toán
                  </button>
                </div>
              ))}
          </Col>

          <Col className="salesman__wrapper__list" span={8}>
            {orders
              .filter((orderFilter) => orderFilter.id_order_status === 4)
              .map((order) => (
                <div key={order.id_order} className="order__item">
                  <p>
                    <b>id đơn hàng:</b> {order.id_order}
                  </p>
                  <p>
                    <b>Tên khách:</b> {order.name}
                  </p>
                  <p>
                    <b>Số điện thoại:</b> {order.phone}
                  </p>
                  <p>
                    <b>Địa chỉ:</b> {order.address}
                  </p>
                  <p>
                    <b>Ngày tạo đơn hàng:</b> {order.create_date}
                  </p>

                  <div>
                    <b>Danh sách sản phẩm</b>
                    {ordersDetail
                      .filter((item) => item.id_order === order.id_order)
                      .map((item) => (
                        <p>
                          {item.id_product} - {item.name}{" "}
                          {formatMoney(
                            priceByDiscount(item.price, item.discount)
                          )}{" "}
                          x {item.quantity} ={" "}
                          {formatMoney(
                            priceByQuantity(
                              priceByDiscount(item.price, item.discount),
                              item.quantity
                            )
                          )}
                        </p>
                      ))}
                  </div>

                  <p>
                    <b>Tổng tiền:</b>{" "}
                    {formatMoney(
                      checkoutCart(
                        ordersDetail.filter(
                          (item) => item.id_order === order.id_order
                        )
                      )
                    )}
                  </p>
                </div>
              ))}
          </Col>
        </div>
      </div>
    </>
  )
}

export default Shipper
