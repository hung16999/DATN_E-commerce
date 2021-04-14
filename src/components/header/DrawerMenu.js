import React from "react"
import { Row, Col } from "antd"
import { Link } from "react-router-dom"

const DrawerMenu = ({ isShowMenu, setIsShowMenu, routes }) => {
  return (
    <>
      <div id="drawer--menu">
        <div
          className={
            isShowMenu ? "drawer--menu--show active" : "drawer--menu--show"
          }
        >
          {isShowMenu ? (
            <Row className="drawerMenu">
              {routes.map((route, index) => (
                <Col className="drawerMenu__link" span={24}>
                  <Link
                    className="navBar__nav__link"
                    key={index}
                    to={route.path}
                    onClick={() => setIsShowMenu(false)}
                  >
                    {route.name}
                  </Link>
                </Col>
              ))}
            </Row>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default DrawerMenu
