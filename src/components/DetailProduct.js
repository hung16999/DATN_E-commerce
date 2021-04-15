import { Row, Col } from "antd"
import { Content } from "antd/lib/layout/layout"
import NumberFormat from "react-number-format"
import React from "react"
import { useParams } from "react-router"
import { tubersList } from "../assets/tubersList"
import "./../assets/scss/DetailProduct.scss"

const DetailProduct = () => {
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
              <p>Giá bán lẻ</p>
              <p>Tình trạng sản phẩm</p>
              <p>Vận chuyển</p>
            </div>

            <div>
              <p>
                <b>
                  <NumberFormat
                    value={pricing(item)}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </b>
              </p>
              {item.remains ? <p>Còn hàng</p> : <b>Hết hàng</b>}
              <p>Giao hàng trong vòng 4h</p>
            </div>
          </div>

          <div>
            <span>Chọn số lượng</span>
          </div>
        </Col>
      </Row>
    </Content>
  )
}

export default DetailProduct
