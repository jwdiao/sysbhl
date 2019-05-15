import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/sanysbhlreport/',
  routes: [
    {
      path: '/',
      redirect: '/OverView'
    },
    /* {
      path: '/OverView',
      name: 'OverView',
      component: () => import('../views/OverView/Index.vue') // 设备概览
    }, */
    {
      path: '/OverView',
      name: 'OverView',
      component: () => import('../views/OverViewV2/Index.vue') // 设备概览
    },
    {
      path: '/DeviceList', // 设备列表
      name: 'DeviceList',
      component: () => import('../views/DeviceList/Index.vue') // 没统一改标题
      // component: () => import('../views/DeviceList/Index-updateHead.vue') // 统一改标题后
    },
    {
      path: '/DeviceDetail', // 设备详情
      name: 'DeviceDetail',
      component: () => import('../views/DeviceDetail/Index.vue')
    },
    {
      path: '/DeviceFailure', // 设备故障
      name: 'DeviceFailure',
      component: () => import('../views/DeviceFailure/Index.vue')
    },
    {
      path: '/Statistics', // 设备统计
      name: 'Statistics',
      component: () => import('../views/Statistics/Index.vue')
    },
    {
      path: '/Test02',
      name: 'Test02',
      component: () => import('../views/Test/Index2.vue')
    },
    {
      path: '/Template',
      name: 'Template',
      component: () => import('../views/Template/Index.vue')
    },
    {
      path: '/Template2',
      name: 'Template2',
      component: () => import('../views/Template/Index2.vue')
    },
  ]
})

export default router
