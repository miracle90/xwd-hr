import axios from 'axios'
import Router from '../router/index.js'
import {
  message
} from 'ant-design-vue'

const baseURL = 'http://hrsys.zero-yun.com'

axios.defaults.baseURL = baseURL

// request拦截器
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// token过期，重新登录
axios.interceptors.response.use(response => {
  if (response.status === 200 && response.data.code === '1001') {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('xwdid')
    Router.push({
      path: '/'
    })
    return response
  } else {
    return response
  }
})

const http = {
  baseURL,
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
          params: params
        })
        .then((response) => {
          const {
            code,
            msg
          } = response.data
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
          const {
            code,
            msg
          } = response.data
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
  download: (url, name, params = {}) => new Promise((resolve, reject) => {
    axios.get(url, {
      params,
      responseType: 'blob'
    })
      .then((response) => {
        console.log(response.data)
        resolve(response.data)
        // 处理文档流
        const blob = new Blob([response.data])
        const fileName = `${name}.xlsx`
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    })
      .catch(() => {
        message.error('网络异常')
        resolve()
      })
  })
}

export default http
