<template>
  <div class="page-wrapper">
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
              <a-form-item label="供应商编码" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`supplierCode`, {
                    rules: [{ required: true, message: '请输入供应商编码!'}]
                  }]"
                  placeholder="请输入供应商编码"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="供应商名称" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`supplierName`, {
                    rules: [{ required: true, message: '请输入供应商名称!'}]
                  }]"
                  placeholder="请输入供应商名称"
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
              <a-form-item label="统一社会信用代码" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`businessLicense`]"
                  placeholder="请输入统一社会信用代码"
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
              <a-form-item label="法定代表人" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`legalRepresentative`]"
                  placeholder="请输入法定代表人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="派遣证有效期起" :label-col="{ span: 5 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`dispatchBeginDate`]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请输入派遣证有效期起"
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
              <a-form-item label="派遣证有效期止" :label-col="{ span: 5 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`dispatchEndDate`]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请输入派遣证有效期止"
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
            <a-col :span="12">
              <a-form-item label="附件" :label-col="{ span: 5 }">
                <!-- <a-input
                  v-decorator="[`field`, {
                    rules: [{ required: true, message: 'Input something!'}]
                  }]"
                  placeholder="placeholder"
                /> -->
              </a-form-item>
            </a-col>
          </a-row>
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24" style="margin-top: 30px; font-size: 16px; font-weight: bold;">开票信息</a-col>
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
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24" style="margin-top: 30px; font-size: 16px; font-weight: bold;">收款信息</a-col>
          </a-row>
          <a-row :gutter="24" style="margin-bottom: 20px;">
            <a-col :span="12">
              <a-form-item label="银行账号" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`bankAccount`]"
                  placeholder="请输入银行账号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="银行名称" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`bankName`]"
                  placeholder="请输入银行名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="账户名称" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`accountName`]"
                  placeholder="请输入账户名称"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="开户行名称" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`accountOfBankName`]"
                  placeholder="请输入开户行名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Moment from 'moment'

export default {
  data () {
    return {
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
      const res = await this.$http.get(`/data/supplier/get/${id}`)
      console.log(res)
      if (res) {
        const {
          supplierCode,
          supplierName,
          contactName,
          businessLicense,
          contactPhone,
          legalRepresentative,
          dispatchBeginDate,
          dispatchEndDate,
          registeredCapital,
          registerAddress,
          dutyParagraph,
          invoiceCompanyName,
          bankAccount,
          bankName,
          accountName,
          accountOfBankName
        } = res.data
        this.form.setFieldsValue({
          supplierCode,
          supplierName,
          contactName,
          businessLicense,
          contactPhone,
          legalRepresentative,
          dispatchBeginDate: dispatchBeginDate ? Moment(dispatchBeginDate) : null,
          dispatchEndDate: dispatchEndDate ? Moment(dispatchEndDate) : null,
          registeredCapital,
          registerAddress,
          dutyParagraph,
          invoiceCompanyName,
          bankAccount,
          bankName,
          accountName,
          accountOfBankName
        })
      }
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (!error) {
          console.log(values)
          const { dispatchBeginDate, dispatchEndDate } = values
          const param = {
            ...values,
            dispatchBeginDate: dispatchBeginDate ? (typeof dispatchBeginDate === 'string' ? dispatchBeginDate : dispatchBeginDate.format('YYYY-MM-DD')) : null,
            dispatchEndDate: dispatchEndDate ? (typeof dispatchEndDate === 'string' ? dispatchEndDate : dispatchEndDate.format('YYYY-MM-DD')) : null
          }
          if (this.id) {
            param.id = this.id
            const res = await this.$http.post('/data/supplier/update', param)
            if (res) {
              this.$message.success('供应商信息修改成功！')
              this.$router.back()
            }
          } else {
            const res = await this.$http.post('/data/supplier/add', param)
            if (res) {
              this.$message.success('新增供应商成功！')
              this.$router.back()
            }
          }
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },

    resetForm () {
      this.$refs.ruleForm.resetFields()
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
</style>
