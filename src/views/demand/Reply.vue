<template>
  <a-spin class="page-wrapper" :spinning="spinning">
    <a-row>
      <a-col>
        <a-form class="ant-advanced-search-form" :form="form" layout="horizontal">
          <a-row style="margin-bottom: 20px;">
            <a-col :span="24">
              <a-button v-if="type === '1'" type="primary" @click="handleSearch" style="margin-right: 20px;">提交</a-button>
              <!-- <a-button v-if="type === '1'" @click="handleSearch(2)" style="margin-right: 20px;">保存</a-button> -->
              <a-button v-if="type === '1'" @click="handleReset" style="margin-right: 20px;">重置</a-button>
              <a-button @click="cancel">{{ type !== '1' ? '返回' : '取消' }}</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="24">
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
              <a-form-item label="收费标准（元/工时）" :label-col="{ span: 5 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`chargeStandard`, {
                    rules: [{ required: true, message: '请输入收费标准（元/工时）!'}]
                  }]"
                  placeholder="请输入收费标准（元/工时）"
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
export default {
  data () {
    return {
      customerList: [],
      supplierList: [],
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
    const { id } = this.$route.query
    // this.findCustomerList()
    // this.findSuppliersList()
    if (id) {
      this.id = id
      // this.queryDetail(id)
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
    // async queryDetail (id) {
    //   this.spinning = true
    //   const res = await this.$http.get(`/data/demand/get/${id}`)
    //   this.spinning = false
    //   if (res) {
    //     const {
    //       customerId,
    //       deptName,
    //       contactName,
    //       contactPhone,
    //       demandPersions,
    //       demandTrade,
    //       demandBeginDate,
    //       demandEndDate,
    //       replyEndDate,
    //       demandRatio,
    //       demandAge,
    //       remark
    //     } = res.data
    //     this.form.setFieldsValue({
    //       customerId,
    //       deptName,
    //       contactName,
    //       contactPhone,
    //       demandPersions,
    //       demandTrade,
    //       demandBeginDate: demandBeginDate ? Moment(demandBeginDate) : null,
    //       demandEndDate: demandEndDate ? Moment(demandEndDate) : null,
    //       replyEndDate: replyEndDate ? Moment(replyEndDate) : null,
    //       demandRatio,
    //       demandAge,
    //       remark
    //     })
    //   }
    // },
    handleSearch (type) {
      // 1 提交，/data/demand/submit
      // 2 保存，/data/demand/saveOrUpdate
      this.form.validateFields(async (error, values) => {
        if (!error) {
          const param = {
            ...values
          }
          if (this.id) param.id = this.id
          this.spinning = true
          const res = await this.$http.post('/data/demand/reply/', param)
          this.spinning = false
          if (res) {
            this.$message.success('回复成功！')
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
