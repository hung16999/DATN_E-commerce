import ButtonReturnTop from "../../containers/ButtonReturnTop"
import { Helmet } from "react-helmet"
import React, { useEffect, useState } from "react"
import RenderProduct from "../../containers/RenderProduct"
import NavBar from "../../containers/NavBar"
import api from "../../env/api"

const Rice = () => {
  const [products, setProducts] = useState([])

  const fetchData = () => {
    api
      .get(`get_products.php`)
      .then((response) =>
        setProducts(response.data.filter((product) => product.type === "rice"))
      )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Gạo</title>
      </Helmet>

      <NavBar />
      <RenderProduct
        products={products.filter((item) => item.type === "rice")}
      />
      <ButtonReturnTop />
    </>
  )
}

export default Rice
