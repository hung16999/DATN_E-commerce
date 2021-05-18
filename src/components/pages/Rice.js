import ButtonReturnTop from "../../containers/ButtonReturnTop"
import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import { useSelector } from "react-redux"

const Rice = () => {
  const store = useSelector((store) => store)

  return (
    <>
      <RenderProduct products={store.products} />
      <ButtonReturnTop />
    </>
  )
}

export default Rice
