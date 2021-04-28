<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" @click="handleSearch" style="margin-right: 20px;">提交</a-button>
              <a-button v-if="type === '1'" @click="handleReset" style="margin-right: 20px;">重置</a-button>
              <a-button @click="cancel">{{ type !== '1' ? '返回' : '取消' }}</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="24">
             <a-col :span="12">
              <a-form-item label="公司名称" :label-col="{ span: 5 }">
                <a-select
                  :disabled="type === '0'"
                  @change="customerIdChange"
                  v-decorator="['customerId', {
                    rules: [{ required: true, message: '请选择公司名称!' }]
                  }]"
                  placeholder="请选择公司名称"
                >
                  <a-select-option v-for="(item, index) in customerList" :key="index" :value="item.id">
                    {{ item.customerName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求事业部" :label-col="{ span: 5 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`deptName`]"
                  placeholder="关联所选公司名称"
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
              <a-form-item label="联系电话" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`contactPhone`, {
                    rules: [{ required: true, message: '请输入联系电话!'}]
                  }]"
                  placeholder="请输入联系电话"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求人数" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`demandPersions`, {
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
                  v-decorator="[`demandTrade`, {
                    rules: [{ required: true, message: '请输入需求工种!'}]
                  }]"
                  placeholder="请输入需求工种"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求日期" :label-col="{ span: 5 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`demandBeginDate`, {
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
                  v-decorator="[`demandEndDate`]"
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
                  v-decorator="[`demandRatio`]"
                  placeholder="请输入需求比例"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求年龄" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`demandAge`]"
                  placeholder="请输入需求年龄"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="截止回复日期" :label-col="{ span: 5 }">
                <a-date-picker
                  :disabled="type === '0'"
                  v-decorator="[`replyEndDate`]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择截止回复日期"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 30px;">
            <a-col :span="12">
              <a-form-item label="回复人数" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`replyPersions`, {
                    rules: [{ required: true, message: '请输入回复人数!'}]
                  }]"
                  placeholder="请输入回复人数"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="收费标准(元/工时)" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`chargeStandard`, {
                    rules: [{ required: true, message: '请输入收费标准(元/工时)!'}]
                  }]"
                  placeholder="请输入收费标准(元/工时)"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="回复年龄" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`replyAge`]"
                  placeholder="请输入回复年龄"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="回复比例" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`replyRatio`]"
                  placeholder="请输入回复比例"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="资源来源地" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`resourceOrigin`]"
                  placeholder="请输入资源来源地"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="民族" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`nation`]"
                  placeholder="请输入民族"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="回复备注" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`replyRemark`]"
                  placeholder="请输入回复备注"
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

const columns = [
  {
    title: '供应商名称',
    dataIndex: 'supplierName',
    key: 'supplierName'
  },
  {
    title: '联系人',
    dataIndex: 'contactName',
    key: 'contactName'
  },
  {
    title: '电话',
    dataIndex: 'contactPhone',
    key: 'contactPhone'
  }
]

export default {
  data () {
    return {
      customerList: [],
      selectedRowKeys: [],
      selectedRows: [],
      supplierList: [],
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
    // this.findCustomerList()
    // this.findSuppliersList()
    if (id) {
      this.id = id
      this.type = type
      this.queryDetail(id)
      // this.findSupplier(id)
    }
  },
  methods: {
    async findSupplier (id) {
      const res = await this.$http.get(`/data/demand/findSupplier/${id}`)
      if (res) {
        const selectedRowKeys = []
        const selectedRows = []
        const list = res.data.map(item => item.supplierId)
        console.log(list)
        console.log(this.supplierList)
        this.supplierList.forEach((item, index) => {
          if (list.includes(item.id)) {
            selectedRowKeys.push(index)
            selectedRows.push(item)
          }
        })
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    },
    customerIdChange (id) {
      const deptName = id ? this.customerList.find(item => item.id === id).bussinessUnit : ''
      this.form.setFieldsValue({
        deptName
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
        if (this.id) {
          this.findSupplier(this.id)
        }
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      if (this.type === '0') {
        return
      }
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    async queryDetail (id) {
      this.spinning = true
      const res = await this.$http.get(`/data/demand/getRecordSelfInfo/${id}`)
      this.spinning = false
      if (res) {
        const {
          customerId,
          deptName,
          contactName,
          contactPhone,
          demandPersions,
          demandTrade,
          demandBeginDate,
          demandEndDate,
          replyEndDate,
          demandRatio,
          demandAge,
          remark
        } = res.data
        this.form.setFieldsValue({
          customerId,
          deptName,
          contactName,
          contactPhone,
          demandPersions,
          demandTrade,
          demandBeginDate: demandBeginDate ? Moment(demandBeginDate) : null,
          demandEndDate: demandEndDate ? Moment(demandEndDate) : null,
          replyEndDate: replyEndDate ? Moment(replyEndDate) : null,
          demandRatio,
          demandAge,
          remark
        })
      }
    },
    handleSearch () {
      this.form.validateFields(async (error, values) => {
        if (!error) {
          const param = {
            ...values
          }
          if (this.id) param.id = this.id
          this.spinning = true
          const res = await this.$http.post('/data/demand/recordSelf', param)
          this.spinning = false
          if (res) {
            this.$message.success('需求登记配置成功！')
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
