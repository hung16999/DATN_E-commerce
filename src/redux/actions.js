import {
  DECREASE_QUANTITY,
  DELETE_ALL_ITEM_IN_CART,
  DELETE_ITEM_IN_CART,
  INCREASE_QUANTITY,
  LOG_IN,
  LOG_OUT,
  PUSH_ITEM_TO_CART,
  SET_CURRENT_USER,
} from "./state/actionType"

export const pushToCart = (payload) => {
  return {
    type: PUSH_ITEM_TO_CART,
    payload,
  }
}

export const increaseQuantity = (payload) => {
  return {
    type: INCREASE_QUANTITY,
    payload,
  }
}

export const decreaseQuantity = (payload) => {
  return {
    type: DECREASE_QUANTITY,
    payload,
  }
}

export const deleteItemInCart = (payload) => {
  return {
    type: DELETE_ITEM_IN_CART,
    payload,
  }
}

export const deleteAllItemInCart = () => {
  return {
    type: DELETE_ALL_ITEM_IN_CART,
  }
}

export const login = (payload) => {
  return {
    type: LOG_IN,
    payload,
  }
}

export const logout = () => {
  return {
    type: LOG_OUT,
  }
}

export const setCurrentUser = (payload) => {
  return {
    type: SET_CURRENT_USER,
    payload,
  }
}
