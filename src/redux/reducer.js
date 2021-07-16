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

const initialState = {
  currentUser: null,
  cart: [],
  orders: [],
  ordersDetail: [],
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      state.currentUser = action.payload
      return { ...state }

    case LOG_OUT:
      return { ...state, currentUser: null }

    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload }

    case PUSH_ITEM_TO_CART:
      const copyItem = Object.assign({}, action.payload)
      const found = state.cart.find((item) => item.id === copyItem.id)
      if (found) {
        found.quantity += copyItem.quantity
      } else {
        state.cart.push(action.payload)
      }
      return {
        ...state,
        cart: [...state.cart],
      }

    case INCREASE_QUANTITY:
      state.cart.find((item) => item.id === action.payload.id).quantity++
      return {
        ...state,
        cart: [...state.cart],
      }

    case DECREASE_QUANTITY:
      state.cart.find((item) => item.id === action.payload.id).quantity--
      return {
        ...state,
        cart: [...state.cart],
      }

    case DELETE_ITEM_IN_CART:
      state.cart.splice(
        state.cart.findIndex((item) => item.id === action.payload.id),
        1
      )
      return {
        ...state,
        cart: [...state.cart],
      }

    case DELETE_ALL_ITEM_IN_CART:
      return {
        ...state,
        cart: [],
      }

    default:
      return state
  }
}
