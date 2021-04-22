import "./assets/scss/index.scss"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Grid, Row } from "antd"
import React, { useState } from "react"

import DrawerMenu from "./components/header/DrawerMenu"
import NavigationDesktop from "./components/header/NavigationDesktop"
import NavigationMobile from "./components/header/NavigationMobile"
import { Provider } from "react-redux"
import { routes } from "./router/routes"
import store from "./redux/store"

const { useBreakpoint } = Grid

const App = () => {
  const { md } = useBreakpoint()
  const [isShowMenu, setIsShowMenu] = useState()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <header>
          {md ? (
            <NavigationDesktop setIsShowMenu={setIsShowMenu} routes={routes} />
          ) : (
            <NavigationMobile
              isShowMenu={isShowMenu}
              setIsShowMenu={setIsShowMenu}
            />
          )}
        </header>

        {!md && (
          <DrawerMenu
            routes={routes}
            isShowMenu={isShowMenu}
            setIsShowMenu={setIsShowMenu}
          />
        )}

        <Switch>
          <Row>
            {routes.map((route, index) => (
              <Route path={route.path} key={index} exact={route.exact}>
                {route.Component}
              </Route>
            ))}
          </Row>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
