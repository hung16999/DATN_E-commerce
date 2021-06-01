import { Helmet } from "react-helmet"
import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import { useSelector } from "react-redux"

const Rau = () => {
  const store = useSelector((store) => store)

  return (
    <>
      <Helmet>
        <title>Rau củ</title>
      </Helmet>
      <RenderProduct
        products={store.products.filter((item) => item.type === "vegetable")}
      />
    </>
  )
}

export default Rau
