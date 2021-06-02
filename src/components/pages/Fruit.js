import { Helmet } from "react-helmet"
import React from "react"
import { useSelector } from "react-redux"
import RenderProduct from "../../containers/RenderProduct"
import NavBar from "../../containers/NavBar"

const Fruit = () => {
  const store = useSelector((store) => store)
  return (
    <>
      <Helmet>
        <title>Trái cây</title>
      </Helmet>

      <NavBar />
      <RenderProduct
        products={store.products.filter((item) => item.type === "fruit")}
      />
    </>
  )
}

export default Fruit
