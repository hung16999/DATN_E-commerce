import { Helmet } from "react-helmet"
import React, { useEffect, useState } from "react"
import RenderProduct from "../../../containers/RenderProduct"
import NavBar from "../../../containers/NavBar"
import API from "../../../env/api"

const Fruit = () => {
  const [products, setProducts] = useState([])

  const fetchData = () => {
    const type = "fruit"
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
        <title>Trái cây</title>
      </Helmet>

      <NavBar />
      <RenderProduct products={products} />
    </>
  )
}

export default Fruit
