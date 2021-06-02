import React from "react"
import { Link } from "react-router-dom"

const HeaderLogin = () => {
  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="logo">
          <Link to="/">
            <span style={{ color: "#acf57c", fontSize: "18px" }}>
              Nông sản sạch
            </span>
          </Link>
        </div>
      </header>
    </>
  )
}

export default HeaderLogin
