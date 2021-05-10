<template>
	<a-spin class="page-wrapper" :spinning="spinning">
		<a-row type="flex" style="margin-bottom: 20px">
			<a-col>
				<a-input
					placeholder="关键词搜索"
					v-model="keyword"
					style="margin-right: 5px; width: 300px"
				/>
			</a-col>
			<a-col>
				<a-button type="primary" @click="query">查询</a-button>
			</a-col>
		</a-row>
		<a-row type="flex" style="margin-bottom: 20px">
			<a-col>
				<a-button @click="add" type="primary" style="margin-right: 5px"
					>新增</a-button
				>
				<a-button @click="exportOpt" style="margin-right: 5px">导出</a-button>
				<a-button
					@click="modify"
					:disabled="selectedIds.length !== 1"
					style="margin-right: 5px"
					>修改</a-button
				>
				<a-button
					@click="deleteSuppliers"
					:disabled="!selectedIds.length"
					type="danger"
					style="margin-right: 5px"
					>删除</a-button
				>
			</a-col>
		</a-row>
		<a-row style="margin-bottom: 20px">
			<a-col>
				<a-table
					:pagination="false"
					:columns="columns"
					:data-source="data"
					:row-selection="{
						selectedRowKeys,
						selectedRows,
						onChange: (selectedRowKeys, selectedRows) =>
							onSelectChange(selectedRowKeys, selectedRows),
					}"
					:rowKey="(record, index) => index"
				>
					<router-link
						slot="supplierName"
						slot-scope="record"
						style="color: #1890ff"
						:to="{ path: '/suppliersedit', query: { id: record.id, type: 0 } }"
						>{{ record.supplierName }}</router-link
					>
				</a-table>
			</a-col>
		</a-row>
		<a-row style="margin-bottom: 20px">
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
import DragTable from '@/components/DragTable.vue'
console.log(DragTable)

const columns = [
	{
		title: '供应商编码',
		dataIndex: 'supplierCode',
		key: 'supplierCode',
	},
	{
		title: '供应商地址',
		dataIndex: 'registerAddress',
		key: 'registerAddress',
		ellipsis: true
	},
	{
		title: '供应商名称',
		key: 'supplierName',
		scopedSlots: { customRender: 'supplierName' },
	},
	{
		title: '联系人',
		dataIndex: 'contactName',
		key: 'contactName',
	},
	{
		title: '联系方式',
		dataIndex: 'contactPhone',
		key: 'contactPhone',
	},
	{
		title: '派遣证的有效期起',
		dataIndex: 'dispatchBeginDate',
		key: 'dispatchBeginDate',
	},
	{
		title: '派遣证的有效期止',
		dataIndex: 'dispatchEndDate',
		key: 'dispatchEndDate',
	},
	{
		title: '供应商级别',
		dataIndex: 'supplierLevel',
		key: 'supplierLevel',
	},
	{
		title: '累计输送人数',
		dataIndex: 'totalTrasportPersions',
		key: 'totalTrasportPersions',
	},
	{
		title: '资源强项',
		dataIndex: 'resourceAdvantage',
		key: 'resourceAdvantage',
	},
]

export default {
	data() {
		return {
			spinning: false,
			delayTime: 500,
			selectedRowKeys: [],
			selectedRows: [],
			selectedIds: [],
			total: 0,
			pageSizeOptions: ['10', '20', '30', '40', '50'],
			page: 1,
			limit: 10,
			keyword: '',
			data: [],
			columns,
		}
	},
	computed: {
		//
	},
	mounted() {
		this.getList()
		// this.findList()
	},
	methods: {
		/**
		 * 导出
		 */
		exportOpt() {
			this.$confirm({
				title: '导出',
				content: '确定要进行数据导出吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					const { keyword } = this
					this.spinning = true
					const res = await this.$http.get('/data/supplier/export', {
						keyword
					})
					this.spinning = false
					if (res) {
						const { data } = res
						window.open(data)
						this.$message.success('导出成功')
					}
				}
			})
		},
		// async findList () {
		//   const res = await this.$http.get('/data/supplier/find')
		//   console.log(res)
		// },
		deleteSuppliers() {
			this.$confirm({
				title: '删除提示',
				content: '确定要删除所勾选的记录吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					if (this.selectedIds.length === 1) {
						const id = this.selectedIds[0]
						const res = await this.$http.post(`/data/supplier/delete/${id}`)
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('删除供应商成功!')
							this.getList()
						}
					} else {
						const res = await this.$http.post('/data/supplier/batchDel', {
							idsArr: this.selectedIds,
						})
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('批量删除供应商成功!')
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
			this.$router.push('/suppliersedit')
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
			const { page, limit, keyword } = this
			const res = await this.$http.get('/data/supplier/list', {
				keyword,
				limit,
				page,
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
</style>
