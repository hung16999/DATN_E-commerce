import React, { useEffect, useState } from "react"

import { Carousel } from "antd"
import { Helmet } from "react-helmet"

import RenderProduct from "../../containers/RenderProduct"
import NavBar from "../../containers/NavBar"

import slide1 from "../../assets/images/slide1.jpg"
import slide2 from "../../assets/images/slide2.jpg"
import slide3 from "../../assets/images/slide3.jpg"
import slide4 from "../../assets/images/slide4.jpg"
import cleanPicture from "../../assets/images/clean.jpg"
import "../../assets/scss/Home.scss"
import api from "../../env/api"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const Home = () => {
  const [products, setProducts] = useState([])
  const { currentUser } = useSelector((store) => store)
  const history = useHistory()

  if (currentUser) {
    if (currentUser.role !== 4) {
      if (currentUser.role === 1) {
        history.push("/admin")
      } else if (currentUser.role === 2) {
        history.push("/salesman")
      } else if (currentUser.role === 3) {
        history.push("/shipper")
      }
    }
  }

  const fetchData = () => {
    api.get(`get_products.php`).then((response) => setProducts(response.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Nông sản sạch</title>
      </Helmet>

      <NavBar />

      <div className="home">
        <div className="carousel__advertisement">
          <div className="carousel">
            <Carousel autoplay>
              <div>
                <img src={slide1} alt="" />
              </div>

              <div>
                <img src={slide2} alt="" />
              </div>

              <div>
                <img src={slide3} alt="" />
              </div>

              <div>
                <img src={slide4} alt="" />
              </div>
            </Carousel>
          </div>

          <div className="advertisement">
            <img src={cleanPicture} alt="" />
          </div>
        </div>

        <RenderProduct products={products} />
      </div>
    </>
  )
}

export default Home
