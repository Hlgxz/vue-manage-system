<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { loginAPI } from '../api/login';
import { useAdminStore } from "../store/admin";
import{ useMainStore } from '../store/webselect';

//准备表单对象
interface LoginInfo {
	username: string;
	password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
	username: '',
	password: ''
});

//准备规则对象
const rules: FormRules = {
	username: [
		{
			required: true,
			message: '사용자 이름을 입력하십시오.',
			trigger: 'blur'
		}
	],
	password: [{ required: true, message: '암호를 입력하십시오.', trigger: 'blur' }]
};
const permiss = usePermissStore();
//获取form实例做统一校验
const login = ref<FormInstance>();

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid: boolean) => {
		if (valid) {
			const res = await loginAPI(param)
			const adminStore = useAdminStore();
			
			if (res.data.code == 200) {
				//将token加入本地存储中
				localStorage.token =await res.data.data.token;
				//获取管理员分组
				await permiss.getrolesData();
				//保存管理员信息
				adminStore.setUserData(res.data.data);
				if (res.data.data.role_id != 999){
					const store = useMainStore();
					store.setActiveWebRoleId(res.data.data.role_id)
				}

					ElMessage.success(res.data.msg);
				
				const keys = permiss.defaultList[res.data.data.roles_id];


				permiss.handleSet(keys);
				localStorage.setItem('ms_keys', JSON.stringify(keys));

				//跳转首页，如有跳转问题查看导航守卫
				router.push('/');
			} else {
				ElMessage.error(res.data.msg);
			}
			//提示用户

		} else {
			ElMessage.error('로그인 실패');
			return false;
		}
	});
};

const tags = useTagsStore();
tags.clearTags();
</script>

<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">后台管理系统</div>
			<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm(login)">
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm(login)">登录</el-button>
				</div>

			</el-form>
		</div>
	</div>
</template>



<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;

	background-size: 100%;
}

.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}

.ms-content {
	padding: 30px 30px;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}

.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>
