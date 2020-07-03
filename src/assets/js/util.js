
// 滚动条在Y轴上的滚动距离
export const getScrollTop = _ => {
  let bodyScrollTop = 0
  let documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
}

// 文档的总高度
export const getScrollHeight = _ => {
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
}

// 浏览器视口的高度
export const getWindowHeight = _ => {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

// 判断是否为空，返回布尔值
export const isEmpty = (val) => {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val.toString()

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

// 判断对象中某个字段是否存在
export const hasOwn = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// 对象参数过滤
export const verifyParams = (params = {}, verify = []) => {
  const obj = {}
  Object.keys(params).filter(item => !verify.includes(item)).forEach(item => {
    obj[item] = params[item]
  })
  return obj
}
