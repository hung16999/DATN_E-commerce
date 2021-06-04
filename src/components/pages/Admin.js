import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { logout } from "../../redux/actions"

const Admin = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUser = useSelector((store) => store.currentUser)

  if (currentUser) {
    if (currentUser.role !== 1) {
      history.push("/")
    }
  } else {
    history.push("/")
  }

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <>
      <h2>Trang của admin</h2>
      <button onClick={handleLogOut}>Log out</button>
    </>
  )
}

export default Admin
