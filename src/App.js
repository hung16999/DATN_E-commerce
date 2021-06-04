import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"

import { routes } from "./router/routes"
import store from "./redux/store"

import "./assets/scss/index.scss"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route
              path={route.path}
              key={`route-${route.path}`}
              exact={route.exact}
            >
              {route.Component}
            </Route>
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
