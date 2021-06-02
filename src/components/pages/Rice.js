import ButtonReturnTop from "../../containers/ButtonReturnTop"
import { Helmet } from "react-helmet"
import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import { useSelector } from "react-redux"
import NavBar from "../../containers/NavBar"

const Rice = () => {
  const store = useSelector((store) => store)

  return (
    <>
      <Helmet>
        <title>Gạo</title>
      </Helmet>

      <NavBar />
      <RenderProduct
        products={store.products.filter((item) => item.type === "rice")}
      />
      <ButtonReturnTop />
    </>
  )
}

export default Rice
