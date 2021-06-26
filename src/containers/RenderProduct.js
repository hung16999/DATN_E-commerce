import "../assets/scss/RenderProduct.scss"

import React, { useEffect, useState } from "react"
import { formatMoney, priceByDiscount } from "./functions"

import Modal from "antd/lib/modal/Modal"
import ProductDetail from "./ProductDetail"

const RenderProduct = ({ products }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [itemSelected, setItemSelected] = useState({})
  const [data, setData] = useState([])

  useEffect(() => {
    setData(products)
  }, [products])

  const increaseQuantity = (item) => {
    const found = data.find((product) => product.id === item.id)
    found.quantity++
    setData([...data])
  }

  const decreaseQuantity = (item) => {
    const found = data.find((product) => product.id === item.id)
    found.quantity--
    setData([...data])
  }

  const handleCancel = () => {
    setIsShowModal(false)
  }

  const handleClick = (item) => {
    setIsShowModal(true)
    setItemSelected(item)
  }

  return (
    <div className="renderProduct">
      <div className="wrapper">
        {data
          .sort((item1, item2) => {
            return item2.remains - item1.remains
          })
          .map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              className={
                item.remains !== 0 ? "wrapper__item" : "wrapper__item disable"
              }
            >
              {item.remains === 0 && (
                <div className="wrapper__item__sold-out">HẾT HÀNG</div>
              )}
              <div
                className={
                  item.discount !== 0
                    ? "wrapper__item__discount"
                    : "wrapper__item__discount hidden"
                }
              >
                <span>-{item.discount}%</span>
              </div>

              <div className="wrapper__item__img">
                <img src={item.src} alt="" />
              </div>

              <div className="wrapper__item__name__price">
                <div className="wrapper__item__name">{item.name}</div>
                <div className="wrapper__item__currentPrice">
                  {formatMoney(priceByDiscount(item.price, item.discount))}
                </div>

                <div
                  className={
                    item.discount
                      ? "wrapper__item__oldPrice"
                      : "wrapper__item__oldPrice hidden"
                  }
                >
                  {formatMoney(item.price)}
                </div>
              </div>
            </div>
          ))}
      </div>

      <Modal
        centered={true}
        footer={null}
        width={900}
        visible={isShowModal}
        onCancel={handleCancel}
      >
        <ProductDetail
          itemSelected={itemSelected}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </Modal>
    </div>
  )
}

export default RenderProduct
