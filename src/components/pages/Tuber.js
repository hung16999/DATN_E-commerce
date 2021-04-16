import React from "react"
import { tubersList } from "../../assets/tubersList"
import RenderProduct from "../../containers/RenderProduct"
import ButtonReturnTop from "../../containers/ButtonReturnTop"

const Tuber = () => {
  return (
    <>
      <RenderProduct listProduct={tubersList} />
      <ButtonReturnTop />
    </>
  )
}

export default Tuber
