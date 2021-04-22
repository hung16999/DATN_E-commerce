import { tubersList } from "./tubersList"

const initialState = {
  tubers: tubersList,
  cart: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "pushToCart":
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
    default:
      return state
  }
}
