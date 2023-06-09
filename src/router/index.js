/*
 * @Author: zzh
 * @Date: 2021-11-11 13:17:31
 * @LastEditors: zzh
 * @LastEditTime: 2021-11-25 10:09:14
 * @FilePath: \vue2-demo\src\router\index.js
 * @Description: 路由
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/basic.vue',
      name: 'basic',
      component: () => import('../bpmnComponents/basic.vue'),
    }
  ]
})
