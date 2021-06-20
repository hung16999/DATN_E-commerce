import {
  PICKUP,
  DECREASE_QUANTITY,
  DELETE_ALL_ITEM_IN_CART,
  DELETE_ITEM_IN_CART,
  INCREASE_QUANTITY,
  LOG_IN,
  LOG_OUT,
  PUSH_ITEM_TO_CART,
  SEND_ORDER,
  SET_CART_FROM_LOCAL_STOGRAGE,
  SET_CURRENT_USER,
  START_SHIP,
  PAID,
  ADD_NEW_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
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

export const setCart = (payload) => {
  return {
    type: SET_CART_FROM_LOCAL_STOGRAGE,
    payload,
  }
}

export const sendOrder = (payload) => {
  return {
    type: SEND_ORDER,
    payload,
  }
}

export const changePickUp = (payload) => {
  return {
    type: PICKUP,
    payload,
  }
}

export const changeStartShip = (payload) => {
  return {
    type: START_SHIP,
    payload,
  }
}

export const changePaid = (payload) => {
  return {
    type: PAID,
    payload,
  }
}

export const deleteAccount = (payload) => {
  return {
    type: DELETE_ACCOUNT,
    payload,
  }
}

export const editAccount = (payload) => {
  return {
    type: EDIT_ACCOUNT,
    payload,
  }
}

export const addAccount = (payload) => {
  return {
    type: ADD_NEW_ACCOUNT,
    payload,
  }
}
