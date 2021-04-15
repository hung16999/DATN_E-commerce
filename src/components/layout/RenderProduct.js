import React from "react"
import { Link } from "react-router-dom"
import NumberFormat from "react-number-format"
import "./../../assets/scss/RenderProduct.scss"
import ButtonReturnTop from "./ButtonReturnTop"

const RenderProduct = ({ listProduct }) => {
  const pricing = (item) => {
    const pricing = item.price - (item.price * item.discount) / 100
    return pricing
  }

  return (
    <div className="list__product">
      {listProduct.map((item) => (
        <Link
          to={"/detail-product/" + item.id}
          className={item.remains ? "item__product" : "item__product sold-out"}
        >
          <div className="product">
            {item.discount ? (
              <p className="product__discount">-{item.discount}%</p>
            ) : (
              <p className="product__discount hidden">-{item.discount}%</p>
            )}

            <div className="product__img">
              <img src={item.src} alt="" />
            </div>

            <div className="label--price">
              <p className="product__label">{item.label}</p>
              <p className="product__curentPrice">
                <NumberFormat
                  value={pricing(item)}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </p>

              {item.discount ? (
                <p className="product__oldPrice">
                  <NumberFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </p>
              ) : (
                <p className="product__oldPrice hidden">
                  <NumberFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"đ"}
                  />
                </p>
              )}
            </div>

            <button className="product__button">
              {item.remains ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
            </button>
          </div>
        </Link>
      ))}

      <ButtonReturnTop />
    </div>
  )
}

export default RenderProduct
