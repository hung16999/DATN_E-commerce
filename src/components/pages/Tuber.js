import {} from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { tubersList } from "../../assets/tubersList"
import "./fruit.scss"
import NumberFormat from "react-number-format"

const Tuber = () => {
  const pricing = (item) => {
    const pricing = item.price - (item.price * item.discount) / 100
    return pricing
  }

  return (
    <div className="list__product">
      {tubersList.map((item) => (
        <Link>
          <div className="product">
            <span>-{item.discount}%</span>
            <div className="product__img">
              <img src={item.src} alt="" />
            </div>
            <p>{item.label}</p>
            <p>
              <NumberFormat
                value={pricing(item)}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <p>
              <NumberFormat
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <button>THÊM VÀO GIỎ</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Tuber
