<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col style="display: flex; align-items: center;">需求日期：</a-col>
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
        <a-button type="primary" @click="query" style="margin-right: 5px;">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col>
        <a-button @click="add" type="primary" style="margin-right: 5px;">新增</a-button>
        <!-- <a-button @click="submit" type="primary" style="margin-right: 20px;">提交</a-button> -->
        <!-- <a-button @click="modify" :disabled="selectedIds.length !== 1" style="margin-right: 20px;">修改</a-button> -->
        <a-button @click="deletePlan" :disabled="!selectedIds.length" type="danger" style="margin-right: 5px;">删除</a-button>
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
          <span slot="customerId" slot-scope="record">
            {{ customerList.find(item => item.id === record.customerId) ? customerList.find(item => item.id === record.customerId).customerName : '' }}
          </span>
          <span slot="status" slot-scope="record">
            {{ ['待提交', '待回复', '已回复', '已确认'][record.status] }}
          </span>
          <span slot="action" slot-scope="record">
            <!-- 已确认的查看详情跳转至审核页面 -->
            <router-link v-if="record.status === 3" style="color: #1890ff" :to="{ path: '/planaudit', query: { id: record.id, type: 0 }}">查看</router-link>
            <router-link v-else style="color: #1890ff" :to="{ path: '/planedit', query: { id: record.id, type: 0 }}">查看</router-link>
            <a-divider v-if="record.status === 0" type="vertical" />
            <router-link v-if="record.status === 0" style="color: #1890ff" :to="{ path: '/planedit', query: { id: record.id, type: 1 }}">修改</router-link>
            <a-divider v-if="record.status === 0" type="vertical" />
            <a v-if="record.status === 0" @click="submit(record)" style="color: #1890ff">提交</a>
            <a-divider v-if="record.status === 2" type="vertical" />
            <router-link v-if="record.status === 2" style="color: #1890ff" :to="{ path: '/planaudit', query: { id: record.id, type: 1 }}">审核</router-link>
          </span>
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
    key: 'customerId',
    scopedSlots: { customRender: 'customerId' }
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
    title: '男女比例',
    dataIndex: 'demandRatio',
    key: 'demandRatio'
  },
  {
    title: '需求年龄',
    dataIndex: 'demandAge',
    key: 'demandAge'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
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
    dataIndex: 'replyPersionTotal',
    key: 'replyPersionTotal'
  },
  {
    title: '状态',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  },
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
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      customerList: [],
      locale,
      rangePicker: null,
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
    this.findCustomerList()
  },
  methods: {
    async findCustomerList () {
      const res = await this.$http.get('/data/customer/find')
      if (res) {
        this.customerList = res.data
      }
    },
    onPickerChange (date, dateString) {
      console.log(date, dateString)
    },
    async submit (record) {
      console.log(record)
      const {
        id,
        customerId,
        deptId,
        contactName,
        contactPhone,
        demandPersions,
        demandTrade,
        demandBeginDate,
        demandEndDate,
        demandRatio,
        demandAge,
        replyEndDate,
        remark
      } = record
      this.spinning = true
      // 根据id查询该需求下选中的供应商
      const res = await this.$http.get(`/data/demand/findSupplier/${id}`)
      if (res) {
        const param = {
          id,
          customerId,
          deptId,
          contactName,
          contactPhone,
          demandPersions,
          demandTrade,
          demandBeginDate,
          demandEndDate,
          demandRatio,
          demandAge,
          replyEndDate,
          remark,
          supplierIdsArr: res.data.map(item => item.supplierId)
        }
        // 提交
        const result = await this.$http.post('/data/demand/submit', param)
        if (result) {
          this.$message.success('需求提交成功!')
          this.getList()
        }
      }
      this.spinning = false
    },
    reset () {
      this.status = ''
      this.rangePicker = null
    },
    async findList () {
      const res = await this.$http.get('/data/customer/find')
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
            const res = await this.$http.post(`/data/demand/delete/${id}`)
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('删除需求计划成功!')
              this.getList()
            }
          } else {
            const res = await this.$http.post('/data/demand/batchDel', {
              idsArr: this.selectedIds
            })
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('批量删除需求计划成功!')
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
      const { page, limit, rangePicker, status } = this
      const res = await this.$http.get('/data/demand/list', {
        page,
        limit,
        demandBeginDate: rangePicker ? rangePicker[0].format('YYYY-MM-DD') : null,
        demandEndDate: rangePicker ? rangePicker[1].format('YYYY-MM-DD') : null,
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
