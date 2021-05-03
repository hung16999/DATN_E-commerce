export const pushToCart = (payload) => {
  return {
    type: "PUSH_ITEM_TO_CART",
    payload,
  }
}

export const increaseQuantity = (payload) => {
  return {
    type: "INCREASE_QUANTITY",
    payload,
  }
}

export const decreaseQuantity = (payload) => {
  return {
    type: "DECREASE_QUANTITY",
    payload,
  }
}

export const deleteItemInCart = (payload) => {
  return {
    type: "DELETE_ITEM_IN_CART",
    payload,
  }
}

export const deleteAllItemInCart = () => {
  return {
    type: "DELETE_ALL_ITEM_IN_CART",
  }
}
