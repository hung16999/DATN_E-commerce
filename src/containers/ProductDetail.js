import React from "react"
import { pushToCart } from "../redux/actions"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { formatMoney, priceByDiscount, priceByQuantity } from "./functions"
import "../assets/scss/ProductDetail.scss"

const ProductDetail = (props) => {
  const { itemSelected, increaseQuantity, decreaseQuantity } = props
  const history = useHistory()
  const dispatch = useDispatch()

  const pushItem = () => {
    const item = Object.assign({}, itemSelected)
    dispatch(pushToCart(item))
  }

  const redirectToCart = () => {
    pushItem()
    history.push("/shoppingcart")
  }

  return (
    <div className="detailProduct">
      <div className="image">
        <img src={itemSelected.src} alt="" />
      </div>

      <div className="info">
        <h2>{itemSelected.name}</h2>

        <div className="info--flex">
          {itemSelected.discount !== 0 && (
            <div className="info__discount">-{itemSelected.discount}%</div>
          )}

          <div className="info__price">
            <div className="info__price__properties">
              {itemSelected.discount ? (
                <>
                  <div>Giá niêm yết</div>
                  <div>Giá khuyến mãi</div>
                </>
              ) : (
                <div>Giá bán lẻ</div>
              )}
            </div>

            <div className="info__price__value">
              {itemSelected.discount ? (
                <>
                  <div className="info__price__value--lineThrough">
                    {formatMoney(itemSelected.price)}
                  </div>
                  <div>
                    {formatMoney(
                      priceByDiscount(itemSelected.price, itemSelected.discount)
                    )}
                  </div>
                </>
              ) : (
                <div>{formatMoney(itemSelected.price)}</div>
              )}
            </div>
          </div>

          <div className="info__counter">
            <span>Chọn số lượng</span>
            <button
              disabled={itemSelected.quantity === 1}
              onClick={() => decreaseQuantity(itemSelected)}
            >
              -
            </button>
            <input type="text" value={itemSelected.quantity} disabled={true} />
            <button onClick={() => increaseQuantity(itemSelected)}>+</button>

            <span>
              {formatMoney(
                priceByQuantity(
                  priceByDiscount(itemSelected),
                  itemSelected.quantity
                )
              )}
            </span>
          </div>
        </div>

        <div className="button">
          <button onClick={redirectToCart}>MUA NGAY</button>
          <button onClick={pushItem}>THÊM VÀO GIỎ HÀNG</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
