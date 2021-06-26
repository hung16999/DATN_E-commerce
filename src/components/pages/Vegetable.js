import { Helmet } from "react-helmet"
import React, { useEffect, useState } from "react"
import RenderProduct from "../../containers/RenderProduct"
import NavBar from "../../containers/NavBar"
import api from "../../env/api"

const Rau = () => {
  const [products, setProducts] = useState([])

  const fetchData = () => {
    api
      .get(`get_products.php`)
      .then((response) =>
        setProducts(
          response.data.filter((product) => product.type === "vegetable")
        )
      )
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
