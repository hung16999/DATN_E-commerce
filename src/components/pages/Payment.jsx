import "./../../assets/scss/Payment.scss"

import { Col, Popconfirm, Row } from "antd"
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

import { Content } from "antd/lib/layout/layout"
import DeleteIcon from "@material-ui/icons/Delete"
import { Link } from "react-router-dom"
import PaymentIcon from "@material-ui/icons/Payment"
import React from "react"

const Payment = () => {
  const cart = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  console.log("--cart--", cart)

  const deleteItem = (item) => {
    dispatch(deleteItemInCart(item))
  }

  const deleteAllItem = () => {
    dispatch(deleteAllItemInCart())
  }

  return (
    <Content className="payment">
      <Row className="wrapper">
        <Col span={17}>
          <Col span={24} className="wrapper__button">
            <Link to="/">TIẾP TỤC MUA HÀNG</Link>
            <Popconfirm
              title="TOÀN BỘ SẢN PHẨM TRONG GIỎ HÀNG SẼ BỊ XÓA !"
              placement="bottomRight"
              onConfirm={deleteAllItem}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <button className={!cart.length && "disable"}>
                <DeleteIcon />
                XÓA GIỎ HÀNG
              </button>
            </Popconfirm>
          </Col>

          <Col span={24}>
            {cart.map((item) => (
              <Col key={item.id} span={24} className="wrapper__item">
                <Col span={5}>
                  <img src={item.src} alt="" />
                </Col>

                <Col span={7} className="wrapper__item__title">
                  <Col span={24}>
                    <span>{item.name}</span>
                  </Col>

                  <Col span={24}>
                    <Popconfirm
                      title="Bạn có muốn xóa sản phẩm khỏi giỏ hàng"
                      onConfirm={() => deleteItem(item)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <button>Xóa</button>
                    </Popconfirm>
                  </Col>
                </Col>

                <Col span={12}>
                  <Row>
                    <Col span={12} className="wrapper__item__money">
                      {item.discount !== 0 && (
                        <>
                          <span className="wrapper__item__money__blur">
                            {formatMoney(
                              priceByQuantity(item.quantity, item.price)
                            )}
                          </span>

                          <span>({`-${item.discount}%`})</span>
                        </>
                      )}

                      <span className="wrapper__item__money__bold">
                        {formatMoney(
                          priceByQuantity(item.quantity, priceByDiscount(item))
                        )}
                      </span>
                    </Col>

                    <Col span={12} className="wrapper__item__counter">
                      <button
                        disabled={item.quantity === 1}
                        onClick={() => {
                          dispatch(decreaseQuantity(item))
                        }}
                      >
                        -
                      </button>

                      <input
                        type="text"
                        disabled={true}
                        value={item.quantity}
                      />

                      <button
                        onClick={() => {
                          dispatch(increaseQuantity(item))
                        }}
                      >
                        +
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Col>
            ))}
          </Col>
        </Col>

        <Col span={7}>
          <div className="wrapper__pricing">
            <div className="wrapper__pricing__price">
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
              <PaymentIcon />
              <span>THANH TOÁN</span>
            </button>
          </div>
        </Col>
      </Row>
    </Content>
  )
}

export default Payment
