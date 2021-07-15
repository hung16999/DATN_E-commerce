import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"

import API from "../../env/api"

import { counterOrderByStatus } from "../../containers/functions"
import { Tabs, Badge } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import api from "../../env/api"
import OrdersDetail from "./OrdersDetail"

const Shipper = () => {
  const { TabPane } = Tabs
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

    api.post(`update_status_order.php`, formData).then(fetchOrders())
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

        <div
          style={{
            marginTop: "20px",
            width: "360px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Badge count={counterOrderByStatus(orders, 2)}></Badge>
          <Badge count={counterOrderByStatus(orders, 3)}></Badge>
          <Badge count={counterOrderByStatus(orders, 4)}></Badge>
        </div>

        <Tabs defaultActiveKey={1}>
          <TabPane tab="Đang chờ giao hàng" key={1}>
            <OrdersDetail
              orders={orders.filter(
                (orderFilter) => orderFilter.id_order_status === 2
              )}
              ordersDetail={ordersDetail}
              handleOnClick={handlePickUp}
              buttonName="Bắt đầu giao hàng"
              status={3}
            />
          </TabPane>

          <TabPane tab="Đang vận chuyển" key={2}>
            <OrdersDetail
              orders={orders.filter(
                (orderFilter) => orderFilter.id_order_status === 3
              )}
              ordersDetail={ordersDetail}
              handleOnClick={handlePickUp}
              buttonName="Xác nhận thanh toán"
              status={4}
            />
          </TabPane>

          <TabPane tab="Đã thanh toán" key={3}>
            <OrdersDetail
              orders={orders.filter(
                (orderFilter) => orderFilter.id_order_status === 4
              )}
              ordersDetail={ordersDetail}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default Shipper
