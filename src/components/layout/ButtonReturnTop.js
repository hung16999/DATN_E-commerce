import React, { useEffect, useState } from "react"
import "./../../assets/scss/ButtonReturnTop.scss"

const ButtonReturnTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <>
      {isVisible && (
        <div className="button__back__top" onClick={scrollToTop}>
          <i className="arrow up" />
        </div>
      )}
    </>
  )
}

export default ButtonReturnTop
