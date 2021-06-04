import ButtonReturnTop from "../../containers/ButtonReturnTop"
import { Helmet } from "react-helmet"
import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import { useSelector } from "react-redux"
import NavBar from "../../containers/NavBar"
import { useHistory } from "react-router"

const Rice = () => {
  const { products, currentUser } = useSelector((store) => store)
  const history = useHistory()

  if (currentUser) {
    if (currentUser.role !== 4) {
      if (currentUser.role === 1) {
        history.push("/admin")
      } else if (currentUser.role === 2) {
        history.push("/salesman")
      } else if (currentUser.role === 3) {
        history.push("/shipper")
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Gạo</title>
      </Helmet>

      <NavBar />
      <RenderProduct
        products={products.filter((item) => item.type === "rice")}
      />
      <ButtonReturnTop />
    </>
  )
}

export default Rice
