<template>
	<a-layout class="index">
		<a-layout-sider class="container">
			<h1 class="title">人力供应系统</h1>
			<a-menu
				:default-selected-keys="[$route.meta.selectKey]"
				:default-open-keys="[$route.meta.openKey]"
				mode="inline"
				theme="dark"
				:inline-collapsed="collapsed"
			>
				<a-sub-menu v-for="(menu, index) in menuList" :key="`sub${index + 1}`">
					<span slot="title">
						<a-icon :type="menu.icon" />
						<span>{{ menu.title }}</span></span
					>
					<a-menu-item v-for="item in menu.list" :key="`/${item.name}`">
						<router-link :to="`/${item.name}`">{{ item.title }}</router-link>
					</a-menu-item>
				</a-sub-menu>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header class="header">
				<a-breadcrumb>
					<a-breadcrumb-item
						v-for="(item, index) in $route.meta.bread"
						:key="index"
						>{{ item }}</a-breadcrumb-item
					>
				</a-breadcrumb>
				<div class="tool">
					<div @click="reset">
						<a-icon type="setting" />
						<span>修改密码</span>
					</div>
					<div @click="logout">
						<a-icon type="logout" />
						<span>退出登录</span>
					</div>
				</div>
			</a-layout-header>
			<a-layout-content class="content">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
		<a-modal
			title="修改密码"
			:visible="visible"
			:confirm-loading="confirmLoading"
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-form-item label="原密码">
					<a-input
						type="password"
						placeholder="请输入原密码"
						v-decorator="[
							'oldPsd',
							{ rules: [{ required: true, message: '请输入原密码!' }] },
						]"
					/>
				</a-form-item>
				<a-form-item label="新密码">
					<a-input
						type="password"
						placeholder="请输入新密码"
						v-decorator="[
							'newPsd',
							{ rules: [{ required: true, message: '请输入新密码!' }] },
						]"
					/>
				</a-form-item>
			</a-form>
		</a-modal>
	</a-layout>
</template>

<script>
export default {
	data() {
		return {
			form: this.$form.createForm(this, { name: 'psd' }),
			visible: false,
			confirmLoading: false,
			menuList: [],
			collapsed: false,
		}
	},
	computed: {
		// defaultActive () {
		//   return this.$route.path.replace('/', '')
		// },
		// defaultOpeneds () {
		//   return ['1']
		// }
	},
	mounted() {
		// console.log('1')
		this.getMenuList()
	},
	methods: {
		async getMenuList() {
			const res = await this.$http.get('/data/user/menu')
			if (res) {
				this.menuList = res.data
			}
		},
		handleOk() {
			this.form.validateFields((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values)
					// 调用接口
					// 清token，返回登录页
				}
			})
		},
		handleCancel() {
			this.form.resetFields()
			this.visible = false
		},
		reset() {
			this.visible = true
		},
		logout() {
			this.$confirm({
				title: '退出提示',
				content: '确定要退出登录吗？',
				okText: '确定',
				cancelText: '取消',
				onOk: async () => {
					window.localStorage.removeItem('token')
					this.$router.push('/')
				},
			})
		},
	},
}
</script>

<style lang="less">
.ant-layout-content {
	min-height: auto !important;
}
.index {
	height: 100%;
	.title {
		margin: 15px 0;
		text-align: center;
		color: #fff;
		font-size: 18px;
		font-weight: bold;
	}
	.header {
		display: flex;
		// justify-content: flex-start;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		background: #fff;
		.tool {
			display: flex;
			div {
				margin-left: 20px;
				cursor: pointer;
				span {
					margin-left: 4px;
				}
			}
		}
	}
	.content {
		margin: 20px;
		padding: 20px;
		// min-height: 100%;
		background: #fff;
		box-sizing: border-box;
	}
}
</style>
