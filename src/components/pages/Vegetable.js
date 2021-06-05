import { Helmet } from "react-helmet"
import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import { useSelector } from "react-redux"
import NavBar from "../../containers/NavBar"

const Rau = () => {
  const { products } = useSelector((store) => store)

  return (
    <>
      <Helmet>
        <title>Rau củ</title>
      </Helmet>

      <NavBar />
      <RenderProduct
        products={products.filter((item) => item.type === "vegetable")}
      />
    </>
  )
}

export default Rau
