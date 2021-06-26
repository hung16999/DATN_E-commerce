import axios from "axios"

const ipConfig = `192.168.137.1`

export default axios.create({
  baseURL: `http://${ipConfig}/nong_san_sach/`,
})
