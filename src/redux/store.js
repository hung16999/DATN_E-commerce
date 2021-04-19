import { configureStore } from "@reduxjs/toolkit"
import product from "./state/product"

export default configureStore({
  reducer: {
    product: product,
  },
})
