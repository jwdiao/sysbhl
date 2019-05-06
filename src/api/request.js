import axios from 'axios'
axios.defaults.timeout = 100000
// import { Message } from 'element-ui'
import {
  Message
} from 'element-ui';
// import store from '@/store'


// axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://10.19.7.69:8083'

axios.interceptors.request.use(config => {
    // 如果有token，需要放开
    /* if (store.state.token) {
      config.headers = {token: store.state.token}
    } */
    return config
  }, error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
      
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error) // for debug
    /* Message({
      message: '网络错误',
      type: 'error',
      duration: 2 * 1000
    }) */
    return Promise.reject(error)
    // return Promise.reject(error.response.data)
  }
)


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      // reject(err.data)
      console.log(err)
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      // debugger
      console.log(err)
    })
  })
}
