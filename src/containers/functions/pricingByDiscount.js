export const pricingByDiscount = (item) => {
  return item.price - (item.price * item.discount) / 100
}
