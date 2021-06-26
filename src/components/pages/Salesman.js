import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"

import API from "../../env/api"

import { logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"
import {
  checkoutCart,
  counterOrderByStatus,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"

import "../../assets/scss/salesman.scss"
import { Col, Row } from "antd"
import { LogoutOutlined } from "@ant-design/icons"

const Salesman = () => {
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

  console.log(orders)
  console.log(ordersDetail)

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

  return (
    <div className="salesman">
      <div className="salesman__header">
        <span>Nông sản sạch</span>
        <span>Trang của người bán hàng</span>
        <span>
          {currentUser && currentUser.name}{" "}
          <LogoutOutlined
            style={{ marginLeft: "15px", color: "white" }}
            onClick={handleLogout}
          />
        </span>
      </div>

      <Row className="salesman__title">
        <Col span={12}>
          <h2>
            Đang chờ xử lý{" "}
            <span style={{ color: "red" }}>
              {counterOrderByStatus(orders, 1)} đơn
            </span>
          </h2>
        </Col>

        <Col span={12}>
          <h2>Đã lấy hàng</h2>
        </Col>
      </Row>

      <div className="salesman__wrapper">
        <Col className="salesman__wrapper__list" span={12}>
          {orders
            .filter((orderFilter) => orderFilter.id_order_status === 1)
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

                <button onClick={() => {}}>Đã lấy hàng</button>
              </div>
            ))}
        </Col>

        <Col className="salesman__wrapper__list" span={12}>
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
  )
}

export default Salesman
