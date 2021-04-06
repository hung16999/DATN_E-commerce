import React, { useEffect } from "react"
import { Row, Col } from "antd"
import { Link } from "react-router-dom"
import AppleIcon from "@material-ui/icons/Apple"
import SearchIcon from "@material-ui/icons/Search"

const NavBarDesktop = ({ routes, setIsShowMenu }) => {
  useEffect(() => {
    setIsShowMenu(false)
  })

  return (
    <>
      <Row>
        <Col className="navBar__nav" span={4}>
          <Link to="/">
            <AppleIcon className="navBar__nav__logo" />
          </Link>
        </Col>

        {routes.map((route, index) => (
          <Col className="navBar__nav" span={4}>
            <Link className="navBar__nav__link" key={index} to={route.path}>
              {route.name}
            </Link>
          </Col>
        ))}

        <Col className="navBar__nav" span={4}>
          <SearchIcon className="navBar__nav__Search" />
        </Col>
      </Row>
    </>
  )
}

export default NavBarDesktop
