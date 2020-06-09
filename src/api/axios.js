// axios配置文件
import axios from 'axios'

axios.defaults.timeout = 6000

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return Promise.resolve(config)
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  async res => {
    if (res.data.code === 0) {
      return Promise.resolve(res.data.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  async err => {
    return Promise.reject(err.response || { msg: '网络错误' })
  }
)

// ----------------------------------------------------get
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// ----------------------------------------------------post
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
// ----------------------------------------------------patch
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
// ----------------------------------------------------put
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
  })
}
// ----------------------------------------------------del
export function del (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
