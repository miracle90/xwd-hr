<template>
  <div class="page-wrapper">
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col>
        <a-input
          placeholder="关键词搜索"
          v-decorator="['loginName']"
          style="margin-right: 20px; width: 300px;"
        />
      </a-col>
      <a-col>
        <a-button type="primary">查询</a-button>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-bottom: 20px;">
      <a-col>
        <a-button type="" style="margin-right: 20px;">新增</a-button>
        <a-button type="" style="margin-right: 20px;">修改</a-button>
        <a-button type="" style="margin-right: 20px;">删除</a-button>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 20px;">
      <a-col>
        <a-table
          :pagination="false"
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          :rowKey="(record, index) => index"
        />
        <!-- <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
          <a slot="name" slot-scope="text">{{ text || '-' }}</a>
        </a-table> -->
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 20px;">
      <a-col>
        <a-pagination
          v-model="page"
          :page-size-options="pageSizeOptions"
          :total="total"
          show-size-changer
          show-quick-jumper
          :page-size="limit"
          @showSizeChange="onShowSizeChange"
          @change="onChange"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
            <span v-if="props.value === '50'">全部</span>
          </template>
        </a-pagination>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

const columns = [
  {
    title: '供应商编码',
    dataIndex: 'supplierCode',
    key: 'supplierCode'
  },
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
    title: '联系方式',
    dataIndex: 'contactPhone',
    key: 'contactPhone'
  },
  {
    title: '派遣证的有效期起',
    dataIndex: 'dispatchBeginDate',
    key: 'dispatchBeginDate'
  },
  {
    title: '派遣证的有效期止',
    dataIndex: 'dispatchEndDate',
    key: 'dispatchEndDate'
  }
]

export default {
  data () {
    return {
      total: 0,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      page: 1,
      limit: 10,
      keyword: '',
      data: [],
      rowSelection,
      columns
    }
  },
  computed: {
    // formItemLayout () {
    //   const { formLayout } = this
    //   return formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : {}
    // }
  },
  mounted () {
    this.getList()
    // this.showLogin = true
  },
  methods: {
    onChange (page) {
      this.page = page
      this.getList()
    },
    onShowSizeChange (current, limit) {
      this.page = 1
      this.limit = limit
      this.getList()
    },
    async getList () {
      const { page, limit, keyword } = this
      const res = await this.$http.get('/data/supplier/list', {
        keyword,
        limit,
        page
      })
      if (res) {
        const { count, data } = res
        this.data = data
        this.total = count
      }
    }
  }
}
</script>

<style lang="less">
  .page-wrapper {
    padding: 30px;
  }
</style>
