import axios from 'axios'

const service = axios.create({ baseURL: process.env.VUE_APP_BASE_API, timeout: 5000 })

service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.token = token
  return config
})

service.interceptors.response.use(
  response => {
    const result = response.data
    if (result && result.code !== 200) {
      return Promise.reject(new Error(result.msg || '请求失败'))
    }
    return result
  },
  error => Promise.reject(error)
)

export default service
