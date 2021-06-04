import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../../redux/actions"

const Salesman = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((store) => store.currentUser)

  if (currentUser) {
    if (currentUser.role !== 2) {
      history.push("/")
    }
  } else {
    history.push("/")
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <h2>Trang của người bán hàng</h2>
      <span>{currentUser.name}</span>
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default Salesman
