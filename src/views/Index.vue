<template>
  <a-layout class="index">
    <a-layout-sider class="container">
      <h1 class="title">人力供应系统</h1>
      <a-menu
        :default-selected-keys="['suppliers']"
        :default-open-keys="['sub1']"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="mail" /><span>基础数据</span></span>
          <a-menu-item key="suppliers">
            <router-link to="/suppliers">供应商管理</router-link>
          </a-menu-item>
          <a-menu-item key="customer">
            <router-link to="/customer">客户管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="mail" /><span>供需协同</span></span>
          <a-menu-item key="21">
            <router-link to="/plan">需求计划</router-link>
          </a-menu-item>
          <a-menu-item key="22">
            <router-link to="/feedback">需求反馈</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="appstore" /><span>员工管理</span></span>
          <a-menu-item key="31"><router-link to="/archives">员工档案</router-link></a-menu-item>
          <a-menu-item key="32"><router-link to="/month">月考勤数据</router-link></a-menu-item>
          <a-menu-item key="33"><router-link to="/day">日考勤数据</router-link></a-menu-item>
          <a-menu-item key="34"><router-link to="/salary">工资核算</router-link></a-menu-item>
          <a-menu-item key="35"><router-link to="/borrow">借支管理</router-link></a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="mail" /><span>返费管理</span></span>
          <a-menu-item key="41">返费设定</a-menu-item>
          <a-menu-item key="42">返费计算</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title"><a-icon type="mail" /><span>报表分析</span></span>
          <a-menu-item key="51">员工花名册</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub6">
          <span slot="title"><a-icon type="mail" /><span>系统管理</span></span>
          <a-menu-item key="61">租户管理</a-menu-item>
          <a-menu-item key="62">用户管理</a-menu-item>
          <a-menu-item key="63">角色管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{ item }}</a-breadcrumb-item>
        </a-breadcrumb>
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
      collapsed: false
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path.replace('/', '')
    },
    defaultOpeneds () {
      return ['1']
    }
  },
  mounted () {
    // console.log('1')
  },
  methods: {
    quit () {
      localStorage.removeItem('MIDLogInfo')
      this.$router.push('/')
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
      font-size: 24px;
      font-weight: bold;
    }
    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
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
