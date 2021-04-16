import React, { useState } from "react"
import { pricingByDiscount, formatMoney } from "./functions"
import { useParams } from "react-router"
import { tubersList } from "../assets/tubersList"
import "../assets/scss/DetailProduct.scss"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"

const DetailProduct = () => {
  const { md } = useBreakpoint()
  const [count, setCount] = useState(1)
  const { id } = useParams()
  const item = tubersList.find((item) => item.id === id)

  return (
    <div className={md ? "detail" : "detail detail--mobile"}>
      <div
        className="detail__img"
        style={{ backgroundImage: `url(${item.src})` }}
      ></div>

      <div className="detail__info">
        <h2>{item.label}</h2>
        {item.discount !== 0 && <h4>Giảm {item.discount}%</h4>}

        <div className="detail__info--flex">
          <div className="detail__info__properties">
            {item.discount ? (
              <>
                <div>Giá niêm yết</div>
                <div>Giá khuyến mãi</div>
              </>
            ) : (
              <div>Giá bán lẻ</div>
            )}

            <div>Tình trạng sản phẩm</div>
            <div>Vận chuyển</div>
            <div>Chọn số lượng</div>
          </div>

          <div className="detail__info__value">
            {item.discount ? (
              <>
                <div className="detail__info__value--lineThrough">
                  {formatMoney(item.price)}
                </div>
                <div>{formatMoney(pricingByDiscount(item))}</div>
              </>
            ) : (
              <div>{formatMoney(item.price)}</div>
            )}

            <div>Còn hàng</div>

            <div>Giao hàng nhanh trong 4h</div>

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

        <div>
          <button>MUA NGAY</button>
          <button>THÊM VÀO GIỎ HÀNG</button>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
