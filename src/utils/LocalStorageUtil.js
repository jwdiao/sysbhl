
let _localStorage = {
 
}
// 设置session storage
_localStorage.set = (key, info = {}) => {
    return localStorage.setItem(key, JSON.stringify(info))
}

// 获取session storage
_localStorage.get = (key) => {
    try {
         return JSON.parse(localStorage.getItem(key))
    }catch (e) {
        console.log('Get localStorage error!',e)
    }
    return false
}

// 删除某个session storage key
_localStorage.remove = (key) => {
    return localStorage.removeItem(key)
}

// 清除全部session storage
_localStorage.clear = () => {
    return localStorage.clear()
}

export const LocalStorageFun = _localStorage;
