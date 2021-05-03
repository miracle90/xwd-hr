<template>
  <a-layout class="index">
    <a-layout-sider class="container">
      <h1 class="title">人力供应系统</h1>
      <a-menu
        :default-selected-keys="[$route.meta.selectKey]"
        :default-open-keys="[$route.meta.openKey]"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-sub-menu v-for="(menu, index) in menuList" :key="`sub${index + 1}`">
          <span slot="title">
            <a-icon :type="menu.icon" />
          <span>{{ menu.title }}</span></span>
          <a-menu-item v-for="item in menu.list" :key="`/${item.name}`">
            <router-link :to="`/${item.name}`">{{ item.title }}</router-link>
          </a-menu-item>
          <!-- <a-menu-item key="/customer">
            <router-link to="/customer">客户管理</router-link>
          </a-menu-item> -->
        </a-sub-menu>
        <!-- <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="control" />
          <span>供需协同</span></span>
          <a-menu-item key="/plan">
            <router-link to="/plan">需求计划</router-link>
          </a-menu-item>
          <a-menu-item key="/feedback">
            <router-link to="/feedback">需求反馈</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="user" />
          <span>员工管理</span></span>
          <a-menu-item key="/archives"><router-link to="/archives">员工档案</router-link></a-menu-item>
          <a-menu-item key="/month"><router-link to="/month">月考勤数据</router-link></a-menu-item>
          <a-menu-item key="/day"><router-link to="/day">日考勤数据</router-link></a-menu-item>
          <a-menu-item key="/salary"><router-link to="/salary">工资核算</router-link></a-menu-item>
          <a-menu-item key="/borrow"><router-link to="/borrow">借支管理</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="pay-circle" />
          <span>返费管理</span></span>
          <a-menu-item key="/setting"><router-link to="/setting">返费设定</router-link></a-menu-item>
          <a-menu-item key="/calculate"><router-link to="/calculate">返费计算</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title">
            <a-icon type="bar-chart" />
          <span>报表分析</span></span>
          <a-menu-item key="/employee"><router-link to="/employee">员工花名册</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub6">
          <span slot="title">
            <a-icon type="appstore" />
          <span>系统管理</span></span>
          <a-menu-item key="/hirer"><router-link to="/hirer">租户管理</router-link></a-menu-item>
          <a-menu-item key="/user"><router-link to="/user">用户管理</router-link></a-menu-item>
          <a-menu-item key="/role"><router-link to="/role">角色管理</router-link></a-menu-item>
        </a-sub-menu> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item, index) in $route.meta.bread" :key="index">{{ item }}</a-breadcrumb-item>
        </a-breadcrumb>
        <span @click="logout" style="cursor: pointer;">退出</span>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      collapsed: false
    }
  },
  computed: {
    // defaultActive () {
    //   return this.$route.path.replace('/', '')
    // },
    // defaultOpeneds () {
    //   return ['1']
    // }
  },
  mounted () {
    // console.log('1')
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      const res = await this.$http.get('/data/user/menu')
      if (res) {
        this.menuList = res.data
      }
    },
    logout () {
      this.$confirm({
        title: '退出提示',
        content: '确定要退出登录吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          window.localStorage.removeItem('token')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="less">
  .ant-layout-content {
    min-height: auto !important;
  }
  .index {
    height: 100%;
    .title {
      margin: 15px 0;
      text-align: center;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }
    .header {
      display: flex;
      // justify-content: flex-start;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background: #fff;
    }
    .content {
      margin: 20px;
      padding: 20px;
      // min-height: 100%;
      background: #fff;
      box-sizing: border-box;
    }
  }
</style>
