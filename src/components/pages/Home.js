import React from "react"

import { Carousel } from "antd"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"

import RenderProduct from "../../containers/RenderProduct"
import NavBar from "../../containers/NavBar"

import carousel1 from "../../assets/images/carousel1.png"
import carousel2 from "../../assets/images/carousel2.png"
import cleanPicture from "../../assets/images/clean.jpg"
import "../../assets/scss/Home.scss"

const Home = () => {
  const { products } = useSelector((store) => store)

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

        <RenderProduct products={products} />
      </div>
    </>
  )
}

export default Home
