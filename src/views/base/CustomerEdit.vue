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
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="客户编码" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`customerCode`, {
                    rules: [{ required: true, message: '请输入客户编码!'}]
                  }]"
                  placeholder="请输入客户编码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="客户名称" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`customerName`, {
                    rules: [{ required: true, message: '请输入客户名称!'}]
                  }]"
                  placeholder="请输入客户名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="事业部" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`bussinessUnit`]"
                  placeholder="请输入事业部"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="统一社会信用代码" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`businessLicense`]"
                  placeholder="请输入统一社会信用代码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系人" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`contactName`, {
                    rules: [{ required: true, message: '请输入联系人!'}]
                  }]"
                  placeholder="请输入联系人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="法定代表人" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`legalRepresentative`]"
                  placeholder="请输入法定代表人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系方式" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`contactPhone`, {
                    rules: [{ required: true, message: '请输入联系方式!'}]
                  }]"
                  placeholder="请输入联系方式"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="注册资金" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`registeredCapital`]"
                  placeholder="请输入注册资金"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="注册地址" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`registerAddress`]"
                  placeholder="请输入注册地址"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24" style="font-size: 16px; font-weight: bold;">开票信息</a-col>
          </a-row>
          <a-row :gutter="24" style="margin-bottom: 20px;">
            <a-col :span="12">
              <a-form-item label="税号" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`dutyParagraph`]"
                  placeholder="请输入税号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="开票公司名称" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`invoiceCompanyName`]"
                  placeholder="请输入开票公司名称"
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
export default {
  data () {
    return {
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
    const { id, type } = this.$route.query
    if (id) {
      this.id = id
      this.type = type
      this.queryDetail(id)
    }
  },
  methods: {
    async queryDetail (id) {
      this.spinning = true
      const res = await this.$http.get(`/data/customer/get/${id}`)
      this.spinning = false
      if (res) {
        const {
          customerCode,
          customerName,
          contactName,
          businessLicense,
          contactPhone,
          legalRepresentative,
          registeredCapital,
          registerAddress,
          dutyParagraph,
          invoiceCompanyName
        } = res.data
        this.form.setFieldsValue({
          customerCode,
          customerName,
          contactName,
          businessLicense,
          contactPhone,
          legalRepresentative,
          registeredCapital,
          registerAddress,
          dutyParagraph,
          invoiceCompanyName
        })
      }
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (!error) {
          console.log(values)
          const param = {
            ...values
          }
          this.spinning = true
          if (this.id) param.id = this.id
          const res = await this.$http.post(`/data/customer/${this.id ? 'update' : 'add'}`, param)
          this.spinning = false
          if (res) {
            this.$message.success(`${this.id ? '客户信息修改成功！' : '新增客户成功！'}`)
            this.$router.back()
          }
        }
      })
    },
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
