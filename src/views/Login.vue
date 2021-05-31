<template>
	<div class="login-page">
		<transition name="form-fade" mode="in-out">
			<a-spin class="form-contianer" v-show="showLogin" :spinning="spinning">
				<h1 class="manage-tip">人力资源供应系统</h1>
				<a-form :layout="formLayout" :form="form" @submit="handleSubmit">
					<a-form-item
						label="用户名"
						:label-col="formItemLayout.labelCol"
						:wrapper-col="formItemLayout.wrapperCol"
					>
						<a-input
							placeholder="请输入用户名"
							v-decorator="[
								'loginName',
								{ rules: [{ required: true, message: '请输入用户名!' }] },
							]"
						/>
					</a-form-item>
					<a-form-item
						label="密码"
						:label-col="formItemLayout.labelCol"
						:wrapper-col="formItemLayout.wrapperCol"
					>
						<a-input
							type="password"
							placeholder="请输入密码"
							v-decorator="[
								'loginPassword',
								{ rules: [{ required: true, message: '请输入密码!' }] },
							]"
						/>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" html-type="submit" class="submit-btn"
							>登录</a-button
						>
					</a-form-item>
				</a-form>
			</a-spin>
		</transition>
	</div>
</template>

<script>
// import { loginApi } from '../common/api.js'

export default {
	data() {
		return {
			spinning: false,
			formLayout: 'vertical',
			form: this.$form.createForm(this, { name: 'coordinated' }),
			showLogin: false,
		}
	},
	computed: {
		formItemLayout() {
			const { formLayout } = this
			return formLayout === 'horizontal'
				? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
				: {}
		},
	},
	mounted() {
		this.showLogin = true
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault()
			this.form.validateFields(async (err, values) => {
				if (!err) {
					// 校验通过，调用接口
					this.spinning = true
					const res = await this.$http.post('/data/user/login', values)
					this.spinning = false
					if (res) {
						const { token, id } = res.data
						window.localStorage.setItem('token', token)
						window.localStorage.setItem('xwdid', id)
						this.$router.replace('/suppliers')
					}
				}
			})
		},
	},
}
</script>

<style lang="less">
.login-page {
	position: relative;
	height: 100%;
	width: 100%;
	.form-contianer {
		position: absolute;
		top: 15%;
		left: 50%;
		margin-left: -185px;
		padding: 25px;
		width: 360px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.manage-tip {
			margin-bottom: 60px;
			font-size: 36px;
			color: #000000;
		}
		.submit-btn {
			width: 100%;
			font-size: 16px;
		}
	}
}
.form-fade-enter-active,
.form-fade-leave-active {
	transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
	transform: translate3d(0, -50px, 0);
	opacity: 0;
}
</style>
