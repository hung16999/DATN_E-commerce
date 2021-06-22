import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { setCurrentUser } from "./redux/actions"
import store from "./redux/store"
import reportWebVitals from "./reportWebVitals"
import { getUserFromLocalStorage } from "./utils/localStorage"

const user = getUserFromLocalStorage()

store.dispatch(setCurrentUser(user))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
