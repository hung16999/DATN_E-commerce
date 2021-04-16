import React, { useState } from "react"
import "./assets/scss/index.scss"
import { Row, Grid } from "antd"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { routes } from "./router/routes"
import NavigationDesktop from "./components/header/NavigationDesktop"
import NavigationMobile from "./components/header/NavigationMobile"
import DrawerMenu from "./components/header/DrawerMenu"

const { useBreakpoint } = Grid

const App = () => {
  const { md } = useBreakpoint()
  const [isShowMenu, setIsShowMenu] = useState()

  return (
    <>
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
    </>
  )
}

export default App
