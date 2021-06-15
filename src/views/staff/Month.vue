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
							v-decorator="[`yearMonth`]"
							placeholder="请选择出勤年月"
							style="width: 100%"
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
				<a-button @click="syncData" style="margin-right: 5px"
					>数据同步</a-button
				>
				<a-button @click="downloadTemplet" style="margin-right: 5px"
					>模板下载</a-button
				>
				<a-button @click="exportOpt" style="margin-right: 5px">导出</a-button>
				<a-upload
					:action="`${$http.baseURL}/data/monthAttence/import`"
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
		<a-row style="margin-bottom: 20px">
			<a-col>
				<a-table
					:scroll="{ x: 1900 }"
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
					<!-- <span slot="customerId" slot-scope="text">{{ customerList.find(item => item.id === text) ? customerList.find(item => item.id === text).customerName : '' }}</span> -->
					<span slot="jobType" slot-scope="text">{{
						['', '学生工', '农民工', '社会工', '正式工'][text]
					}}</span>
					<span slot="action" slot-scope="record">
						<router-link
							style="color: #1890ff"
							:to="{ path: '/monthedit', query: { id: record.id, type: 1 } }"
							>修改</router-link
						>
					</span>
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
		title: '部门',
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
		title: '年龄',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: '民族',
		dataIndex: 'ethnic',
		key: 'ethnic',
	},
	{
		title: '扣除迟到早退（时）',
		dataIndex: 'workAbnormalHours',
		key: 'workAbnormalHours',
	},
	{
		title: '结算工时',
		dataIndex: 'settlementHours',
		key: 'settlementHours',
	},
	{
		title: '水电扣费',
		dataIndex: 'waterAndElectricityFee',
		key: 'waterAndElectricityFee',
	},
	{
		title: '餐费扣费',
		dataIndex: 'foodFee',
		key: 'foodFee',
	},
	{
		title: '车补',
		dataIndex: 'carAllowanceFee',
		key: 'carAllowanceFee',
	},
	{
		title: '厂牌及工衣扣费',
		dataIndex: 'brandAndClothesFee',
		key: 'brandAndClothesFee',
	},
	{
		title: '操作',
		key: 'action',
		scopedSlots: { customRender: 'action' },
		fixed: 'right',
		width: 80,
	},
]

export default {
	data() {
		return {
			headers: {
				token: window.localStorage.getItem('token'),
			},
			customerList: [],
			supplierList: [],
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
		this.findCustomerList()
		this.findSuppliersList()
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
							const { yearMonth, employeeNumber, employeeName } = values
							const param = {
								employeeNumber,
								employeeName,
								yearMonth: yearMonth ? yearMonth.format('YYYY-MM') : null,
							}
							this.spinning = true
							const res = await this.$http.get(
								'/data/monthAttence/export',
								param
							)
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
		// dimission () {
		//   this.$confirm({
		//     title: '离职提示',
		//     content: '确定对员工进行离职操作吗？',
		//     okText: '确定',
		//     cancelText: '取消',
		//     onOk: async () => {
		//       this.spinning = true
		//       if (this.selectedIds.length === 1) {
		//         const id = this.selectedIds[0]
		//         const res = await this.$http.post(`/data/employee/resign/${id}`)
		//         this.spinning = false
		//         if (res) {
		//           this.selectedIds = []
		//           this.selectedRowKeys = []
		//           this.selectedRows = []
		//           this.$message.success('离职操作成功!')
		//           this.handleSearch()
		//         }
		//       } else {
		//         const res = await this.$http.post('/data/employee/batchResign', {
		//           idsArr: this.selectedIds
		//         })
		//         this.spinning = false
		//         if (res) {
		//           this.selectedIds = []
		//           this.selectedRowKeys = []
		//           this.selectedRows = []
		//           this.$message.success('批量离职操作成功!')
		//           this.handleSearch()
		//         }
		//       }
		//     }
		//   })
		// },
		/**
		 * 自离
		 */
		// selfDimission () {
		//   this.$confirm({
		//     title: '自离提示',
		//     content: '确定对员工进行自离操作吗？',
		//     okText: '确定',
		//     cancelText: '取消',
		//     onOk: async () => {
		//       this.spinning = true
		//       if (this.selectedIds.length === 1) {
		//         const id = this.selectedIds[0]
		//         const res = await this.$http.post(`/data/employee/resignBySelf/${id}`)
		//         this.spinning = false
		//         if (res) {
		//           this.selectedIds = []
		//           this.selectedRowKeys = []
		//           this.selectedRows = []
		//           this.$message.success('自离操作成功!')
		//           this.handleSearch()
		//         }
		//       } else {
		//         const res = await this.$http.post('/data/employee/batchResignBySelf', {
		//           idsArr: this.selectedIds
		//         })
		//         this.spinning = false
		//         if (res) {
		//           this.selectedIds = []
		//           this.selectedRowKeys = []
		//           this.selectedRows = []
		//           this.$message.success('批量自离操作成功!')
		//           this.handleSearch()
		//         }
		//       }
		//     }
		//   })
		// },
		/**
		 * 数据下载
		 */
		syncData() {
			this.$confirm({
				title: '数据同步',
				content: '确定要进行数据同步吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					const res = await this.$http.get('/data/monthAttence/syncData')
					this.spinning = false
					if (res) {
						this.$message.success('正在同步数据，请稍后刷新页面查看!')
					}
				},
			})
		},
		/**
		 * 数据推送
		 */
		// dataPush () {
		//   this.$confirm({
		//     title: '数据推送',
		//     content: '确定要进行数据推送吗？',
		//     okText: '确定',
		//     cancelText: '取消',
		//     onOk: async () => {
		//       this.spinning = true
		//       const res = await this.$http.post('/data/monthAttence/dataPush')
		//       this.spinning = false
		//       if (res) {
		//         this.$message.success('数据推送成功!')
		//       }
		//     }
		//   })
		// },
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
					const res = await this.$http.get('/data/monthAttence/downloadTemplet')
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
		async findCustomerList() {
			const res = await this.$http.get('/data/customer/find')
			if (res) {
				this.customerList = res.data
			}
		},
		async findSuppliersList() {
			const res = await this.$http.get('/data/supplier/find')
			if (res) {
				this.supplierList = res.data
			}
		},
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
					if (this.selectedIds.length === 1) {
						const id = this.selectedIds[0]
						const res = await this.$http.post(`/data/monthAttence/delete/${id}`)
						if (res) {
							this.selectedIds = []
							this.selectedRowKeys = []
							this.selectedRows = []
							this.$message.success('删除考勤数据成功!')
							this.handleSearch()
						}
					} else {
						const res = await this.$http.post('/data/monthAttence/batchDel', {
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
				},
				onCancel: () => {
					console.log('Cancel')
				},
			})
		},
		onSelectChange(selectedRowKeys, selectedRows) {
			this.selectedRowKeys = selectedRowKeys
			this.selectedRows = selectedRows
			this.selectedIds = selectedRows.map((item) => item.id)
		},
		add() {
			this.$router.push('/monthedit')
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
					const { yearMonth, employeeNumber, employeeName } = values
					const { page, limit } = this
					const param = {
						page,
						limit,
						employeeNumber,
						employeeName,
						yearMonth: yearMonth ? yearMonth.format('YYYY-MM') : null,
					}
					this.spinning = true
					const res = await this.$http.get('/data/monthAttence/list', param)
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
</style>
