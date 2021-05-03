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

export const countItemInCart = (array) => {
  return array.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}

export const checkoutCart = (array) => {
  return array.reduce((total, item) => {
    return total + priceByDiscount(item) * item.quantity
  }, 0)
}