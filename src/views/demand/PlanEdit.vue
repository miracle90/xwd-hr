<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" html-type="submit" style="margin-right: 20px;">提交</a-button>
              <a-button v-if="type === '1'" style="margin-right: 20px;">保存</a-button>
              <a-button v-if="type === '1'" :style="{ marginRight: '20px' }" @click="handleReset">重置</a-button>
              <a-button @click="cancel">{{ type !== '1' ? '返回' : '取消' }}</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="24">
             <a-col :span="12">
              <a-form-item label="公司名称" :label-col="{ span: 5 }">
                <a-select
                  v-decorator="['select', {
                    rules: [{ required: true, message: '请选择公司名称!' }]
                  }]"
                  placeholder="请选择公司名称"
                >
                  <a-select-option value="china">
                    China
                  </a-select-option>
                  <a-select-option value="usa">
                    U.S.A
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求事业部" :label-col="{ span: 5 }">
                <a-select
                  v-decorator="['select']"
                  placeholder="请选择需求事业部"
                >
                  <a-select-option value="china">
                    China
                  </a-select-option>
                  <a-select-option value="usa">
                    U.S.A
                  </a-select-option>
                </a-select>
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
              <a-form-item label="联系电话" :label-col="{ span: 5 }">
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
              <a-form-item label="需求人数" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`contactPhone`, {
                    rules: [{ required: true, message: '请输入需求人数!'}]
                  }]"
                  placeholder="请输入需求人数"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求工种" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`contactPhone`, {
                    rules: [{ required: true, message: '请输入需求人数!'}]
                  }]"
                  placeholder="请输入需求人数"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求日期" :label-col="{ span: 5 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`contactPhone`, {
                    rules: [{ required: true, message: '请选择需求日期!'}]
                  }]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择需求日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="撤离日期" :label-col="{ span: 5 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`contactPhone`]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择撤离日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求比例" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`customerName`]"
                  placeholder="请输入需求比例"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求年龄" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`customerName`]"
                  placeholder="请输入需求年龄"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="截止回复日期" :label-col="{ span: 5 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`contactPhone`]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择截止回复日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="备注" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`bussinessUnit`]"
                  placeholder="请输入备注"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="发送" :label-col="{ span: 2 }">
                <a-table
                  :pagination="false"
                  :columns="columns"
                  :data-source="tableData"
                  :row-selection="{
                    selectedRowKeys,
                    selectedRows,
                    onChange: (selectedRowKeys, selectedRows) => onSelectChange(selectedRowKeys, selectedRows)
                  }"
                  :rowKey="(record, index) => index"
                >
                  <span slot="action" slot-scope="record">
                    <router-link style="color: #1890ff" :to="{ path: '/suppliersedit', query: { id: record.id, type: 0 }}">查看</router-link>
                    <a-divider type="vertical" />
                    <router-link style="color: #1890ff" :to="{ path: '/suppliersedit', query: { id: record.id, type: 0 }}">修改</router-link>
                    <a-divider type="vertical" />
                    <router-link style="color: #1890ff" :to="{ path: '/suppliersedit', query: { id: record.id, type: 0 }}">审核</router-link>
                  </span>
                </a-table>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script>
const columns = [
  {
    title: '供应商名称',
    dataIndex: 'demandCode',
    key: 'demandCode'
  },
  {
    title: '联系人',
    dataIndex: 'supplierCode',
    key: 'supplierCode'
  },
  {
    title: '电话',
    dataIndex: 'deptName',
    key: 'deptName'
  }
]

export default {
  data () {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      tableData: [],
      columns,
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
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('onSelectChange')
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
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
          if (res) {
            this.spinning = false
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
