export const setUserToLocalStorage = (user) => {
  const userJson = JSON.stringify(user)

  localStorage.setItem("user", userJson)
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user")
  const userObj = JSON.parse(user)

  return userObj
}
