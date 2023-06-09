/*
 * @Author: zzh
 * @Date: 2021-11-11 13:17:31
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-26 11:05:13
 * @FilePath: \vue2-demo\src\main.js
 * @Description: 请填写简介
 */
import Vue from 'vue'
import App from './App'
import router from './router'

// bpmn.js
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
// 左边工具栏以及编辑节点的样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'; // 工具栏样式

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/app.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
