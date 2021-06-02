import React, { useState } from "react"
import { Grid } from "antd"
import NavBarDesktop from "../components/header/NavBarDesktop"
import NavBarMobile from "../components/header/NavBarMobile"
import DrawerMenu from "../components/header/DrawerMenu"
import { BackDrop } from "../components/header/BackDrop"

const { useBreakpoint } = Grid

const NavBar = () => {
  const { md } = useBreakpoint()
  const [isShowMenu, setIsShowMenu] = useState(false)

  return (
    <>
      {md ? (
        <NavBarDesktop setIsShowMenu={setIsShowMenu} />
      ) : (
        <NavBarMobile isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
      )}

      {!md && (
        <DrawerMenu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
      )}

      {!md && isShowMenu && <BackDrop setIsShowMenu={setIsShowMenu} />}
    </>
  )
}

export default NavBar
