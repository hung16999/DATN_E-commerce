import "./assets/scss/index.scss"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import React, { useState } from "react"

import { BackDrop } from "./components/header/BackDrop"
import DrawerMenu from "./components/header/DrawerMenu"
import { Grid } from "antd"
import NavBarDesktop from "./components/header/NavBarDesktop"
import NavBarMobile from "./components/header/NavBarMobile"
import { Provider } from "react-redux"
import { routes } from "./router/routes"
import store from "./redux/store"

const { useBreakpoint } = Grid

const App = () => {
  const { md } = useBreakpoint()
  const [isShowMenu, setIsShowMenu] = useState(false)

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* {md ? (
          <NavBarDesktop setIsShowMenu={setIsShowMenu} />
        ) : (
          <NavBarMobile isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
        )}

        {!md && (
          <DrawerMenu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
        )}

        {!md && isShowMenu && <BackDrop setIsShowMenu={setIsShowMenu} />} */}

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
