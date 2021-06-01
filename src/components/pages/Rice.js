import ButtonReturnTop from "../../containers/ButtonReturnTop"
import { Helmet } from "react-helmet"
import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import { useSelector } from "react-redux"

const Rice = () => {
  const store = useSelector((store) => store)

  return (
    <>
      <Helmet>
        <title>Gạo</title>
      </Helmet>
      <RenderProduct
        products={store.products.filter((item) => item.type === "rice")}
      />
      <ButtonReturnTop />
    </>
  )
}

export default Rice
