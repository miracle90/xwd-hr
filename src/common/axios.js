import axios from 'axios'
import { message } from 'ant-design-vue'

axios.defaults.baseURL = 'http://hrsys.zero-yun.cn:7001'

const token = window.localStorage.getItem('token')

// request拦截器
axios.interceptors.request.use(
  config => {
    if (token) {
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

const http = {
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then((response) => {
          const { code, msg } = response.data
          if (code === '0') {
            resolve(response.data)
          } else {
            message.error(msg)
            resolve()
          }
        })
        .catch(() => {
          message.error('网络异常')
          resolve()
        })
    })
  },
  post: function (url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then((response) => {
          const { code, msg } = response.data
          if (code === '0') {
            resolve(response.data)
          } else {
            message.error(msg)
            resolve()
          }
        })
        .catch(() => {
          message.error('网络异常')
          resolve()
        })
    })
  }
}

export default http
