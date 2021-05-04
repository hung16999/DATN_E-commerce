import "../../assets/scss/Home.scss"

import { Carousel } from "antd"
import { Link } from "react-router-dom"
import React from "react"
import carousel1 from "../../assets/images/carousel1.png"
import carousel2 from "../../assets/images/carousel2.png"
import cleanPicture from "../../assets/images/clean.jpg"

const Home = () => {
  return (
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

      <div className="productsType">
        <div className="vegetable">
          <Link to="/vegetable">Rau</Link>
          <div></div>
        </div>
      </div>

      <div className="sellingProducts"></div>
    </div>
  )
}

export default Home
