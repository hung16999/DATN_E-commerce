import React, { useState } from "react"
import { Row, Grid } from "antd"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { routes } from "../../routes"
import NavigationDesktop from "./NavigationDesktop"
import NavigationMobile from "./NavigationMobile"
import DrawerMenu from "./DrawerMenu"

const { useBreakpoint } = Grid

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const { md } = useBreakpoint()

  return (
    <div>
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
    </div>
  )
}

export default Header
