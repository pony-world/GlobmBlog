// axios配置文件
import axios from 'axios'
import store from '@/store'

axios.defaults.timeout = 15000

// 拦截重复请求
const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('请勿重复请求')
  }
  delete pending[key]
}
const getRequestIdentify = (config, isRequest = false) => {
  let url = config.url
  if (isRequest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  const arr = ['put', 'post']
  return arr.includes(config.method)
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(config.url + JSON.stringify(config.data))
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 发送请求之前，拦截重复请求(即当前正在进行的相同请求)
    if (['put', 'post'].includes(config.method)) {
      const isRequest = config.url.split('/')[2] !== 'upload_slice'
      const requestData = getRequestIdentify(config, isRequest)
      removePending(requestData, isRequest)
      config.cancelToken = new CancelToken((c) => {
        pending[requestData] = c
      })
    }

    // vuex记录cancelToken
    config.cancelToken = new axios.CancelToken((cancel) => {
      store.commit('SET_API_APPEND', {
        cancelToken: cancel
      })
    })

    // 添加token
    config.headers.authorization = 'Bearer ' + store.getters.token

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
      return Promise.resolve(res.data.data || {})
    } else {
      switch (res.data.code) {
        case 1001:
          store.dispatch('REMOVE_TOKEN')
          break
        default:
          return Promise.reject(res.data)
      }
    }
  },
  async err => {
    const error = err.response ? err.response.msg ? err.response : { msg: '网络错误' } : { msg: '网络错误' }
    return Promise.reject(error)
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
