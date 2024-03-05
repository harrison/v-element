import './styles/index.css';

import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(fas)

import App from './App.vue'

createApp(App)
  .mount('#app')
