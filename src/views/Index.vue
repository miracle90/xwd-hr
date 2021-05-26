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
        </a-sub-menu>
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
