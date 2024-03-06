import './styles/index.css';

import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)

import App from './App.vue'
// import App from './App2.vue'

createApp(App)
  .mount('#app')

// 打印渲染函数
// console.log(App.render?.toString())
