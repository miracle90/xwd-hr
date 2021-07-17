<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-form :form="form" @submit="e => {
        page = 1;
        handleSearch(e);
      }" layout="horizontal">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="关键字">
            <a-input
              v-decorator="[`keyword`]"
              placeholder="请输入关键字搜索"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6" style="padding-top: 43px;">
          <a-button type="primary" html-type="submit" style="margin-right: 5px;">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-row type="flex" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <a-col>
        <a-button @click="add" style="margin-right: 5px;">新建角色</a-button>
      </a-col>
    </a-row>
    <a-row style="flex: 1; margin-bottom: 20px;">
      <a-col>
        <a-table
          :scroll="{ y: tableHeight }"
          :pagination="false"
          :columns="columns"
          :data-source="data"
          :rowKey="(record, index) => index"
        >
          <span slot="status" slot-scope="record">{{ ['停用', '启用'][record.status] }}</span>
          <span slot="action" slot-scope="record">
            <router-link style="color: #1890ff" :to="{ path: '/roleedit', query: { id: record.id, type: 0 }}">查看</router-link>
            <a-divider type="vertical" />
            <router-link style="color: #1890ff" :to="{ path: '/roleedit', query: { id: record.id, type: 1 }}">修改</router-link>
            <a-divider type="vertical" />
            <a v-if="record.status === 1" @click="use(0, record.id)">停用</a>
            <a v-else @click="use(1, record.id)">启用</a>
            <a-divider type="vertical" />
            <a  @click="deleteData(record.id)" style="color: red">删除</a>
          </span>
          <!-- <router-link
            slot="employeeNumber"
            slot-scope="text, record"
            style="color: #1890ff"
            :to="{ path: '/archivesedit', query: { id: record.id, type: 0 }}"
          >{{ text }}</router-link>
          <span slot="customerId" slot-scope="text">{{ customerList.find(item => item.id === text) ? customerList.find(item => item.id === text).customerName : '' }}</span>
          <span slot="jobType" slot-scope="text">{{ ['', '学生工', '农民工', '社会工'][text] }}</span> -->
        </a-table>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-pagination
          v-model="page"
          :page-size-options="pageSizeOptions"
          :total="total"
          show-size-changer
          show-quick-jumper
          :page-size="limit"
          :show-total="total => `共${total}条记录`"
          @showSizeChange="onShowSizeChange"
          @change="onChange"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
            <span v-if="props.value === '50'">全部</span>
          </template>
        </a-pagination>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script>
const columns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   key: 'id'
  // },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName'
  },
  {
    title: '描述',
    dataIndex: 'remark',
    key: 'remark'
  },
  // {
  //   title: '租户代码',
  //   dataIndex: 'agentId',
  //   key: 'agentId'
  // },
  {
    title: '更新人',
    dataIndex: 'updateUser',
    key: 'updateUser'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: '状态',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      tableHeight: document.documentElement.clientHeight - 420 + 'px',
      queryOnJobDateStartTime: '',
      queryOnJobDateEndTime: '',
      spinning: false,
      selectedRowKeys: [],
      selectedRows: [],
      selectedIds: [],
      total: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      page: 1,
      limit: 10,
      data: [],
      columns,
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  computed: {
    //
  },
  mounted () {
    window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 420 + 'px'
    }
    this.handleSearch()
  },
  methods: {
    use(status, id) {
      this.$confirm({
        title: '切换状态',
        content: `确定要切换角色状态为${status === 1 ? '开启' : '停用'}吗？`,
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          this.form.validateFields(async (error, values) => {
            if (!error) {
              this.spinning = true
              const res = await this.$http.post('/data/role/setStatus', {
                id,
                status
              })
              this.spinning = false
              if (res) {
                this.$message.success('状态切换成功！')
                this.handleSearch()
              }
            }
          })
        }
      })
    },
    reset () {
      this.form.resetFields()
    },
    deleteData (id) {
      this.$confirm({
        title: '删除提示',
        content: '确定要删除所勾选的记录吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          const res = await this.$http.post(`/data/role/delete/${id}`)
          if (res) {
            this.$message.success('角色删除成功!')
            this.handleSearch()
          }
        },
        onCancel: () => {
          //
        }
      })
    },
    add () {
      this.$router.push('/roleedit')
    },
    onChange (page) {
      this.page = page
      this.handleSearch()
    },
    onShowSizeChange (current, limit) {
      this.page = 1
      this.limit = limit
      this.handleSearch()
    },
    handleSearch (e) {
      if (e) e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (!error) {
          const { keyword } = values
          const { page, limit } = this
          const param = {
            keyword,
            page,
            limit
          }
          this.spinning = true
          const res = await this.$http.get('/data/role/list', param)
          this.spinning = false
          if (res) {
            const { count, data } = res
            this.data = data
            this.total = count
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.page-wrapper {
	height: 100%;
	.ant-spin-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
}
</style>
