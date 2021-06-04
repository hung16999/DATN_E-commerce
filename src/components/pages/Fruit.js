import { Helmet } from "react-helmet"
import React from "react"
import { useSelector } from "react-redux"
import RenderProduct from "../../containers/RenderProduct"
import NavBar from "../../containers/NavBar"
import { useHistory } from "react-router"

const Fruit = () => {
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
        <title>Trái cây</title>
      </Helmet>

      <NavBar />
      <RenderProduct
        products={products.filter((item) => item.type === "fruit")}
      />
    </>
  )
}

export default Fruit
