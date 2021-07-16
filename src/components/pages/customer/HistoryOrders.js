import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {
  checkoutCart,
  counterOrderByStatus,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../../containers/functions"
import NavBar from "../../../containers/NavBar"
import api from "../../../env/api"

const HistoryOrders = () => {
  const { currentUser } = useSelector((store) => store)
  const [orders, setOrders] = useState([])
  const [ordersDetail, setOrdersDetail] = useState([])
  const [currentStatus, setCurrentStatus] = useState(0)
  const history = useHistory()

  if (!currentUser) {
    history.push("/")
  }

  const statusOrders = [
    { id: 0, name: "Tất cả" },
    { id: 1, name: "đang chờ xử lý" },
    { id: 2, name: "đã lấy hàng" },
    { id: 3, name: "đang vận chuyển" },
    { id: 4, name: "đã thanh toán" },
  ]

  const filterOrders = (currentStatus) => {
    if (currentStatus === 0) {
      return orders
    } else {
      return orders.filter((order) => order.id_order_status === currentStatus)
    }
  }

  const toggleStatus = (status) => {
    setCurrentStatus(status)
  }

  const fetchHistoryOrders = () => {
    const formData = new FormData()
    formData.append("id_customer", currentUser.id_account)

    api.post(`get_history_order.php`, formData).then((response) => {
      setOrders(response.data)
    })

    api.post(`get_order_detail_by_id.php`, formData).then((response) => {
      setOrdersDetail(response.data)
    })
  }

  useEffect(() => {
    fetchHistoryOrders()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Helmet>Lịch sử mua hàng</Helmet>

      <NavBar />

      <h2>Lịch sử mua hàng</h2>
      <div>
        <div>
          {statusOrders.map((status) => (
            <label
              key={status.id}
              style={{ marginRight: "30px", padding: "20px", fontSize: "20px" }}
            >
              <input
                style={{ marginRight: "5px" }}
                type="radio"
                name="status"
                checked={currentStatus === status.id}
                onChange={() => toggleStatus(status.id)}
              />
              {status.name}{" "}
              <span style={{ color: "red" }}>
                {counterOrderByStatus(orders, status.id)} đơn
              </span>
            </label>
          ))}
        </div>

        {filterOrders(currentStatus).map((order) => (
          <div style={{ margin: "30px", background: "white" }}>
            <p>
              <b>id: </b>
              {order.id_order}
            </p>

            <p>
              <b>Ngày tạo đơn hàng: </b>
              {order.create_date}
            </p>

            <p>
              <b>số điện thoại: </b>
              {order.phone}
            </p>

            <p>
              <b>địa chỉ: </b>
              {order.address}
            </p>

            <p>
              <b>Danh mục sản phẩm</b>
            </p>

            {ordersDetail
              .filter((item) => item.id_order === order.id_order)
              .map((item) => (
                <p>
                  <span>
                    {item.id_product} - {item.name}:{" "}
                  </span>

                  <span>
                    {formatMoney(priceByDiscount(item.price, item.discount))} x{" "}
                    {item.quantity} ={" "}
                    {formatMoney(
                      priceByQuantity(
                        priceByDiscount(item.price, item.discount),
                        item.quantity
                      )
                    )}
                  </span>
                </p>
              ))}
            <p>
              Tổng tiền:{" "}
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
      </div>
    </>
  )
}

export default HistoryOrders
