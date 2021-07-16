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

export const priceByDiscount = (price, discount) => {
  return price - (price * discount) / 100
}

export const countItemInCart = (array) => {
  return array.reduce((total, item) => {
    return total + item.quantity
  }, 0)
}

export const checkoutCart = (array) => {
  return array.reduce((total, item) => {
    return total + priceByDiscount(item.price, item.discount) * item.quantity
  }, 0)
}

export const checkStatus = (status) => {
  switch (status) {
    case 1:
      return "Đang chờ xử lý"
    case 2:
      return "Đã lấy hàng"
    case 3:
      return "Đang vận chuyển"
    case 4:
      return "Đã thanh toán"
    default:
      return
  }
}

export const counterOrderByStatus = (array, status) => {
  let count = 0
  if (status === 0) {
    return array.length
  } else {
    array.forEach((element) => {
      if (element.id_order_status === status) {
        count++
      }
    })
  }

  return count
}
