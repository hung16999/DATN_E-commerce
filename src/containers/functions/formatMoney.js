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
