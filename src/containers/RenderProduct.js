import React from "react"
import { Link } from "react-router-dom"
import { pricingByDiscount, formatMoney } from "./functions"
import "../assets/scss/RenderProduct.scss"

const RenderProduct = ({ listProduct }) => {
  return (
    <div className="list__product">
      {listProduct
        .sort((item1, item2) => {
          return item2.remains - item1.remains
        })
        .map((item) => (
          <Link
            to={"/detail-product/" + item.id}
            className={
              item.remains ? "item__product" : "item__product sold-out"
            }
          >
            <div className="product">
              <div
                className={
                  item.discount
                    ? "product__discount"
                    : "product__discount hidden"
                }
              >
                -{item.discount}%
              </div>

              <div className="product__img">
                <img src={item.src} alt="" />
              </div>

              <div className="label--price">
                <div className="product__label">{item.label}</div>
                <div className="product__curentPrice">
                  {formatMoney(pricingByDiscount(item))}
                </div>

                <div
                  className={
                    item.discount
                      ? "product__oldPrice"
                      : "product__oldPrice hidden"
                  }
                >
                  {formatMoney(item.price)}
                </div>
              </div>

              <button className="product__button">
                {item.remains ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
              </button>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default RenderProduct
