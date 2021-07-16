import { Helmet } from "react-helmet"
import React, { useEffect, useState } from "react"
import RenderProduct from "../../../containers/RenderProduct"
import NavBar from "../../../containers/NavBar"
import API from "../../../env/api"

const Rau = () => {
  const [products, setProducts] = useState([])

  const fetchData = () => {
    const type = "vegetable"
    const formData = new FormData()
    formData.append("type", type)

    API.post(`get_products_by_type.php`, formData).then((response) => {
      setProducts(response.data)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

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
