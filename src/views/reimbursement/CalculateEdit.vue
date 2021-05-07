<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row style="border-bottom: 1px solid #000000;">
      <a-col>
        <a-form class="ant-advanced-search-form" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button @click="cancel">返回</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="8">
              <a-form-item label="核算月份" :label-col="{ span: 12 }">
                {{ yearMonth }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="供应商编号" :label-col="{ span: 12 }">
                {{ supplierCode }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="供应商名称" :label-col="{ span: 12 }">
                {{ supplierName }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="人数" :label-col="{ span: 12 }">
                {{ persionTotal }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="返费合计" :label-col="{ span: 12 }">
                {{ rebateTotal }}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
    <a-row type="flex" style="display: flex; justify-content: space-between; margin: 10px 0;">
      <a-col>
        <a-button @click="exportOpt">导出</a-button>
      </a-col>
      <a-col style="display: flex;">
        <a-input v-model="employeeName" placeholder="请输入员工姓名" />
        <a-button type="primary" @click="() => {
          page = 1;
          handleSearch();
        }" style="margin-left: 5px;">查询</a-button>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 20px;">
      <a-col>
        <a-table
          :pagination="false"
          :columns="columns"
          :data-source="data"
          :rowKey="(record, index) => index"
        ></a-table>
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
    title: '工号',
    dataIndex: 'employeeNumber',
    key: 'employeeNumber'
  },
  {
    title: '姓名',
    dataIndex: 'employeeName',
    key: 'employeeName'
  },
  {
    title: '公司',
    dataIndex: 'customerName',
    key: 'customerName'
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    key: 'deptName'
  },
  {
    title: '工时（小时）',
    dataIndex: 'totalHours',
    key: 'totalHours'
  },
  {
    title: '代扣费',
    dataIndex: 'withholdFee',
    key: 'withholdFee'
  },
  {
    title: '返费标准（元/工时）',
    dataIndex: 'rebateStandard',
    key: 'rebateStandard'
  },
  {
    title: '返费合计（元）',
    dataIndex: 'rebateTotal',
    key: 'rebateTotal'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  }
]
// import Moment from 'moment'

// function getBase64 (file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = error => reject(error)
//   })
// }

export default {
  data () {
    return {
      data: [],
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      selectedIds: [],
      total: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      page: 1,
      limit: 10,
      employeeName: '',
      yearMonth: '',
      supplierCode: '',
      supplierId: '',
      supplierName: '',
      persionTotal: '',
      rebateTotal: '',
      customerList: [],
      supplierList: [],
      previewVisible: false,
      previewImage: '',
      fileList: [],
      spinning: false,
      id: '',
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  computed: {
    //
  },
  mounted () {
    // this.findCustomerList()
    // this.findSuppliersList()
    const { id, supplierId, yearMonth } = this.$route.query
    if (id) {
      this.id = id
      this.supplierId = supplierId
      this.yearMonth = yearMonth
      this.queryDetail(id)
      this.handleSearch()
      // this.queryAttachment(id)
    }
  },
  methods: {
    onChange (page) {
      this.page = page
      this.handleSearch()
    },
    onShowSizeChange (current, limit) {
      this.page = 1
      this.limit = limit
      this.handleSearch()
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
          const { employeeName, supplierId, yearMonth } = this
          this.spinning = true
          const res = await this.$http.get('/data/employeeRebate/export', {
            employeeName, supplierId, yearMonth
          })
          this.spinning = false
          if (res) {
            const { data } = res
            window.open(data)
            this.$message.success('导出成功')
          }
        }
      })
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
    // async queryAttachment (id) {
    //   const res = await this.$http.get(`/data/supplier/findFile/${id}`)
    //   if (res) {
    //     const fileList = res.data.map(file => {
    //       return {
    //         uid: file.id,
    //         name: file.fileName,
    //         status: 'done',
    //         url: file.fileUrl,
    //         thumbUrl: file.fileUrl
    //       }
    //     })
    //     this.fileList = fileList
    //   }
    // },
    // handleCancel () {
    //   this.previewVisible = false
    // },
    // async handlePreview (file) {
    //   if (!file.url && !file.preview) {
    //     file.preview = await getBase64(file.originFileObj)
    //   }
    //   this.previewImage = file.url || file.preview
    //   this.previewVisible = true
    // },
    // handleChange ({ fileList }) {
    //   fileList = fileList.filter(file => {
    //     const { size } = file
    //     if (size > 5 * 1024 * 1024) {
    //       this.$message.error('单个文件小于5M!')
    //       return false
    //     }
    //     return true
    //   })
    //   this.fileList = fileList
    // },
    // beforeUpload (file) {
    //   return false
    // },
    /**
     * 删除
     * 1、如果是已经上传的附件，调用删除接口
     * 2、如果是还未上传的附件，直接从数组中去掉
     */
    async handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      // 如果是已经上传的附件
      if (!file.originFileObj) {
        const { uid } = file
        const res = await this.$http.get(`/data/supplier/deleteFile/${uid}`)
        if (res) {
          this.$message.success('删除远程附件成功')
        }
      }
    },
    async queryDetail (id) {
      this.spinning = true
      const res = await this.$http.get(`/data/supplierRebate/get/${id}`)
      this.spinning = false
      if (res) {
        const {
          yearMonth,
          supplierCode,
          supplierName,
          persionTotal,
          rebateTotal
        } = res.data
        this.yearMonth = yearMonth
        this.supplierCode = supplierCode
        this.supplierName = supplierName
        this.persionTotal = persionTotal
        this.rebateTotal = rebateTotal

        // this.form.setFieldsValue({
        //   onJobDate: onJobDate ? Moment(onJobDate) : null,
        //   employeeNumber,
        //   employeeName,
        //   employState,
        //   sex,
        //   ethnic,
        //   employeePhone,
        //   idCard,
        //   emergencyContactName,
        //   emergencyContactPhone,
        //   originAddress,
        //   jobType,
        //   area,
        //   customerId,
        //   deptName,
        //   supplierId,
        //   employeePrice,
        //   payrollCardInfo
        // })
      }
    },
    async handleSearch () {
      const { employeeName, supplierId, yearMonth, page, limit } = this
      const param = {
        employeeName, supplierId, yearMonth, page, limit
      }
      this.spinning = true
      const res = await this.$http.get('/data/employeeRebate/list', param)
      this.spinning = false
      if (res) {
        this.data = res.data
        // this.$message.success(`${this.id ? '员工档案信息修改成功！' : '新增员工档案成功！'}`)
        // this.$router.back()
      }
    },
    /**
     * 上传附件
     * 如果是已经上传过的，过滤掉
     */
    // async handleFile (id, isUpdate) {
    //   if (this.fileList.length) {
    //     await Promise.all(this.fileList.map(async file => {
    //       const { originFileObj } = file
    //       if (originFileObj) {
    //         const formData = new FormData()
    //         formData.append('file', originFileObj)
    //         formData.append('id', id)
    //         await this.$http.post(`/data/supplier/uploadFile/${id}`, formData)
    //       }
    //     }))
    //   }
    //   this.spinning = false
    //   this.$message.success(`${isUpdate ? '供应商信息修改成功！' : '新增供应商成功！'}`)
    //   this.$router.back()
    // },
    handleReset () {
      this.form.resetFields()
    },
    cancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
  .ant-form-item-children {
    color: #1890ff;
  }
  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }
  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
