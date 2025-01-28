import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import {routerFull} from "./router/router.js"

createApp(App).use(routerFull).mount('#app')
