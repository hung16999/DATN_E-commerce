import React from "react"
import RenderProduct from "../../containers/RenderProduct"
import ButtonReturnTop from "../../containers/ButtonReturnTop"
import { useSelector } from "react-redux"

const Tuber = () => {
  const store = useSelector((store) => store)
  const { tubers } = store.product

  return (
    <>
      <RenderProduct listProduct={tubers} />
      <ButtonReturnTop />
    </>
  )
}

export default Tuber
