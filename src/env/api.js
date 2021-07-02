import axios from "axios"

const ipConfig = `192.168.1.49`

export default axios.create({
  baseURL: `http://${ipConfig}/backend_nongsansach/`,
})
