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
  SET_CURRENT_USER,
  START_SHIP,
  PAID,
  ADD_NEW_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
} from "./state/actionType"
import { orders } from "./state/orders"

import { productsList } from "./state/productsList"
import { users } from "./state/users"

const initialState = {
  products: productsList,
  users: users,
  currentUser: null,
  cart: [],
  orders: orders,
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

    case SEND_ORDER:
      state.orders.unshift(action.payload)
      return {
        ...state,
        orders: [...state.orders],
      }

    case PICKUP:
      const findedPickUp = state.orders.find(
        (order) => order.id === action.payload
      )
      if (findedPickUp) {
        findedPickUp.status = 2
      }
      return {
        ...state,
        orders: [...state.orders],
      }

    case START_SHIP:
      const findedStartShip = state.orders.find(
        (order) => order.id === action.payload
      )
      if (findedStartShip) {
        findedStartShip.status = 3
      }
      return {
        ...state,
        orders: [...state.orders],
      }

    case PAID:
      const findedPaid = state.orders.find(
        (order) => order.id === action.payload
      )
      if (findedPaid) {
        findedPaid.status = 4
      }
      return {
        ...state,
        orders: [...state.orders],
      }

    case ADD_NEW_ACCOUNT:
      state.users.unshift(action.payload)
      return {
        ...state,
        users: [...state.users],
      }

    case EDIT_ACCOUNT:
      console.log(action.payload)
      const newUsers = [...state.users]
      const index = newUsers.findIndex((user) => user.id === action.payload.id)

      if (index > -1) {
        const item = newUsers[index]
        newUsers.splice(index, 1, { ...item, ...action.payload.row })
      } else {
        newUsers.push(action.payload.row)
      }
      console.log(newUsers)

      return {
        ...state,
        users: [...newUsers],
      }

    case DELETE_ACCOUNT:
      console.log("action---", action.payload)
      const indexUser = state.users.findIndex(
        (user) => user.id === action.payload.id
      )
      console.log("---index", indexUser)
      state.users.splice(indexUser, 1)
      return {
        ...state,
        users: [...state.users],
      }
    default:
      return state
  }
}
