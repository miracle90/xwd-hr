<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-form :form="form" @submit="() => {
        page = 1;
        handleSearch();
      }" layout="horizontal">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="供应商名称">
            <a-input
              v-decorator="[`supplierName`]"
              placeholder="请输入供应商名称"
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
        <a-button @click="add" style="margin-right: 5px;">新增</a-button>
        <a-button @click="deleteData(2)" :disabled="selectedIds.length <= 1" type="danger" style="margin-right: 5px;">批量删除</a-button>
        <a-button @click="downloadTemplet" style="margin-right: 5px;">模板下载</a-button>
        <a-upload
          :action="`${$http.baseURL}/data/rebate/import`"
          :headers="headers"
          :showUploadList="false"
          name="file"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <a-button style="margin-right: 5px;">导入</a-button>
        </a-upload>
        <a-button @click="exportOpt">导出</a-button>
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
            <router-link style="color: #1890ff" :to="{ path: '/settingedit', query: { id: record.id, type: 1 }}">修改</router-link>
            <a-divider type="vertical" />
            <a  @click="deleteData(1, record.id)" style="color: red">删除</a>
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
const columns = [
  {
    title: '供应商代码',
    dataIndex: 'supplierCode',
    key: 'supplierCode'
  },
  {
    title: '供应商',
    dataIndex: 'supplierName',
    key: 'supplierName'
  },
  {
    title: '返费标准(元/工时）',
    dataIndex: 'rebateStandard',
    key: 'rebateStandard'
  },
  {
    title: '入职日期起',
    dataIndex: 'onJobDate',
    key: 'onJobDate'
  },
  {
    title: '入职日期止',
    dataIndex: 'downJobDate',
    key: 'downJobDate'
  },
  {
    title: '代发工资',
    dataIndex: 'isProxyPay',
    key: 'isProxyPay'
  },
  {
    title: '更新人',
    dataIndex: 'updateUserName',
    key: 'updateUserName'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
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
      headers: {
        token: window.localStorage.getItem('token')
      },
      customerList: [],
      supplierList: [],
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
    this.findCustomerList()
    this.findSuppliersList()
    this.handleSearch()
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'done') {
        this.$message.success('上传成功')
      } else if (info.file.status === 'error') {
        this.$message.error('上传失败')
      }
    },
    beforeUpload (file) {
      const { name } = file
      const type = name.split('.').pop()
      if (['xlsx', 'xls', 'xltx', 'xlt', 'xlsm', 'xlsm', 'xlsb', 'xltm', 'csv'].includes(type)) {
        return true
      }
      this.$message.error('请上传正确格式的表格文件')
      return false
    },
    /**
     * 导出
     */
    exportOpt () {
      this.$confirm({
        title: '导出',
        content: '确定要进行数据导出吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          this.form.validateFields(async (error, values) => {
            if (!error) {
              const param = {
                ...values
              }
              this.spinning = true
              const res = await this.$http.get('/data/rebate/export', param)
              this.spinning = false
              if (res) {
                const { data } = res
                window.open(data)
                this.$message.success('导出成功')
              }
            }
          })
        }
      })
    },
    /**
     * 离职
     */
    dimission () {
      this.$confirm({
        title: '离职提示',
        content: '确定对员工进行离职操作吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          this.spinning = true
          if (this.selectedIds.length === 1) {
            const id = this.selectedIds[0]
            const res = await this.$http.post(`/data/employee/resign/${id}`)
            this.spinning = false
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('离职操作成功!')
              this.handleSearch()
            }
          } else {
            const res = await this.$http.post('/data/employee/batchResign', {
              idsArr: this.selectedIds
            })
            this.spinning = false
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('批量离职操作成功!')
              this.handleSearch()
            }
          }
        }
      })
    },
    /**
     * 自离
     */
    selfDimission () {
      this.$confirm({
        title: '自离提示',
        content: '确定对员工进行自离操作吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          this.spinning = true
          if (this.selectedIds.length === 1) {
            const id = this.selectedIds[0]
            const res = await this.$http.post(`/data/employee/resignBySelf/${id}`)
            this.spinning = false
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('自离操作成功!')
              this.handleSearch()
            }
          } else {
            const res = await this.$http.post('/data/employee/batchResignBySelf', {
              idsArr: this.selectedIds
            })
            this.spinning = false
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('批量自离操作成功!')
              this.handleSearch()
            }
          }
        }
      })
    },
    /**
     * 模板下载
     */
    downloadTemplet () {
      this.$confirm({
        title: '模板下载',
        content: '确定要进行模板下载吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          this.spinning = true
          const res = await this.$http.get('/data/rebate/downloadTemplet')
          this.spinning = false
          if (res) {
            window.open(res.data)
            this.$message.success('模板下载成功!')
          }
        }
      })
    },
    onPickerChange (date, dateString) {
      console.log(date, dateString)
    },
    submit () {
      //
    },
    reset () {
      this.form.resetFields()
    },
    async findCustomerList () {
      const res = await this.$http.get('/data/customer/find')
      if (res) {
        this.customerList = res.data
      }
    },
    async findSuppliersList () {
      const res = await this.$http.get('/data/supplier/find')
      if (res) {
        this.supplierList = res.data
      }
    },
    deleteData (type, id) {
      this.$confirm({
        title: '删除提示',
        content: '确定要删除所勾选的记录吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          this.spinning = true
          if (type === 1) {
            const res = await this.$http.post(`/data/rebate/delete/${id}`)
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('删除返费设定信息成功!')
              this.handleSearch()
            }
          } else {
            const res = await this.$http.post('/data/rebate/batchDel', {
              idsArr: this.selectedIds
            })
            if (res) {
              this.selectedIds = []
              this.selectedRowKeys = []
              this.selectedRows = []
              this.$message.success('批量删除供应商成功!')
              this.handleSearch()
            }
          }
          this.spinning = false
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    modify () {
      const id = this.selectedIds[0]
      // 修改type为1，详情type为0
      this.$router.push({ path: '/archivesedit', query: { id, type: 1 } })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.selectedIds = selectedRows.map(item => item.id)
    },
    add () {
      this.$router.push('/settingedit')
    },
    // query () {
    //   this.page = 1
    //   this.getList()
    // },
    onChange (page) {
      this.page = page
      this.handleSearch()
    },
    onShowSizeChange (current, limit) {
      this.page = 1
      this.limit = limit
      this.handleSearch()
    },
    // async getList () {
    //   this.spinning = true
    //   const { page, limit, queryOnJobDateStartTime, queryOnJobDateEndTime, status } = this
    //   const res = await this.$http.get('/data/employee/list', {
    //     page,
    //     limit,
    //     queryOnJobDateStartTime,
    //     queryOnJobDateEndTime,
    //     status
    //   })
    //   this.spinning = false
    //   if (res) {
    //     const { count, data } = res
    //     this.data = data
    //     this.total = count
    //   }
    // },
    handleSearch (e) {
      if (e) e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (!error) {
          const { supplierName } = values
          const { page, limit } = this
          const param = {
            page,
            limit,
            supplierName
          }
          this.spinning = true
          const res = await this.$http.get('/data/rebate/list', param)
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
</style>
