<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-form :form="form" @submit="() => {
        page = 1;
        handleSearch();
      }" layout="horizontal">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item label="雇佣状态">
            <a-select
              v-decorator="['employStateArr']"
              placeholder="请选择雇佣状态"
              mode="multiple"
            >
              <a-select-option value="1">在职</a-select-option>
              <a-select-option value="2">离职</a-select-option>
              <a-select-option value="3">自离</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="入职日期">
            <a-range-picker v-decorator="[`date`]" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="供应商">
            <a-select
              v-decorator="['supplierId']"
              placeholder="请选择供应商"
            >
              <a-select-option v-for="item in supplierList" :key="item.id" :value="item.id">
                {{ item.supplierName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="部门">
            <a-input
              v-decorator="[`deptName`]"
              placeholder="请输入部门"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" html-type="submit" style="margin-right: 5px;">导出</a-button>
          <a-button @click="reset">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <!-- <a-row type="flex" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <a-col>
        <a-button @click="dataPush" style="margin-right: 5px;">数据推送</a-button>
        <a-button @click="downloadTemplet" style="margin-right: 5px;">模板下载</a-button>
        <a-button @click="exportOpt" style="margin-right: 5px;">导出</a-button>
        <a-upload
          :action="`${$http.baseURL}/data/employee/import`"
          :showUploadList="false"
          name="file"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <a-button>导入</a-button>
        </a-upload>
      </a-col>
      <a-col>
        <a-button @click="add">新增</a-button>
        <a-button @click="modify" :disabled="selectedIds.length !== 1" style="margin-left: 5px;">修改</a-button>
        <a-button @click="dimission" :disabled="!selectedIds.length" style="margin-left: 5px;">离职</a-button>
        <a-button @click="selfDimission" :disabled="!selectedIds.length" style="margin-left: 5px;">自离</a-button>
      </a-col>
    </a-row> -->
    <!-- <a-row style="margin-bottom: 20px;">
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
          <router-link
            slot="employeeNumber"
            slot-scope="text, record"
            style="color: #1890ff"
            :to="{ path: '/archivesedit', query: { id: record.id, type: 0 }}"
          >{{ text }}</router-link>
          <span slot="customerId" slot-scope="text">{{ customerList.find(item => item.id === text) ? customerList.find(item => item.id === text).customerName : '' }}</span>
          <span slot="jobType" slot-scope="text">{{ ['', '学生工', '农民工', '社会工'][text] }}</span>
        </a-table>
      </a-col>
    </a-row> -->
    <!-- <a-row style="margin-bottom: 20px;">
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
    </a-row> -->
  </a-spin>
</template>

<script>
const columns = [
  {
    title: '工号',
    dataIndex: 'employeeNumber',
    key: 'employeeNumber',
    scopedSlots: { customRender: 'employeeNumber' }
  },
  {
    title: '姓名',
    dataIndex: 'employeeName',
    key: 'employeeName'
  },
  {
    title: '入职日期',
    dataIndex: 'onJobDate',
    key: 'onJobDate'
  },
  {
    title: '离职日期',
    dataIndex: 'downJobDate',
    key: 'downJobDate'
  },
  {
    title: '雇佣状态',
    dataIndex: 'employState',
    key: 'employState'
  },
  {
    title: '工种',
    dataIndex: 'jobType',
    key: 'jobType',
    scopedSlots: { customRender: 'jobType' }
  },
  {
    title: '区域',
    dataIndex: 'area',
    key: 'area'
  },
  {
    title: '所属公司',
    dataIndex: 'customerId',
    key: 'customerId',
    scopedSlots: { customRender: 'customerId' }
  },
  {
    title: '所在部门',
    dataIndex: 'deptName',
    key: 'deptName'
  },
  {
    title: '本人电话',
    dataIndex: 'employeePhone',
    key: 'employeePhone'
  },
  {
    title: '紧急联系人',
    dataIndex: 'emergencyContactName',
    key: 'emergencyContactName'
  },
  {
    title: '紧急联系电话',
    dataIndex: 'emergencyContactPhone',
    key: 'emergencyContactPhone'
  },
  {
    title: '员工工价',
    dataIndex: 'employeePrice',
    key: 'employeePrice'
  },
  {
    title: '工资卡信息',
    dataIndex: 'payrollCardInfo',
    key: 'payrollCardInfo'
  },
  {
    title: '招聘来源',
    dataIndex: 'supplierName',
    key: 'supplierName'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex'
  }
]

export default {
  data () {
    return {
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
    // this.findCustomerList()
    // this.findSuppliersList()
    // this.handleSearch()
  },
  methods: {
    // handleChange (info) {
    //   if (info.file.status === 'done') {
    //     this.$message.success('上传成功')
    //   } else if (info.file.status === 'error') {
    //     this.$message.error('上传失败')
    //   }
    // },
    // beforeUpload (file) {
    //   const { name } = file
    //   const type = name.split('.').pop()
    //   if (['xlsx', 'xls', 'xltx', 'xlt', 'xlsm', 'xlsm', 'xlsb', 'xltm', 'csv'].includes(type)) {
    //     return true
    //   }
    //   this.$message.error('请上传正确格式的表格文件')
    //   return false
    // },
    /**
     * 导出
     */
    // exportOpt () {
    //   this.$confirm({
    //     title: '导出',
    //     content: '确定要进行数据导出吗？',
    //     okText: '确定',
    //     cancelText: '取消',
    //     onOk: async () => {
    //       this.form.validateFields(async (error, values) => {
    //         if (!error) {
    //           const { date, queryEmployeeNumber, queryEmployeeName, queryEmployState } = values
    //           const param = {
    //             queryEmployeeNumber,
    //             queryEmployeeName,
    //             queryEmployState,
    //             queryOnJobDateStartTime: date ? date[0].format('YYYY-MM-DD') : null,
    //             queryOnJobDateEndTime: date ? date[1].format('YYYY-MM-DD') : null
    //           }
    //           this.spinning = true
    //           const res = await this.$http.get('/data/employee/export', param)
    //           this.spinning = false
    //           if (res) {
    //             const { data } = res
    //             window.open(data)
    //             this.$message.success('导出成功')
    //           }
    //         }
    //       })
    //     }
    //   })
    // },
    /**
     * 离职
     */
    // dimission () {
    //   this.$confirm({
    //     title: '离职提示',
    //     content: '确定对员工进行离职操作吗？',
    //     okText: '确定',
    //     cancelText: '取消',
    //     onOk: async () => {
    //       this.spinning = true
    //       if (this.selectedIds.length === 1) {
    //         const id = this.selectedIds[0]
    //         const res = await this.$http.post(`/data/employee/resign/${id}`)
    //         this.spinning = false
    //         if (res) {
    //           this.selectedIds = []
    //           this.selectedRowKeys = []
    //           this.selectedRows = []
    //           this.$message.success('离职操作成功!')
    //           this.handleSearch()
    //         }
    //       } else {
    //         const res = await this.$http.post('/data/employee/batchResign', {
    //           idsArr: this.selectedIds
    //         })
    //         this.spinning = false
    //         if (res) {
    //           this.selectedIds = []
    //           this.selectedRowKeys = []
    //           this.selectedRows = []
    //           this.$message.success('批量离职操作成功!')
    //           this.handleSearch()
    //         }
    //       }
    //     }
    //   })
    // },
    /**
     * 自离
     */
    // selfDimission () {
    //   this.$confirm({
    //     title: '自离提示',
    //     content: '确定对员工进行自离操作吗？',
    //     okText: '确定',
    //     cancelText: '取消',
    //     onOk: async () => {
    //       this.spinning = true
    //       if (this.selectedIds.length === 1) {
    //         const id = this.selectedIds[0]
    //         const res = await this.$http.post(`/data/employee/resignBySelf/${id}`)
    //         this.spinning = false
    //         if (res) {
    //           this.selectedIds = []
    //           this.selectedRowKeys = []
    //           this.selectedRows = []
    //           this.$message.success('自离操作成功!')
    //           this.handleSearch()
    //         }
    //       } else {
    //         const res = await this.$http.post('/data/employee/batchResignBySelf', {
    //           idsArr: this.selectedIds
    //         })
    //         this.spinning = false
    //         if (res) {
    //           this.selectedIds = []
    //           this.selectedRowKeys = []
    //           this.selectedRows = []
    //           this.$message.success('批量自离操作成功!')
    //           this.handleSearch()
    //         }
    //       }
    //     }
    //   })
    // },
    /**
     * 数据推送
     */
    // dataPush () {
    //   this.$confirm({
    //     title: '数据推送',
    //     content: '确定要进行数据推送吗？',
    //     okText: '确定',
    //     cancelText: '取消',
    //     onOk: async () => {
    //       this.spinning = true
    //       const res = await this.$http.post('/data/employee/dataPush')
    //       this.spinning = false
    //       if (res) {
    //         this.$message.success('数据推送成功!')
    //       }
    //     }
    //   })
    // },
    /**
     * 模板下载
     */
    // downloadTemplet () {
    //   this.$confirm({
    //     title: '模板下载',
    //     content: '确定要进行模板下载吗？',
    //     okText: '确定',
    //     cancelText: '取消',
    //     onOk: async () => {
    //       this.spinning = true
    //       const res = await this.$http.get('/data/employee/downloadTemplet')
    //       this.spinning = false
    //       if (res) {
    //         this.$message.success('模板下载成功!')
    //       }
    //     }
    //   })
    // },
    // onPickerChange (date, dateString) {
    //   console.log(date, dateString)
    // },
    // submit () {
    //   //
    // },
    reset () {
      this.form.resetFields()
    },
    // async findCustomerList () {
    //   const res = await this.$http.get('/data/customer/find')
    //   if (res) {
    //     this.customerList = res.data
    //   }
    // },
    // async findSuppliersList () {
    //   const res = await this.$http.get('/data/supplier/find')
    //   if (res) {
    //     this.supplierList = res.data
    //   }
    // },
    // deletePlan () {
    //   this.$confirm({
    //     title: '删除提示',
    //     content: '确定要删除所勾选的记录吗？',
    //     okText: '确定',
    //     okType: 'danger',
    //     cancelText: '取消',
    //     onOk: async () => {
    //       if (this.selectedIds.length === 1) {
    //         const id = this.selectedIds[0]
    //         const res = await this.$http.post(`/data/supplier/delete/${id}`)
    //         if (res) {
    //           this.selectedIds = []
    //           this.selectedRowKeys = []
    //           this.selectedRows = []
    //           this.$message.success('删除供应商成功!')
    //           this.getList()
    //         }
    //       } else {
    //         const res = await this.$http.post('/data/supplier/batchDel', {
    //           idsArr: this.selectedIds
    //         })
    //         if (res) {
    //           this.selectedIds = []
    //           this.selectedRowKeys = []
    //           this.selectedRows = []
    //           this.$message.success('批量删除供应商成功!')
    //           this.getList()
    //         }
    //       }
    //     },
    //     onCancel: () => {
    //       console.log('Cancel')
    //     }
    //   })
    // },
    // modify () {
    //   const id = this.selectedIds[0]
    //   // 修改type为1，详情type为0
    //   this.$router.push({ path: '/archivesedit', query: { id, type: 1 } })
    // },
    // onSelectChange (selectedRowKeys, selectedRows) {
    //   this.selectedRowKeys = selectedRowKeys
    //   this.selectedRows = selectedRows
    //   this.selectedIds = selectedRows.map(item => item.id)
    // },
    // add () {
    //   this.$router.push('/archivesedit')
    // },
    // // query () {
    // //   this.page = 1
    // //   this.getList()
    // // },
    // onChange (page) {
    //   this.page = page
    //   this.handleSearch()
    // },
    // onShowSizeChange (current, limit) {
    //   this.page = 1
    //   this.limit = limit
    //   this.handleSearch()
    // },
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
          const { date, employStateArr, supplierId, deptName } = values
          // const { page, limit } = this
          const param = {
            // page,
            // limit,
            // queryEmployeeNumber,
            // queryEmployeeName,
            employStateArr,
            supplierId,
            deptName,
            onJobDateStartTime: date ? date[0].format('YYYY-MM-DD') : null,
            onJobDateEndTime: date ? date[1].format('YYYY-MM-DD') : null
          }
          this.spinning = true
          const res = await this.$http.get('/data/employee/export', param)
          this.spinning = false
          if (res) {
            const { data } = res
            window.open(data)
            this.$message.success('导出成功')
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
