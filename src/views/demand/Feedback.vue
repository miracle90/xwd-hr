<template>
	<a-spin class="page-wrapper" :spinning="spinning">
		<a-row type="flex" style="margin-bottom: 20px">
			<a-col style="display: flex; align-items: center">需求日期：</a-col>
			<a-col style="margin-right: 30px">
				<a-range-picker
					v-model="rangePicker"
				/>
			</a-col>
			<a-col style="display: flex; align-items: center">状态：</a-col>
			<a-col>
				<a-radio-group v-model="status" button-style="solid">
					<!-- <a-radio-button value="0">待提交</a-radio-button> -->
					<a-radio-button value="1">待回复</a-radio-button>
					<a-radio-button value="2">已回复</a-radio-button>
					<a-radio-button value="3">已确认</a-radio-button>
				</a-radio-group>
			</a-col>
		</a-row>
		<a-row type="flex" style="margin-bottom: 20px">
			<a-col>
				<a-button type="primary" @click="query" style="margin-right: 5px"
					>查询</a-button
				>
				<a-button @click="reset" style="margin-right: 5px">重置</a-button>
				<a-button @click="add" style="margin-right: 5px">需求登记</a-button>
			</a-col>
		</a-row>
		<a-row style="flex: 1; margin-bottom: 20px">
			<a-col>
				<a-table
					:scroll="{ x: 1800, y: tableHeight }"
					:pagination="false"
					:columns="columns"
					:data-source="data"
					:rowKey="(record, index) => index"
				>
					<span slot="sort" slot-scope="text, record, index">
						{{ index + 1 }}
					</span>
					<span slot="customerId" slot-scope="record">
						{{
							customerList.find((item) => item.id === record.customerId)
								? customerList.find((item) => item.id === record.customerId)
										.customerName
								: ''
						}}
					</span>
					<span slot="replyStatus" slot-scope="record">
						{{ ['待提交', '待回复', '已回复', '已确认'][+record.replyStatus] }}
					</span>
					<span slot="action" slot-scope="record">
						<router-link
							v-if="record.demandType === '自行登记'"
							style="color: #1890ff"
							:to="{
								path: '/register',
								query: { id: record.id, demandId: record.demandId, type: 0 },
							}"
							>查看</router-link
						>
						<!-- 客户需求 + 还未审核，跳转需求计划详情页面 -->
						<router-link
							v-if="record.demandType === '客户需求' && record.status !== 3"
							style="color: #1890ff"
							:to="{
								path: '/planedit',
								query: { id: record.demandId, type: 0 },
							}">
							查看
						</router-link>
						<!-- 客户需求 + 已审核，跳转审核页面查看详情 -->
						<router-link
							v-if="record.demandType === '客户需求' && record.status === 3"
							style="color: #1890ff"
							:to="{
								path: '/planaudit',
								query: { id: record.demandId, type: 0 },
							}"
							>查看</router-link
						>
						<a-divider v-if="(record.status === 1 || record.status === 2) && record.demandType === '客户需求'" type="vertical" />
						<router-link
							v-if="(record.status === 1 || record.status === 2) && record.demandType === '客户需求'"
							style="color: #1890ff"
							:to="{
								path: '/reply',
								query: {
									demandId: record.demandId,
									supplierId: record.supplierId,
									type: 1,
								},
							}"
							>回复</router-link
						>
						<a-divider
							v-if="record.demandType === '自行登记'"
							type="vertical"
						/>
						<router-link
							v-if="record.demandType === '自行登记'"
							style="color: #1890ff"
							:to="{
								path: '/register',
                query: { id: record.id, demandId: record.demandId, type: 1 },
							}"
							>修改</router-link
						>
						<a-divider
							v-if="record.demandType === '自行登记'"
							type="vertical"
						/>
						<a
							v-if="record.demandType === '自行登记'"
							@click="deleteDemand(record.demandId)"
							style="color: red"
							>删除</a
						>
					</span>
				</a-table>
			</a-col>
		</a-row>
		<a-row>
			<a-col>
				<a-pagination
					v-model="page"
					:page-size-options="pageSizeOptions"
					:total="total"
					show-size-changer
					show-quick-jumper
					:page-size="limit"
					:show-total="(total) => `共${total}条记录`"
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
	</a-spin>
</template>

<script>
const columns = [
	{
		title: '供应商',
		dataIndex: 'supplierName',
		key: 'supplierName'
	},
	{
		title: '需求类型',
		dataIndex: 'demandType',
		key: 'demandType',
	},
	{
		title: '需求编号',
		dataIndex: 'demandCode',
		key: 'demandCode',
	},
	{
		title: '客户',
		dataIndex: 'customerName',
		key: 'customerName',
	},
	{
		title: '事业部',
		dataIndex: 'deptName',
		key: 'deptName',
	},
	{
		title: '联系人',
		dataIndex: 'contactName',
		key: 'contactName',
	},
	{
		title: '联系电话',
		dataIndex: 'contactPhone',
		key: 'contactPhone',
	},
	{
		title: '需求人数',
		dataIndex: 'demandPersions',
		key: 'demandPersions',
	},
	{
		title: '需求工种',
		dataIndex: 'demandTrade',
		key: 'demandTrade',
	},
	{
		title: '需求日期',
		dataIndex: 'demandBeginDate',
		key: 'demandBeginDate',
	},
	{
		title: '状态',
		key: 'replyStatus',
		scopedSlots: { customRender: 'replyStatus' },
	},
	{
		title: '撤离日期',
		dataIndex: 'demandEndDate',
		key: 'demandEndDate',
	},
	{
		title: '男女比例',
		dataIndex: 'demandRatio',
		key: 'demandRatio',
	},
	{
		title: '回复人数',
		dataIndex: 'replyPersions',
		key: 'replyPersions',
	},
	{
		title: '收费标准',
		dataIndex: 'chargeStandard',
		key: 'chargeStandard',
	},
	{
		title: '回复备注',
		dataIndex: 'replyRemark',
		key: 'replyRemark',
	},
	{
		title: '操作',
		key: 'action',
		scopedSlots: { customRender: 'action' },
		fixed: 'right',
		width: 120,
	},
]

export default {
	data() {
		return {
			tableHeight: document.documentElement.clientHeight - 380 + 'px',
			customerList: [],
			rangePicker: null,
			status: '',
			spinning: false,
			delayTime: 500,
			selectedRowKeys: [],
			selectedRows: [],
			selectedIds: [],
			total: 0,
			pageSizeOptions: ['10', '20', '30', '40', '50'],
			page: 1,
			limit: 10,
			data: [],
			columns,
		}
	},
	computed: {
		//
	},
	mounted() {
		window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 380 + 'px'
    }
		this.getList()
		this.findCustomerList()
	},
	methods: {
		deleteDemand(id) {
			this.$confirm({
				title: '删除提示',
				content: '确定要删除所勾选的记录吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					const res = await this.$http.post(`/data/demand/delete/${id}`)
					if (res) {
						this.$message.success('删除成功!')
						this.getList()
					}
				},
			})
		},
		async findCustomerList() {
			const res = await this.$http.get('/data/customer/find')
			if (res) {
				this.customerList = res.data
			}
		},
		reset() {
			this.status = ''
			this.rangePicker = null
		},
		async findList() {
			const res = await this.$http.get('/data/customer/find')
			console.log(res)
		},
		deletePlan() {
			this.$confirm({
				title: '删除提示',
				content: '确定要删除所勾选的记录吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					if (this.selectedIds.length === 1) {
						const id = this.selectedIds[0]
						const res = await this.$http.post(`/data/demand/delete/${id}`)
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('删除需求计划成功!')
							this.getList()
						}
					} else {
						const res = await this.$http.post('/data/demand/batchDel', {
							idsArr: this.selectedIds,
						})
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('批量删除需求计划成功!')
							this.getList()
						}
					}
				},
				onCancel: () => {
					console.log('Cancel')
				},
			})
		},
		modify() {
			const id = this.selectedIds[0]
			// 修改type为1，详情type为0
			this.$router.push({ path: '/suppliersedit', query: { id, type: 1 } })
		},
		onSelectChange(selectedRowKeys, selectedRows) {
			console.log('onSelectChange')
			this.selectedRowKeys = selectedRowKeys
			this.selectedRows = selectedRows
			this.selectedIds = selectedRows.map((item) => item.id)
		},
		add() {
			this.$router.push('/register')
		},
		query() {
			this.page = 1
			this.getList()
		},
		onChange(page) {
			this.page = page
			this.getList()
		},
		onShowSizeChange(current, limit) {
			this.page = 1
			this.limit = limit
			this.getList()
		},
		async getList() {
			this.spinning = true
			const { page, limit, rangePicker, status } = this
			const res = await this.$http.get('/data/demand/list4Reply', {
				page,
				limit,
				demandBeginDate: rangePicker && rangePicker.length ? rangePicker[0].format('YYYY-MM-DD') : null,
				demandEndDate: rangePicker && rangePicker.length ? rangePicker[1].format('YYYY-MM-DD') : null,
				status,
			})
			this.spinning = false
			if (res) {
				const { count, data } = res
				this.data = data
				this.total = count
			}
		},
	},
}
</script>

<style lang="less">
.page-wrapper {
	height: 100%;
	.ant-spin-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
}
</style>
