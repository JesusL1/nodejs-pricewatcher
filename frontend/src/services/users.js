import axios from 'axios'
const baseUrl = '/users'


const createUser = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export default createUser