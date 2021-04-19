import React, { useState } from "react"
import { pricingByDiscount, formatMoney } from "./functions"
import "../assets/scss/DetailProduct.scss"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import { pushItemToCart } from "../redux/state/product"
import { useDispatch } from "react-redux"

const DetailProduct = ({ product }) => {
  const dispatch = useDispatch()
  const { md } = useBreakpoint()
  const [count, setCount] = useState(1)

  const pushItem = () => {
    setCount(count + 1)
    dispatch(pushItemToCart(product))
  }

  const popItem = () => {
    setCount(count - 1)
    // dispatch()
  }

  return (
    <div className="detailProduct">
      <div className={md ? "wrapper" : "wrapper wrapper--mobile"}>
        <div
          className="wrapper__image"
          style={{ backgroundImage: `url(${product.src})` }}
        ></div>

        <div className="wrapper__info">
          <h2>{product.label}</h2>

          <div className="wrapper__info--flex">
            {product.discount !== 0 && (
              <div className="wrapper__info__discount">
                -{product.discount}%
              </div>
            )}
            <div className="wrapper__info__price">
              <div className="wrapper__info__price__properties">
                {product.discount ? (
                  <>
                    <div>Giá niêm yết</div>
                    <div>Giá khuyến mãi</div>
                  </>
                ) : (
                  <div>Giá bán lẻ</div>
                )}
              </div>

              <div className="wrapper__info__price__value">
                {product.discount ? (
                  <>
                    <div className="wrapper__info__price__value--lineThrough">
                      {formatMoney(product.price)}
                    </div>
                    <div>{formatMoney(pricingByDiscount(product))}</div>
                  </>
                ) : (
                  <div>{formatMoney(product.price)}</div>
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
            <button onClick={pushItem}>THÊM VÀO GIỎ HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
