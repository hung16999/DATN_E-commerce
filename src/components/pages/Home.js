import "../../assets/scss/Home.scss"

import { Carousel } from "antd"
import { Helmet } from "react-helmet"
import React from "react"
import carousel1 from "../../assets/images/carousel1.png"
import carousel2 from "../../assets/images/carousel2.png"
import cleanPicture from "../../assets/images/clean.jpg"
import { useSelector } from "react-redux"
import RenderProduct from "../../containers/RenderProduct"
import NavBar from "../../containers/NavBar"

const Home = () => {
  const store = useSelector((store) => store)

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
                <img src={carousel1} alt="" />
              </div>

              <div>
                <img src={carousel2} alt="" />
              </div>

              <div>
                <img src={carousel1} alt="" />
              </div>

              <div>
                <img src={carousel2} alt="" />
              </div>
            </Carousel>
          </div>

          <div className="advertisement">
            <img src={cleanPicture} alt="" />
          </div>
        </div>

        <RenderProduct products={store.products} />
      </div>
    </>
  )
}

export default Home
