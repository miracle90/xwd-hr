<template>
	<a-spin class="page-wrapper" :spinning="spinning">
		<a-row>
			<a-col>
				<a-form
					class="ant-advanced-search-form"
					:form="form"
					layout="horizontal"
				>
					<a-row style="margin-bottom: 20px">
						<a-col :span="24">
							<a-button
								v-if="type === '1'"
								type="primary"
								@click="handleSearch"
								style="margin-right: 20px"
								>提交</a-button
							>
							<a-button
								v-if="type === '1'"
								@click="handleReset"
								style="margin-right: 20px"
								>重置</a-button
							>
							<a-button @click="cancel">{{
								type !== '1' ? '返回' : '取消'
							}}</a-button>
						</a-col>
					</a-row>
					<a-row :gutter="24">
						<a-col :span="12">
							<a-form-item label="公司名称" :label-col="{ span: 6 }">
								<a-select
									:disabled="type === '0'"
									@change="customerIdChange"
									v-decorator="[
										'customerId',
										{
											rules: [{ required: true, message: '请选择公司名称!' }],
										},
									]"
									placeholder="请选择公司名称"
								>
									<a-select-option
										v-for="(item, index) in customerList"
										:key="index"
										:value="item.id"
									>
										{{ item.customerName }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="需求事业部" :label-col="{ span: 6 }">
								<a-input
									:disabled="true"
									v-decorator="['deptName']"
									placeholder="关联公司，自动带出"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="联系人" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`contactName`,
										{
											rules: [{ required: true, message: '请输入联系人!' }],
										},
									]"
									placeholder="请输入联系人"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="联系电话" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`contactPhone`,
										{
											rules: [{ required: true, message: '请输入联系电话!' }],
										},
									]"
									placeholder="请输入联系电话"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="需求人数" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`demandPersions`,
										{
											rules: [{ required: true, message: '请输入需求人数!' }],
										},
									]"
									placeholder="请输入需求人数"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="需求工种" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`demandTrade`,
										{
											rules: [{ required: true, message: '请输入需求工种!' }],
										},
									]"
									placeholder="请输入需求工种"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="需求日期" :label-col="{ span: 6 }">
								<a-date-picker
									:disabled="type === '0'"
									v-decorator="[
										`demandBeginDate`,
										{
											rules: [{ required: true, message: '请选择需求日期!' }],
										},
									]"
									format="YYYY-MM-DD"
									style="width: 100%"
									placeholder="请选择需求日期"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="撤离日期" :label-col="{ span: 6 }">
								<a-date-picker
									:disabled="type === '0'"
									v-decorator="[`demandEndDate`]"
									format="YYYY-MM-DD"
									style="width: 100%"
									placeholder="请选择撤离日期"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="男女比例" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`demandRatio`]"
									placeholder="请输入男女比例"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="需求年龄" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`demandAge`]"
									placeholder="请输入需求年龄"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="截止回复日期" :label-col="{ span: 6 }">
								<a-date-picker
									:disabled="type === '0'"
									v-decorator="[`replyEndDate`]"
									format="YYYY-MM-DD"
									style="width: 100%"
									placeholder="请选择截止回复日期"
								/>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="24" style="margin-top: 30px">
						<a-col :span="12">
							<a-form-item label="供应商名称" :label-col="{ span: 6 }">
								<a-select
									:disabled="type === '0'"
									v-decorator="[
										'supplierId',
										{
											rules: [{ required: true, message: '请选择供应商名称!' }],
										},
									]"
									placeholder="请选择供应商名称"
								>
									<a-select-option
										v-for="(item, index) in supplierList"
										:key="index"
										:value="item.id"
									>
										{{ item.supplierName }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="回复人数" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`replyPersions`,
										{
											rules: [{ required: true, message: '请输入回复人数!' }],
										},
									]"
									placeholder="请输入回复人数"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="收费标准(元/小时)" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`chargeStandard`,
										{
											rules: [
												{ required: true, message: '请输入收费标准(元/小时)!' },
											],
										},
									]"
									placeholder="请输入收费标准(元/小时)"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="车补" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`carAllowanceFee`]"
									placeholder="请输入车补"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="回复年龄" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`replyAge`]"
									placeholder="请输入回复年龄"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="回复比例" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`replyRatio`]"
									placeholder="请输入回复比例"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="资源来源地" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`resourceOrigin`]"
									placeholder="请输入资源来源地"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="民族" :label-col="{ span: 6 }">
								<a-select
                  :disabled="type === '0'"
                  v-decorator="[`nation`]"
                  placeholder="请选择民族"
                  show-search
                >
                  <a-select-option :value="item.value" v-for="item in nationList" :key="item.value">{{ item.value }}</a-select-option>
                </a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="回复备注" :label-col="{ span: 6 }">
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
import Moment from 'moment'

const columns = [
	{
		title: '供应商名称',
		dataIndex: 'supplierName',
		key: 'supplierName',
	},
	{
		title: '联系人',
		dataIndex: 'contactName',
		key: 'contactName',
	},
	{
		title: '电话',
		dataIndex: 'contactPhone',
		key: 'contactPhone',
	},
]

export default {
	data() {
		return {
			nationList: [],
			deptList: [],
			customerList: [],
			selectedRowKeys: [],
			selectedRows: [],
			supplierList: [],
			columns,
			spinning: false,
			type: '1', // 新增、修改type为1，查看详情type为0
			id: '',
			form: this.$form.createForm(this, { name: 'advanced_search' }),
		}
	},
	computed: {
		//
	},
	mounted() {
		const { id, demandId, type } = this.$route.query
		this.getNation()
		this.findCustomerList()
		this.findSuppliersList()
		if (id) {
			this.id = id
			this.type = type
			this.demandId = demandId
			this.queryDetail(id)
			// this.findSupplier(id)
		}
	},
	methods: {
		async getNation() {
			const res = await this.$http.get('/data/employee/findNation')
			if (res) {
				this.nationList = res.data
			}
		},
		// async findSupplier (id) {
		//   const res = await this.$http.get(`/data/demand/findSupplier/${id}`)
		//   if (res) {
		//     const selectedRowKeys = []
		//     const selectedRows = []
		//     const list = res.data.map(item => item.supplierId)
		//     console.log(list)
		//     console.log(this.supplierList)
		//     this.supplierList.forEach((item, index) => {
		//       if (list.includes(item.id)) {
		//         selectedRowKeys.push(index)
		//         selectedRows.push(item)
		//       }
		//     })
		//     this.selectedRowKeys = selectedRowKeys
		//     this.selectedRows = selectedRows
		//   }
		// },
		async customerIdChange(customerId) {
			if (customerId || customerId === 0) {
				const { deptName } = this.customerList.find(
					(item) => item.id === customerId
				)
				this.form.setFieldsValue({
					deptName,
				})
			}
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
		// onSelectChange (selectedRowKeys, selectedRows) {
		//   if (this.type === '0') {
		//     return
		//   }
		//   this.selectedRowKeys = selectedRowKeys
		//   this.selectedRows = selectedRows
		// },
		async queryDetail(id) {
			this.spinning = true
			const res = await this.$http.get(`/data/demand/getDemandReplyInfo/${id}`)
			this.spinning = false
			if (res) {
				const {
					demand: {
						customerId,
						// deptId,
						contactName,
						contactPhone,
						demandPersions,
						demandTrade,
						demandBeginDate,
						demandEndDate,
						demandRatio,
						demandAge,
						replyEndDate,
					},
					demandReply: {
						supplierId,
						replyPersions,
						chargeStandard,
						carAllowanceFee,
						replyAge,
						replyRatio,
						resourceOrigin,
						nation,
						replyRemark,
					},
				} = res.data
				this.customerIdChange(customerId)
				this.form.setFieldsValue({
					customerId,
					// deptId,
					contactName,
					contactPhone,
					demandPersions,
					demandTrade,
					demandBeginDate: demandBeginDate ? Moment(demandBeginDate) : null,
					demandEndDate: demandEndDate ? Moment(demandEndDate) : null,
					demandRatio,
					demandAge,
					replyEndDate: replyEndDate ? Moment(replyEndDate) : null,
					supplierId,
					replyPersions,
					chargeStandard,
					carAllowanceFee,
					replyAge,
					replyRatio,
					resourceOrigin,
					nation,
					replyRemark,
				})
			}
		},
		handleSearch() {
			this.form.validateFields(async (error, values) => {
				if (!error) {
					const {
						supplierId,
						customerId,
						deptName,
						contactName,
						contactPhone,
						demandPersions,
						demandTrade,
						demandBeginDate,
						demandEndDate,
						demandRatio,
						demandAge,
						replyEndDate,
						replyPersions,
						chargeStandard,
						carAllowanceFee,
						replyAge,
						replyRatio,
						resourceOrigin,
						nation,
						replyRemark,
					} = values
					const param = {
						demandParam: {
							customerId,
							deptName,
							contactName,
							contactPhone,
							demandPersions,
							demandTrade,
							demandRatio,
							demandAge,
							demandBeginDate: demandBeginDate
								? typeof demandBeginDate === 'string'
									? demandBeginDate
									: demandBeginDate.format('YYYY-MM-DD')
								: null,
							demandEndDate: demandEndDate
								? typeof demandEndDate === 'string'
									? demandEndDate
									: demandEndDate.format('YYYY-MM-DD')
								: null,
							replyEndDate: replyEndDate
								? typeof replyEndDate === 'string'
									? replyEndDate
									: replyEndDate.format('YYYY-MM-DD')
								: null,
						},
						demandReply: {
							supplierId,
							replyPersions,
							chargeStandard,
							carAllowanceFee,
							replyAge,
							replyRatio,
							resourceOrigin,
							nation,
							replyRemark,
						},
					}
					if (this.id) {
						param.demandParam.id = this.demandId
						param.demandReply.id = this.id
					}
					this.spinning = true
					const res = await this.$http.post('/data/demand/recordSelf', param)
					this.spinning = false
					if (res) {
						this.$message.success(
							`${!this.id ? '需求登记成功！' : '需求登记修改成功！'}`
						)
						this.$router.back()
					}
				}
			})
		},
		handleReset() {
			this.form.resetFields()
		},
		cancel() {
			this.$router.back()
		},
	},
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
