import "./../../assets/scss/Payment.scss"

import {
  ArrowLeftOutlined,
  DeleteFilled,
  WalletFilled,
} from "@ant-design/icons"
import {
  checkoutCart,
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"
import {
  decreaseQuantity,
  deleteAllItemInCart,
  deleteItemInCart,
  increaseQuantity,
} from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { Popconfirm } from "antd"
import React from "react"

const Payment = () => {
  const cart = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  const deleteItem = (item) => {
    dispatch(deleteItemInCart(item))
  }

  const deleteAllItem = () => {
    dispatch(deleteAllItemInCart())
  }

  return (
    <div className="payment">
      <div className="wrapper">
        <div className="wrapper--left">
          <div className="button">
            <Link to="/">
              <ArrowLeftOutlined className="button__icon" />
              TIẾP TỤC MUA HÀNG
            </Link>

            <Popconfirm
              title="TOÀN BỘ SẢN PHẨM TRONG GIỎ HÀNG SẼ BỊ XÓA !"
              placement="bottomRight"
              onConfirm={deleteAllItem}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <button className={!cart.length && "disable"}>
                <DeleteFilled className="button__icon" />
                XÓA GIỎ HÀNG
              </button>
            </Popconfirm>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="item">
              <img src={item.src} alt="" />

              <div className="item__title">
                <span>{item.name}</span>

                <Popconfirm
                  title="Bạn có muốn xóa sản phẩm khỏi giỏ hàng"
                  onConfirm={() => deleteItem(item)}
                  okText="Có"
                  cancelText="Không"
                >
                  <span>Xóa</span>
                </Popconfirm>
              </div>

              <div className="item__price">
                <div className="item__price__money">
                  {item.discount !== 0 && (
                    <>
                      <span className="item__price__money--blur">
                        {formatMoney(
                          priceByQuantity(item.quantity, item.price)
                        )}
                      </span>

                      <span>({`-${item.discount}%`})</span>
                    </>
                  )}

                  <span className="item__price__money--bold">
                    {formatMoney(
                      priceByQuantity(item.quantity, priceByDiscount(item))
                    )}
                  </span>
                </div>

                <div className="item__price__counter">
                  {item.quantity === 1 ? (
                    <Popconfirm
                      title="Bạn có muốn xóa sản phẩm khỏi giỏ hàng"
                      onConfirm={() => deleteItem(item)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <button>-</button>
                    </Popconfirm>
                  ) : (
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => {
                        dispatch(decreaseQuantity(item))
                      }}
                    >
                      -
                    </button>
                  )}

                  <input type="text" disabled={true} value={item.quantity} />
                  <button
                    onClick={() => {
                      dispatch(increaseQuantity(item))
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wrapper--right">
          <div className="pricing">
            <div>
              <span>Tạm tính</span>
              <span>Khuyến mãi</span>
              <span>Phí vận chuyển</span>
              <span>Thành tiền</span>
            </div>

            <div>
              <span>{formatMoney(checkoutCart(cart))}</span>
              <span>0</span>
              <span>0</span>
              <span>{formatMoney(checkoutCart(cart))}</span>
            </div>
          </div>

          <button>
            <WalletFilled />
            <span>THANH TOÁN</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment
