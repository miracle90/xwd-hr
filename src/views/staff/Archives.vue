<template>
	<a-spin class="page-wrapper" :spinning="spinning">
		<a-form
			:form="form"
			@submit.prevent="submit"
			layout="horizontal"
		>
			<a-row :gutter="24">
				<a-col :span="5">
					<a-form-item label="入职日期">
						<a-range-picker v-decorator="[`date`]" />
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="工号">
						<a-input
							v-decorator="[`employeeNumber`]"
							placeholder="请输入工号"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="姓名">
						<a-input v-decorator="[`employeeName`]" placeholder="请输入姓名" />
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="雇佣状态">
						<a-select
							v-decorator="['employStateArr']"
							placeholder="请选择雇佣状态"
						>
							<a-select-option value="在职">在职</a-select-option>
							<a-select-option value="离职">离职</a-select-option>
							<a-select-option value="自离">自离</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="4" style="padding-top: 43px">
					<a-button type="primary" html-type="submit" style="margin-right: 5px"
						>查询</a-button
					>
					<a-button @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
		<a-row
			type="flex"
			style="display: flex; justify-content: space-between; margin-bottom: 10px"
		>
			<a-col>
				<a-button @click="dataPush" style="margin-right: 5px"
					>数据同步</a-button
				>
				<a-button @click="downloadTemplet" style="margin-right: 5px"
					>模板下载</a-button
				>
				<a-button @click="exportOpt" style="margin-right: 5px">导出</a-button>
				<a-upload
					:action="`${$http.baseURL}/data/employee/import`"
					:headers="headers"
					:showUploadList="false"
					name="file"
					:before-upload="beforeUpload"
					@change="handleChange"
				>
					<a-button>导入</a-button>
				</a-upload>
			</a-col>
			<a-col>
				<a-button @click="add">新增</a-button>
				<a-button
					@click="modify"
					:disabled="selectedIds.length !== 1"
					style="margin-left: 5px"
					>修改</a-button
				>
				<a-button
					@click="dimission"
					:disabled="!selectedIds.length"
					style="margin-left: 5px"
					>离职</a-button
				>
				<a-button
					@click="selfDimission"
					:disabled="!selectedIds.length"
					style="margin-left: 5px"
					>自离</a-button
				>
			</a-col>
		</a-row>
		<div style="flex: 1;">
			<a-table
				:scroll="{
					x: 2000,
					y: tableHeight,
					scrollToFirstRowOnChange: true
				}"
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
					slot="employeeNumber"
					slot-scope="text, record"
					style="color: #1890ff"
					:to="{ path: '/archivesedit', query: { id: record.id, type: 0 } }"
					>{{ text }}</router-link
				>
			</a-table>
		</div>
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
		title: '工号',
		dataIndex: 'employeeNumber',
		key: 'employeeNumber',
		scopedSlots: { customRender: 'employeeNumber' }
	},
	{
		title: '姓名',
		dataIndex: 'employeeName',
		key: 'employeeName'
	},
	{
		title: '入职日期',
		dataIndex: 'onJobDate',
		key: 'onJobDate',
	},
	{
		title: '离职日期',
		dataIndex: 'downJobDate',
		key: 'downJobDate',
	},
	{
		title: '雇佣状态',
		dataIndex: 'employState',
		key: 'employState',
	},
	{
		title: '工种',
		dataIndex: 'jobType',
		key: 'jobType'
		// scopedSlots: { customRender: 'jobType' },
	},
	{
		title: '区域',
		dataIndex: 'area',
		key: 'area',
	},
	{
		title: '所属公司',
		dataIndex: 'customerName',
		key: 'customerName',
		// scopedSlots: { customRender: 'customerId' }
	},
	{
		title: '所在部门',
		dataIndex: 'deptName',
		key: 'deptName',
		ellipsis: true,
	},
	{
		title: '本人电话',
		dataIndex: 'employeePhone',
		key: 'employeePhone',
	},
	{
		title: '紧急联系人',
		dataIndex: 'emergencyContactName',
		key: 'emergencyContactName',
	},
	{
		title: '紧急联系电话',
		dataIndex: 'emergencyContactPhone',
		key: 'emergencyContactPhone',
	},
	{
		title: '员工工价',
		dataIndex: 'employeePrice',
		key: 'employeePrice',
	},
	{
		title: '工资卡信息',
		dataIndex: 'payrollCardInfo',
		key: 'payrollCardInfo',
	},
	{
		title: '性别',
		dataIndex: 'sex',
		key: 'sex',
	},
	{
		title: '招聘来源',
		dataIndex: 'supplierName',
		key: 'supplierName'
	},
]

export default {
	data() {
		return {
			tableHeight: document.documentElement.clientHeight - 420 + 'px',
			headers: {
				token: window.localStorage.getItem('token'),
			},
			// customerList: [],
			// supplierList: [],
			queryOnJobDateStartTime: '',
			queryOnJobDateEndTime: '',
			spinning: false,
			selectedRowKeys: [],
			selectedRows: [],
			selectedIds: [],
			total: 0,
			pageSizeOptions: ['10', '20', '30', '40', '50'],
			page: 1,
			limit: 10,
			data: [],
			columns,
			form: this.$form.createForm(this, { name: 'advanced_search' }),
		}
	},
	computed: {
		//
	},
	mounted() {
		// this.findCustomerList()
		// this.findSuppliersList()
		window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 260 + 'px'
    }
		this.handleSearch()
	},
	methods: {
		submit(e) {
			e.preventDefault()
			this.page = 1
			this.handleSearch()
		},
		handleChange(info) {
			if (info.file.status === 'done') {
				if (info.file.response.code === '0') {
					this.$message.success('上传成功')
				} else {
					this.$message.error(info.file.response.msg)
				}
			} else if (info.file.status === 'error') {
				this.$message.error('上传失败')
			}
		},
		beforeUpload(file) {
			const { name } = file
			const type = name.split('.').pop()
			if (
				[
					'xlsx',
					'xls',
					'xltx',
					'xlt',
					'xlsm',
					'xlsm',
					'xlsb',
					'xltm',
					'csv',
				].includes(type)
			) {
				return true
			}
			this.$message.error('请上传正确格式的表格文件')
			return false
		},
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
					this.form.validateFields(async (error, values) => {
						if (!error) {
							const {
								date,
								employeeNumber,
								employeeName,
								employStateArr,
							} = values
							const param = {
								employeeNumber,
								employeeName,
								employStateArr,
								onJobDateStartTime: date && date.length ? date[0].format('YYYY-MM-DD') : null,
								onJobDateEndTime: date && date.length ? date[1].format('YYYY-MM-DD') : null,
							}
							this.spinning = true
							const res = await this.$http.get('/data/employee/export', param)
							this.spinning = false
							if (res) {
								const { data } = res
								window.open(data)
								this.$message.success('导出成功')
							}
						}
					})
				},
			})
		},
		/**
		 * 离职
		 */
		dimission() {
			this.$confirm({
				title: '离职提示',
				content: '确定对员工进行离职操作吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					if (this.selectedIds.length === 1) {
						const id = this.selectedIds[0]
						const res = await this.$http.post(`/data/employee/resign/${id}`)
						this.spinning = false
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('离职操作成功!')
							this.handleSearch()
						}
					} else {
						const res = await this.$http.post('/data/employee/batchResign', {
							idsArr: this.selectedIds,
						})
						this.spinning = false
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('批量离职操作成功!')
							this.handleSearch()
						}
					}
				},
			})
		},
		/**
		 * 自离
		 */
		selfDimission() {
			this.$confirm({
				title: '自离提示',
				content: '确定对员工进行自离操作吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					if (this.selectedIds.length === 1) {
						const id = this.selectedIds[0]
						const res = await this.$http.post(
							`/data/employee/resignBySelf/${id}`
						)
						this.spinning = false
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('自离操作成功!')
							this.handleSearch()
						}
					} else {
						const res = await this.$http.post(
							'/data/employee/batchResignBySelf',
							{
								idsArr: this.selectedIds,
							}
						)
						this.spinning = false
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('批量自离操作成功!')
							this.handleSearch()
						}
					}
				},
			})
		},
		/**
		 * 数据下载
		 */
		dataPush() {
			this.$confirm({
				title: '数据同步',
				content: '确定要进行数据同步吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					const res = await this.$http.post('/data/employee/dataPush')
					this.spinning = false
					if (res) {
						this.$message.success('正在同步数据，请稍后刷新页面查看!')
					}
				},
			})
		},
		/**
		 * 模板下载
		 */
		downloadTemplet() {
			this.$confirm({
				title: '模板下载',
				content: '确定要进行模板下载吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					const res = await this.$http.get('/data/employee/downloadTemplet')
					this.spinning = false
					if (res) {
						const { data } = res
						window.open(data)
						this.$message.success('模板下载成功!')
					}
				},
			})
		},
		reset() {
			this.form.resetFields()
		},
		modify() {
			const id = this.selectedIds[0]
			// 修改type为1，详情type为0
			this.$router.push({ path: '/archivesedit', query: { id, type: 1 } })
		},
		onSelectChange(selectedRowKeys, selectedRows) {
			this.selectedRowKeys = selectedRowKeys
			this.selectedRows = selectedRows
			this.selectedIds = selectedRows.map((item) => item.id)
		},
		add() {
			this.$router.push('/archivesedit')
		},
		onChange(page) {
			this.page = page
			this.handleSearch()
		},
		onShowSizeChange(current, limit) {
			this.page = 1
			this.limit = limit
			this.handleSearch()
		},
		handleSearch() {
			this.form.validateFields(async (error, values) => {
				if (!error) {
					const { date, employeeNumber, employeeName, employStateArr } = values
					const { page, limit } = this
					const param = {
						page,
						limit,
						employeeNumber,
						employeeName,
						employStateArr,
						onJobDateStartTime: date && date.length ? date[0].format('YYYY-MM-DD') : null,
						onJobDateEndTime: date && date.length ? date[1].format('YYYY-MM-DD') : null,
					}
					this.spinning = true
					const res = await this.$http.get('/data/employee/list', param)
					this.spinning = false
					if (res) {
						const { count, data } = res
						this.data = data
						this.total = count
					}
				}
			})
		},
	},
}
</script>

<style lang="less">
.ant-spin-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>
