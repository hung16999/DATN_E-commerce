import "./../../assets/scss/BackDrop.scss"

export const BackDrop = ({ setIsShowMenu }) => {
  return <div onClick={() => setIsShowMenu(false)} className="backdrop"></div>
}
