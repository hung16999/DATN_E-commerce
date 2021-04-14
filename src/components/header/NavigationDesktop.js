import React, { useEffect } from "react"
import { Row, Col } from "antd"
import { Link } from "react-router-dom"
import { ShoppingCartOutlined } from "@material-ui/icons"
import { nav } from "./../../_nav"

const NavBarDesktop = ({ routes, setIsShowMenu }) => {
  useEffect(() => {
    setIsShowMenu(false)
  })

  return (
    <>
      <Row>
        <Col className="navBar" span={3}>
          <Link to="/">
            <span className="navBar__nav__logo">Nông sản sạch</span>
          </Link>
        </Col>

        <Col className="navBar" span={4}>
          <input type="text" />
        </Col>

        {nav.map((item, index) => (
          <Col key={index} className="navBar" span={2}>
            <Link to={item.to}>
              <span className="navBar__nav__link">{item.lable}</span>
            </Link>
          </Col>
        ))}

        <Col className="navBar" span={3}>
          <Link style={{ display: "flex", flexDirection: "row" }}>
            <ShoppingCartOutlined style={{ color: "#9ede73" }} />
            <span style={{ color: "#d6d6d6" }}>Giỏ hàng</span>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default NavBarDesktop
