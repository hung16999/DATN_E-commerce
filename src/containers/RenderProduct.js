import React, { useState } from "react"
import { pricingByDiscount, formatMoney } from "./functions"
import "../assets/scss/RenderProduct.scss"
import Modal from "antd/lib/modal/Modal"
import DetailProduct from "./DetailProduct"

const RenderProduct = ({ listProduct }) => {
  const [isShowModal, setisShowModal] = useState(false)
  const [itemClicked, setItemClicked] = useState({})

  const handleCancel = () => {
    setisShowModal(false)
  }

  const handleClick = (item) => {
    setisShowModal(true)
    setItemClicked(item)
  }

  return (
    <div className="renderProduct">
      <div className="wrapper">
        {[...listProduct]
          .sort((item1, item2) => {
            return item2.remains - item1.remains
          })
          .map((item) => (
            <div
              onClick={() => handleClick(item)}
              className={
                item.remains ? "wrapper__item" : "wrapper__item disable"
              }
            >
              <div
                className={
                  item.discount
                    ? "wrapper__item__discount"
                    : "wrapper__item__discount hidden"
                }
              >
                <span>-{item.discount}%</span>
              </div>

              <div className="wrapper__item__img">
                <img src={item.src} alt="" />
              </div>

              <div className="wrapper__item__label__price">
                <div className="wrapper__item__label">{item.label}</div>
                <div className="wrapper__item__currentPrice">
                  {formatMoney(pricingByDiscount(item))}
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

              <button className="wrapper__item__button">
                {item.remains ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
              </button>
            </div>
          ))}
      </div>

      <Modal
        centered={true}
        footer={null}
        width={1000}
        visible={isShowModal}
        onCancel={handleCancel}
      >
        <DetailProduct product={itemClicked} />
      </Modal>
    </div>
  )
}

export default RenderProduct
