import { createStore } from "redux"
import { productReducer } from "./state/product"

const store = createStore(productReducer)

export default store
