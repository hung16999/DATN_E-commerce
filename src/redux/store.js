import { createStore } from "redux"
import { productReducer } from "./state/productReducer"

const store = createStore(productReducer)

export default store
