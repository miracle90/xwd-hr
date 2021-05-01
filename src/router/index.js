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
        component: () => import('../views/base/Suppliers.vue'),
        meta: {
          openKey: 'sub1',
          selectKey: '/suppliers',
          bread: ['基础数据', '供应商管理']
        }
      },
      {
        path: '/suppliersedit',
        name: 'suppliersedit',
        component: () => import('../views/base/SuppliersEdit.vue'),
        meta: {
          openKey: 'sub1',
          selectKey: '/suppliers',
          bread: ['基础数据', '供应商管理-编辑']
        }
      },
      {
        path: '/customer',
        component: () => import('../views/base/Customer.vue'),
        meta: {
          openKey: 'sub1',
          selectKey: '/customer',
          bread: ['基础数据', '客户管理']
        }
      },
      {
        path: '/customeredit',
        name: 'customeredit',
        component: () => import('../views/base/CustomerEdit.vue'),
        meta: {
          openKey: 'sub1',
          selectKey: '/customer',
          bread: ['基础数据', '客户管理-编辑']
        }
      },
      {
        path: '/plan',
        component: () => import('../views/demand/Plan.vue'),
        meta: {
          openKey: 'sub2',
          selectKey: '/plan',
          bread: ['供需协同', '需求计划']
        }
      },
      {
        path: '/planedit',
        name: 'planedit',
        component: () => import('../views/demand/PlanEdit.vue'),
        meta: {
          openKey: 'sub2',
          selectKey: '/plan',
          bread: ['供需协同', '需求计划-编辑']
        }
      },
      {
        path: '/planaudit',
        name: 'planaudit',
        component: () => import('../views/demand/PlanAudit.vue'),
        meta: {
          openKey: 'sub2',
          selectKey: '/plan',
          bread: ['供需协同', '需求计划-审核']
        }
      },
      {
        path: '/feedback',
        component: () => import('../views/demand/Feedback.vue'),
        meta: {
          openKey: 'sub2',
          selectKey: '/feedback',
          bread: ['供需协同', '需求反馈']
        }
      },
      {
        path: '/register',
        component: () => import('../views/demand/Register.vue'),
        meta: {
          openKey: 'sub2',
          selectKey: '/feedback',
          bread: ['供需协同', '需求反馈-需求登记']
        }
      },
      {
        path: '/reply',
        component: () => import('../views/demand/Reply.vue'),
        meta: {
          openKey: 'sub2',
          selectKey: '/feedback',
          bread: ['供需协同', '需求反馈-需求回复']
        }
      },
      {
        path: '/archives',
        component: () => import('../views/staff/Archives.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/archives',
          bread: ['员工管理', '员工档案']
        }
      },
      {
        path: '/archivesedit',
        component: () => import('../views/staff/ArchivesEdit.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/archives',
          bread: ['员工管理', '员工档案-编辑']
        }
      },
      {
        path: '/month',
        component: () => import('../views/staff/Month.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/month',
          bread: ['员工管理', '月考勤数据']
        }
      },
      {
        path: '/monthedit',
        component: () => import('../views/staff/MonthEdit.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/month',
          bread: ['员工管理', '月考勤数据-编辑']
        }
      },
      {
        path: '/day',
        component: () => import('../views/staff/Day.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/day',
          bread: ['员工管理', '日考勤数据']
        }
      },
      {
        path: '/salary',
        component: () => import('../views/staff/Salary.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/salary',
          bread: ['员工管理', '工资核算']
        }
      },
      {
        path: '/salaryedit',
        component: () => import('../views/staff/SalaryEdit.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/salary',
          bread: ['员工管理', '工资核算-编辑']
        }
      },
      {
        path: '/borrow',
        component: () => import('../views/staff/Borrow.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/borrow',
          bread: ['员工管理', '借支管理']
        }
      },
      {
        path: '/borrowedit',
        component: () => import('../views/staff/BorrowEdit.vue'),
        meta: {
          openKey: 'sub3',
          selectKey: '/borrow',
          bread: ['员工管理', '借支管理-编辑']
        }
      },
      {
        path: '/setting',
        component: () => import('../views/reimbursement/Setting.vue'),
        meta: {
          openKey: 'sub4',
          selectKey: '/setting',
          bread: ['返费管理', '返费设定']
        }
      },
      {
        path: '/settingedit',
        component: () => import('../views/reimbursement/SettingEdit.vue'),
        meta: {
          openKey: 'sub4',
          selectKey: '/setting',
          bread: ['返费管理', '返费设定-编辑']
        }
      },
      {
        path: '/calculate',
        component: () => import('../views/reimbursement/Calculate.vue'),
        meta: {
          openKey: 'sub4',
          selectKey: '/calculate',
          bread: ['返费管理', '返费计算']
        }
      },
      {
        path: '/calculateedit',
        component: () => import('../views/reimbursement/CalculateEdit.vue'),
        meta: {
          openKey: 'sub4',
          selectKey: '/calculate',
          bread: ['返费管理', '返费计算-编辑']
        }
      },
      {
        path: '/employee',
        component: () => import('../views/report/Employee.vue'),
        meta: {
          openKey: 'sub5',
          selectKey: '/employee',
          bread: ['报表分析', '员工花名册']
        }
      },
      {
        path: '/hirer',
        component: () => import('../views/system/Hirer.vue'),
        meta: {
          openKey: 'sub6',
          selectKey: '/hirer',
          bread: ['系统管理', '租户管理']
        }
      },
      {
        path: '/hireredit',
        component: () => import('../views/system/HirerEdit.vue'),
        meta: {
          openKey: 'sub6',
          selectKey: '/hireredit',
          bread: ['系统管理', '租户管理']
        }
      },
      {
        path: '/user',
        component: () => import('../views/system/User.vue'),
        meta: {
          openKey: 'sub6',
          selectKey: '/user',
          bread: ['系统管理', '用户管理']
        }
      },
      {
        path: '/role',
        component: () => import('../views/system/Role.vue'),
        meta: {
          openKey: 'sub6',
          selectKey: '/role',
          bread: ['系统管理', '角色管理']
        }
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
