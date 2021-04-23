import "./../../assets/scss/DrawerMenu.scss"

import { Col, Row } from "antd"

import { Link } from "react-router-dom"
import React from "react"

const DrawerMenu = ({ isShowMenu, setIsShowMenu, routes }) => {
  console.log(routes)
  return (
    <>
      <div>đây là drwer menu</div>
      <div>
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
                    onClick={() => setIsShowMenu()}
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
