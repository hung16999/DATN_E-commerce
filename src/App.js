import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"

import { routes } from "./router/routes"
import store from "./redux/store"

import "./assets/scss/index.scss"
import AdminUser from "./components/pages/AdminUser"
import AdminProducts from "./components/pages/AdminProducts"

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

          <Route path="/admin/user" exact={true}>
            <AdminUser />
          </Route>

          <Route path="/admin/products" exact={true}>
            <AdminProducts />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
