<template>
	<a-spin class="page-wrapper" :spinning="spinning">
		<a-row>
			<a-col>
				<a-form
					class="ant-advanced-search-form"
					:form="form"
					@submit="handleSearch"
					layout="horizontal"
				>
					<a-row style="margin-bottom: 20px">
						<a-col :span="24">
							<a-button
								v-if="type === '1'"
								type="primary"
								html-type="submit"
								style="margin-right: 20px"
								>提交</a-button
							>
							<a-button
								v-if="type === '1'"
								:style="{ marginRight: '20px' }"
								@click="handleReset"
								>重置</a-button
							>
							<a-button @click="cancel">{{
								type !== '1' ? '返回' : '取消'
							}}</a-button>
						</a-col>
					</a-row>
					<a-row :gutter="24">
						<a-col :span="12">
							<a-form-item label="供应商编码" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`supplierCode`,
										{
											rules: [{ required: true, message: '请输入供应商编码!' }],
										},
									]"
									placeholder="请输入供应商编码"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="供应商名称" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`supplierName`,
										{
											rules: [{ required: true, message: '请输入供应商名称!' }],
										},
									]"
									placeholder="请输入供应商名称"
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
							<a-form-item label="统一社会信用代码" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`businessLicense`]"
									placeholder="请输入统一社会信用代码"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="联系人职务" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`contactPersionPost`]"
									placeholder="请输入联系人职务"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="法定代表人" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`legalRepresentative`]"
									placeholder="请输入法定代表人"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="联系方式" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`contactPhone`,
										{
											rules: [{ required: true, message: '请输入联系方式!' }],
										},
									]"
									placeholder="请输入联系方式"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="注册资金" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`registeredCapital`]"
									placeholder="请输入注册资金"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="邮箱" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`email`]"
									placeholder="请输入邮箱"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="注册地址" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`registerAddress`]"
									placeholder="请输入注册地址"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="派遣证有效期起" :label-col="{ span: 6 }">
								<a-date-picker
									:disabled="type === '0'"
									v-decorator="[`dispatchBeginDate`]"
									format="YYYY-MM-DD"
									style="width: 100%"
									placeholder="请选择派遣证有效期起"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="供应商级别" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`supplierLevel`]"
									placeholder="请输入供应商级别"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="派遣证有效期止" :label-col="{ span: 6 }">
								<a-date-picker
									:disabled="type === '0'"
									v-decorator="[`dispatchEndDate`]"
									format="YYYY-MM-DD"
									style="width: 100%"
									placeholder="请选择派遣证有效期止"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="累计输送人数" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`totalTrasportPersions`]"
									placeholder="请输入累计输送人数"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="引荐人" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`recommendPersion`]"
									placeholder="请输入引荐人"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="资源强项" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`resourceAdvantage`]"
									placeholder="请输入资源强项"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="合作开始日期" :label-col="{ span: 6 }">
								<a-date-picker
									:disabled="type === '0'"
									v-decorator="[`cooperateBeginDate`]"
									format="YYYY-MM-DD"
									style="width: 100%"
									placeholder="请选择合作开始日期"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="合作次数" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`cooperateTimes`]"
									placeholder="请输入合作次数"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="关键事项" :label-col="{ span: 3 }">
								<a-textarea
									:disabled="type === '0'"
									v-decorator="[`focusEvent`]"
									placeholder="请输入关键事项"
									:auto-size="{ minRows: 3 }"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item label="附件" :label-col="{ span: 3 }">
								<a-upload
									:disabled="type === '0'"
									list-type="picture-card"
									:file-list="fileList"
									:remove="handleRemove"
									:before-upload="beforeUpload"
									@preview="handlePreview"
									@change="handleChange"
								>
									<div v-if="fileList.length < 5">
										<a-icon type="plus" />
										<div class="ant-upload-text">上传</div>
									</div>
								</a-upload>
								<p style="color: red">最多5个附件，单个文件小于5M</p>
								<a-modal
									:visible="previewVisible"
									:footer="null"
									@cancel="handleCancel"
								>
									<img alt="example" style="width: 100%" :src="previewImage" />
								</a-modal>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row style="margin-bottom: 20px">
						<a-col :span="24" style="font-size: 16px; font-weight: bold"
							>开票信息</a-col
						>
					</a-row>
					<a-row :gutter="24" style="margin-bottom: 20px">
						<a-col :span="12">
							<a-form-item label="税号" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`dutyParagraph`]"
									placeholder="请输入税号"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="开票公司名称" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`invoiceCompanyName`]"
									placeholder="请输入开票公司名称"
								/>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row style="margin-bottom: 20px">
						<a-col :span="24" style="font-size: 16px; font-weight: bold"
							>收款信息</a-col
						>
					</a-row>
					<a-row :gutter="24" style="margin-bottom: 20px">
						<a-col :span="12">
							<a-form-item label="银行账号" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`bankAccount`]"
									placeholder="请输入银行账号"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="银行名称" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`bankName`]"
									placeholder="请输入银行名称"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="账户名称" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`accountName`]"
									placeholder="请输入账户名称"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="开户行名称" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`accountOfBankName`]"
									placeholder="请输入开户行名称"
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

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export default {
	data() {
		return {
			previewVisible: false,
			previewImage: '',
			fileList: [],
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
		const { id, type } = this.$route.query
		if (id) {
			this.id = id
			this.type = type
			this.queryDetail(id)
			this.queryAttachment(id)
		}
	},
	methods: {
		async queryAttachment(id) {
			const res = await this.$http.get(`/data/supplier/findFile/${id}`)
			if (res) {
				const fileList = res.data.map((file) => {
					return {
						uid: file.id,
						name: file.fileName,
						status: 'done',
						url: file.fileUrl,
						thumbUrl: file.fileUrl,
					}
				})
				this.fileList = fileList
			}
		},
		handleCancel() {
			this.previewVisible = false
		},
		async handlePreview(file) {
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj)
			}
			this.previewImage = file.url || file.preview
			this.previewVisible = true
		},
		handleChange({ fileList }) {
			fileList = fileList.filter((file) => {
				const { size } = file
				if (size > 5 * 1024 * 1024) {
					this.$message.error('单个文件小于5M!')
					return false
				}
				return true
			})
			this.fileList = fileList
		},
		beforeUpload(file) {
			return false
		},
		/**
		 * 删除
		 * 1、如果是已经上传的附件，调用删除接口
		 * 2、如果是还未上传的附件，直接从数组中去掉
		 */
		async handleRemove(file) {
			const index = this.fileList.indexOf(file)
			const newFileList = this.fileList.slice()
			newFileList.splice(index, 1)
			this.fileList = newFileList
			// 如果是已经上传的附件
			if (!file.originFileObj) {
				const { uid } = file
				const res = await this.$http.get(`/data/supplier/deleteFile/${uid}`)
				if (res) {
					this.$message.success('删除远程附件成功')
				}
			}
		},
		async queryDetail(id) {
			this.spinning = true
			const res = await this.$http.get(`/data/supplier/get/${id}`)
			this.spinning = false
			if (res) {
				const {
					focusEvent,
					email,
					supplierLevel,
					totalTrasportPersions,
					contactPersionPost,
					cooperateTimes,
					recommendPersion,
					resourceAdvantage,
					supplierCode,
					supplierName,
					contactName,
					businessLicense,
					contactPhone,
					legalRepresentative,
					dispatchBeginDate,
					dispatchEndDate,
					cooperateBeginDate,
					registeredCapital,
					registerAddress,
					dutyParagraph,
					invoiceCompanyName,
					bankAccount,
					bankName,
					accountName,
					accountOfBankName,
				} = res.data
				this.form.setFieldsValue({
					focusEvent,
					email,
					supplierLevel,
					totalTrasportPersions,
					contactPersionPost,
					cooperateTimes,
					recommendPersion,
					resourceAdvantage,
					supplierCode,
					supplierName,
					contactName,
					businessLicense,
					contactPhone,
					legalRepresentative,
					dispatchBeginDate: dispatchBeginDate
						? Moment(dispatchBeginDate)
						: null,
					dispatchEndDate: dispatchEndDate ? Moment(dispatchEndDate) : null,
					cooperateBeginDate: cooperateBeginDate
						? Moment(cooperateBeginDate)
						: null,
					registeredCapital,
					registerAddress,
					dutyParagraph,
					invoiceCompanyName,
					bankAccount,
					bankName,
					accountName,
					accountOfBankName,
				})
			}
		},
		handleSearch(e) {
			e.preventDefault()
			this.form.validateFields(async (error, values) => {
				if (!error) {
					console.log(values)
					const {
						dispatchBeginDate,
						dispatchEndDate,
						cooperateBeginDate,
					} = values
					const param = {
						...values,
						dispatchBeginDate: dispatchBeginDate
							? typeof dispatchBeginDate === 'string'
								? dispatchBeginDate
								: dispatchBeginDate.format('YYYY-MM-DD')
							: null,
						dispatchEndDate: dispatchEndDate
							? typeof dispatchEndDate === 'string'
								? dispatchEndDate
								: dispatchEndDate.format('YYYY-MM-DD')
							: null,
						cooperateBeginDate: cooperateBeginDate
							? typeof cooperateBeginDate === 'string'
								? cooperateBeginDate
								: cooperateBeginDate.format('YYYY-MM-DD')
							: null,
					}
					this.spinning = true
					if (this.id) param.id = this.id
					const res = await this.$http.post(
						`/data/supplier/${this.id ? 'update' : 'add'}`,
						param
					)
					if (res) {
						const { id } = res.data
						this.handleFile(id, !!this.id)
					} else {
						this.spinning = false
					}
				}
			})
		},
		/**
		 * 上传附件
		 * 如果是已经上传过的，过滤掉
		 */
		async handleFile(id, isUpdate) {
			if (this.fileList.length) {
				await Promise.all(
					this.fileList.map(async (file) => {
						const { originFileObj } = file
						if (originFileObj) {
							const formData = new FormData()
							formData.append('file', originFileObj)
							formData.append('id', id)
							await this.$http.post(`/data/supplier/uploadFile/${id}`, formData)
						}
					})
				)
			}
			this.spinning = false
			this.$message.success(
				`${isUpdate ? '供应商信息修改成功！' : '新增供应商成功！'}`
			)
			this.$router.back()
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
