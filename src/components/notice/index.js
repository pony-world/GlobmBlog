import Vue from 'vue'
import NoticeTpl from './Index.vue'
const NoticeConstructor = Vue.extend(NoticeTpl)

let nId = 1
const tagClass = 'dialog-notice'

const Notice = options => {
  if (JSON.stringify(options) === undefined) { return false }
  const id = 'notice-' + nId++
  options = options || {}
  if (typeof options === 'string') {
    options = {
      msg: options
    }
  }
  const NoticeInstance = new NoticeConstructor({
    data: options
  })
  NoticeInstance.id = id
  NoticeInstance.vm = NoticeInstance.$mount()
  NoticeInstance.vm.visible = true
  NoticeInstance.dom = NoticeInstance.vm.$el
  if (!document.querySelector(`body > .${tagClass}`)) {
    const div = document.createElement('div')
    div.classList.add(tagClass)
    div.style.position = 'fixed'
    div.style.top = '85px'
    div.style.zIndex = '9999'
    div.style.left = '50%'
    div.style.transform = 'translateX(-50%)'
    document.body.appendChild(div)
    document.querySelector(`body > .${tagClass}`).appendChild(NoticeInstance.dom)
  }
  document.querySelector(`body > .${tagClass}`).appendChild(NoticeInstance.dom)
  // NoticeInstance.dom.style.zIndex = nId + 1001
  return NoticeInstance.vm
}
['success', 'warning', 'info', 'error'].forEach(type => {
  Notice[type] = options => {
    if (typeof options === 'string') {
      options = {
        msg: options
      }
    }
    options.type = type
    return Notice(options)
  }
})

export default Notice
