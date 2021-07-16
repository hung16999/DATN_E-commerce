import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"

import API from "../../../env/api"

import { logout } from "../../../redux/actions"
import { setUserToLocalStorage } from "../../../utils/localStorage"
import { counterOrderByStatus } from "../../../containers/functions"

import "../../../assets/scss/salesman.scss"
import { Tabs, Badge } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import OrdersDetail from "../../common/OrdersDetail"

const Salesman = () => {
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

  const handlePickUp = (id, status) => {
    const formData = new FormData()

    formData.append("id", id)
    formData.append("updateStatus", status)

    API.post(`update_status_order.php`, formData).then(fetchOrders())
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

      <div
        style={{
          marginTop: "20px",
          width: "200px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Badge count={counterOrderByStatus(orders, 1)}></Badge>
        <Badge count={counterOrderByStatus(orders, 2)}></Badge>
      </div>

      <Tabs defaultActiveKey={1}>
        <TabPane tab="Đang chờ xử lý" key={1}>
          <OrdersDetail
            orders={orders.filter(
              (orderFilter) => orderFilter.id_order_status === 1
            )}
            ordersDetail={ordersDetail}
            handleOnClick={handlePickUp}
            buttonName="Đã lấy hàng"
            status={2}
          />
        </TabPane>

        <TabPane tab="Đã lấy hàng" key={2}>
          <OrdersDetail
            orders={orders.filter(
              (orderFilter) => orderFilter.id_order_status === 2
            )}
            ordersDetail={ordersDetail}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Salesman
