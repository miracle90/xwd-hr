<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col style="display: flex; align-items: center;">入职日期：</a-col>
      <a-col><a-range-picker v-model="rangePicker" @change="onPickerChange" :locale="locale" /></a-col>
    </a-row>
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col style="display: flex; align-items: center;">单据状态：</a-col>
      <a-col style="margin-right: 200px;">
        <a-radio-group v-model="status" button-style="solid">
          <a-radio-button value="0">待提交</a-radio-button>
          <a-radio-button value="1">待回复</a-radio-button>
          <a-radio-button value="2">已回复</a-radio-button>
          <a-radio-button value="3">已确认</a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col>
        <a-button type="primary" @click="query" style="margin-right: 20px;">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col>
        <a-button @click="add" type="primary" style="margin-right: 20px;">新增</a-button>
        <a-button @click="submit" type="primary" style="margin-right: 20px;">提交</a-button>
        <!-- <a-button @click="modify" :disabled="selectedIds.length !== 1" style="margin-right: 20px;">修改</a-button> -->
        <a-button @click="deletePlan" :disabled="!selectedIds.length" type="danger" style="margin-right: 20px;">批量删除</a-button>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 20px;">
      <a-col>
        <a-table
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
          <span slot="action" slot-scope="record">
            <router-link style="color: #1890ff" :to="{ path: '/suppliersedit', query: { id: record.id, type: 0 }}">查看</router-link>
            <a-divider type="vertical" />
            <router-link style="color: #1890ff" :to="{ path: '/suppliersedit', query: { id: record.id, type: 0 }}">修改</router-link>
            <a-divider type="vertical" />
            <router-link style="color: #1890ff" :to="{ path: '/suppliersedit', query: { id: record.id, type: 0 }}">审核</router-link>
          </span>
          <!-- <router-link
            slot="supplierName"
            slot-scope="text, record"
            style="color: #1890ff"
            :to="{ path: '/suppliersedit', query: { id: record.id, type: 0 }}"
          >{{ text }}</router-link> -->
        </a-table>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 20px;">
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
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'

const columns = [
  {
    title: '需求编号',
    dataIndex: 'demandCode',
    key: 'demandCode'
  },
  {
    title: '客户名称',
    dataIndex: 'supplierCode',
    key: 'supplierCode'
  },
  {
    title: '需求事业部',
    dataIndex: 'deptName',
    key: 'deptName'
  },
  {
    title: '需求工种',
    dataIndex: 'demandTrade',
    key: 'demandTrade'
  },
  {
    title: '需求人数',
    dataIndex: 'demandPersions',
    key: 'demandPersions'
  },
  {
    title: '需求比例',
    dataIndex: 'demandRatio',
    key: 'demandRatio'
  },
  {
    title: '需求日期',
    dataIndex: 'demandBeginDate',
    key: 'demandBeginDate'
  },
  {
    title: '撤离日期',
    dataIndex: 'demandEndDate',
    key: 'demandEndDate'
  },
  {
    title: '截止回复日期',
    dataIndex: 'replyEndDate',
    key: 'replyEndDate'
  },
  {
    title: '可供应数量',
    dataIndex: 'dispatchEndDate',
    key: 'dispatchEndDate'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
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
      locale,
      rangePicker: null,
      demandBeginDate: '',
      demandEndDate: '',
      status: '',
      spinning: false,
      delayTime: 500,
      selectedRowKeys: [],
      selectedRows: [],
      selectedIds: [],
      total: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      page: 1,
      limit: 10,
      data: [],
      columns
    }
  },
  computed: {
    //
  },
  mounted () {
    this.getList()
    // this.findList()
  },
  methods: {
    onPickerChange (date, dateString) {
      console.log(date, dateString)
    },
    submit () {
      //
    },
    reset () {
      //
    },
    async findList () {
      const res = await this.$http.get('/data/supplier/find')
      console.log(res)
    },
    deletePlan () {
      this.$confirm({
        title: '删除提示',
        content: '确定要删除所勾选的记录吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          if (this.selectedIds.length === 1) {
            const id = this.selectedIds[0]
            const res = await this.$http.post(`/data/supplier/delete/${id}`)
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('删除供应商成功!')
              this.getList()
            }
          } else {
            const res = await this.$http.post('/data/supplier/batchDel', {
              idsArr: this.selectedIds
            })
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('批量删除供应商成功!')
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
      this.$router.push({ path: '/suppliersedit', query: { id, type: 1 } })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('onSelectChange')
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.selectedIds = selectedRows.map(item => item.id)
    },
    add () {
      this.$router.push('/planedit')
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
      const { page, limit, demandBeginDate, demandEndDate, status } = this
      const res = await this.$http.get('/data/demand/list', {
        page,
        limit,
        demandBeginDate,
        demandEndDate,
        status
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
  }
</style>
