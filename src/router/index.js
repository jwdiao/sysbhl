import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/OverView'
    },
    {
      path: '/OverView',
      name: 'OverView',
      component: () => import('../views/OverView/OverView.vue') // 设备概览
    },
    {
      path: '/DeviceHome',
      name: 'DeviceHome',
      component: () => import('../views/DeviceConnect/DeviceHome.vue')
    },
    {
      path: '/DeviceConnect',
      name: 'DeviceConnect',
      component: () => import('../views/DeviceConnect/index.vue')
    },
    // {
    //   path: '/DeviceListScreen',
    //   name: 'DeviceListScreen',
    //   component: () => import('../views/OverView/DeviceListScreen.vue')
    // },
  ]
})

export default router
