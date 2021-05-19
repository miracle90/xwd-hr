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
						<!-- <a-col :span="12">
							<a-form-item label="角色ID" :label-col="{ span: 6 }">
								<a-input
									:disabled="type === '0'"
									v-decorator="[
										`roleNum`,
										{
											rules: [{ required: true, message: '请输入角色ID!' }],
										},
									]"
									placeholder="请输入角色ID"
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
					</a-row>
					<a-row :gutter="12" style="margin-top: 30px;">
						<a-col :span="3" style="line-height: 40px; text-align: right;">角色授权：</a-col>
						<a-col :span="9">
							<a-tree
								v-model="checkedKeys"
								:defaultExpandAll="true"
								checkable
								:expanded-keys="expandedKeys"
								:auto-expand-parent="true"
								:tree-data="ruleList"
								@expand="onExpand"
								@check="onCheck"
							/>
						</a-col>
						<a-col :span="12">
							<a-form-item label="分配用户" :label-col="{ span: 6 }">
								<a-checkbox-group
									:disabled="type === '0'"
									v-decorator="['userIdArr']"
									style="width: 100%"
								>
									<a-row>
										<a-col :span="8" v-for="item in userList" :key="item.id">
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
export default {
	data() {
		return {
			checkedKeys: [],
			expandedKeys: [],
			ruleList: [],
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
		this.getRuleList()
		const { id, type } = this.$route.query
		if (id) {
			this.id = id
			this.type = type
			// this.getRightsTree(id)
		}
	},
	methods: {
		onExpand(expandedKeys) {
			this.expandedKeys = expandedKeys
		},
		onCheck(checkedKeys) {
			this.checkedKeys = checkedKeys
		},
		async getUserList() {
			const res = await this.$http.get('/data/user/list')
			if (res) {
				this.userList = res.data
				if (this.id) this.findDispaterUsers(this.id)
			}
		},
		async getRuleList() {
			const res = await this.$http.get('/data/role/getRightsTree/0')
			if (res) {
				res.data.forEach((item1, index1) => {
					item1.key = `0-${index1}`
					item1.disabled = this.type === '0'
					if (item1.children && item1.children.length) {
						item1.children.forEach((item2, index2) => {
							item2.key = `0-${index1}-${index2}`
							item2.disabled = this.type === '0'
							if (item2.children && item2.children.length) {
								item2.children.forEach((item3, index3) => {
									item3.key = `0-${index1}-${index2}-${index3}`
									item3.disabled = this.type === '0'
								})
							}
						})
					}
				})
				this.ruleList = res.data
				if (this.id) this.queryDetail(this.id)
			}
		},
		async findDispaterUsers(id) {
			const res = await this.$http.get(`/data/role/findDispaterUsers/${id}`)
			if (res) {
				const userIdArr = res.data.map(item => item.id)
				this.form.setFieldsValue({
					userIdArr
				})
			}
		},
		// async getRightsTree(id) {
		// 	const list = []
		// 	const res = await this.$http.get(`/data/role/getRightsTree/${id}`)
		// 	if (res) {
		// 		const { data } = res
		// 		data.forEach((l1, i1) => {
		// 			const { checked: checked1, children: children1 } = l1
		// 			if (checked1) {
		// 				list.push(`0-${i1}`)
		// 			}
		// 			children1.forEach((l2, i2) => {
		// 				const { checked: checked2, children: children2 } = l2
		// 				if (checked2) {
		// 					list.push(`0-${i1}-${i2}`)
		// 				}
		// 				children2.forEach((l3, i3) => {
		// 					const { checked: checked3 } = l3
		// 					if (checked3) {
		// 						list.push(`0-${i1}-${i2}-${i3}`)
		// 					}
		// 				})
		// 			})
		// 		})
		// 		console.log(list)
		// 		this.expandedKeys = ['0-0', '0-0-0', '0-0-0-0', '0-0-0-1', '0-0-0-2', '0-0-0-3', '0-0-0-4', '0-0-1', '0-0-1-0', '0-0-1-1', '0-0-1-2', '0-0-1-3', '0-0-1-4']
		// 		this.form.setFieldsValue({
		// 			roleRights: ['0-0', '0-0-0', '0-0-0-0', '0-0-0-1', '0-0-0-2', '0-0-0-3', '0-0-0-4', '0-0-1', '0-0-1-0', '0-0-1-1', '0-0-1-2', '0-0-1-3', '0-0-1-4']
		// 		})
		// 	}
		// },
		async queryDetail(id) {
			this.spinning = true
			const res = await this.$http.get(`/data/role/get/${id}`)
			this.spinning = false
			if (res) {
				const {
					roleName,
					status,
					remark,
					rights
				} = res.data
				const list = rights.split(', ')
				const checkedKeys = []
				const expandedKeys = []
				list.forEach(item => {
					const arr = item.split('')
					const newArr = arr.map(i => i - 1)
					checkedKeys.push(`0-${newArr.join('-')}`)
					if (newArr.length === 3) {
						expandedKeys.push(`0-${newArr.slice(0, 1).join('-')}`)
						expandedKeys.push(`0-${newArr.slice(0, 2).join('-')}`)
					}
				})
				this.expandedKeys = [...new Set(expandedKeys)]
				this.checkedKeys = checkedKeys
				this.form.setFieldsValue({
					roleName,
					status,
					remark
				})
			}
		},
		handleSearch(e) {
			e.preventDefault()
			this.form.validateFields(async (error, values) => {
				if (!error) {
					const { userIdArr, ...obj } = values
					const resultList = []
					const param = {
						...obj
					}

					for (let i = 0; i < this.checkedKeys.length; i++) {
						const item = this.checkedKeys[i]
						const index = item.split('-')
						index.shift()
						let result = JSON.parse(JSON.stringify(this.ruleList))
						while (index.length) {
							const m = index.shift()
							// 如果result是数组，取索引，否则取children的索引
							result = Array.isArray(result) ? result[m] : result.children[m]
						}
						resultList.push(result.id)
					}

					console.log(resultList)

					this.spinning = true
					if (this.id) param.id = this.id
					const res1 = await this.$http.post(`/data/role/${this.id ? 'update' : 'add'}`, param)
					if (res1) {
						const { id } = res1.data
						const res2 = await this.$http.post('/data/role/setRights', {
							id,
							roleRights: resultList
						})
						if (res2) {
							const res3 = await this.$http.post('/data/role/saveUsers', {
								id,
								userIdArr
							})
							if (res3) {
								this.$message.success(`${this.id ? '角色信息修改成功！' : '新增角色成功！'}`)
								this.$router.back()
							}
						}
					}
					this.spinning = false
				}
			})
		},
		handleReset() {
			this.form.resetFields()
			this.expandedKeys = []
			this.checkedKeys = []
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
