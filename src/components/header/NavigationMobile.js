import React from "react"
import { Row, Col } from "antd"
import MenuIcon from "@material-ui/icons/Menu"
import AppleIcon from "@material-ui/icons/Apple"

const NavBarMobile = ({ isShowMenu, setIsShowMenu }) => {
  return (
    <>
      <Row className="navBar--mobile">
        <Col className="navBar--mobile__col" span={8}>
          <MenuIcon
            className="navBar__nav__menuIcon"
            onClick={() => setIsShowMenu(!isShowMenu)}
          />
        </Col>

        <Col className="navBar--mobile__col" span={8}>
          <AppleIcon className="navBar__nav__logo" />
        </Col>

        <Col span={8}></Col>
      </Row>
    </>
  )
}

export default NavBarMobile
