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
					<a-form-item label="预支时间">
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
				<!-- <a-button @click="applyDownload" style="margin-right: 5px;">下载公众号预支申请</a-button> -->
				<!-- <a-button @click="downloadTemplet" style="margin-right: 5px;">模板下载</a-button> -->
				<!-- <a-upload
          :action="`${$http.baseURL}/data/employee/import`"
          :showUploadList="false"
          name="file"
          :before-upload="beforeUpload"
        >
          <a-button>导入</a-button>
        </a-upload> -->
			</a-col>
			<a-col>
				<a-button @click="add">新增</a-button>
				<a-button @click="exportOpt" style="margin-left: 5px">导出</a-button>
				<!-- <a-button @click="modify" :disabled="selectedIds.length !== 1" style="margin-left: 5px;">修改</a-button>
        <a-button @click="dimission" :disabled="!selectedIds.length" style="margin-left: 5px;">离职</a-button>
        <a-button @click="selfDimission" :disabled="!selectedIds.length" style="margin-left: 5px;">自离</a-button> -->
			</a-col>
		</a-row>
		<a-row style="margin-bottom: 20px">
			<a-col>
				<a-table
					:pagination="false"
					:columns="columns"
					:data-source="data"
					:rowKey="(record, index) => index"
				>
					<!-- <router-link
            slot="employeeNumber"
            slot-scope="text, record"
            style="color: #1890ff"
            :to="{ path: '/archivesedit', query: { id: record.id, type: 0 }}"
          >{{ text }}</router-link> -->
					<span slot="action" slot-scope="record">
						<router-link
							style="color: #1890ff"
							:to="{ path: '/borrowedit', query: { id: record.id, type: 1 } }"
							>修改</router-link
						>
						<a-divider type="vertical" />
						<span
							slot="status"
							@click="deleteBorrow(record.id)"
							style="color: red"
							>删除</span
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
		title: '预支日期',
		dataIndex: 'borrowDate',
		key: 'borrowDate',
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
		title: '公司',
		dataIndex: 'customerName',
		key: 'customerName',
	},
	{
		title: '部门',
		dataIndex: 'deptName',
		key: 'deptName',
	},
	{
		title: '入职日期',
		dataIndex: 'onJobDate',
		key: 'onJobDate',
	},

	{
		title: '预支金额',
		dataIndex: 'borrowAmount',
		key: 'borrowAmount',
	},
	{
		title: '预支原因',
		dataIndex: 'borrowCause',
		key: 'borrowCause',
	},
	{
		title: '已支取',
		dataIndex: 'isReceive',
		key: 'isReceive',
	},
	{
		title: '已代扣',
		dataIndex: 'isDeduct',
		key: 'isDeduct',
	},
	{
		title: '代扣月份',
		dataIndex: 'deductYearMonth',
		key: 'deductYearMonth',
	},
	{
		title: '备注',
		dataIndex: 'borrowRemark',
		key: 'borrowRemark',
	},
	{
		title: '操作',
		key: 'action',
		scopedSlots: { customRender: 'action' },
	},
]

export default {
	data() {
		return {
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
		exportOpt() {
			this.$confirm({
				title: '导出',
				content: '确定要进行数据导出吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					this.form.validateFields(async (error, values) => {
						if (!error) {
							const { date, employeeNumber, employeeName } = values
							const param = {
								employeeNumber,
								employeeName,
								borrowStartDate: date ? date[0].format('YYYY-MM-DD') : null,
								borrowEndDate: date ? date[1].format('YYYY-MM-DD') : null,
							}
							this.spinning = true
							const res = await this.$http.get('/data/borrow/export', param)
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
		 * 数据推送
		 */
		applyDownload() {
			this.$confirm({
				title: '下载公众号预支申请',
				content: '确定要进行下载公众号预支申请？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					const res = await this.$http.get('/data/borrow/publicApply')
					this.spinning = false
					if (res) {
						this.$message.success('下载公众号预支申请成功!')
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
						this.$message.success('模板下载成功!')
					}
				},
			})
		},
		onPickerChange(date, dateString) {
			console.log(date, dateString)
		},
		submit() {
			//
		},
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
		deleteBorrow(id) {
			this.$confirm({
				title: '删除提示',
				content: '确定要删除所勾选的记录吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					this.spinning = true
					const res = await this.$http.post(`/data/borrow/delete/${id}`)
					this.spinning = false
					if (res) {
						this.$message.success('删除成功!')
						this.handleSearch()
					}
				},
			})
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
			this.$router.push('/borrowedit')
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
					const { date, employeeNumber, employeeName } = values
					const { page, limit } = this
					const param = {
						page,
						limit,
						employeeNumber,
						employeeName,
						borrowStartDate: date ? date[0].format('YYYY-MM-DD') : null,
						borrowEndDate: date ? date[1].format('YYYY-MM-DD') : null,
					}
					this.spinning = true
					const res = await this.$http.get('/data/borrow/list', param)
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
