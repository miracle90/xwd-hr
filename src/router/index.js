import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '/suppliers',
        // name: 'suppliers',
        component: () => import('../views/base/Suppliers.vue'),
        meta: ['基础数据', '供应商管理']
      },
      {
        path: '/suppliersedit',
        name: 'suppliersedit',
        component: () => import('../views/base/SuppliersEdit.vue'),
        meta: ['基础数据', '供应商管理-编辑']
      },
      {
        path: '/customer',
        component: () => import('../views/base/Customer.vue'),
        meta: ['基础数据', '客户管理']
      },
      {
        path: '/customeredit',
        name: 'customeredit',
        component: () => import('../views/base/CustomerEdit.vue'),
        meta: ['基础数据', '客户管理-编辑']
      },
      {
        path: '/plan',
        component: () => import('../views/demand/Plan.vue'),
        meta: ['供需协同', '需求计划']
      },
      {
        path: '/planedit',
        name: 'planedit',
        component: () => import('../views/demand/PlanEdit.vue'),
        meta: ['供需协同', '需求计划-编辑']
      },
      {
        path: '/feedback',
        component: () => import('../views/demand/Feedback.vue'),
        meta: ['供需协同', '需求反馈']
      },
      {
        path: '/archives',
        component: () => import('../views/staff/Archives.vue'),
        meta: ['员工管理', '员工档案']
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
