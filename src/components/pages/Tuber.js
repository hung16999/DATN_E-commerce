import React from "react"
import { tubersList } from "../../assets/tubersList"
import RenderProduct from "../layout/RenderProduct"

const Tuber = () => {
  return (
    <>
      <RenderProduct listProduct={tubersList} />
    </>
  )
}

export default Tuber
