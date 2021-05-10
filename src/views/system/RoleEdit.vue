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
					<a-row :gutter="12">
						<a-col :span="12">
							<a-form-item label="角色ID" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`agentNum`,
										{
											rules: [{ required: true, message: '请输入角色ID!' }],
										},
									]"
									placeholder="请输入角色ID"
								/>
							</a-form-item>
						</a-col>
						<!-- <a-col :span="12">
              <a-form-item label="租户代码" :label-col="{ span: 6 }">
                <a-input
                  :disabled="type === '0'"
                  v-decorator="[`agentCode`, {
                    rules: [{ required: true, message: '请输入租户代码!'}]
                  }]"
                  placeholder="请输入租户代码"
                />
              </a-form-item>
            </a-col> -->
						<a-col :span="12">
							<a-form-item label="角色名称" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`roleName`,
										{
											rules: [{ required: true, message: '请输入角色名称!' }],
										},
									]"
									placeholder="请输入角色名称"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="状态" :label-col="{ span: 6 }">
								<a-radio-group
									:disabled="type === '0'"
									v-decorator="[
										'status',
										{
											rules: [{ required: true, message: '请选择租户状态!' }],
										},
									]"
								>
									<a-radio :value="1">启用</a-radio>
									<a-radio :value="0">停用</a-radio>
								</a-radio-group>
							</a-form-item>
						</a-col>
            <a-col :span="12">
							<a-form-item label="描述" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[`remark`]"
									placeholder="请输入描述"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24" style="margin-top: 30px;">
							<a-form-item label="角色授权" :label-col="{ span: 3 }">
								<a-checkbox-group
									v-decorator="['idsArr']"
									style="width: 100%"
								>
									<a-row>
										<a-col :span="4" v-for="item in userList" :key="item.id">
											<a-checkbox :value="item.id">{{ item.name }}</a-checkbox>
										</a-col>
									</a-row>
								</a-checkbox-group>
							</a-form-item>
						</a-col>
						<a-col :span="24" style="margin-top: 30px;">
							<a-form-item label="分配用户" :label-col="{ span: 3 }">
								<a-checkbox-group
									v-decorator="['idsArr']"
									style="width: 100%"
								>
									<a-row>
										<a-col :span="4" v-for="item in userList" :key="item.id">
											<a-checkbox :value="item.id">{{ item.name }}</a-checkbox>
										</a-col>
									</a-row>
								</a-checkbox-group>
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

export default {
	data() {
		return {
			userList: [],
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
		this.getUserList()
		const { id, type } = this.$route.query
		if (id) {
			this.id = id
			this.type = type
			this.queryDetail(id)
			// this.queryAttachment(id)
		}
	},
	methods: {
		async getUserList() {
			const res = await this.$http.get('/data/user/list')
			if (res) {
				this.userList = res.data
			}
		},
		// async findSuppliersList () {
		//   const res = await this.$http.get('/data/supplier/find')
		//   if (res) {
		//     this.supplierList = res.data
		//   }
		// },
		// async queryAttachment (id) {
		//   const res = await this.$http.get(`/data/supplier/findFile/${id}`)
		//   if (res) {
		//     const fileList = res.data.map(file => {
		//       return {
		//         uid: file.id,
		//         name: file.fileName,
		//         status: 'done',
		//         url: file.fileUrl,
		//         thumbUrl: file.fileUrl
		//       }
		//     })
		//     this.fileList = fileList
		//   }
		// },
		// handleCancel () {
		//   this.previewVisible = false
		// },
		// async handlePreview (file) {
		//   if (!file.url && !file.preview) {
		//     file.preview = await getBase64(file.originFileObj)
		//   }
		//   this.previewImage = file.url || file.preview
		//   this.previewVisible = true
		// },
		// handleChange ({ fileList }) {
		//   fileList = fileList.filter(file => {
		//     const { size } = file
		//     if (size > 5 * 1024 * 1024) {
		//       this.$message.error('单个文件小于5M!')
		//       return false
		//     }
		//     return true
		//   })
		//   this.fileList = fileList
		// },
		// beforeUpload (file) {
		//   return false
		// },
		/**
		 * 删除
		 * 1、如果是已经上传的附件，调用删除接口
		 * 2、如果是还未上传的附件，直接从数组中去掉
		 */
		// async handleRemove (file) {
		//   const index = this.fileList.indexOf(file)
		//   const newFileList = this.fileList.slice()
		//   newFileList.splice(index, 1)
		//   this.fileList = newFileList
		//   // 如果是已经上传的附件
		//   if (!file.originFileObj) {
		//     const { uid } = file
		//     const res = await this.$http.get(`/data/supplier/deleteFile/${uid}`)
		//     if (res) {
		//       this.$message.success('删除远程附件成功')
		//     }
		//   }
		// },
		async queryDetail(id) {
			this.spinning = true
			const res = await this.$http.get(`/data/role/get/${id}`)
			this.spinning = false
			if (res) {
				const {
					onJobDate,
					employeeNumber,
					employeeName,
					employState,
					sex,
					ethnic,
					employeePhone,
					idCard,
					emergencyContactName,
					emergencyContactPhone,
					originAddress,
					jobType,
					area,
					customerId,
					deptName,
					supplierId,
					employeePrice,
					payrollCardInfo,
				} = res.data
				this.form.setFieldsValue({
					onJobDate: onJobDate ? Moment(onJobDate) : null,
					employeeNumber,
					employeeName,
					employState,
					sex,
					ethnic,
					employeePhone,
					idCard,
					emergencyContactName,
					emergencyContactPhone,
					originAddress,
					jobType,
					area,
					customerId,
					deptName,
					supplierId,
					employeePrice,
					payrollCardInfo,
				})
			}
		},
		handleSearch(e) {
			e.preventDefault()
			this.form.validateFields(async (error, values) => {
				if (!error) {
					console.log(values)
					const param = {
						...values,
					}
					this.spinning = true
					if (this.id) param.id = this.id
					const res = await this.$http.post(
						`/data/role/${this.id ? 'update' : 'add'}`,
						param
					)
					this.spinning = false
					if (res) {
						this.$message.success(
							`${this.id ? '角色信息修改成功！' : '新增角色成功！'}`
						)
						this.$router.back()
					}
				}
			})
		},
		/**
		 * 上传附件
		 * 如果是已经上传过的，过滤掉
		 */
		// async handleFile (id, isUpdate) {
		//   if (this.fileList.length) {
		//     await Promise.all(this.fileList.map(async file => {
		//       const { originFileObj } = file
		//       if (originFileObj) {
		//         const formData = new FormData()
		//         formData.append('file', originFileObj)
		//         formData.append('id', id)
		//         await this.$http.post(`/data/supplier/uploadFile/${id}`, formData)
		//       }
		//     }))
		//   }
		//   this.spinning = false
		//   this.$message.success(`${isUpdate ? '供应商信息修改成功！' : '新增供应商成功！'}`)
		//   this.$router.back()
		// },
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
