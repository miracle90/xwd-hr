<template>
	<a-spin class="page-wrapper" :spinning="spinning">
		<a-form
			:form="form"
			@submit="
				e => {
					page = 1
					handleSearch(e)
				}
			"
			layout="horizontal"
		>
			<a-row :gutter="24">
				<a-col :span="5">
					<a-form-item label="出勤年月">
						<a-month-picker
							v-decorator="[`date`]"
							placeholder="请选择出勤年月"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="工号">
						<a-input
							v-decorator="[`queryEmployeeNumber`]"
							placeholder="请输入工号"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="姓名">
						<a-input
							v-decorator="[`queryEmployeeName`]"
							placeholder="请输入姓名"
						/>
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
				<!-- <a-button @click="dataPush" style="margin-right: 5px;">数据推送</a-button> -->
				<a-button @click="downloadTemplet" style="margin-right: 5px"
					>模板下载</a-button
				>
				<a-button @click="exportOpt" style="margin-right: 5px">导出</a-button>
				<a-upload
					:action="`${$http.baseURL}/data/payRoll/import`"
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
					@click="deleteData"
					type="danger"
					:disabled="!selectedIds.length"
					style="margin-left: 5px"
					>删除</a-button
				>
			</a-col>
		</a-row>
		<a-row style="flex: 1; margin-bottom: 20px">
			<a-col>
				<a-table
					:scroll="{ x: 2000, y: tableHeight }"
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
					<span slot="action" slot-scope="record">
						<router-link
							style="color: #1890ff"
							:to="{ path: '/salaryedit', query: { id: record.id, type: 0 } }"
							>查看</router-link
						>
						<a-divider type="vertical" />
						<router-link
							style="color: #1890ff"
							:to="{ path: '/salaryedit', query: { id: record.id, type: 1 } }"
							>修改</router-link
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
		title: '出勤年月',
		dataIndex: 'yearMonth',
		key: 'yearMonth',
	},
	{
		title: '所属公司',
		dataIndex: 'customerName',
		key: 'customerName',
	},
	{
		title: '所属部门',
		dataIndex: 'deptName',
		key: 'deptName',
	},
	{
		title: '工号',
		dataIndex: 'employeeNumber',
		key: 'employeeNumber',
	},
	{
		title: '姓名',
		dataIndex: 'employeeName',
		key: 'employeeName',
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
		title: '总工时',
		dataIndex: 'totalHours',
		key: 'totalHours',
	},
	{
		title: '单价',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: '应发合计',
		dataIndex: 'shouldBePay',
		key: 'shouldBePay',
	},
	{
		title: '应扣合计',
		dataIndex: 'shouldBeDeduct',
		key: 'shouldBeDeduct',
	},
	{
		title: '实发金额',
		dataIndex: 'actualPay',
		key: 'actualPay',
	},
	{
		title: '发薪主体',
		dataIndex: 'payeeMain',
		key: 'payeeMain',
	},
	{
		title: '供应商',
		dataIndex: 'supplierName',
		key: 'supplierName',
	},
	{
		title: '支付日期',
		dataIndex: 'paidDate',
		key: 'paidDate',
	},
	{
		title: '已发工资',
		dataIndex: 'hasPaid',
		key: 'hasPaid',
	},
	{
		title: '支付备注',
		dataIndex: 'paidRemark',
		key: 'paidRemark',
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
		window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 420 + 'px'
    }
		// this.findCustomerList()
		// this.findSuppliersList()
		this.handleSearch()
	},
	methods: {
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
							const { date, employeeName, employeeNumber } = values
							const param = {
								employeeName,
								employeeNumber,
								yearMonths: date ? date.format('YYYY-MM') : null,
							}
							this.spinning = true
							const res = await this.$http.download('/data/payRoll/export', '工资核算-导出', param)
							this.spinning = false
							if (res) {
								this.$message.success('导出成功')
							}
						}
					})
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
					const res = await this.$http.download('/data/payRoll/downloadTemplet', '工资核算-模板下载')
					this.spinning = false
					if (res) {
						this.$message.success('模板下载成功！')
					}
				}
			})
		},
		reset() {
			this.form.resetFields()
		},
		// async findCustomerList() {
		// 	const res = await this.$http.get('/data/customer/find')
		// 	this.customerList = res.data
		// },
		// async findSuppliersList() {
		// 	const res = await this.$http.get('/data/supplier/find')
		// 	this.supplierList = res.data
		// },
		/**
		 * 删除
		 */
		deleteData() {
			this.$confirm({
				title: '删除提示',
				content: '确定要删除所勾选的记录吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					if (this.selectedIds.length === 1) {
						const id = this.selectedIds[0]
						const res = await this.$http.post(`/data/payRoll/delete/${id}`)
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('删除工资核算数据成功!')
							this.handleSearch()
						}
					} else {
						const res = await this.$http.post('/data/payRoll/batchDel', {
							idsArr: this.selectedIds,
						})
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('批量删除考勤数据成功!')
							this.handleSearch()
						}
					}
					this.spinning = false
				},
			})
		},
		onSelectChange(selectedRowKeys, selectedRows) {
			this.selectedRowKeys = selectedRowKeys
			this.selectedRows = selectedRows
			this.selectedIds = selectedRows.map((item) => item.id)
		},
		add() {
			this.$router.push('/salaryedit')
		},
		// query () {
		//   this.page = 1
		//   this.getList()
		// },
		onChange(page) {
			this.page = page
			this.handleSearch()
		},
		onShowSizeChange(current, limit) {
			this.page = 1
			this.limit = limit
			this.handleSearch()
		},
		// async getList () {
		//   this.spinning = true
		//   const { page, limit, queryOnJobDateStartTime, queryOnJobDateEndTime, status } = this
		//   const res = await this.$http.get('/data/employee/list', {
		//     page,
		//     limit,
		//     queryOnJobDateStartTime,
		//     queryOnJobDateEndTime,
		//     status
		//   })
		//   this.spinning = false
		//   if (res) {
		//     const { count, data } = res
		//     this.data = data
		//     this.total = count
		//   }
		// },
		handleSearch(e) {
			if (e) e.preventDefault()
			this.form.validateFields(async (error, values) => {
				if (!error) {
					const { date, queryEmployeeNumber, queryEmployeeName } = values
					const { page, limit } = this
					const param = {
						page,
						limit,
						queryEmployeeNumber,
						queryEmployeeName,
						yearMonths: date ? date.format('YYYY-MM') : null,
					}
					this.spinning = true
					const res = await this.$http.get('/data/payRoll/list', param)
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
.page-wrapper {
	height: 100%;
	.ant-spin-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
}
</style>
