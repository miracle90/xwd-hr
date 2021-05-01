<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" html-type="submit" style="margin-right: 20px;">提交</a-button>
              <a-button v-if="type === '1'" :style="{ marginRight: '20px' }" @click="handleReset">重置</a-button>
              <a-button @click="cancel">{{ type !== '1' ? '返回' : '取消' }}</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="6">
              <a-form-item label="工号" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`employeeNumber`, {
                    rules: [{ required: true, message: '请输入供应商编码!'}]
                  }]"
                  placeholder="请输入供应商编码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="姓名" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`employeeName`, {
                    rules: [{ required: true, message: '请输入姓名!'}]
                  }]"
                  placeholder="请输入姓名"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="入职日期" :label-col="{ span: 6 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`onJobDate`, {
                    rules: [{ required: true, message: '请选择入职日期!'}]
                  }]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择入职日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="雇佣状态" :label-col="{ span: 6 }">
                <a-select
                  :disabled="type === '0'"
                  v-decorator="[`employState`, {
                    rules: [{ required: true, message: '请选择雇佣状态!'}]
                  }]"
                  placeholder="请选择雇佣状态"
                >
                  <a-select-option value="在职">在职</a-select-option>
                  <a-select-option value="离职">离职</a-select-option>
                  <a-select-option value="自离">自离</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="性别" :label-col="{ span: 6 }">
                <a-select
                  :disabled="type === '0'"
                  v-decorator="[`sex`, {
                    rules: [{ required: true, message: '请选择性别!'}]
                  }]"
                  placeholder="请选择性别"
                >
                  <a-select-option value="男">男</a-select-option>
                  <a-select-option value="女">女</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="民族" :label-col="{ span: 6 }">
                <a-select
                  :disabled="type === '0'"
                  v-decorator="[`ethnic`, {
                    rules: [{ required: true, message: '请选择民族!'}]
                  }]"
                  placeholder="请选择民族"
                >
                  <a-select-option value="汉族">汉族</a-select-option>
                  <a-select-option value="回族">回族</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="本人电话" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`employeePhone`, {
                    rules: [{ required: true, message: '请输入本人电话!'}]
                  }]"
                  placeholder="请输入本人电话"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="身份证号码" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`idCard`, {
                    rules: [{ required: true, message: '请输入身份证号码!'}]
                  }]"
                  placeholder="请输入身份证号码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="紧急联系人" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`emergencyContactName`]"
                  placeholder="请输入紧急联系人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="紧急联系电话" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`emergencyContactPhone`]"
                  placeholder="请输入紧急联系电话"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="户籍地址" :label-col="{ span: 3 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`originAddress`, {
                    rules: [{ required: true, message: '请输入户籍地址!'}]
                  }]"
                  placeholder="请输入户籍地址"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="工种" :label-col="{ span: 6 }">
                <a-select
                  :disabled="type === '0'"
                  v-decorator="[`jobType`, {
                    rules: [{ required: true, message: '请选择工种!'}]
                  }]"
                  placeholder="请选择工种"
                >
                  <a-select-option :value="1">学生工</a-select-option>
                  <a-select-option :value="2">农民工</a-select-option>
                  <a-select-option :value="3">社会工</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="区域" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`area`]"
                  placeholder="请输入区域"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="所属公司" :label-col="{ span: 6 }">
                <a-select
                  :disabled="type === '0'"
                  v-decorator="[`customerId`, {
                    rules: [{ required: true, message: '请选择所属公司!'}]
                  }]"
                  placeholder="请选择所属公司"
                >
                  <a-select-option v-for="item in customerList" :value="item.id" :key="item.id">{{ item.customerName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="所在部门" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`deptName`]"
                  placeholder="请输入所在部门"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="招聘来源" :label-col="{ span: 6 }">
                <a-select
                  :disabled="type === '0'"
                  v-decorator="[`supplierId`, {
                    rules: [{ required: true, message: '请选择招聘来源!'}]
                  }]"
                  placeholder="请选择招聘来源"
                >
                  <a-select-option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.supplierName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="工价" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`employeePrice`, {
                    rules: [{ required: true, message: '请输入工价!'}]
                  }]"
                  placeholder="请输入工价"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="工资卡" :label-col="{ span: 3 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`payrollCardInfo`]"
                  placeholder="请输入工资卡"
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
      const res = await this.$http.get(`/data/employee/get/${id}`)
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
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (!error) {
          console.log(values)
          const { onJobDate } = values
          const param = {
            ...values,
            onJobDate: onJobDate ? (typeof onJobDate === 'string' ? onJobDate : onJobDate.format('YYYY-MM-DD')) : null
          }
          this.spinning = true
          if (this.id) param.id = this.id
          const res = await this.$http.post(`/data/employee/${this.id ? 'update' : 'add'}`, param)
          if (res) {
            this.$message.success(`${this.id ? '员工档案信息修改成功！' : '新增员工档案成功！'}`)
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
