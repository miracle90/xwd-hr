<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" @click="handleSearch" style="margin-right: 20px;">审核</a-button>
              <!-- <a-button v-if="type === '1'" @click="handleSearch(2)" style="margin-right: 20px;">保存</a-button> -->
              <a-button v-if="type === '1'" @click="handleReset" style="margin-right: 20px;">重置</a-button>
              <a-button @click="cancel">取消</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12" style="font-weight: bold;">
              <a-form-item label="需求编号" :label-col="{ span: 6 }">{{ demandCode }}</a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="公司名称" :label-col="{ span: 6 }">
                <a-select
                  :disabled="true"
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
              <a-form-item label="需求事业部" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="['deptName']"
                  placeholder="关联公司，自动带出"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系人" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`contactName`, {
                    rules: [{ required: true, message: '请输入联系人!'}]
                  }]"
                  placeholder="请输入联系人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`contactPhone`, {
                    rules: [{ required: true, message: '请输入联系电话!'}]
                  }]"
                  placeholder="请输入联系电话"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求人数" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`demandPersions`, {
                    rules: [{ required: true, message: '请输入需求人数!'}]
                  }]"
                  placeholder="请输入需求人数"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求工种" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`demandTrade`, {
                    rules: [{ required: true, message: '请输入需求工种!'}]
                  }]"
                  placeholder="请输入需求工种"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求日期" :label-col="{ span: 6 }">
                <a-date-picker
                  :disabled="true"
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
              <a-form-item label="撤离日期" :label-col="{ span: 6 }">
                <a-date-picker
                  :disabled="true"
                  v-decorator="[`demandEndDate`]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择撤离日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="男女比例" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`demandRatio`]"
                  placeholder="请输入男女比例"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="需求年龄" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`demandAge`]"
                  placeholder="请输入需求年龄"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="截止回复日期" :label-col="{ span: 6 }">
                <a-date-picker
                  :disabled="true"
                  v-decorator="[`replyEndDate`]"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  placeholder="请选择截止回复日期"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="备注" :label-col="{ span: 6 }">
                <a-input
                  :disabled="true"
                  v-decorator="[`remark`]"
                  placeholder="请输入备注"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-table
                :pagination="false"
                :columns="columns"
                :data-source="distributeSupplierList"
                :rowKey="(record, index) => index"
              >
                <span slot="dispatchPersions" slot-scope="record" v-if="type !== '0'">
                  <a-input
                    @change="check"
                    v-model="personObj[`${record.key}`]"
                    style="width: 80px;"
                  />
                </span>
              </a-table>
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
  },
  {
    title: '回复人数',
    dataIndex: 'replyPersions',
    key: 'replyPersions'
  },
  {
    title: '收费标准（元/人/工时）',
    dataIndex: 'chargeStandard',
    key: 'chargeStandard'
  },
  {
    title: '回复比例',
    dataIndex: 'replyRatio',
    key: 'replyRatio'
  },
  {
    title: '回复年龄',
    dataIndex: 'replyAge',
    key: 'replyAge'
  },
  {
    title: '来源',
    dataIndex: 'resourceOrigin',
    key: 'resourceOrigin'
  },
  {
    title: '民族',
    dataIndex: 'nation',
    key: 'nation'
  },
  {
    title: '回复备注',
    dataIndex: 'replyRemark',
    key: 'replyRemark'
  }
  // {
  //   title: '分配人数',
  //   key: 'dispatchPersions',
  //   scopedSlots: { customRender: 'dispatchPersions' }
  // }
  // {
  //   title: '分配人数',
  //   key: 'dispatchPersions',
  //   dataIndex: 'dispatchPersions'
  // }
]

export default {
  data () {
    return {
      personObj: {},
      deptList: [],
      demandCode: '',
      customerList: [],
      supplierList: [],
      selectSuppliersList: [],
      columns: [],
      spinning: false,
      type: '1', // 新增、修改type为1，查看详情type为0
      id: '',
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  computed: {
    distributeSupplierList () {
      if (this.selectSuppliersList.length && this.supplierList.length) {
        // const list = this.supplierList.map(item => item.id)
        return this.selectSuppliersList.map((selectItem, selectKey) => {
          const supplierId = selectItem.supplierId
          const id = selectItem.id
          const baseInfo = this.supplierList.filter(item => item.id === supplierId)[0]
          const {
            supplierName,
            contactName,
            contactPhone
          } = baseInfo
          const {
            demandId,
            dispatchPersions,
            replyPersions,
            chargeStandard,
            replyRatio,
            replyAge,
            resourceOrigin,
            nation,
            replyRemark
          } = selectItem
          console.log()
          return {
            key: selectKey,
            id,
            supplierName,
            contactName,
            contactPhone,
            demandId,
            dispatchPersions,
            replyPersions,
            chargeStandard,
            replyRatio,
            replyAge,
            resourceOrigin,
            nation,
            replyRemark
          }
        })
      }
      return []
    }
  },
  mounted () {
    const { id, type } = this.$route.query
    if (type === '0') {
      this.columns = [
        ...columns,
        {
          title: '分配人数',
          dataIndex: 'dispatchPersions',
          key: 'dispatchPersions'
        }
      ]
    } else {
      this.columns = [
        ...columns,
        {
          title: '分配人数',
          scopedSlots: { customRender: 'dispatchPersions' },
          key: 'dispatchPersions'
        }
      ]
    }
    this.findCustomerList()
    this.findSuppliersList()
    if (id) {
      this.id = id
      this.type = type
      this.queryDetail(id)
    }
  },
  methods: {
    check () {
      let count = 0
      Object.keys(this.personObj).forEach(item => {
        count += +this.personObj[item]
      })
      const demandPersions = this.form.getFieldValue('demandPersions')
      if (count > demandPersions) {
        this.$message.error('累计分配人数不得大于需求人数')
      }
    },
    async findSupplier (id) {
      const res = await this.$http.get(`/data/demand/findSupplier/${id}`)
      if (res) {
        this.selectSuppliersList = res.data && res.data.length ? res.data : []
      }
    },
    async customerIdChange (customerId) {
      if (customerId || customerId === 0) {
        const { deptName } = this.customerList.find(item => item.id === customerId)
        this.form.setFieldsValue({
          deptName
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
      const res = await this.$http.get(`/data/demand/get/${id}`)
      this.spinning = false
      if (res) {
        const {
          demandCode,
          customerId,
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
        this.demandCode = demandCode
        this.customerIdChange(customerId)
        this.form.setFieldsValue({
          customerId,
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
    async handleSearch () {
      let count = 0
      let demandId
      const demandReplyList = []
      this.distributeSupplierList.forEach((item, index) => {
        demandId = item.demandId
        count += +this.personObj[index] || 0
        demandReplyList.push({
          id: item.id,
          dispatchPersions: +this.personObj[index] || 0
        })
      })
      const demandPersions = this.form.getFieldValue('demandPersions')
      if (count > demandPersions) {
        return this.$message.error('累计分配人数不得大于需求人数')
      }
      this.spinning = true
      const res = await this.$http.post('/data/demand/auditor', {
        demandId,
        demandReplyList
      })
      this.spinning = false
      if (res) {
        this.$message.success('需求审核成功')
        this.$router.back()
      }
    },
    handleReset () {
      this.personObj = {}
      // this.form.resetFields()
      // this.selectedRowKeys = []
      // this.selectedRows = []
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
