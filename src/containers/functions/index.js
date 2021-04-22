import NumberFormat from "react-number-format"

export const formatMoney = (number) => {
  return (
    <NumberFormat
      value={number}
      displayType="text"
      thousandSeparator={true}
      suffix="đ"
    />
  )
}

export const priceByQuantity = (price, quantity) => {
  return price * quantity
}

export const priceByDiscount = (item) => {
  return item.price - (item.price * item.discount) / 100
}
