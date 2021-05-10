<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" @click="handleSearch(1)" style="margin-right: 20px;">提交</a-button>
              <a-button v-if="type === '1'" type="primary" @click="handleSearch(2)" style="margin-right: 20px;">提交后新增</a-button>
              <a-button v-if="type === '1'" :style="{ marginRight: '20px' }" @click="handleReset">重置</a-button>
              <a-button @click="cancel">{{ type !== '1' ? '返回' : '取消' }}</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="12">
              <a-form-item label="月份" :label-col="{ span: 6 }">
                <a-month-picker
                  :disabled="type === '0'"
                  v-decorator="[`date`, {
                    rules: [{ required: true, message: '请选择月份!'}]
                  }]"
                  :locale="locale"
                  placeholder="请选择月份"
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
              <a-form-item label="供应商" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`supplierName`]"
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
              <a-form-item label="离职日期" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`downJobDate`]"
                  placeholder="输入工号进行查询"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="所属公司" :label-col="{ span: 6 }">
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
            <a-col :span="24">
              <a-form-item label="工资卡" :label-col="{ span: 3 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`payrollCardInfo`]"
                  placeholder="输入工号进行查询"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="应发合计" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`shouldBePay`, {
                    rules: [{ required: true, message: '请输入应发合计!'}]
                  }]"
                  placeholder="请输入应发合计"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="总工时" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`totalHours`, {
                    rules: [{ required: true, message: '请输入总工时!'}]
                  }]"
                  placeholder="请输入总工时"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="单价" :label-col="{ span: 12}">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`price`, {
                    rules: [{ required: true, message: '请输入单价!'}]
                  }]"
                  placeholder="请输入单价"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="6">
              <a-form-item label="应扣合计" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`shouldBeDeduct`, {
                    rules: [{ required: true, message: '请输入应扣合计!'}]
                  }]"
                  placeholder="请输入应扣合计"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="水电扣费" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`waterAndElectricityFee`]"
                  placeholder="请输入水电扣费"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="餐费扣费" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`foodFee`]"
                  placeholder="请输入餐费扣费"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="厂牌及工衣扣费" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`brandAndClothesFee`]"
                  placeholder="请输入厂牌及工衣扣费"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="个税" :label-col="{ span: 18 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`taxes`]"
                  placeholder="请输入个税"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="保险" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`insurance`]"
                  placeholder="请输入保险"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="借支" :label-col="{ span: 18 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`borrow`]"
                  placeholder="请输入借支"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="代扣（工头借支）" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`bossBorrow`]"
                  placeholder="请输入代扣（工头借支）"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="6">
              <a-form-item label="实发工资" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`actualPay`, {
                    rules: [{ required: true, message: '请输入实发工资!'}]
                  }]"
                  placeholder="请输入实发工资"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="6">
              <a-form-item label="已发工资" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`hasPaid`]"
                  placeholder="请输入已发工资"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="支付日期" :label-col="{ span: 12 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`paidDate`, {
                    rules: [{ required: true, message: '请选择支付日期!'}]
                  }]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择支付日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="付款备注" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`paidRemark`]"
                  placeholder="请输入付款备注"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="6">
              <a-form-item label="补差价" :label-col="{ span: 12 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`repairPrice`]"
                  placeholder="请输入补差价"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="补发日期" :label-col="{ span: 12 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`repairDate`, {
                    rules: [{ required: true, message: '请选择补发日期!'}]
                  }]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择补发日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="发薪主体" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`payeeMain`]"
                  placeholder="请输入发薪主体"
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
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'

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
      locale,
      customerList: [],
      supplierList: [],
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
    this.findCustomerList()
    this.findSuppliersList()
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
          age,
          ethnic,
          customerName,
          deptName,
          onJobDate,
          downJobDate
        } = res.data
        this.form.setFieldsValue({
          employeeName,
          age,
          ethnic,
          customerName,
          deptName,
          onJobDate,
          downJobDate
        })
      }
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
      const res = await this.$http.get(`/data/payRoll/get/${id}`)
      this.spinning = false
      if (res) {
        const {
          onJobDate,
          employeeNumber,
          employeeName,
          employState,
          sex,
          ethnic,
          employeePhone,
          idCard,
          emergencyContactName,
          emergencyContactPhone,
          originAddress,
          jobType,
          area,
          customerId,
          deptName,
          supplierId,
          employeePrice,
          payrollCardInfo
        } = res.data
        this.form.setFieldsValue({
          onJobDate: onJobDate ? Moment(onJobDate) : null,
          employeeNumber,
          employeeName,
          employState,
          sex,
          ethnic,
          employeePhone,
          idCard,
          emergencyContactName,
          emergencyContactPhone,
          originAddress,
          jobType,
          area,
          customerId,
          deptName,
          supplierId,
          employeePrice,
          payrollCardInfo
        })
      }
    },
    handleSearch (submitType) {
      this.form.validateFields(async (error, values) => {
        if (!error) {
          const param = {
            ...values
          }
          this.spinning = true
          if (this.id) param.id = this.id
          const res = await this.$http.post('/data/payRoll/saveOrUpdate', param)
          if (res) {
            this.$message.success(`${this.id ? '工资核算信息修改成功！' : '新增工资核算信息成功！'}`)
            if (submitType === 1) {
              this.$router.back()
            } else {
              this.id = ''
              this.handleReset()
            }
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
