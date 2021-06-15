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
				<a-col :span="6">
					<a-form-item label="雇佣状态">
						<a-select
							v-decorator="['employStateArr']"
							placeholder="请选择雇佣状态"
							mode="multiple"
						>
							<a-select-option value="在职">在职</a-select-option>
							<a-select-option value="离职">离职</a-select-option>
							<a-select-option value="自离">自离</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="入职日期">
						<a-range-picker v-decorator="[`date`]" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="供应商">
						<a-select v-decorator="['supplierId']" placeholder="请选择供应商">
							<a-select-option
								v-for="item in supplierList"
								:key="item.id"
								:value="item.id"
							>
								{{ item.supplierName }}
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="部门">
						<a-input v-decorator="[`deptName`]" placeholder="请输入部门" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-button type="primary" html-type="submit" style="margin-right: 5px"
						>导出</a-button
					>
					<a-button @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
	</a-spin>
</template>

<script>
const columns = [
	{
		title: '工号',
		dataIndex: 'employeeNumber',
		key: 'employeeNumber',
		scopedSlots: { customRender: 'employeeNumber' },
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
		dataIndex: 'customerId',
		key: 'customerId',
		scopedSlots: { customRender: 'customerId' },
	},
	{
		title: '所在部门',
		dataIndex: 'deptName',
		key: 'deptName',
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
		title: '招聘来源',
		dataIndex: 'supplierName',
		key: 'supplierName',
	},
	{
		title: '性别',
		dataIndex: 'sex',
		key: 'sex',
	},
]

export default {
	data() {
		return {
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
		// this.findCustomerList()
		this.findSuppliersList()
		// this.handleSearch()
	},
	methods: {
		reset() {
			this.form.resetFields()
		},
		async findSuppliersList () {
			const res = await this.$http.get('/data/supplier/find')
			if (res) {
				this.supplierList = res.data
			}
		},
		handleSearch(e) {
			if (e) e.preventDefault()
			this.form.validateFields(async (error, values) => {
				if (!error) {
					const { date, employStateArr, supplierId, deptName } = values
					// const { page, limit } = this
					const param = {
						// page,
						// limit,
						// queryEmployeeNumber,
						// queryEmployeeName,
						employStateArr,
						supplierId,
						deptName,
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
	},
}
</script>

<style lang="less">
</style>
