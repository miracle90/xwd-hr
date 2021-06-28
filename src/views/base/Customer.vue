<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col>
        <a-input
          placeholder="关键词搜索"
          v-model="keyword"
          style="margin-right: 20px; width: 300px;"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="query">查询</a-button>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col>
        <a-button @click="add" type="primary" style="margin-right: 20px;">新增</a-button>
        <a-button @click="modify" :disabled="selectedIds.length !== 1" style="margin-right: 20px;">修改</a-button>
        <a-button @click="deleteCustomer" :disabled="!selectedIds.length" type="danger" style="margin-right: 20px;">删除</a-button>
      </a-col>
    </a-row>
    <a-row style="flex: 1; margin-bottom: 20px;">
      <a-col>
        <a-table
          :scroll="{ y: tableHeight }"
          :pagination="false"
          :columns="columns"
          :data-source="data"
          :row-selection="{
            selectedRowKeys,
            selectedRows,
            onChange: (selectedRowKeys, selectedRows) => onSelectChange(selectedRowKeys, selectedRows)
          }"
          :rowKey="(record, index) => index"
        >
          <router-link
            slot="customerName"
            slot-scope="record"
            style="color: #1890ff"
            :to="{ path: '/customeredit', query: { id: record.id, type: 0 }}"
          >{{ record.customerName }}</router-link>
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
  {
    title: '客户编码',
    dataIndex: 'customerCode',
    key: 'customerCode'
  },
  {
    title: '注册地址',
    dataIndex: 'registerAddress',
    key: 'registerAddress',
    ellipsis: true
  },
  {
    title: '客户名称',
    key: 'customerName',
    scopedSlots: { customRender: 'customerName' }
  },
  {
    title: '事业部',
    dataIndex: 'deptName',
    key: 'deptName'
  },
  {
    title: '联系人',
    dataIndex: 'contactName',
    key: 'contactName'
  },
  {
    title: '联系方式',
    dataIndex: 'contactPhone',
    key: 'contactPhone'
  },
  {
    title: '邮箱',
    dataIndex: 'contactEmail',
    key: 'contactEmail'
  }
]

export default {
  data () {
    return {
      tableHeight: document.documentElement.clientHeight - 380 + 'px',
      spinning: false,
      delayTime: 500,
      selectedRowKeys: [],
      selectedRows: [],
      selectedIds: [],
      total: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      page: 1,
      limit: 10,
      keyword: '',
      data: [],
      columns
    }
  },
  computed: {
    //
  },
  mounted () {
    window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 380 + 'px'
    }
    this.getList()
    // this.findList()
  },
  methods: {
    async findList () {
      const res = await this.$http.get('/data/supplier/find')
      console.log(res)
    },
    deleteCustomer () {
      this.$confirm({
        title: '删除提示',
        content: '确定要删除所勾选的记录吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          if (this.selectedIds.length === 1) {
            const id = this.selectedIds[0]
            const res = await this.$http.post(`/data/customer/delete/${id}`)
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('删除客户成功!')
              this.getList()
            }
          } else {
            const res = await this.$http.post('/data/customer/batchDel', {
              idsArr: this.selectedIds
            })
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('批量删除客户成功!')
              this.getList()
            }
          }
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    modify () {
      const id = this.selectedIds[0]
      // 修改type为1，详情type为0
      this.$router.push({ path: '/customeredit', query: { id, type: 1 } })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('onSelectChange')
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.selectedIds = selectedRows.map(item => item.id)
    },
    add () {
      this.$router.push('/customeredit')
    },
    query () {
      this.page = 1
      this.getList()
    },
    onChange (page) {
      this.page = page
      this.getList()
    },
    onShowSizeChange (current, limit) {
      this.page = 1
      this.limit = limit
      this.getList()
    },
    async getList () {
      this.spinning = true
      const { page, limit, keyword } = this
      const res = await this.$http.get('/data/customer/list', {
        keyword,
        limit,
        page
      })
      this.spinning = false
      if (res) {
        const { count, data } = res
        this.data = data
        this.total = count
      }
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
