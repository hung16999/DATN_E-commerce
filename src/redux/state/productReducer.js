import { productsList } from "./productsList"

const initialState = {
  products: productsList,
  cart: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_ITEM_TO_CART":
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
    case "INCREASE_QUANTITY":
      state.cart.find((item) => item.id === action.payload.id).quantity++

      return {
        ...state,
        cart: [...state.cart],
      }
    case "DECREASE_QUANTITY":
      state.cart.find((item) => item.id === action.payload.id).quantity--

      return {
        ...state,
        cart: [...state.cart],
      }
    case "DELETE_ITEM_IN_CART":
      state.cart.splice(
        state.cart.findIndex((item) => item.id === action.payload.id),
        1
      )

      return {
        ...state,
        cart: [...state.cart],
      }
    case "DELETE_ALL_ITEM_IN_CART":
      return {
        ...state,
        cart: [],
      }
    default:
      return state
  }
}
