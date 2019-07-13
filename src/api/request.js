import axios from 'axios'
axios.defaults.timeout = 100000
// import { Message } from 'element-ui'
// import {
//   Message
// } from 'element-ui';
// import store from '@/store'


// axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://10.19.7.69:8083'

axios.interceptors.request.use(config => {
    // 如果有token，需要放开
    /* if (store.state.token) {
      config.headers = {token: store.state.token}
    } */
    // 时间戳(解决get请求IE下缓存问题)
    if (config.method === 'get') {
        config.params = {
            t: Date.parse(new Date()),
            ...config.params
        }
    }
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
/* export function postFile(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: params,
      headers:{'filename':'utf-8'},
      responseType:'blob'
    }).then(res => {
      // resolve(res)
      const blob = new Blob([res],{type: "application/ms-excel"});
      const fileName = '统计.xlsx';
      const elink = document.createElement('a');
      elink.download = fileName; //下载后文件名
      elink.style.display = 'none';
      elink.href = URL.createObjectURL(blob); //创建下载的链接
      document.body.appendChild(elink);
      elink.click(); //点击下载
      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink); //下载完成移除元素
    }).catch(err => {
      console.log(err)
    })
  })
} */

// 导出Excel
export function postExcelFile(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: params,
      responseType:'blob'
    }).then(res => {
      resolve(res)
    }).catch(err => {
      console.log(err)
    })
  })
}