<template>
	<a-spin class="page-wrapper" :spinning="spinning">
		<a-form
			:form="form"
			@submit="
				() => {
					page = 1
					handleSearch()
				}
			"
			layout="horizontal"
		>
			<a-row :gutter="24">
				<a-col :span="5">
					<a-form-item label="出勤年月">
						<a-month-picker
							v-decorator="[`monthDay`]"
							placeholder="请选择出勤年月"
						/>
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
			</a-col>
		</a-row>
		<a-row style="margin-bottom: 20px">
			<a-col>
				<a-table
					:scroll="{ x: 1600 }"
					:pagination="false"
					:columns="columns"
					:data-source="data"
					:rowKey="(record, index) => index"
				>
					<span slot="time1" slot-scope="text">{{ text && text !== 'null' ? text : '' }}</span>
					<span slot="time2" slot-scope="text">{{ text && text !== 'null' ? text : '' }}</span>
					<span slot="time3" slot-scope="text">{{ text && text !== 'null' ? text : '' }}</span>
					<span slot="time4" slot-scope="text">{{ text && text !== 'null' ? text : '' }}</span>
					<span slot="time5" slot-scope="text">{{ text && text !== 'null' ? text : '' }}</span>
					<span slot="time6" slot-scope="text">{{ text && text !== 'null' ? text : '' }}</span>
					<!-- <span slot="customerId" slot-scope="text">{{ customerList.find(item => item.id === text) ? customerList.find(item => item.id === text).customerName : '' }}</span> -->
					<!-- <span slot="jobType" slot-scope="text">{{ ['', '学生工', '农民工', '社会工', '正式工'][text] }}</span> -->
					<!-- <span slot="action" slot-scope="record">
            <router-link style="color: #1890ff" :to="{ path: '/monthedit', query: { id: record.id, type: 1 }}">修改</router-link>
          </span> -->
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
		title: '日期',
		dataIndex: 'monthDay',
		key: 'monthDay',
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
		title: '刷卡1',
		dataIndex: 'time1',
		key: 'time1',
		scopedSlots: { customRender: 'time1' }
	},
	{
		title: '刷卡2',
		dataIndex: 'time2',
		key: 'time2',
		scopedSlots: { customRender: 'time2' }
	},
	{
		title: '刷卡3',
		dataIndex: 'time3',
		key: 'time3',
		scopedSlots: { customRender: 'time3' }
	},
	{
		title: '刷卡4',
		dataIndex: 'time4',
		key: 'time4',
		scopedSlots: { customRender: 'time4' }
	},
	{
		title: '刷卡5',
		dataIndex: 'time5',
		key: 'time5',
		scopedSlots: { customRender: 'time5' }
	},
	{
		title: '刷卡6',
		dataIndex: 'time6',
		key: 'time6',
		scopedSlots: { customRender: 'time6' }
	},
	{
		title: '工时',
		dataIndex: 'workHours',
		key: 'workHours',
	},
	{
		title: '加班',
		dataIndex: 'extraHours',
		key: 'extraHours',
	},
	{
		title: '迟到',
		dataIndex: 'laterHours',
		key: 'laterHours',
	},
	{
		title: '早退',
		dataIndex: 'leaveEarlyHours',
		key: 'leaveEarlyHours',
	},
	{
		title: '请假',
		dataIndex: 'askForLeaveHours',
		key: 'askForLeaveHours',
	},
]

export default {
	data() {
		return {
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
		this.handleSearch()
	},
	methods: {
		// beforeUpload (file) {
		//   console.log('file ', file)
		//   return true
		// },
		/**
		 * 导出
		 */
		// exportOpt () {
		//   this.$confirm({
		//     title: '导出',
		//     content: '确定要进行数据导出吗？',
		//     okText: '确定',
		//     cancelText: '取消',
		//     onOk: async () => {
		//       this.form.validateFields(async (error, values) => {
		//         if (!error) {
		//           const { date, queryEmployeeNumber, queryEmployeeName } = values
		//           const param = {
		//             queryEmployeeNumber,
		//             queryEmployeeName,
		//             yearMonth: date ? date.format('YYYY-MM') : null
		//           }
		//           this.spinning = true
		//           const res = await this.$http.get('/data/monthAttence/export', param)
		//           this.spinning = false
		//           if (res) {
		//             const { data } = res
		//             window.open(data)
		//             this.$message.success('导出成功')
		//           }
		//         }
		//       })
		//     }
		//   })
		// },
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
					const res = await this.$http.get('/data/dayAttence/syncData')
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
		// downloadTemplet () {
		//   this.$confirm({
		//     title: '模板下载',
		//     content: '确定要进行模板下载吗？',
		//     okText: '确定',
		//     cancelText: '取消',
		//     onOk: async () => {
		//       this.spinning = true
		//       const res = await this.$http.get('/data/monthAttence/downloadTemplet')
		//       this.spinning = false
		//       if (res) {
		//         this.$message.success('模板下载成功!')
		//       }
		//     }
		//   })
		// },
		// onPickerChange (date, dateString) {
		//   console.log(date, dateString)
		// },
		reset() {
			this.form.resetFields()
		},
		// async findCustomerList () {
		//   const res = await this.$http.get('/data/customer/find')
		//   if (res) {
		//     this.customerList = res.data
		//   }
		// },
		// async findSuppliersList () {
		//   const res = await this.$http.get('/data/supplier/find')
		//   if (res) {
		//     this.supplierList = res.data
		//   }
		// },
		/**
		 * 删除
		 */
		// deleteData () {
		//   this.$confirm({
		//     title: '删除提示',
		//     content: '确定要删除所勾选的记录吗？',
		//     okText: '确定',
		//     okType: 'danger',
		//     cancelText: '取消',
		//     onOk: async () => {
		//       if (this.selectedIds.length === 1) {
		//         const id = this.selectedIds[0]
		//         const res = await this.$http.post(`/data/monthAttence/delete/${id}`)
		//         if (res) {
		//           this.selectedIds = []
		//           this.selectedRowKeys = []
		//           this.selectedRows = []
		//           this.$message.success('删除考勤数据成功!')
		//           this.handleSearch()
		//         }
		//       } else {
		//         const res = await this.$http.post('/data/monthAttence/batchDel', {
		//           idsArr: this.selectedIds
		//         })
		//         if (res) {
		//           this.selectedIds = []
		//           this.selectedRowKeys = []
		//           this.selectedRows = []
		//           this.$message.success('批量删除考勤数据成功!')
		//           this.handleSearch()
		//         }
		//       }
		//     },
		//     onCancel: () => {
		//       console.log('Cancel')
		//     }
		//   })
		// },
		// onSelectChange (selectedRowKeys, selectedRows) {
		//   this.selectedRowKeys = selectedRowKeys
		//   this.selectedRows = selectedRows
		//   this.selectedIds = selectedRows.map(item => item.id)
		// },
		// add () {
		//   this.$router.push('/monthedit')
		// },
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
					const { monthDay, employeeNumber, employeeName } = values
					const { page, limit } = this
					const param = {
						page,
						limit,
						employeeNumber,
						employeeName,
						monthDay: monthDay ? monthDay.format('YYYY-MM') : null,
					}
					this.spinning = true
					const res = await this.$http.get('/data/dayAttence/list', param)
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
