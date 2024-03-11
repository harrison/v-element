import { onMounted, onUnmounted, type Ref } from "vue"

// 定义一个钩子函数，功能为点击一个给定元素以外的元素时，触发回调函数
// 接收两个参数，目标元素（ref类型）  回调函数
const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {

  // 定义点击事件，接收参数event
  const handler = (e: MouseEvent) => {
    console.log('handler attach')
    // 如果目标元素存在，且点击目标元素存在
    if (elementRef.value && e.target) {

      // Node.contains() Node 接口的 contains() 方法返回一个布尔值，表示一个节点是否是给定节点的后代，即该节点本身、其直接子节点（childNodes）、子节点的直接子节点等。
      // 这里来判断被点击的元素是不是目标元素或其子元素
      if (!elementRef.value.contains(e.target as HTMLElement)) {

        // 如果不是则触发callback
        callback(e)
      }
    }
  }

  onMounted(() => {
    // 页面挂载时绑定handler事件
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    // 页面卸载时移除handler事件
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside