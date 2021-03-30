import axios from 'axios'
const baseUrl = '/price-alerts'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: {Authorization: token}
  }
  const request = axios.get(`${baseUrl}/all`, config)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: {Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const remove = (url) => {
  const config = {
    headers: {Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${encodeURIComponent(url)}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, remove, setToken }