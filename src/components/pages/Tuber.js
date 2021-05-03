import ButtonReturnTop from "../../containers/ButtonReturnTop"
import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import { useSelector } from "react-redux"

const Tuber = () => {
  const store = useSelector((store) => store)

  return (
    <>
      <RenderProduct products={store.tubers} />
      <ButtonReturnTop />
    </>
  )
}

export default Tuber
