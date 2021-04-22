import "./../../assets/scss/Payment.scss"

import { Col, Row } from "antd"
import {
  formatMoney,
  priceByDiscount,
  priceByQuantity,
} from "../../containers/functions"

import { Content } from "antd/lib/layout/layout"
import { Link } from "react-router-dom"
import React from "react"
import { useSelector } from "react-redux"

const Payment = () => {
  const cart = useSelector((store) => store.cart)

  return (
    <Content className="payment">
      <Row className="wrapper">
        <Col span={17}>
          <Col span={24} className="wrapper__button">
            <Link to="/">TIẾP TỤC MUA HÀNG</Link>
            <button>XÓA GIỎ HÀNG</button>
          </Col>

          <Col span={24}>
            {cart.map((item) => (
              <Col span={24} className="wrapper__item">
                <Col span={5}>
                  <img src={item.src} alt="" />
                </Col>

                <Col span={8} className="wrapper__item__title">
                  <Col span={24}>
                    <span>{item.name}</span>
                  </Col>
                  <Col span={24}>
                    <button>Xóa</button>
                  </Col>
                </Col>

                <Col span={11}>
                  <Row>
                    <Col span={12}>
                      <span>
                        {formatMoney(
                          priceByQuantity(item.quantity, priceByDiscount(item))
                        )}
                      </span>

                      {item.discount !== 0 && (
                        <>
                          <span>
                            {formatMoney(
                              priceByQuantity(item.quantity, item.price)
                            )}
                          </span>

                          <span>({`-${item.discount}%`})</span>
                        </>
                      )}
                    </Col>

                    <Col span={10} className="wrapper__item__counter">
                      <button>-</button>
                      <input
                        type="text"
                        disabled={true}
                        value={item.quantity}
                      />
                      <button>+</button>
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
                <span>Thành tiền</span>
              </div>

              <div>
                <span>333333333333333</span>
                <span>2</span>
                <span>1</span>
              </div>
            </div>

            <div>Đã bao gồm cả VAT</div>
            <button>THANH TOÁN</button>
          </div>
        </Col>
      </Row>
    </Content>
  )
}

export default Payment
