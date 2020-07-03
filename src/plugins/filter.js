
// 全局过滤
import Vue from 'vue'

// 图片过滤器  img | imgCalc
Vue.filter('imgCalc', function (val) {
  return 'config.img_http' + val
})

// 日期过滤器  time = (new Date(time)).pattern("yyyy-MM-dd hh:mm:ss")
// eslint-disable-next-line no-extend-native
Date.prototype.pattern = function (fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours() % 24 === 0 ? 24 : this.getHours() % 24, // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  const week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + ''])
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt.replace(/-/g, '-')
}

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind (el) {
    // 备注：可以改变类名使其它元素也实现拖拽效果
    // 鼠标点击拖拽区域
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    // 被拖拽元素主题
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomheight = dragDom.offsetHeight // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        // eslint-disable-next-line no-useless-escape
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        // eslint-disable-next-line no-useless-escape
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.split('px')[0]
        styT = +sty.top.split('px')[0]
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft)
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop)
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.transform = 'none'
        dragDom.style.left = `${left + styL}px`
        dragDom.style.top = `${top + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// v-load 加载中
Vue.directive('load', {
  bind: (el, binding) => {
    const loading = document.createElement('div')
    loading.className = 'custom-loading'
    const box = document.createElement('div')
    box.className = 'custom-loading-box'
    const demo = document.createElement('div')
    demo.className = 'custom-loading-demo'
    box.appendChild(demo)
    box.appendChild(demo.cloneNode(true))
    box.appendChild(demo.cloneNode(true))
    box.appendChild(demo.cloneNode(true))
    box.appendChild(demo.cloneNode(true))
    loading.appendChild(box)
    el.loadingElement = loading
    if (binding.value) {
      const curStyle = window.getComputedStyle(el)
      const position = curStyle.position
      if (position === 'absolute' || position === 'relative') {
        el.style.position = position
      } else {
        el.style.position = 'relative'
      }
      el.appendChild(loading)
    } else {
      if (loading.parentNode !== null) {
        loading.parentNode.removeChild(loading)
      }
    }
    const curStyle = window.getComputedStyle(el)
    const position = curStyle.position
    if (position === 'absolute' || position === 'relative') {
      el.style.position = position
    } else {
      el.style.position = 'relative'
    }
    if (binding.value) {
      el.appendChild(loading)
    }
  },
  update: (el, binding) => {
    if (binding.value) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement)
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement)
      }
    }
  },
  unbind: (el) => {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement)
    }
    el.loadingElement = null
  }
})

Vue.directive('focus', {
  inserted: function (el, binding) {
    if (binding.value) {
      setTimeout(_ => {
        el.children[0].focus()
      })
    }
  }
})
