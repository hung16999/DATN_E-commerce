import "./../../assets/scss/BackDrop.scss"

export const BackDrop = ({ isShowMenu, setIsShowMenu }) => {
  return (
    <div
      onClick={() => setIsShowMenu(false)}
      className={isShowMenu ? "backdrop active" : "backdrop"}
    ></div>
  )
}
