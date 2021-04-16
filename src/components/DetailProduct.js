import { Row, Col } from "antd"
import { Content } from "antd/lib/layout/layout"
import NumberFormat from "react-number-format"
import React, { useState } from "react"
import { useParams } from "react-router"
import { tubersList } from "../assets/tubersList"
import "./../assets/scss/DetailProduct.scss"

const DetailProduct = () => {
  const [count, setCount] = useState(1)
  const { id } = useParams()
  const item = tubersList.find((item) => item.id === id)

  const pricing = (item) => {
    const pricing = item.price - (item.price * item.discount) / 100
    return pricing
  }

  return (
    <Content>
      <Row className="detail__product">
        <Col span={8}>
          <img src={item.src} alt="" />
        </Col>

        <Col span={16}>
          <h2>{item.label}</h2>
          <div className="price__status">
            <div>
              {item.discount ? (
                <div>
                  <div>Giá niêm yết</div>
                  <div>Giá khuyến mãi</div>
                </div>
              ) : (
                <div>Giá bán lẻ</div>
              )}

              <div>Tình trạng sản phẩm</div>
              <div>Vận chuyển</div>
              <div>Chọn số lượng</div>
            </div>

            <div>
              {item.discount ? (
                <div>
                  <div>
                    <NumberFormat
                      value={item.price}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="đ"
                    />
                  </div>
                  <div>
                    <b>
                      <NumberFormat
                        value={pricing(item)}
                        displayType="text"
                        thousandSeparator={true}
                        suffix="đ"
                      />
                    </b>
                  </div>
                </div>
              ) : (
                <div>
                  <b>
                    <NumberFormat
                      value={pricing(item)}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="đ"
                    />
                  </b>
                </div>
              )}

              {item.remains ? <div>Còn hàng</div> : <b>Hết hàng</b>}
              <div>Giao hàng trong vòng 4h</div>
              <div>
                <button
                  disabled={count === 1}
                  onClick={() => setCount(count - 1)}
                >
                  -
                </button>
                <input type="text" value={count} />
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Content>
  )
}

export default DetailProduct
