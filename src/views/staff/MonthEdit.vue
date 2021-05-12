<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" @click="handleSearch(1)" style="margin-right: 5px;">提交</a-button>
              <a-button v-if="type === '1'" type="primary" @click="handleSearch(2)" style="margin-right: 5px;">提交后新增</a-button>
              <a-button v-if="type === '1'" style="margin-right: 5px;" @click="handleReset">重置</a-button>
              <a-button @click="cancel">{{ type !== '1' ? '返回' : '取消' }}</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="12">
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
              <a-form-item label="年龄" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`age`]"
                  placeholder="输入工号进行查询"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="民族" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`ethnic`]"
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
              <a-form-item label="月份" :label-col="{ span: 6 }">
                <a-month-picker
                  :disabled="type === '0'"
                  v-decorator="[`yearMonth`, {
                    rules: [{ required: true, message: '请选择出勤月份!'}]
                  }]"
                  placeholder="请选择出勤月份"
                  :locale="locale"
                  style="width: 100%;"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="扣除迟到早退（时）" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`workAbnormalHours`]"
                  placeholder="请输入扣除迟到早退（时）"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="结算工时" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`settlementHours`, {
                    rules: [{ required: true, message: '请输入结算工时!'}]
                  }]"
                  placeholder="请输入结算工时"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="水电扣费" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`waterAndElectricityFee`]"
                  placeholder="请输入水电扣费"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="餐费扣费" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`foodFee`]"
                  placeholder="请输入餐费扣费"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="车补" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`carAllowanceFeeFee`]"
                  placeholder="请输入车补"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="厂牌及工衣扣费" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`brandAndClothesFee`]"
                  placeholder="请输入厂牌及工衣扣费"
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
      const res = await this.$http.get(`/data/monthAttence/get/${id}`)
      this.spinning = false
      if (res) {
        const {
          employeeNumber,
          employeeName,
          age,
          ethnic,
          customerName,
          deptName,
          onJobDate,
          downJobDate,
          yearMonth,
          workAbnormalHours,
          settlementHours,
          waterAndElectricityFee,
          foodFee,
          carAllowanceFeeFee,
          brandAndClothesFee
        } = res.data
        this.form.setFieldsValue({
          employeeNumber,
          employeeName,
          age,
          ethnic,
          customerName,
          deptName,
          onJobDate,
          downJobDate,
          yearMonth: yearMonth ? Moment(yearMonth) : null,
          workAbnormalHours,
          settlementHours,
          waterAndElectricityFee,
          foodFee,
          carAllowanceFeeFee,
          brandAndClothesFee
        })
      }
    },
    handleSearch (submitType) {
      this.form.validateFields(async (error, values) => {
        if (!error) {
          const { yearMonth } = values
          const param = {
            ...values,
             yearMonth: yearMonth ? yearMonth.format('YYYY-MM') : null
          }
          this.spinning = true
          if (this.id) param.id = this.id
          const res = await this.$http.post('/data/monthAttence/saveOrUpdate', param)
          this.spinning = false
          if (res) {
            this.$message.success(`${this.id ? '员工月考勤数据修改成功！' : '新增员工月考勤数据成功！'}`)
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
