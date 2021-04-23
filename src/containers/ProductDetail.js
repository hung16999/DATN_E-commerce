import "../assets/scss/ProductDetail.scss"

import { formatMoney, priceByDiscount, priceByQuantity } from "./functions"

import React from "react"
import { pushToCart } from "../redux/actions"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const ProductDetail = (props) => {
  const { itemSelected, increaseQuantity, decreaseQuantity } = props
  const history = useHistory()
  const { md } = useBreakpoint()
  const dispatch = useDispatch()

  const push = () => {
    const item = Object.assign({}, itemSelected)
    dispatch(pushToCart(item))
  }

  const redirectToCart = () => {
    push()
    history.push("/payment")
  }

  return (
    <div className="detailProduct">
      <div className={md ? "wrapper" : "wrapper wrapper--mobile"}>
        <div
          className="wrapper__image"
          style={{ backgroundImage: `url(${itemSelected.src})` }}
        ></div>

        <div className="wrapper__info">
          <h2>{itemSelected.label}</h2>

          <div className="wrapper__info--flex">
            {itemSelected.discount !== 0 && (
              <div className="wrapper__info__discount">
                -{itemSelected.discount}%
              </div>
            )}

            <div className="wrapper__info__price">
              <div className="wrapper__info__price__properties">
                {itemSelected.discount ? (
                  <>
                    <div>Giá niêm yết</div>
                    <div>Giá khuyến mãi</div>
                  </>
                ) : (
                  <div>Giá bán lẻ</div>
                )}
              </div>

              <div className="wrapper__info__price__value">
                {itemSelected.discount ? (
                  <>
                    <div className="wrapper__info__price__value--lineThrough">
                      {formatMoney(itemSelected.price)}
                    </div>
                    <div>{formatMoney(priceByDiscount(itemSelected))}</div>
                  </>
                ) : (
                  <div>{formatMoney(itemSelected.price)}</div>
                )}
              </div>
            </div>

            <div className="wrapper__info__counter">
              <div>Chọn số lượng</div>
              <div>
                <button
                  disabled={itemSelected.quantity === 1}
                  onClick={() => decreaseQuantity(itemSelected)}
                >
                  -
                </button>

                <input
                  className="wrapper__info__counter__input"
                  type="text"
                  value={itemSelected.quantity}
                  disabled={true}
                />

                <button onClick={() => increaseQuantity(itemSelected)}>
                  +
                </button>
              </div>

              <div>
                {formatMoney(
                  priceByQuantity(
                    priceByDiscount(itemSelected),
                    itemSelected.quantity
                  )
                )}
              </div>
            </div>
          </div>

          <div className="wrapper__button">
            <button onClick={redirectToCart}>MUA NGAY</button>
            <button onClick={push}>THÊM VÀO GIỎ HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
