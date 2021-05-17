<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" @click="handleSearch" style="margin-right: 20px;">提交</a-button>
              <!-- <a-button v-if="type === '1'" type="primary" @click="handleSearch(2)" style="margin-right: 20px;">提交后新增</a-button> -->
              <a-button v-if="type === '1'" :style="{ marginRight: '20px' }" @click="handleReset">重置</a-button>
              <a-button @click="cancel">{{ type !== '1' ? '返回' : '取消' }}</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="12">
              <a-form-item label="借支日期" :label-col="{ span: 6 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`borrowDate`, {
                    rules: [{ required: true, message: '请选择借支日期!'}]
                  }]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择借支日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="工号" :label-col="{ span: 9 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`employeeNumber`, {
                    rules: [{ required: true, message: '请输入工号!'}]
                  }]"
                  placeholder="请输入工号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item label="" :label-col="{ span: 6 }">
                <a-button type="primary" @click="getByEmployeeNumber">查询</a-button>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="姓名" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`employeeName`]"
                  placeholder="输入工号进行查询"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="入职日期" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`onJobDate`]"
                  placeholder="输入工号进行查询"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="公司" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`customerName`]"
                  placeholder="输入工号进行查询"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="部门" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`deptName`]"
                  placeholder="输入工号进行查询"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="借支金额" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`borrowAmount`, {
                    rules: [{ required: true, message: '请输入借支金额!'}]
                  }]"
                  placeholder="请输入借支金额"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="借支原因" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`borrowCause`, {
                    rules: [{ required: true, message: '请输入借支原因!'}]
                  }]"
                  placeholder="请输入借支原因"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="已支取" :label-col="{ span: 6 }">
                <a-checkbox v-decorator="[`isReceive`, { valuePropName: 'checked' }]"></a-checkbox>
                <span style="margin-left: 20px;">支取日期：</span>
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`receiveDate`]"
                  format="YYYY-MM-DD"
                  placeholder="请选择支付日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="已代扣" :label-col="{ span: 6 }">
                <a-checkbox v-decorator="[`isDeduct`, { valuePropName: 'checked' }]"></a-checkbox>
                <span style="margin-left: 20px;">代扣月份：</span>
                <a-month-picker
                  :disabled="type === '0'"
                  v-decorator="[`deductYearMonth`]"
                  format="YYYY-MM"
                  placeholder="请选择代扣月份"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script>
import Moment from 'moment'

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
      // customerList: [],
      // supplierList: [],
      previewVisible: false,
      previewImage: '',
      fileList: [],
      spinning: false,
      type: '1', // 新增、修改type为1，查看详情type为0
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
    const { id, type } = this.$route.query
    if (id) {
      this.id = id
      this.type = type
      this.queryDetail(id)
      // this.queryAttachment(id)
    }
  },
  methods: {
    async getByEmployeeNumber() {
      const employeeNumber = this.form.getFieldValue('employeeNumber')
      if (!employeeNumber) {
        return this.$message.error('工号不得为空！')
      }
      this.spinning = true
      const res = await this.$http.get('/data/employee/getByEmployeeNumber', {
        employeeNumber
      })
      this.spinning = false
      if (res) {
        const {
          employeeName,
          ethnic,
          customerName,
          deptName,
          onJobDate,
          downJobDate,
          payrollCardInfo,
          supplierId
        } = res.data
        const { supplierName } = this.supplierList.find(item => item.id === supplierId)
        this.form.setFieldsValue({
          employeeName,
          ethnic,
          customerName,
          deptName,
          onJobDate,
          downJobDate,
          payrollCardInfo,
          supplierName
        })
      }
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
    // async handleRemove (file) {
    //   const index = this.fileList.indexOf(file)
    //   const newFileList = this.fileList.slice()
    //   newFileList.splice(index, 1)
    //   this.fileList = newFileList
    //   // 如果是已经上传的附件
    //   if (!file.originFileObj) {
    //     const { uid } = file
    //     const res = await this.$http.get(`/data/supplier/deleteFile/${uid}`)
    //     if (res) {
    //       this.$message.success('删除远程附件成功')
    //     }
    //   }
    // },
    async queryDetail (id) {
      this.spinning = true
      const res = await this.$http.get(`/data/borrow/get/${id}`)
      this.spinning = false
      if (res) {
        const {
          borrowDate,
          onJobDate,
          employeeNumber,
          employeeName,
          customerName,
          deptName,
          borrowAmount,
          borrowCause,
          isDeduct,
          isReceive,
          receiveDate,
          deductYearMonth
        } = res.data
        this.form.setFieldsValue({
          borrowDate: borrowDate ? Moment(borrowDate) : null,
          onJobDate,
          employeeNumber,
          employeeName,
          customerName,
          deptName,
          borrowAmount,
          borrowCause,
          isDeduct: isDeduct === 'true',
          isReceive: isReceive === 'true',
          receiveDate: receiveDate ? Moment(receiveDate) : null,
          deductYearMonth: deductYearMonth ? Moment(deductYearMonth) : null
        })
      }
    },
    handleSearch () {
      this.form.validateFields(async (error, values) => {
        if (!error) {
          const { borrowDate, receiveDate, deductYearMonth } = values
          const param = {
            ...values,
            borrowDate: borrowDate ? (typeof borrowDate === 'string' ? borrowDate : borrowDate.format('YYYY-MM-DD')) : null,
            receiveDate: receiveDate ? (typeof receiveDate === 'string' ? receiveDate : receiveDate.format('YYYY-MM-DD')) : null,
            deductYearMonth: deductYearMonth ? (typeof deductYearMonth === 'string' ? deductYearMonth : deductYearMonth.format('YYYY-MM')) : null
          }
          this.spinning = true
          if (this.id) param.id = this.id
          const res = await this.$http.post(`/data/borrow/${this.id ? 'update' : 'add'}`, param)
          this.spinning = false
          if (res) {
            this.$message.success(`${this.id ? '借支信息修改成功！' : '新增借支信息成功！'}`)
            this.$router.back()
          }
        }
      })
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
