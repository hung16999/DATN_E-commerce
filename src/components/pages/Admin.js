import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../../redux/actions"
import { setUserToLocalStorage } from "../../utils/localStorage"

const Admin = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((store) => store.currentUser)

  if (currentUser) {
    if (currentUser.role !== 1) {
      if (currentUser.role === 2) {
        history.push("/salesman")
      } else if (currentUser.role === 3) {
        history.push("/shipper")
      } else {
        history.push("/")
      }
    }
  } else {
    history.push("/")
  }

  const handleLogout = () => {
    dispatch(logout())
    setUserToLocalStorage(null)
    history.push("/")
  }

  return (
    <>
      <h2>Trang của Admin</h2>
      <span>{currentUser && currentUser.name}</span>
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default Admin
