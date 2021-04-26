import "../assets/scss/ProductDetail.scss"

import { formatMoney, priceByDiscount, priceByQuantity } from "./functions"

import React from "react"
import { pushToCart } from "../redux/actions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const ProductDetail = (props) => {
  const { itemSelected, increaseQuantity, decreaseQuantity } = props
  const history = useHistory()
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
      <div className="wrapper">
        <div
          className="wrapper__image"
          style={{ backgroundImage: `url(${itemSelected.src})` }}
        ></div>

        <div className="wrapper__info">
          <h2>{itemSelected.name}</h2>

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
              <div>
                <span>Chọn số lượng</span>
                <button
                  disabled={itemSelected.quantity === 1}
                  onClick={() => decreaseQuantity(itemSelected)}
                >
                  -
                </button>

                <input
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
