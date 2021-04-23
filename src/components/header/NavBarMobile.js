import "./../../assets/scss/NavBarMobile.scss"

import React, { useState } from "react"

import SearchIcon from "@material-ui/icons/Search"

const NavBarMobile = () => {
  const [isShow, setIsShow] = useState(false)

  return (
    <header className="navbar__mobile">
      <div className="navbar">
        <div onClick={() => setIsShow(!isShow)} className="navbar__menu">
          <hr className={isShow ? "quay1" : "hrcss"} />

          <hr className={isShow ? "quay2" : "hrcss"} />
        </div>

        <div>
          <span className="navbar__logo">Nông sản sạch</span>
        </div>

        <div className="navbar__search">
          <SearchIcon />
        </div>
      </div>
    </header>
  )
}

export default NavBarMobile
