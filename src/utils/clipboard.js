//引入vue的核心库
import Vue from 'vue'
//引入了对应的剪切板插件clipboard
import Clipboard from 'clipboard'

//定义成功调用了剪切板函数的方法
function clipboardSuccess() {
  //如果剪切成功后 通过消息提醒插件输出'剪切成功的字样'
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}
//定义剪切失败的回调函数 如果剪切不成功 那么就输出剪切失败的字样
function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

//定义默认调用的核心函数
export default function handleClipboard(text, event) {
  //该函数内部调用核心的剪切方法
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  //并在对应的时机调用对应的回调函数
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
