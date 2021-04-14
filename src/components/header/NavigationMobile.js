import React from "react"
import { Row, Col } from "antd"
import SearchIcon from "@material-ui/icons/Search"
import MenuIcon from "@material-ui/icons/Menu"

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
          <h2 className="navBar__nav__logo">Nông sản sạch</h2>
        </Col>

        <Col className="navBar--mobile__col" span={8}>
          <SearchIcon className="navBar__nav__Search" />
        </Col>
      </Row>
    </>
  )
}

export default NavBarMobile
