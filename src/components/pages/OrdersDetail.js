import React from "react"
import { Table } from "antd"
import {
  checkoutCart,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"

const OrdersDetail = ({
  orders,
  ordersDetail,
  handleOnClick,
  buttonName,
  status,
}) => {
  const columns = [
    {
      title: "id đơn hàng",
      dataIndex: "id_order",
      key: "id_order",
    },
    {
      title: "Tên khách",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày tạo đơn hàng",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "Danh sách sản phẩm",
      key: "list",
      render: (record) => (
        <>
          {ordersDetail
            .filter((item) => item.id_order === record.id_order)
            .map((item) => (
              <p>
                {item.id_product} - {item.name}{" "}
                {formatMoney(priceByDiscount(item.price, item.discount))} x{" "}
                {item.quantity} ={" "}
                {formatMoney(
                  priceByQuantity(
                    priceByDiscount(item.price, item.discount),
                    item.quantity
                  )
                )}
              </p>
            ))}
        </>
      ),
    },
    {
      title: "Tổng tiền",
      key: "total",
      render: (record) => (
        <>
          {formatMoney(
            checkoutCart(
              ordersDetail.filter((item) => item.id_order === record.id_order)
            )
          )}
        </>
      ),
    },
    {
      title: "",
      key: "button",
      render: (record) => (
        <>
          <button
            onClick={() => {
              handleOnClick(record.id_order, status)
            }}
          >
            {buttonName}
          </button>
        </>
      ),
    },
  ]

  const handleColumns = () => {
    if (!handleOnClick) {
      columns.pop()
    }

    return columns
  }

  return (
    <>
      <Table
        columns={handleColumns()}
        dataSource={orders}
        pagination={false}
      ></Table>
    </>
  )
}

export default OrdersDetail
