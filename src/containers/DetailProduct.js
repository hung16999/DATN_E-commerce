import React, { useState } from "react"
import { pricingByDiscount, formatMoney } from "./functions"
import "../assets/scss/DetailProduct.scss"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"

const DetailProduct = ({ product }) => {
  const { md } = useBreakpoint()
  const [count, setCount] = useState(1)
  const item = product

  return (
    <div className="detailProduct">
      <div className={md ? "wrapper" : "wrapper wrapper--mobile"}>
        <div
          className="wrapper__image"
          style={{ backgroundImage: `url(${item.src})` }}
        ></div>

        <div className="wrapper__info">
          <h2>{item.label}</h2>

          <div className="wrapper__info--flex">
            {item.discount !== 0 && (
              <div className="wrapper__info__discount">-{item.discount}%</div>
            )}
            <div className="wrapper__info__price">
              <div className="wrapper__info__price__properties">
                {item.discount ? (
                  <>
                    <div>Giá niêm yết</div>
                    <div>Giá khuyến mãi</div>
                  </>
                ) : (
                  <div>Giá bán lẻ</div>
                )}
              </div>

              <div className="wrapper__info__price__value">
                {item.discount ? (
                  <>
                    <div className="wrapper__info__price__value--lineThrough">
                      {formatMoney(item.price)}
                    </div>
                    <div>{formatMoney(pricingByDiscount(item))}</div>
                  </>
                ) : (
                  <div>{formatMoney(item.price)}</div>
                )}
              </div>
            </div>

            <div className="wrapper__info__counter">
              <div>Chọn số lượng</div>
              <div>
                <button
                  disabled={count === 1}
                  onClick={() => setCount(count - 1)}
                >
                  -
                </button>
                <input
                  className="wrapper__info__counter__input"
                  type="text"
                  value={count}
                />
                <button onClick={() => setCount(count + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className="wrapper__button">
            <button>MUA NGAY</button>
            <button>THÊM VÀO GIỎ HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
