import { createSlice } from "@reduxjs/toolkit"
import { tubersList } from "./tubersList"

export const productReducer = createSlice({
  name: "product",
  initialState: {
    tubers: tubersList,
    cart: [],
  },
  reducers: {
    pushItemToCart: (state, action) => {
      state.cart.push(action.payload)
    },
    popItemFromCart: (state, action) => {},
  },
})

export const { pushItemToCart } = productReducer.actions

export default productReducer.reducer
