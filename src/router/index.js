import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/OverView'
    },
    {
      path: '/OverView',
      name: 'OverView',
      // component: () => import('../views/OverViewV2/Index.vue') // 设备概览
      // component: () => import('../views/OverViewV3/Index.vue') // 设备概览
      component: () => import('../views/OverViewV4/Index.vue') // 设备概览（早8晚8）
    },
    {
      path: '/OverviewHistory',
      name: 'OverviewHistory',
      component: () => import('../views/OverViewV4/History.vue') // 
    },
    {
      path: '/DeviceList', // 设备列表
      name: 'DeviceList',
      // component: () => import('../views/DeviceList/Index.vue') // 没统一改标题
      // component: () => import('../views/DeviceList/IndexV2.vue') // 统一改标题后
      // component: () => import('../views/DeviceList/IndexV3.vue') // 统一改标题后
      // component: () => import('../views/DeviceList/IndexV4.vue') // latest
      component: () => import('../views/DeviceList/IndexV5.vue') // latest（早8晚8）
    },
    {
      path: '/DeviceDetail', // 设备详情（类型plcType为1）
      name: 'DeviceDetail',
      // component: () => import('../views/DeviceDetail/Index.vue')
      // component: () => import('../views/DeviceDetailV2/Index.vue') //（早8晚8）
      component: () => import('../views/DeviceDetailV3/Index.vue') //（新增24小时电流）
      // component: () => import('../views/DeviceDetailV4/Index.vue') // 组件抽取
    },
    {
      path: '/DeviceDetailXmz', // （类型plcType为2:西门子）
      name: 'DeviceDetailXmz',
      // component: () => import('../views/DeviceDetail/IndexV2.vue')
      // component: () => import('../views/DeviceDetailV2/IndexV2.vue')//（早8晚8）
      component: () => import('../views/DeviceDetailV3/IndexDLJ.vue')//（早8晚8）
      // component: () => import('../views/DeviceDetailV4/IndexDLJ.vue')//组件抽取
    },
    {
      path: '/DeviceDetailRobot', // （类型plcType为2:西门子）
      name: 'DeviceDetailRobot',
      // component: () => import('../views/DeviceDetail/IndexV2.vue')
      // component: () => import('../views/DeviceDetailV2/IndexV2.vue')//（早8晚8）
      component: () => import('../views/DeviceDetailV3/Robot.vue')//（早8晚8）
      // component: () => import('../views/DeviceDetailV4/IndexDLJ.vue')//组件抽取
    },
    {
      path: '/DeviceFailure', // 设备故障
      name: 'DeviceFailure',
      component: () => import('../views/DeviceFailure/IndexV2.vue')
    },
    {
      path: '/Statistics', // 设备统计
      name: 'Statistics',
      component: () => import('../views/Statistics/Index.vue')
    },
    {
      path: '/WeekStatistics', // 统计报表
      name: 'WeekStatistics',
      component: () => import('../views/Statistics/Week.vue')
    },
    {
      path: '/DeviceInfo', // 设备运行状态信息
      name: 'DeviceInfo',
      component: () => import('../views/DeviceInfo/Index.vue')
    },
    {
      path: '/EnergyHistory', // 设备运行状态信息
      name: 'EnergyHistory',
      component: () => import('../views/EnergyHistory/Index.vue')
    },
    {
      path: '/DayStatistics', // 日统计
      name: 'DayStatistics',
      component: () => import('../views/Statistics/Day.vue')
    },
     {
      path: '/Test02',
      name: 'Test02',
      component: () => import('../views/Test/DianLiu.vue')
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
    {
      path: '/select',
      name: 'select',
      component: () => import('../components/Select.vue')
    },
  ]
})

export default router
